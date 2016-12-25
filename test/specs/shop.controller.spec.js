(function() {
  'use strict';

  var expect = chai.expect;

  describe('shop controller', function() {
    var InventoryController;
    var mockStorageService = {};

    beforeEach(module('shopular'));

    beforeEach(module(function($provide) {
      $provide.value('StorageService', mockStorageService);
    }));

    beforeEach(inject(function($controller) {
      mockStorageService.getAll = function() {
        return [
          {
          name: 'Hammer',
          price: 2,
          quantity: 3,
          color: 'Red',
          discount: 1
        }];
      };
      //spying on the library!!! that is what it is called.
      mockStorageService.add = function(argOne) {
        mockStorageService.add.numTimesCalled++;
        mockStorageService.add.lastArgument = argOne;
      };
      mockStorageService.add.numTimesCalled = 0;

      //New fresh pristine controller each time!
      InventoryController = $controller('InventoryController');

    }));

    it('should have correct scope variables', function() {
      expect(InventoryController.orderBy).to.equal('-name');
      expect(InventoryController.tax).to.equal(1.0575);
      expect(InventoryController.uk).to.equal(false);
      expect(InventoryController.currencyFormat).to.equal('$');
      expect(InventoryController.allData).to.be.an('array');
      //this is a model for the newItem (there is no data in it yet).
      expect(InventoryController.newItem).to.be.an('object');
      //that is why this length is 0 bc they are no properties in there yet.
      expect(Object.keys(InventoryController.newItem).length).to.equal(0);
      expect(InventoryController.allData.length).to.equal(1);
    });

    it('should sort the order of the information', function () {
      InventoryController.changeOrder('name');
      expect(InventoryController.orderBy).to.equal('name');
      InventoryController.changeOrder('quantity');
      expect(InventoryController.orderBy).to.equal('quantity');
    });

    it('should calculate the total price applying tax and discount', function(){
      InventoryController.uk = false;
      var price = InventoryController.getPrice({

        name: 'Hoe',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      expect(price).to.be.a('number');
      expect(price).to.equal((10 - 5) * InventoryController.tax);
    });

    it('should have different calculations when switch to uk properties', function() {
      InventoryController.uk = true;
      var newPrice = InventoryController.getPrice({

        name: 'Hoe',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      expect(newPrice).to.equal(((10 - 5) * InventoryController.tax)*1.5);
    });

    it('should change the name when going from us to uk', function() {
      InventoryController.uk = true;
      var nameChange = InventoryController.changeName({

        name: 'Waste basket',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      expect(nameChange).to.be.a('string');
      expect(nameChange).to.equal('Rubbish bin');
    });

    it('should be represented with GBP when there is a local switch', function (){
      InventoryController.switchLocale();
      var currency = InventoryController.currencyFormat;
      expect(currency).to.equal('GBP');
    });

    it('should be represented with $ if no locale switch', function() {
      var currency = InventoryController.currencyFormat;
      expect(currency).to.equal('$');
    });






    // it('should use the service to add a new item', function() {
    //   InventoryController.add({
    //
    //     name: 'Hoe',
    //     price: 10,
    //     quantity: 10,
    //     color: 'Green',
    //     discount: 5
    //
    //   });
    //   expect(mockStorageService.add.numTimesCalled).to.equal(1);
    //   expect(mockStorageService.add.lastArgument).to.equal(theItem);
    // });


  });
}());
