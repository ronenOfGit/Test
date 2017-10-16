suppliersApp.controller('newSupplierController', ['$scope','$http','$window', function($scope, $http, $window){
		
		$scope.aSupplier = {
			name: '',
			contact: '',
			phone: '',
			username: '',
			password: '' 
			
		};
		
		$scope.insertSupplier = function(){

			try{
				$scope.aSupplier.name = $scope.aSupplier.name.trim();
				$scope.aSupplier.username = $scope.aSupplier.username.trim();
				$scope.aSupplier.password = $scope.aSupplier.password.trim();	
			}catch(e){}
									
			//validate input
			if($scope.aSupplier.name==='' || $scope.aSupplier.username==='' || $scope.aSupplier.password==='' || $scope.aSupplier.phone === ''){
				$('.warning').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			if($scope.aSupplier.isadmin===undefined || $scope.aSupplier.isadmin===''){
				$scope.aSupplier.isadmin = false;
			}
			
			console.log('TheSup:', $scope.aSupplier);
			
			$http({
				url: '/suppliers/create/', 
				method: "post",
				params: {pname: $scope.aSupplier.name, pcontact: $scope.aSupplier.contact,
						pphone: $scope.aSupplier.phone, pusername: $scope.aSupplier.username, ppassword: $scope.aSupplier.password, pisadmin: $scope.aSupplier.isadmin}
			}).then(function(res){
				$scope.aSupplier = {};
			});
			
			 window.location = "/#!/suppliers";
			 
		}
		
	}])