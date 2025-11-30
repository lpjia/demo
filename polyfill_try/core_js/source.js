import 'core-js/modules/es.object.has-own.js'

const foo = Object.create(null);
// const foo = {};
foo.prop = "exists";

// console.log(foo.hasOwnProperty("prop")); // 原型对象上有此方法

console.log(Object.hasOwn(foo, "prop")); // true

/* Object.hasOwn从node@16.9开始支持
这里用14.21.3来try */