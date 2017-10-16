suppliersApp.controller('itemsController', function($scope, $http, $window){
		
		$scope.items = [];  

		$http.get('/items/all')
			.then (function (result) {
				
				try{
				if(result.data.name == '_AdminNotAllowed'){
					
					window.location="#!/denied";
				}
				}catch(e){}
				
				$scope.items = Object.keys(result).map(e=>result[e]);

			});
		
	})
