suppliersApp.controller('itemsEditController', ['$scope','$http','$routeParams','$window','dataFactory', function($scope, $http, $routeParams, $window, dataFactory){
		 		
		$scope.aItem = {};

		dataFactory.getItem($routeParams.iid).then(function(item){
			$scope.aItem = item.data;
			console.log('TheItem:' ,$scope.aItem)			
		});


		$scope.updateItem = function(){
			
			//Validate data 
			try{
				$scope.aItem.name = $scope.aItem.name.trim();
				$scope.aItem.cost_price = $scope.aItem.cost_price.trim();
				$scope.aItem.recommended = $scope.aItem.recommended.trim();	
			}catch(e){}
			
			if($scope.aItem.name===undefined || $scope.aItem.cost_price===undefined || $scope.aItem.recommended===undefined ){
				$('.warning').show();
				
				setTimeout(function() { $('.warning').fadeOut(); }, 1000);
				return;
			}
			
			var priceValid = $scope.aItem.cost_price;
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
			
			//Update item
			dataFactory.updateItem($scope.aItem.name, $scope.aItem.cost_price, $scope.aItem.recommended, $routeParams.iid)
				.then(function(item){});

			  window.location="/#!/dashboard/user";
		
			
		}
		 

	}])