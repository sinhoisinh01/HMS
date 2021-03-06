angular.module('HMS')
.controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope, workFactory, $filter, mySweetAlert) 
{
    $scope.estimateSheet = [];

    $rootScope.construction_id = $stateParams.construction_id;
    $rootScope.category_id = $stateParams.category_id;

    /**
    * Description: find work in works array
    * Params: work_id, works array
    * Return: work if exists. null if not
    */
    function searchWorkById(work_id, works) {
        workLength = works.length;
        for (i = 0; i < workLength; i++) {
            if (work_id == works[i].work_id)
                return works[i];
        };
        return null;
    }

    if (!$scope.works)
    {
        workFactory.get()
        .then(function(result){
            $scope.works = result;
        })
        .then(function(){
            $http.get(baseURL + 'categoryWorks',{params:{category_id:$stateParams.category_id}})
            .then(function (response) {

                var subcategories = response.data;

                var subcategoriesLength = subcategories.length; 
                for(var i = 0; i < subcategoriesLength; i++)
                {   
                    subcategories[i].code = "*";
                    subcategories[i].subcategory_id = subcategories[i].id;
                    subcategories[i].type = 'subcategory';
                    
                    var subcategoryWorksLength = subcategories[i].subcategory_works.length;
                    var temp = JSON.parse(JSON.stringify(subcategories[i]));
                    delete temp.subcategory_works;
                    $scope.estimateSheet.push(temp);

                    for(var j = 0; j < subcategoryWorksLength; j++)
                    {
                        var work = searchWorkById(subcategories[i].subcategory_works[j].work_id, $scope.works);

                        subcategories[i].subcategory_works[j].code = work.code;
                        subcategories[i].subcategory_works[j].name = work.name;
                        subcategories[i].subcategory_works[j].unit = work.unit;
                        subcategories[i].subcategory_works[j].price = work.price;
                        subcategories[i].subcategory_works[j].total_price = subcategories[i].subcategory_works[j].value * work.price;
                        subcategories[i].subcategory_works[j].type = 'work';

                        var temp = JSON.parse(JSON.stringify(subcategories[i].subcategory_works[j]));
                        delete temp.descriptions;
                        $scope.estimateSheet.push(temp);
                        
                        if (subcategories[i].subcategory_works[j].descriptions)
                            var descriptionsLength = subcategories[i].subcategory_works[j].descriptions.length;
                            for (var k = 0; k < descriptionsLength; k++)
                            {
                                subcategories[i].subcategory_works[j].descriptions[k].subcategory_id = subcategories[i].id;
                                subcategories[i].subcategory_works[j].descriptions[k].type = "description";
                                $scope.estimateSheet.push(subcategories[i].subcategory_works[j].descriptions[k]);
                            }
                    }
                }

                $scope.showCategoryWorks = true;

                //console.log($scope.estimateSheet);

                var blankRowNum = 101 - $scope.estimateSheet.length;
                if(blankRowNum<=0)
                    blankRowNum += 50;
                for (var i=0; i<blankRowNum; i++)
                    $scope.estimateSheet.push({});
            });
        });
    }  

    $scope.worksWindow = {
        show: false,
        search: '',
        method: '',
        oldId: '',
        oldName: '',
        newWork: {}
    };

    $scope.getRowPos = function(index){
        $scope.rowPos = index;
    }

    $scope.checkType = function(code){
        var addType = '';

        if(code === undefined)
            code = "";
        if(/^[*]+$/.test(code))
             addType = 'subcategory';
        else if(/[a-zA-Z0-9.,]/.test(code))
        {
            if(/^TT.*/i.test(code)) 
                addType = 'userWork';
            else addType = 'work';
        }
        else if(code === '')
            addType = 'description';

        return addType;
    }

    $scope.isValid = function(addType, pos){
        var sheet = $scope.estimateSheet;
        switch(addType){
            case 'subcategory':
                if( (sheet[pos-1].type == "description" && sheet[pos+1].type == "description") || (sheet[pos-1].type == "work" && sheet[pos+1].type == "description") )
                    return false;
                // adding subcategory between 2 descriptions or below work and above description is invalid
            break;
            case 'work':
                if( (sheet[pos-1].type == "description" && sheet[pos+1].type == "description") || (sheet[pos-1].type == "work" && sheet[pos+1].type == "description") )
                    return false;
                // adding work between 2 descriptions or below work and above description is invalid
            break;
            case 'userWork':
                 if( (sheet[pos-1].type == "description" && sheet[pos+1].type == "description") || (sheet[pos-1].type == "work" && sheet[pos+1].type == "description") )
                    return false;
            break;
            case 'description':
                if( (sheet[pos-1].type == "subcategory" && sheet[pos+1].type == "subcategory") || (sheet[pos-1].type == "subcategory" && sheet[pos+1].type == "work") || (sheet[pos-1].type == "subcategory" && !sheet[pos+1].name) )  
                    return false;
                // adding work between 2 subcategories or below subcategory and above work is invalid
            break;
        }
        return true;
    }

    $scope.updateRowData = function(row) {
        if (row.value && row.price)
            row.totalPrice = row.value * row.price;
        if (!row.price && (row.amount || row.length || row.width || row.height))
        {
            row.value = (row.amount || 1) * (row.length || 1) * (row.width || 1) * (row.height || 1);
            for(var i = $scope.rowPos - 1; i >= 0; i--)
            {
                if($scope.estimateSheet[i].type === "work" || $scope.estimateSheet[i].type === "userWork")
                {
                    $scope.estimateSheet[i].value = 0; 
                    for(var j = i+1; j <= $scope.estimateSheet.length; j++)
                    {
                        if(!$scope.estimateSheet[j] || $scope.estimateSheet[j].type != "description")
                            break; 
                        $scope.estimateSheet[i].value += $scope.estimateSheet[j].value;
                    }
                    $scope.save($scope.estimateSheet[i]);  
                    break;
                }       
            }  
        }
    }

    $scope.save = function(row) {
        //console.log($scope.rowPos);
        var sheet = $scope.estimateSheet;
        if( !row.id && row.name && (!row.name || row.name.length != 0))
        {
            switch($scope.checkType(row.code))
            {
                case 'subcategory':

                if(!$scope.isValid('subcategory', $scope.rowPos))
                {
                    swal(mySweetAlert.getType("basic","Bạn không thể thêm \n hạng mục con ở đây"));
                    $scope.estimateSheet.splice($scope.rowPos, 1);
                    return false;
                }                

                var subcategory = {category_id:$stateParams.category_id, name:sheet[$scope.rowPos].name, no: null};
                for(var i = $scope.rowPos-1; i >= 0; i--)
                {
                    if(sheet[i].type === "subcategory")
                    {
                        subcategory.no = sheet[i].no + 1;
                        break;
                    }       
                }
                
                var i = $scope.rowPos;
                while(sheet[i].name)
                {
                    if(sheet[i].type === "subcategory")
                        $scope.estimateSheet[i].no++;
                    i++;
                }

                $http.post(baseURL + "subcategory",{subcategory:subcategory}).then(function(response){
                    row.category_id = response.data.category_id;
                    row.subcategory_id = response.data.id;
                    row.id = response.data.id;
                    row.no = response.data.no;
                    row.type = "subcategory";
                    
                    for(var i = $scope.rowPos+1; i<sheet.length; i++)
                    {
                        if(sheet[i].code)
                        {
                            if(sheet[i].code.charAt(0) == "*")
                                break;
                            else{
                                var subcategoryWork = {id:sheet[i].id, subcategory_id:response.data.id,work_id:sheet[i].work_id,no:sheet[i].no,value:sheet[i].value};
                                $http.post(baseURL + "subcategoryWork/" + subcategoryWork.id, {subcategoryWork:subcategoryWork}).then(function(){
                                    syncRedmineWork(subcategoryWork.id, 'update');
                                });
                            }
                        }
                    }
                });
                break;
                case 'description':
                    if(!$scope.isValid('description',$scope.rowPos))
                    {
                        swal(mySweetAlert.getType("basic","Bạn không thể thêm \n diễn giải ở đây"));
                        $scope.estimateSheet.splice($scope.rowPos, 1);
                        return false;
                    }
                    var description = {subcategoryWork_id:0, name:row.name, no:-1, amount:0, length:0, width:0, height:0, value:0};
                    for(var i = $scope.rowPos-1; i>=0; i--)
                    {
                        description.no++;
                        if(sheet[i].code)
                        {
                            description.subcategoryWork_id = sheet[i].id;
                            break;
                        }
                    }
                    var i = $scope.rowPos;
                    while(sheet[i].name)
                    {
                        if(sheet[i].type === "description")
                            $scope.estimateSheet[i].no++;
                        i++;
                    }
                    row.type = "description";
                    $http.post(baseURL + "description", {description:description}).then(function(response){
                        row.id = response.data.id;
                    });
                break;
                case 'userWork':
                    if(!$scope.isValid('work',$scope.rowPos))
                    {
                        swal(mySweetAlert.getType("basic","Bạn không thể thêm \n công tác ở đây")); 
                        $scope.estimateSheet.splice($scope.rowPos, 1);
                        return false;
                    }
                    row.document = ''; 
                    row.unit = '';
                    row.construction_id = $stateParams.construction_id;
                    $http.post(baseURL + "work",{work:row})
                    .then(function(response){
                        var constructionResourceWork = {construction_id: $stateParams.construction_id, resource_id: 1, work_id:response.data.id, value:0};
                        $http.post(baseURL + "ConstructionResourceWorkController", {constructionResourceWork:constructionResourceWork});
                        row.id = response.data.id;
                        row.code = response.data.code;
                        $scope.addWork(row);
                    });
                break;
            }
        }
        else{
            switch($scope.checkType(row.code))
            {
                case 'subcategory':
                    var subcategory = {category_id: row.category_id, name: row.name, no: row.no};
                    $http.post(baseURL + "subcategory/" + row.id, {subcategory:subcategory})
                    .then(function(response) {
                        $http.post(baseURL + 'redmine/sync/update', {
                          type: 'subcategory', id: row.id
                        });
                    });
                    break;
                case 'userWork':
                    var subcategoryWork = {subcategory_id: row.subcategory_id, work_id: row.work_id, no: row.no, value: row.value};
                    $http.post(baseURL + "subcategoryWork/" + row.id, {subcategoryWork:subcategoryWork})
                    .then(function (response) {
                        syncRedmineWork(row.id, 'update');
                    });
                    var work = {code: row.code, document: '', name: row.name, unit: row.unit, construction_id: row.construction_id};
                    $http.post(baseURL + "work/" + row.work_id, {work:work});
                    break;
                case 'work':
                    var subcategoryWork = {subcategory_id: row.subcategory_id, work_id: row.work_id, no: row.no, value: row.value};
                    $http.post(baseURL + "subcategoryWork/" + row.id, {subcategoryWork:subcategoryWork})
                    .then(function (response) {
                        syncRedmineWork(row.id, 'update');
                    });
                    break;
                case 'description':
                    var description = {subcategoryWork_id: row.subcategoryWork_id, name: row.name, no: row.no, amount: row.amount, length: row.length, width: row.width, height: row.height, value: row.value};
                    $http.post(baseURL + "description/" + row.id, {description:description});
                    break;
            }
        }
    };

    $scope.workWindowPos = function($event){
        $scope.worksWindow.show = false;
        var cell = angular.element($event.target);
        $scope.top = (cell.prop('offsetParent').offsetTop
                + cell.prop('offsetParent').offsetHeight) + 'px';
        $scope.left = cell.prop('offsetParent').offsetLeft + 'px';
    }

    $scope.searchWork = function (work, searchTxt) {
        $scope.worksWindow = {
            show: true,
            search: searchTxt,
            method: work.unit ? 'Sửa' : 'Thêm',
            oldId: work ? work.code : '',
            oldName: work ? work.name : '',
            newWork: null
        };
    };  

    $scope.workAction =  function(action, work){
        if(action === 'Thêm')
            $scope.addWork(work);
        else
            $scope.replaceWork(work);
    }

    $scope.addWork = function (work) {
        if(!$scope.isValid('work',$scope.rowPos))
        {
            swal(mySweetAlert.getType("basic","Bạn không thể thêm \n công tác ở đây")); 
            $scope.estimateSheet.splice($scope.rowPos, 1);      
            return false;
        }
        var subcategoryWork = {subcategory_id:0, work_id: work.id, no:0, value:0};

        for(var i = $scope.rowPos-1; i>=0; i--)
        {
            subcategoryWork.subcategory_id = $scope.estimateSheet[i].subcategory_id;  
            // get subcategory id from row above( all rows have subcategory id)
            if($scope.estimateSheet[i].type == "subcategory")
            {
                subcategoryWork.no = 0;
                break;// if the row above is subcategory, it means added work is the first work of subcategory( # = 0)
            }
            if($scope.estimateSheet[i].type == "work")
            {
                subcategoryWork.no = $scope.estimateSheet[i].no + 1;
                break; // find closest work to get #
            }       
        }
        var i = $scope.rowPos;
        while($scope.estimateSheet[i].name)
        {
            if($scope.estimateSheet[i].type === "work")
                $scope.estimateSheet[i].no++;
            i++;
        }
        
        $http.post(baseURL + "subcategoryWork", {subcategoryWork:subcategoryWork}).then(function(response){
            work.id = response.data.id;
            work.subcategory_id = response.data.subcategory_id;
            work.no = response.data.no;
            work.type = "work";
            $scope.estimateSheet.splice($scope.rowPos,1,work);
            $scope.worksWindow.show = false;
            syncRedmineWork(response.data.id, 'create');
        });
    };
    $scope.replaceWork = function(work){
        var oldWork = $scope.estimateSheet[$scope.rowPos];
        var subcategoryWork = {subcategory_id: oldWork.subcategory_id, work_id: work.id, no: oldWork.no, value: 0};
        $http.post(baseURL + "subcategoryWork/" + oldWork.id, {subcategoryWork:subcategoryWork})
        .then(function(response){
            $scope.estimateSheet[$scope.rowPos].code = work.code;
            $scope.estimateSheet[$scope.rowPos].name = work.name;
            $scope.estimateSheet[$scope.rowPos].unit = work.unit;
            $scope.estimateSheet[$scope.rowPos].price = work.price;
            $scope.estimateSheet[$scope.rowPos].value = 0;
            syncRedmineWork(oldWork.id, 'update');
        });
    };

    /*Estimate Table Context Menu*/
    $scope.menuOptions = [
        ['Thêm dòng trên', function ($itemScope) {
            $scope.estimateSheet.splice($itemScope.$index, 0, {});
        }],
        null,
        ['Thêm dòng dưới', function ($itemScope) {
            $scope.estimateSheet.splice($itemScope.$index+1, 0, {});
        }],
        null,
        ['Xóa dòng', function ($itemScope) {
            var index = $itemScope.$index;
            
            if($itemScope.row.type == 'subcategory')
            {
                swal(
                    mySweetAlert.getType("warning","Tất cả công tác và diễn giải của mục này sẽ bị xóa theo")
                    ,
                    function(){
                        $scope.estimateSheet.splice(index, 1);
                        var subcategoryId = $itemScope.row.id;
                        $http.delete(baseURL + "subcategory/" + subcategoryId).then(function(){
                            $http.post(baseURL + 'redmine/sync/remove', {
                                type: 'subcategory', id: subcategoryId
                            });
                            while($scope.estimateSheet[index].type !== "subcategory" && $scope.estimateSheet[index].name)
                            {
                                $scope.estimateSheet.splice(index, 1);
                            }
                        });
                    }
                );   
            }
            else if($itemScope.row.type == 'work')
            {
                swal(
                    mySweetAlert.getType("warning","Tất cả diễn giải của công tác này sẽ bị xóa theo")
                    ,
                    function(){
                        $scope.estimateSheet.splice(index, 1);
                        $http.delete(baseURL + "subcategoryWork/" + $itemScope.row.id).then(function(){
                            syncRedmineWork($itemScope.row.id, 'delete');
                            while($scope.estimateSheet[index].type === "description" && $scope.estimateSheet[index].name)
                            {
                                $scope.estimateSheet.splice(index, 1);
                            }
                        });
                    }
                );
            }
            else if($itemScope.row.type == 'description')
                swal(
                    mySweetAlert.getType("warning","")
                    ,
                    function(){
                        $scope.estimateSheet.splice(index, 1);
                    }
                );     
        }]
    ];

    /**-----------------------------Redmine-----------------------------------*/
    /*
     * Author: Doan Phuc Sinh
     * Summary: update cookies issuesString to synch Issue for Redmine Project
     * Params: subcategoryWorkId, type ('create', 'update', 'delete')
     */
    function syncRedmineWork(subcategoryWorkId, type) {
        var typePrefix = type == 'create' ? "C:" : (type == 'update' ? "U:" : "D:");
        var issueKeyword = typePrefix + subcategoryWorkId + ';';
        console.log(issueKeyword);
        if ($cookies.get('issuesString') == null) {
            $cookies.put('issuesString', issueKeyword);
        } else {
            var newCookie = decodeURIComponent($cookies.get('issuesString')) + issueKeyword;
            $cookies.put('issuesString', newCookie);
        }
    }
});