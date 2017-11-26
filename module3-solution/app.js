(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownAppController', NarrowItDownAppController)
.service('NarrowItDownAppService', NarrowItDownAppService)
.directive('shoppingList', NarrowItDownAppDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function NarrowItDownAppDirective() {
  var ddo = {
    templateUrl:'listItem.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownAppDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function NarrowItDownAppDirectiveController() {
  var list = this;

  list.cookiesInList = function () {
      //console.log("'this' is: ", list.items.length);
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return true;
  };
}


NarrowItDownAppController.$inject = ['NarrowItDownAppService'];
function NarrowItDownAppController(NarrowItDownAppService) {
  var list = this;

  list.itemName = "";
  list.itemQuantity = "";
  this.title = "Search Results";

  list.searchItem = function () {
    NarrowItDownAppService.searchItem(list.searchterm);
    list.items = NarrowItDownAppService.getItems();
    console.log("'this' is: ", list.items.length);
  };

  list.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    NarrowItDownAppService.removeItem(itemIndex);
  };
}

NarrowItDownAppService.$inject = ['$http', 'ApiBasePath'];
function NarrowItDownAppService($http, ApiBasePath) {
  var service = this;

  var items = [];
  var foundItems = [];

  service.searchItem = function (searchterm) {
    items = [];
    if(searchterm) {
    $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function mySuccess(response) {
          // a string, or an object, carrying the response from the server.
          foundItems = response.data.menu_items;
          for (var i = 0; i < foundItems.length; i++) {
              var description = foundItems[i].description;
            if (description.indexOf(searchterm) !== -1) {
              var item  = {
                      name: foundItems[i].name,
                      short_name:foundItems[i].short_name,
                      description: foundItems[i].description
              }
              items.push(item);
            }
            }
        }, function myError(response) {
          console.log('addItem:Error' + response.data);
      });
      }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

})();
