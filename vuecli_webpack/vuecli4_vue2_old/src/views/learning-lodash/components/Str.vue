<script>
import trim from "lodash/trim";
import trimStart from "lodash/trimStart";
import trimEnd from "lodash/trimEnd";
import padStart from "lodash/padStart";
import camelCase from "lodash/camelCase";

export default {
  name: 'Str',
  mounted() {
    this.trim_()
    this.trimStart_()
    this.trimEnd_()
    this.padStart_()
    this.camelCase_()
  },
  methods: {
    // https://www.lodashjs.com/docs/lodash.trim
    trim_() {
      // 修剪
      console.log('---- 分割线 ----\n\n\n')
      console.log("trim('  abc  '):", trim('  abc  '))
      // 原生写法 str.trim(), 无形参, trimStart trimEnd 也是
      console.log("原生 '  abc  '.trim():", '  abc  '.trim())
      // 同时移除 _ 和 - 字符
      console.log("trim('-_-abc-_-', '_-'):", trim('-_-abc-_-', '_-'))
    },

    trimStart_() {
      console.log('---- 分割线 ----\n\n\n')
      console.log("trimStart('  abc  '):", trimStart('  abc  '), trimStart('  abc  ').length)
      console.log("原生 '  abc  '.trimStart():", '  abc  '.trimStart(), '  abc  '.trimStart().length)
      console.log("trimStart('-_-abc-_-', '_-'):", trimStart('-_-abc-_-', '_-'))
    },

    trimEnd_() {
      console.log('---- 分割线 ----\n\n\n')
      console.log("trimEnd('  abc  '):", trimEnd('  abc  '), trimEnd('  abc  ').length)
      console.log("原生 '  abc  '.trimEnd():", '  abc  '.trimEnd(), '  abc  '.trimEnd().length)
      console.log("trimEnd('-_-abc-_-', '_-'):", trimEnd('-_-abc-_-', '_-'))
    },

    padStart_() {
      // 填充 padStart() padEnd()
      console.log('---- 分割线 ----\n\n\n')
      console.log("padStart('abc', 6):", padStart('abc', 6), padStart('abc', 6).length)
      console.log("原生 'abc'.padStart(6):", 'abc'.padStart(6), 'abc'.padStart(6).length)
      console.log("padStart('abc', 10, 'foo'):", padStart('abc', 10, 'foo'))
      console.log("原生 'abc'.padStart(10, 'foo'):", 'abc'.padStart(10, 'foo'))
      // 填充的长度 < 原来字符串长度, 则返回原字符串
      console.log("padStart('abc', 1):", padStart('abc', 1))
      console.log("原生 'abc'.padStart(1):", 'abc'.padStart(1))
      console.log('str.padEnd() 和 padEnd() 与 padStart() 同理, 不再赘述')
    },

    camelCase_() {
      // 转成小驼峰
      console.log('---- 分割线 ----\n\n\n')
      console.log("camelCase('Foo Bar'):", camelCase('Foo Bar'))
      console.log("camelCase('--foo-bar--'):", camelCase('--foo-bar--'))
      console.log("camelCase('__FOO_BAR__'):", camelCase('__FOO_BAR__'))
    },

  },
};
</script>

<template>
  <div>
  </div>
</template>

<style scoped lang="scss">
</style>
