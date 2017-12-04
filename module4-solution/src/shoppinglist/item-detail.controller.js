
(function() {
  "use strict";

  angular.module("ShoppingList")
    .controller("ItemsListController", ItemsListController);

  ItemsListController.$inject = ["$stateParams", "items"];
  function ItemsListController($stateParams, items) {
    var ctrl = this;

    ctrl.items = items;
  }

})();
