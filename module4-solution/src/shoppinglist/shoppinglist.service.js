(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService)
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");


ShoppingListService.$inject = ["$http", "ApiBasePath"]
function ShoppingListService($http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
      .then(function(response){
        return response.data;
      });
  };

  service.getItemsForCategory = function(categoryShortName) {
    console.log("getItemsForCategory" + categoryShortName);
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    })
      .then(function(response){
        return response.data.menu_items;
      });
  };
  }
})();
