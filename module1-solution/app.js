(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchController);

LunchController.$inject = ['$scope', '$filter'];

function LunchController ($scope,
                       $filter,
                       $injector) {
   $scope.foodStatus = "";

   $scope.countItemsLength = function () {
   if ($scope.name) {
   var arraysOfStrings = $scope.name.split(",");
   var len = arraysOfStrings.length;
   if (len > 3)
     $scope.foodStatus = "Too much!";
    else {
        $scope.foodStatus = "Enjoy!";
     }
   }  else {
     $scope.foodStatus = "Please enter date first";
   }
 }

  $scope.sayMessage = function () {
    return  $scope.foodStatus;
  }
}
})();
