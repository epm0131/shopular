// (function() {
//   'use strict';
//
//   expect = chai.expect;
//
//   describe('shop controller', function() {
//     var InventoryController;
//     var mockStorageService = {};
//
//     beforeEach(module('shopular'));
//
//     beforeEach(module(function($provide) {
//       $provide.value('StorageService', mockStorageService);
//     }));
//
//     beforeEach(inject(function($controller) {
//       mockStorageService.getAll = function() {
//         return [{
//           name: 'Hammer',
//           price: 2,
//           quantity: 3,
//           color: 'Red',
//           discount: 1
//         }];
//       };
//     }));
//
//     it('should have correct scope variables', function() {
//       expect(InventoryController.newItem).to.be.an('object');
//     });
//   });
// }());
