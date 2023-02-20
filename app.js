(function () {
    'use strict';

    angular.module('ShoppingList', []).
        controller('ShoppingListBuyController', ShoppingListBuyController).
        controller('ShoppingListShowController', ShoppingListShowController).
        provider('ShoppingListService', ShoppingListServiceProvider);

    ShoppingListBuyController.$inject = ['ShoppingListService'];
    function ShoppingListBuyController(ShoppingListService) {
        const buyController = this;

        buyController.items = ShoppingListService.getShoppingList();
        buyController.buyItem = function (index){
            ShoppingListService.buyItem(index);
        }

        buyController.isEverythingBought = function (){
            return buyController.items.length === 0;
        }

        buyController.sout = function (){
            console.log(buyController.items)
        }
    }

    ShoppingListShowController.$inject = ['ShoppingListService'];
    function ShoppingListShowController(ShoppingListService){
        const showController = this;

        showController.items = ShoppingListService.getBoughtItems();
        showController.addToShoppingList = function (name, amount){
            ShoppingListService.addToShoppingList(name, amount);
        }

        showController.isAnythingBought = function (){
            return showController.items.length > 0;
        }

        showController.sout = function (){
            console.log(showController.items)
        }
    }

    function ShoppingListService(shoppingList){
        const service = this;
        const boughtItems = [];
        if (shoppingList === undefined){
            shoppingList = []
        }

        service.addToShoppingList = function(name, amount){
            shoppingList.add(new BuyItem(name, amount));
        }

        service.buyItem = function (index){
            var buyItem = shoppingList.pop(index);
            boughtItems.push(buyItem);
        }

        service.getBoughtItems = function (){
            return boughtItems;
        }

        service.getShoppingList = function (){
            return shoppingList;
        }
    }

    function ShoppingListServiceProvider(){
        var provider = this;

        provider.defaults = {
            shoppingList: [
                new BuyItem("Cookies", 10),
                new BuyItem("Soda", 10),
                new BuyItem("Crackers", 10),
                new BuyItem("Chips", 10),
                new BuyItem("Dip", 10),

            ]
        }

        provider.$get = function (){
            return new ShoppingListService(provider.defaults.shoppingList);
        }
    }

    class BuyItem{
        name;
        amount;
        constructor(name, amount) {
            this.name = name;
            this.amount = amount;
        }
    }
})();
