(function() {
  'use strict';

  angular.module('shopular')
    .controller('InventoryController', InventoryController);

    InventoryController.$inject = [ 'StorageService' ];


    function InventoryController(storageService) {

      this.allData = storageService.getAll();
      this.newItem = {};
      this.tax = 1.0575;
      this.orderBy = "-name";
      this.uk = false;
      this.currencyFormat = '$';


      /**
       * Sort our data by whatever property you give it
       * @param  {string} sort
       * @return {[type]}     [description]
       */

      this.changeOrder = function changeOrder(sort) {
        this.orderBy = sort;
      };

      /**
       * This is the switches the current currency to GBP and back to US
       */

      this.switchLocale = function switchLocale() {
      this.uk = !this.uk;
        if(this.uk) {
          this.currencyFormat = 'GBP';
        } else {
          this.currencyFormat = '$';
        }
      };

      /**
       * This will get you the current currency
       * @param  {object} inventory [description]
       * @return {object}           [description]
       */
      this.getPrice = function getPrice(inventory) {
      var result = ((inventory.price - inventory.discount) * this.tax);
        if (this.uk === true) {
         result *= 1.5;
        }
        return result;
      };

      /**
       * adds new item to array
       * @param {object} item new item with properties
       */
     this.addNewItem = function addNewItem(item) {
       storageService.saveNewItem(item);
       this.newItem = {};
     };

     /**
      * This allows the name change of the property
      * @param  {object} itemProperty [description]
      */
     this.changeName = function changeName(itemProperty) {
       var result = itemProperty.name;
       if(this.uk === true) {
         if (itemProperty.name === 'Waste basket')
        result = 'Rubbish bin';
       }
       return result;
     };
    }

}());
