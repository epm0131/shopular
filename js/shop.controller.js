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
       * @param  {string} foo
       * @return {[type]}     [description]
       */

      this.changeOrder = function changeOrder(foo) {
        this.orderBy = foo;
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
      * This gives the ability to add new items to the table.
      * @param {object} item [description]
      */
     this.addNewItem = function addNewItem(item) {
       this.allData.push( {
         name: item.name,
         price: Number(item.price),
         quantity: Number(item.quantity),
         color: item.color,
         discount: Number(item.discount)
       });
     };

     /**
      * This allows the name change of the property
      * @param  {object} itemProperty [description]
      */
     this.changeName = function changeName(itemProperty) {
       if(this.uk === true) {
         if(itemProperty.name === 'Waste basket') {
           itemProperty.name = 'Rubbish bin';
         }
       }
       return itemProperty.name;
     };
    }

}());
