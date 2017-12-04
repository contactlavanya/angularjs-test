(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['ShoppingListService', 'categories'];
function MainShoppingListController(ShoppingListService, categories) {
  var ctrl = this;

  ctrl.categories = categories;

}
})();
