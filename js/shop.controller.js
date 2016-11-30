(function() {
  'use strict';

  angular.module('shopular')
    .controller('InventoryController', InventoryController);

    function InventoryController() {

      this.newItem = {};
      this.tax = 1.0575;
      this.orderBy = "-name";

      this.items = [
        { "id": 2957, "name": "Widget", "price": 32, "quantity": 203, "color": "Red", "discount": 31 },
        { "id": 89274, "name": "Golf club", "price": 98, "quantity": 10, "color": "Black", "discount": 0 },
        { "id": 64, "name": "iPhone", "price": 499, "quantity": 2, "color": "White", "discount": 0 },
        { "id": 87363, "name": "Bonzai tree", "price": 76, "quantity": 2, "color": "Green", "discount": 0 },
        { "id": 1736, "name": "Towel", "price": 55, "quantity": 30, "color": "Brown", "discount": 10 },
        { "id": 4836, "name": "Dog bed", "price": 99, "quantity": 10, "color": "Beige", "discount": 50 },
        { "id": 829, "name": "Waste basket", "price": 15, "quantity": 40, "color": "Silver", "discount": 0 },
        { "id": 46, "name": "Guitar", "price": 899, "quantity": 0, "color": "Blue", "discount": 150 },
        { "id": 17456, "name": "Matcha tea", "price": 42, "quantity": 4, "color": "Green", "discount": 11 },
        { "id": 3292, "name": "Enlightenment", "price": 99999, "quantity": 1, "color": "Red", "discount": 0 },
        { "id": 533, "name": "Eggs", "price": 5, "quantity": 12, "color": "Brown", "discount": 1 },
        { "id": 683, "name": "Pillow", "price": 27, "quantity": 10, "color": "Black", "discount": 12 }
      ];

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
       this.items.push( {
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
