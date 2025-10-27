"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
exports.name = 'child';
function fn() {
    console.log('执行fn');
    return 'fn';
}
exports.default = fn;
// module.exports = {
//   name: 'child',
//   fn() {
//     console.log('执行fn')
//     return 'fn'
//   }
// }
// export = {
//   name: 'child',
//   fn() {
//     console.log('执行fn')
//     return 'fn'
//   }
// }
