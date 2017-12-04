(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as ctrl',
    resolve: {
      categories: ['ShoppingListService', function (ShoppingListService) {
        return ShoppingListService.getAllCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: "ItemsListController as ctrl",
    params:       { categoryShortName: null },
    resolve: {
      items: [ "$stateParams", "ShoppingListService", function($stateParams, ShoppingListService) {
        return ShoppingListService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();
