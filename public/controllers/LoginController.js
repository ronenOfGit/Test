suppliersApp.controller('loginController', function($scope, $http, $window, $rootScope){

		$scope.loginSupplier = {
			name: '',
			contact: '',
			phone: '',
			username: '',
			password: '' 
		};

		$scope.validateUser = function(){
			
			try{
				$scope.loginSupplier.username = $scope.loginSupplier.username.trim();
				$scope.loginSupplier.password = $scope.loginSupplier.password.trim();				
			}catch(e){}
				
			if($scope.loginSupplier.username===''){
				$('.warning').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			if($scope.loginSupplier.password==''){
				$('.warning').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			
					
			$http({
				url: '/suppliers/login/', 
				method: "get",
				params: {user:$scope.loginSupplier.username, pass:$scope.loginSupplier.password}
			}).then(function(response){
				
				var supplierLoged = {};				
				supplierLoged = response.data;
			
				if(supplierLoged[0].name === "_NOsupplierFound"){
					$('.alert').show();
					setTimeout(function() { $('.alert').fadeOut(); }, 1000);
					
				}else{
					//Redirect to admin/user dashboard
					var navUrl = '';
					if(response.data[0].isadmin=='true'){
						navUrl = "/#!/dashboard/admin";	
					}else{
						navUrl = "/#!/dashboard/user";
					}
					window.location = navUrl;
					
				}
				
			});

		}
		
		//catch key enter
		$scope.keyDown = function(value){
		if(value.keyCode == 13) {
			$scope.validateUser();
		}
		};
			
	})	