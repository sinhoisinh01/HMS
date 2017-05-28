angular.module('HMS')
    .factory('mySweetAlert', [function () {
        return {
            getType: function (type, text) {
            	var properties;
            	if(type === "warning")
	            {
	            	properties = {
		                title: "Bạn có chắc muốn xóa?",
		                text: text,
		                type: type,
		                showCancelButton: true,
		                confirmButtonColor: "#DD6B55",
		                confirmButtonText: "Xóa",
		                cancelButtonText:"Đóng",
		                closeOnConfirm: false
		            }
	            }
	            return properties;
            },
			
        };
    }]);