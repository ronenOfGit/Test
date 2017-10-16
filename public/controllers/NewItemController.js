suppliersApp.controller('newItemController', ['$scope','$http','$window', function($scope, $http, $window){
		
		var priceValid;
		
		$scope.aItem = {
			name: '',
			cost_price: '',
			recommended: '',
			
		};
		
		$scope.items = [];
		
		$scope.insertItem = function(){

			try{
				$scope.aItem.name = $scope.aItem.name.trim();
				$scope.aItem.cost_price = $scope.aItem.cost_price.trim();
				$scope.aItem.recommended = $scope.aItem.recommended.trim();	
			}catch(e){}
									
			//validate input
			if($scope.aItem.name==='' || $scope.aItem.cost_price==='' || $scope.aItem.recommended==='' ){
				$('.warning').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			
			priceValid = $scope.aItem.cost_price;
			if(isNaN(priceValid)){
				$('.warning2').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			priceValid = $scope.aItem.recommended;
			if(isNaN(priceValid)){
				$('.warning2').show();
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
						
			//console.log('TeItem:', $scope.aItem);
			
			$http({
				url: '/items/create/', 
				method: "post",
				params: {pname: $scope.aItem.name, pcost: $scope.aItem.cost_price,
						precommended: $scope.aItem.recommended}
			}).then(function(res){
				$scope.aItem = {};
			});
			
			window.location = "/#!/dashboard/user";
			 
		}
		
	}])