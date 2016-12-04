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
    });

    it('should calculate the total price applying tax and discount', function(){
      var item = InventoryController.getPrice({

        name: 'Hoe',
        price: 10,
        quantity: 10,
        color: 'Green',
        discount: 5

      });
      expect(item).to.be.a('number');
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
