suppliersApp.controller('supplierEditController', ['$scope','$http','$routeParams','$window', function($scope, $http, $routeParams, $window){
		 		
		 $scope.aSupplier = {};
			
          $http({
				url: '/suppliers/findsupplier/', 
				method: "get",
				params: {suppid: $routeParams.sid}
			}).then(function(response){
				
				 $scope.aSupplier = response.data;
				 			
			});
			
		$scope.updateSupplier = function(){
			
			//Validate data 
			try{
				$scope.aSupplier.name = $scope.aSupplier.name.trim();
				$scope.aSupplier.username = $scope.aSupplier.username.trim();	
				$scope.aSupplier.password = $scope.aSupplier.password.trim();
			}catch(e){}
			
		
			if($scope.aSupplier.name===undefined || $scope.aSupplier.username===undefined || $scope.aSupplier.password===undefined ){
				$('.warning').show();
				
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			
			
			//Update supplier
			$http({
				url: '/suppliers/update/', 
				method: "put",
				params: {pname: $scope.aSupplier.name, pphone: $scope.aSupplier.phone,
							pcontact: $scope.aSupplier.contact, pusername: $scope.aSupplier.username, ppassword: $scope.aSupplier.password, pisadmin: $scope.aSupplier.isadmin ,sid: $routeParams.sid}
			}).then(function(response){
			
			});
			
			window.location = "/#!/dashboard/admin";
		
			
		}
		 

	}])