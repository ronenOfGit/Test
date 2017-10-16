suppliersApp.controller('dashController', ['$scope', '$http', 'dataFactory', function($scope, $http, dataFactory){

	$scope.init = function () {

			dataFactory.checkSession().then(function(res){
				 
				try{
					if(res.data["name"]=="_NoSession"){
						
						window.location="#!/denied";
					}
				}catch(e){
					window.location="#!/denied";
				}
			 
			});

	};
		
	}])