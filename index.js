'use strict';


function toKey(key) {
  return /\[[0-9]\]/.test(key) ? parseInt(/\[([0-9])\]/.exec(key)[1]) : key;
}

function pickKey(exp) {
  exp = exp.split('.');
  return toKey(exp.pop());
}

function pickProp(obj, exp) {
  var prop = {
    name: pickKey(exp),
    value: null
  };

  function travelProps(obj, exp) {
    var next = obj[toKey(exp[0])];

    if (typeof obj !== 'object' || !obj || exp.length === 0) {
      return prop;
    } else if (!next) { // lost the next
      return null;
    }

    prop.value = next;
    return travelProps(next, exp.slice(1));
  }
  return travelProps(obj, exp.split('.'));
}

module.exports = pickProp;
