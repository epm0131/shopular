(function() {
  'use strict';

  expect = chai.expect;

  describe('storage service', function() {
    it('should know that one is one', function() {
      expect(1).to.equal(1);
    });
    var StorageService;

    beforeEach(module('shopular'));

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
    });

    it('should be able to get all the items', function (){
        var allItems = StorageService.getAll();
        expect(allItems).to.be.an('array');
        expect(allItems.length).to.equal(13);
        expect(allItems[1].name).to.equal('Golf club');
    });

    it('should fail if all the required items are not provided', function(){
      StorageService.saveNewItem('Screws');
      var items = StorageService.getAll();
      expect(items.length).to.equal(13);
    });

    // it('should fail if I do not provide an item object with all properties to add',
    // function(){
    //   try{
    //     var result = StorageService.saveNewItem({
    //       name: 'Mallet',
    //     });
    //   } catch(err) {
    //       expect(err).to.equal('object');
    //   }
    //
    // });
  });

}());
