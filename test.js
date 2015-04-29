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
  },
  'date': '2015-10-30'
}

it('should returns value', function () {
  picker(json, 'customers.[0]', function(value, key, container) {
    assert.equal(value, json.customers[0]);
    assert.equal(container, json.customers);
    assert.equal(container[key], json.customers[0]);
  });

  assert.equal(picker(json, 'customers.[0]').value, json.customers[0]);
  assert.equal(picker(json, 'customers.[0]').key, 0);
  assert.equal(picker(json, 'customers.[0]').container[0], json.customers[0]);


  assert.equal(picker(json, 'customers.[0].name').value, json.customers[0].name);
  assert.equal(picker(json, 'accommodations.[0].[0].city').value, 'sf');
  assert.equal(picker(json, 'accommodations.[0].[1].name').value, 'hilton');
  assert.equal(picker(json, 'programs.outdoor.price').value, json.programs.outdoor.price);
  assert.equal(picker(json, 'programs.outdoor.companies.[0]').value, json.programs.outdoor.companies[0]);
  assert.equal(picker(json, 'date').value, json['date']);
});

it('should returns null, missing path', function () {
  assert.equal(picker(json, 'customers.[3]'), null);
  assert.equal(picker(json, 'customers.[1].total'), null);
  assert.equal(picker(json, 'customers.name'), null);
  assert.equal(picker(json, 'accommodations.[0].[3].name'), null);
  assert.equal(picker(json, 'programs.outdoor.companies.[3]'), null);
});

it('should be removed', function () {
  var date = picker(json, 'date');
  assert(date);
  delete date.container[date.key];
  assert.equal(json.date, undefined);
});
