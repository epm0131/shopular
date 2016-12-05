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

      mockStorageService.add = function(argOne) {
        mockStorageService.add.numTimesCalled++;
        mockStorageService.add.lastArgument = argOne;
      };
      mockStorageService.add.numTimesCalled = 0;
      InventoryController = $controller('InventoryController');

    }));

    it('should have correct scope variables', function() {
      expect(InventoryController.orderBy).to.be.a('string');
      expect(InventoryController.tax).to.be.a('number');
      expect(InventoryController.uk).to.be.a('boolean');
      expect(InventoryController.currencyFormat).to.be.a('string');
      expect(InventoryController.allData).to.be.an('array');
      expect(InventoryController.newItem).to.be.an('object');
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
      var item = InventoryController.getPrice({

        name: 'Hoe',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      console.log('how much are you....in US', item);
      expect(item).to.be.a('number');
      expect(item).to.equal((10 - 5) * InventoryController.tax);
    });

    it('should have different calculations when switch to uk properties', function() {
      InventoryController.switchLocale();
      var newPrice = InventoryController.getPrice({

        name: 'Hoe',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      console.log('how much are you....in UK', newPrice);
      expect(newPrice).to.equal(((10 - 5) * InventoryController.tax)*1.5);
    });

    it('should change the name when going from us to uk', function() {
      InventoryController.switchLocale();
      var nameChange = InventoryController.changeName({

        name: 'Waste bin',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      console.log('what am i', nameChange.name);
      expect(nameChange).to.be.a('string');
    });

    it('should be represented with GBP when there is a local switch', function (){
      InventoryController.switchLocale();
      var currency = InventoryController.currencyFormat;
      console.log('i should be GBP', currency);
      expect(currency).to.equal('GBP');
    });

    it('should be represented with $ if no locale switch', function() {
      var currency = InventoryController.currencyFormat;
      console.log('i should be $', currency);
      expect(currency).to.equal('$');
    });




    // it('should use the service to add a new item', function() {
    //   InventoryController.newItem.foo = 'bar';
    //   var theItem = {};
    //   InventoryController.add(theItem);
    //   expect(InventoryController.newItem.foo).to.be.undefined;
    //   expect(mockStorageService.add.numTimesCalled).to.equal(1);
    //   expect(mockStorageService.add.lastArgument).to.equal(theItem);
    // });


  });
}());
