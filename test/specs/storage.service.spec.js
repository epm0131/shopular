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
      window.localStorage.clear();
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
        discount: 1});
        expect(result).to.be.undefined;
        console.log('what are you?', result);
    });

    it('should be able to get all the items', function (){
        var allItems = StorageService.getAll();
        expect(allItems).to.be.an('array');
        expect(allItems.length).to.equal(12);
        expect(allItems[0]).to.include.keys('name', 'price', 'quantity', 'color', 'discount');
        // expect(allItems[1].name).to.equal('Golf club'); this code is easy to break
        // use the one above becuase it is more generic.
    });

    it('should fail if all the required items are not provided', function(){
      StorageService.saveNewItem('Screws');
      var items = StorageService.getAll();
      expect(items.length).to.equal(12);
    });

  });

}());
