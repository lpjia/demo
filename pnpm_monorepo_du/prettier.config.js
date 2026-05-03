/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/options
 */
export default {
  printWidth: 120, // 最大换行长度
  tabWidth: 2, // 制表符空格数
  useTabs: false, // 使用制表符, false是用空格
  semi: true, // 行尾用分号
  singleQuote: false, // 使用单引号, false是双引号
  // 在对象字面量中决定是否将属性名用引号括起来, 可选值 "<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  jsxSingleQuote: false, // jsx中使用单引号, false是双引号
  // 多行时尽可能打印尾随逗号, 可选值"<none|es5|all>"
  trailingComma: "none",
  // 在对象,数组括号与文字之间加空格 "{ foo: bar }" (true:有, false:没有)
  bracketSpacing: true,
  // 将 > 多行元素放在最后一行的末尾,而不是单独放在下一行 (true:放末尾, false:单独一行)
  bracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid:省略括号, always:不省略括号)
  arrowParens: "always",
  // 指定要使用的解析器,不需要写文件开头的 @prettier
  requirePragma: false,
  // 可以在文件顶部插入一个特殊标记,指定该文件已使用 Prettier 格式化
  insertPragma: false,
  // 用于控制文本是否应该被换行以及如何进行换行
  proseWrap: "preserve",
  // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值, "strict" - 空格被认为是敏感的 , "ignore" - 空格被认为是不敏感的
  htmlWhitespaceSensitivity: "css",
  // 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
  vueIndentScriptAndStyle: false,
  // 换行符使用 LF 结尾是 可选值 "<auto|lf|crlf|cr>"
  endOfLine: "auto",
  // 控制当对象字面量在一行内过长时，是否强制把属性换行 (preserve 不强制换行, collapse 尽量一行, expand 强制每个属性一行)
  objectWrap: "preserve",
  // 针对 JSX、Vue、HTML 等标记语言的属性格式化 (true 每个属性强制一行, false 多个属性可以放在同一行)
  singleAttributePerLine: false
};
