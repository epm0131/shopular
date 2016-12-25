(function() {
  'use strict';

  expect = chai.expect;

  describe('storage service', function() {

    //so we can use this in our function
    var StorageService;
    //before each makes the module itempotent  - a new clean module.
    beforeEach(module('shopular'));

    //this helps clear anything in local storage!!!
    beforeEach(function clearlocalStorage() {
      localStorage.setItem('items', '[]');
    });

    //before each test we inject storageService - they are singleton, in our test
    //module we are creating a new service each time we run a function.
    beforeEach(inject(function(_StorageService_) {
      StorageService = _StorageService_;
    }));

    it('should be able to add a new item', function() {
      var result = StorageService.saveNewItem(
        {name: 'Hammer',
        price: 2,
        quantity: 3,
        color: 'Red',
        discount: 1
        });
        expect(result).to.be.undefined;
        var allItems = StorageService.getAll();
        expect(allItems).to.be.an('array');
        expect(allItems.length).to.equal(1);
        expect(allItems[0]).to.include.keys('name', 'price', 'quantity', 'color', 'discount');
        // expect(allItems[1].name).to.equal('Golf club'); this code is easy to break
        // use the one above becuase it is more generic.
        var storedItems = angular.fromJson(localStorage.getItem('items'));
        var newItem =
        {name: 'Nails',
        price: 10,
        quantity: 100,
        color: 'Magenta',
        discount: 1
        };
        StorageService.saveNewItem(newItem);
        var newStoredItem = JSON.parse(localStorage.getItem('items'));
        expect(newStoredItem.length).to.equal(2);
        expect(newStoredItem).to.be.an('array');
        expect(newStoredItem[0]).to.include.keys('name', 'price', 'quantity', 'color', 'discount');
    });

    it('should return undefined if all the required properties are not provided', function(){
      var failedItem = StorageService.saveNewItem();
      expect(failedItem).to.be.undefined;
    });

  });

}());
