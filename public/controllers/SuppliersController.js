suppliersApp.controller('suppliersController', function($scope, $http, $window){
		
		$scope.suppliers = [];  

		
		$http.get('/suppliers/all')
			.then (function (result) {
				
				try{
				if(result.data.name == '_UserNotAllowed'){
					
					window.location="#!/denied";	
				}
				}catch(e){}
				
				$scope.suppliers = Object.keys(result).map(e=>result[e]);
				 
			});
		
	})