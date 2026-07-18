(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MyBundle = factory());
})(this, (function () { 'use strict';

  var foo = 'Hello Rollup! foo.js';

  function add(a, b) {
    return a + b;
  }
  console.log('math.js loaded!');

  console.log(foo);

  const result = add(1, 2);
  console.log(`1 + 2 = ${result}`);

  function greet() {
    console.log('Greeting from Rollup! main.js');
  }

  return greet;

}));
