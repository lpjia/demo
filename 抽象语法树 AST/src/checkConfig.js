import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
/* @babel/parser 是 Babel 生态的核心解析器，用于将 JavaScript/TypeScript/JSX 等代码解析为抽象语法树（AST），是 Babel 转译、代码分析 / 转换的基础 */
import * as parser from "@babel/parser"; // 解析
/* @babel/traverse 是 Babel 生态中用于遍历抽象语法树（AST） 的核心工具，它允许你在遍历 AST 节点时对节点进行查询、修改、删除、替换等操作 */
import _traverse from "@babel/traverse"; // 遍历
import _generate from "@babel/generator"; // 生成代码
import { log } from './log.js'; // esm得补全文件扩展名

const traverse = _traverse.default || _traverse; // 处理兼容性
const generate = _generate.default || _generate; // 处理兼容性

// 读取config.js文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'config.js')
const code = fs.readFileSync(filePath, 'utf-8')

// 解析为AST
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['objectRestSpread']
})

// 存检查结果
const result = {
  testHost: {
    hasAllTest: true,
    values: []
  },
  prodHost: {
    hasNoneTest: true,
    values: []
  },
}

// 遍历AST
traverse(ast, {
  // // VariableDeclaration 节点代表整个声明语句
  // VariableDeclaration(...args) {
  //   console.log('args:', args)
  // },


  // VariableDeclarator 节点代表具体的 a = 1、b = 2、c = 3 这些声明
  VariableDeclarator(path) {
    // path.node 当前节点的AST信息
    // path.parent 父节点
    // path.parentPath 父节点的path对象
    const { id, init } = path.node

    // 检查是否为 testHost 或 prodHost
    if (id.type === 'Identifier' && (id.name === 'testHost' || id.name === 'prodHost')) {
      // 检查是否为一个对象表达式
      if (init && init.type === 'ObjectExpression') {

        init.properties.forEach((prop) => {
          if (prop.type === 'ObjectProperty' && prop.value.type === 'StringLiteral') {
            const key = prop.key.name || prop.key.value
            const val = prop.value.value
            const containTest = val.includes('test')

            if (id.name === 'testHost') {
              result.testHost.values.push({
                key,
                value: val,
                containTest
              })
              if (!containTest) {
                result.testHost.hasAllTest = false
              }
            }
            else if (id.name === 'prodHost') {
              result.prodHost.values.push({
                key,
                value: val,
                containTest
              })
              if (containTest) {
                result.prodHost.hasNoneTest = false
              }
            }
          }
        })
      }
    }
  }
});

// console.log(result)
log(result)


// // 将AST生成 代码
// const output = generate(ast);
// console.log(output.code);

// // 将代码写入文件
// const newFilePath = path.resolve(__dirname, '../output', 'config.txt')
// const outputDir = path.dirname(newFilePath);
// // 判断目录是不是存在
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }
// fs.writeFileSync(newFilePath, output.code, 'utf-8') // 目录不存在的话, 写入会报错
// console.log('文件已成功写入');