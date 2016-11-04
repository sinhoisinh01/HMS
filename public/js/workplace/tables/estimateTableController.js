angular.module('HMS')
.controller('estimateTableController', function ($stateParams, $state, $cookies, baseURL, $http, $scope, $rootScope, workFactory) 
{
    $scope.estimateSheet = [];

    if (!$scope.works)
    {
        workFactory.get()
        .then(function(result){
            $scope.works = result;
        })
        .then(function(){
            $http.get(baseURL + 'categoryWorks',{params:{category_id:$stateParams.category_id}})
            .then(function (response) {

                var subcategories = response.data.sort(function(a,b){
                    return a.no - b.no;
                });

                var length1 = subcategories.length; 
                for(var i = 0; i < length1; i++)
                {
                    subcategories[i].subcategory_works.sort(function(a,b){
                        return a.no - b.no;
                    });
                    
                    subcategories[i].code = "*";
                    subcategories[i].subcategory_id = subcategories[i].id;
                    subcategories[i].type = 'subcategory';
                    
                    var length2 = subcategories[i].subcategory_works.length;
                    var temp = JSON.parse(JSON.stringify(subcategories[i]));
                    delete temp.subcategory_works;
                    $scope.estimateSheet.push(temp);

                    for(var j = 0; j < length2; j++)
                    {
                        subcategories[i].subcategory_works[j].descriptions.sort(function(a,b){
                            return a.no - b.no;
                        });

                        var work = $scope.works[subcategories[i].subcategory_works[j].work_id-1];
                        // array index starts from 0, work id starts from 1
                        subcategories[i].subcategory_works[j].code = work.code;
                        subcategories[i].subcategory_works[j].name = work.name;
                        subcategories[i].subcategory_works[j].unit = work.unit;
                        subcategories[i].subcategory_works[j].price = work.price;
                        subcategories[i].subcategory_works[j].total_price = subcategories[i].subcategory_works[j].value * work.price;
                        subcategories[i].subcategory_works[j].type = 'work';

                        var temp = JSON.parse(JSON.stringify(subcategories[i].subcategory_works[j]));
                        delete temp.subcategory_works;
                        $scope.estimateSheet.push(temp);
                        
                        if (subcategories[i].subcategory_works[j].descriptions)
                            var length3 = subcategories[i].subcategory_works[j].descriptions.length;
                            for (var k = 0; k < length3; k++)
                            {
                                subcategories[i].subcategory_works[j].descriptions[k].subcategory_id = subcategories[i].id;
                                subcategories[i].subcategory_works[j].descriptions[k].type = "description";
                                $scope.estimateSheet.push(subcategories[i].subcategory_works[j].descriptions[k]);
                            }
                    }
                }

                $scope.showCategoryWorks = true;
                
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

    $scope.checkAddType = function(code){
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
		}
	}

    $scope.save = function(row) {
        var sheet = $scope.estimateSheet;
        if( !row.id && row.name && (!row.name || row.name.length != 0))
        {
            switch($scope.checkAddType(row.code))
            {
                case 'subcategory':

                if(!$scope.isValid('subcategory', $scope.rowPos))
                {
                    alert("Subcategory can not be added here!");
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

                                });
                            }
                        }
                    }
                });
                break;
                case 'description':
                    if(!$scope.isValid('description',$scope.rowPos))
                    {
                        alert("Description can not be added here!");
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
                        alert("Work can not be added here!");
                        $scope.estimateSheet.splice($scope.rowPos, 1);
                        return false;
                    }
                    row.document = ''; 
                    row.unit = '';
                    row.construction_id = $stateParams.construction_id;
                    $http.post(baseURL + "work",{work:row})
                    .then(function(response){
                        var resourceWork = {resource_id: 1, work_id:response.data.id, value:0};
                        $http.post(baseURL + "resourceWork", {resourceWork:resourceWork});
                        row.id = response.data.id;
                        row.code = response.data.code;
                        $scope.addWork(row);
                    });
                break;
            }
        }
        else{
            switch($scope.checkAddType(row.code))
            {
                case 'subcategory':
                    var subcategory = {id: row.id, category_id: row.category_id, name: row.name, no: row.no};
                    $http.post(baseURL + "subcategory/" + row.id, {subcategory:subcategory});
                break;
                case 'description':
                    var description = {id: row.id, subcategoryWork_id: row.subcategoryWork_id, name: row.name, no: row.no, amount: row.amount, length: row.length, width: row.width, height: row.height, value: row.value};
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
            method: work.unit ? 'Edit' : 'Add',
            oldId: work ? work.code : '',
            oldName: work ? work.name : '',
            newWork: null
        };
    };  

    $scope.addWork = function (work) {
        if(!$scope.isValid('work',$scope.rowPos))
        {
            alert("Work can not be added here!");
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
        });
    };

    /*Estimate Table Context Menu*/
    $scope.menuOptions = [
        ['Add Row Above', function ($itemScope) {
            $scope.estimateSheet.splice($itemScope.$index, 0, {});
        }],
        null,
        ['Add Row Below', function ($itemScope) {
            $scope.estimateSheet.splice($itemScope.$index+1, 0, {});
        }],
        null,
        ['Delete Row', function ($itemScope) {
            var index = $itemScope.$index;
            
            if($itemScope.row.type == 'subcategory')
            {
                if(confirm("Các công việc và diễn giải của mục này sẽ bị xóa theo. Bạn có chắc muốn tiếp tục?"))
                {
                    $scope.estimateSheet.splice(index, 1);
                    $http.delete(baseURL + "subcategory/" + $itemScope.row.id).then(function(){
                        while($scope.estimateSheet[index].type !== "subcategory" && $scope.estimateSheet[index].name)
                        {
                            $scope.estimateSheet.splice(index, 1);
                        }
                    });
                }
            }
            else if($itemScope.row.type == 'work')
            {
                if(confirm("Bạn có chắc muốn xóa?"))
                {
                    $scope.estimateSheet.splice(index, 1);
                    $http.delete(baseURL + "subcategoryWork/" + $itemScope.row.id).then(function(){
                        while($scope.estimateSheet[index].type === "description" && $scope.estimateSheet[index].name)
                        {
                            $scope.estimateSheet.splice(index, 1);
                        }
                    });
                }
            }
            else if($itemScope.row.type == 'description')
                if(confirm("Bạn có chắc muốn xóa?"))
                    $scope.estimateSheet.splice(index, 1);
        }]
    ];
}
);