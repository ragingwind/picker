'use strict';
var assert = require('assert');
var picker = require('./');

var json = {
  name: 'booking system',
  customers: [{
    name: 'John',
    age: 19
  }, {
    name: 'Jane',
    age: 39
  }],
  accommodations: [
    [{
      city: 'sf',
      name: 'park'
    }, {
      city: 'sf',
      name: 'hilton'
    }], [{
      city: 'la',
      name: 'richmond'
    }, {
      city: 'la',
      name: 'rich carlton'
    }]
  ],
  programs: {
    outdoor: {
      price: '1000',
      companies: [
        'nike',
        'adidas'
      ]
    },
    swimming: {
      price: '1300',
      companies: [
        'vitoria',
        'kolon'
      ]
    }
  }
}

it('should returns value', function () {
  assert.equal(picker(json, 'customers.[0]').value, json.customers[0]);
  assert.equal(picker(json, 'customers.[0].name').value, json.customers[0].name);
  assert.equal(picker(json, 'accommodations.[0].[0].city').value, 'sf');
  assert.equal(picker(json, 'accommodations.[0].[1].name').value, 'hilton');
  assert.equal(picker(json, 'programs.outdoor.price').value, json.programs.outdoor.price);
  assert.equal(picker(json, 'programs.outdoor.companies.[0]').value, json.programs.outdoor.companies[0]);
});

it('should returns null, missing path', function () {
  assert.equal(picker(json, 'customers.[3]'), null);
  assert.equal(picker(json, 'customers.[1].total'), null);
  assert.equal(picker(json, 'customers.name'), null);
  assert.equal(picker(json, 'accommodations.[0].[3].name'), null);
  assert.equal(picker(json, 'programs.outdoor.companies.[3]'), null);
});
