suppliersApp.factory('dataFactory', function($http) {
    return{
       getItem : function(iid) {
           return $http({
            url: '/items/finditem/', 
            method: "get",
            params: {itemid: iid}
           })
       },

       updateItem: function(name, cost, recommended, id){
            return $http({
				url: '/items/update/', 
				method: "put",
				params: {pname: name, pcost:cost, precommended: recommended, pid: id}
            })
        },

        checkSession: function(){
            return $http({
				url: '/checksession', 
				method: "get"
            })
        }
    }
});


