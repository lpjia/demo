const obj = {}

obj?.foo?.bar?.baz;



const foo = Object.create(null);
foo.prop = "exists";
console.log(Object.hasOwn(foo, "prop"));