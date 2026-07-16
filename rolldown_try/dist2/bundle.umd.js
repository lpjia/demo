(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define([], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.MyBundle = factory());
})(this, function() {
	//#region src/module/foo.js
	var foo_default = "Hello Rollup! foo.js";
	//#endregion
	//#region src/module/math.js
	function add(a, b) {
		return a + b;
	}
	console.log("math.js loaded!");
	//#endregion
	//#region src/main.js
	console.log(foo_default);
	const result = add(1, 2);
	console.log(`1 + 2 = ${result}`);
	function greet() {
		console.log("Greeting from Rollup! main.js");
	}
	//#endregion
	return greet;
});
