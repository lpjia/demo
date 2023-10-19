/**
 * 导入其他文件中的类型定义
 * @param {import('./jsDoc.js').Gongju} personObject 想用import, 则那个文件必须有export, 否则没有提示
 */
function greetPerson(personObject) {
  console.log(`Hello ${personObject.lastName}`);
}