(function () {
'use strict';

angular.module('ShoppingList')
.component('items', {
  templateUrl: 'src/shoppinglist/templates/item.template.html',
  bindings: {
    list: '<'
  }
});

})();
