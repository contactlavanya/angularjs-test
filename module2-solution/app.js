(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuylist1 = this;

  toBuylist1.items = ShoppingListCheckOffService.getToBuyItems();
  toBuylist1.removeItem = function (itemIndex) {
    try {
     ShoppingListCheckOffService.removeItem(itemIndex);
   } catch(error) {
     toBuylist1.errorMessage = error.message;
   }
};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;
  var errMsg = "Nothing bought yet";

   alreadyBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
   alreadyBoughtList.errorMessage = errMsg;
}

function ShoppingListCheckOffService() {
  var service = this;
   var errMesg = "Nothing Selected";
    // List of shopping items
   var boughtItems = [];

    var toBuyItems = [
      {
        name: "Milkcans",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "2"
      },
      {
        name: "Cookies",
        quantity: "3"
      },
      {
        name: "Chocolates",
        quantity: "10"
      },
      {
        name: "Chips",
        quantity: "5"
      }
    ];

  service.addItem = function (itemIndex) {
    toBuyItems.push(boughtItems[itemIndex]);
    boughtItems.splice(itemIndex, 1);
    console.log("Inside the Add Service", toBuyItems);
  };

  service.removeItem = function (itemIndex) {
    boughtItems.push(toBuyItems[itemIndex]);
    toBuyItems.splice(itemIndex, 1);
    console.log("Inside the remove service", boughtItems);
    if ((toBuyItems.length == 0)) {
      errMesg = "";
      throw new Error("Everything is bought!");
    } else {
    }
  };

  service.getErrMesg = function () {
      console.log("", toBuyItems);
    return errMesg;
  };

  service.getToBuyItems = function () {
      console.log("", toBuyItems);
    return toBuyItems;
  };

service.getBoughtItems = function () {
    console.log("", boughtItems);
    if ((boughtItems.length == 1)) {
      throw new Error("");
    } else {
    }
  return boughtItems;
};
}

})();
