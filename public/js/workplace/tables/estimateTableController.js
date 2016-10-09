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
                for(var i=0; i<subcategories.length; i++)
                {
                    subcategories[i].subcategory_works.sort(function(a,b){
                        return a.no - b.no;
                    });
                    
                    subcategories[i].code = "*";// add '*' as code of subcategory
                    subcategories[i].subcategory_id = subcategories[i].id;
                    
                    $scope.estimateSheet.push(subcategories[i]);

                    for(var j=0; j<subcategories[i].subcategory_works.length; j++)
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
                        subcategories[i].subcategory_works[j].totalPrice = subcategories[i].subcategory_works[j].value * work.price;

                        $scope.estimateSheet.push(subcategories[i].subcategory_works[j]);
                        
                        if (subcategories[i].subcategory_works[j].descriptions)
                            for (var k=0; k<subcategories[i].subcategory_works[j].descriptions.length; k++)
                            {
                                subcategories[i].subcategory_works[j].descriptions[k].subcategory_id = subcategories[i].id; 
                                $scope.estimateSheet.push(subcategories[i].subcategory_works[j].descriptions[k]);
                            }
                    }
                }
                $scope.showCategoryWorks = true;
                
                var blankRowNum = 50 - $scope.estimateSheet.length;
                if(!blankRowNum)
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
                addType = 'user-work';
            else addType = 'work';
        }
        else if(code === '')
            addType = 'description';

        return addType;
    }

    $scope.isValid = function(addType){
        var sheet = $scope.estimateSheet;
        switch(addType){
            case 'subcategory':
                if( (sheet[$scope.rowPos-1].code && !sheet[$scope.rowPos+1].code && sheet[$scope.rowPos+1].name) || (!sheet[$scope.rowPos-1].code && !sheet[$scope.rowPos+1].code && sheet[$scope.rowPos+1].name) )
                    return false;
                // adding subcategory between 2 descriptions or below work and above description is invalid
            break;
            case 'work':
                if( (sheet[$scope.rowPos-1].code && !sheet[$scope.rowPos+1].code && sheet[$scope.rowPos+1].name) || (!sheet[$scope.rowPos-1].code && !sheet[$scope.rowPos+1].code && sheet[$scope.rowPos+1].name) )
                    return false;
                // adding work between 2 descriptions or below work and above description is invalid
            break;
            case 'description':
                if(sheet[$scope.rowPos-1].code && sheet[$scope.rowPos+1].code)
                    if( (sheet[$scope.rowPos-1].code.charAt(0) === '*' && sheet[$scope.rowPos+1].code.charAt(0) === '*') || (sheet[$scope.rowPos-1].code.charAt(0) === '*' &&sheet[$scope.rowPos+1].code) )
                    return false;
                // adding work between 2 subcategories or below subcategory and above work is invalid
            break;
        }
        return true;
    }

    $scope.save = function(row) {
        var sheet = $scope.estimateSheet;
        if(!row.id)
        // if row doesn't have id, it means it's new blank row( adding)
        {
            switch($scope.checkAddType(row.code))
            {
                case 'subcategory':

                if(!$scope.isValid('subcategory'))
                {
                    alert("Subcategory can not be added here!");
                    $scope.estimateSheet.splice($scope.rowPos, 1);
                    return false;
                }                

                var subcategory = {category_id:$stateParams.category_id, name:sheet[$scope.rowPos].name, no: null};
                for(var i = $scope.rowPos-1; i>=0; i--)
                {
                    if(sheet[i].code && sheet[i].code.charAt(0) == '*')
                    {
                        subcategory.no = sheet[i].no + 1;
                        break;
                    }       
                }
                $http.post(baseURL + "subcategory",{subcategory:subcategory}).then(function(response){
                    
                    row.category_id = response.data.category_id;
                    row.subcategory_id = response.data.id;
                    row.id = response.data.id;
                    row.no = response.data.no;

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
                    if(!$scope.isValid('description'))
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
                    //console.log(description);
                    $http.post(baseURL + "description", {description:description}).then(function(){

                    });
                break;
            }
        }
        else{

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
        if(!$scope.isValid('work'))
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
            if($scope.estimateSheet[i].code && $scope.estimateSheet[i].code.charAt(0) == '*')
            {
                subcategoryWork.no = 0;
                break;// if the row above is subcategory, it means added work is the first work of subcategory( # = 0)
            }
            if($scope.estimateSheet[i].code && $scope.estimateSheet[i].code.charAt(0) != '*')
            {
                subcategoryWork.no = $scope.estimateSheet[i].no + 1;
                break; // find closest work to get #
            }       
        }
        
        $http.post(baseURL + "subcategoryWork", {subcategoryWork:subcategoryWork}).then(function(response){
            work.id = response.data.id;
            work.subcategory_id = response.data.subcategory_id;
            work.no = response.data.no;
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
            $scope.estimateSheet.splice($itemScope.$index, 1);
        }]
    ];
}
);