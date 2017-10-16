	
var suppliersApp = angular.module('Suppliers', ['ngRoute'])
	
   .config(function($routeProvider) {
    $routeProvider
   .when("/suppliers", {
        templateUrl: 'templates/suppliers/suppliers.html',
		controller: 'suppliersController'
    })
	
	.when("/items", {
        templateUrl: 'templates/items/items.html',
		controller: 'itemsController'
	})
	
	.when("/items/edit/:iid", {
        templateUrl: 'templates/items/edititem.html',
		controller: 'itemsEditController'
    })
	
	.when("/suppliers/edit/:sid", {
        templateUrl: 'templates/suppliers/editsupplier.html',
		controller: 'supplierEditController'
    })
	
	.when("/dashboard/admin", {
        templateUrl: 'templates/dashboard/dashboard.html'
    })
	
	.when("/dashboard/user", {
        templateUrl: 'templates/dashboard/userdash.html',
		
    })
	
	.when("/", {
         templateUrl: 'templates/login/login.html',
		 controller: 'loginController'
    })
	
	
	.when("/suppliers/new", {
        templateUrl: 'templates/suppliers/new.html',
		controller: 'newSupplierController'
    })
	
	.when("/items/new", {
        templateUrl: 'templates/items/new.html',
		controller: 'newItemController'
    })
	
	.when("/denied", {
        templateUrl: 'templates/denied/index.html'
		
    })
	
	.otherwise({ templateUrl: 'templates/404/index.html' })
	
});



