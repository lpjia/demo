//#region src/module/foo.js
console.log("Hello Rollup Plugin!");
var foo_default = "Hello Rollup! foo.js";
//#endregion
//#region src/module/math.js
console.log("Hello Rollup Plugin!");
function add(a, b) {
	return a + b;
}
console.log("math.js loaded!");
//#endregion
//#region src/main.js
console.log("Hello Rollup Plugin!");
console.log(foo_default);
const result = add(1, 2);
console.log(`1 + 2 = ${result}`);
function greet() {
	console.log("Greeting from Rollup! main.js");
}
//#endregion
module.exports = greet;
