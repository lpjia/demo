"use strict";

require("core-js/modules/es.object.has-own.js");
var _obj$foo;
const obj = {};
obj === null || obj === void 0 || (_obj$foo = obj.foo) === null || _obj$foo === void 0 || (_obj$foo = _obj$foo.bar) === null || _obj$foo === void 0 || _obj$foo.baz;
const foo = Object.create(null);
foo.prop = "exists";
console.log(Object.hasOwn(foo, "prop"));
