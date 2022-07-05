<template>
  <div>
    <div>Message: {{ msg }}
      <button @click="change">change</button>
    </div>
    <div v-once>这个将不会改变: {{ msg }}</div>
    <p>----分割线----</p>

    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <!-- 会覆盖标签内的文本内容 -->
    <p v-html="rawHtml">Using v-html directive: </p>
    <p>----分割线----</p>

    <p v-bind:id="dynamicId">动态标识</p>
    <p :id="dynamicId_2">动态标识_2</p>
    <button :disabled="isButtonDisabled">Button</button>
    <button class="marginLB" :disabled="!isButtonDisabled">Button_2</button>
    <p>----分割线----</p>

    <div>
      <!-- 可使用简单 js 表达式, 单个表达式 -->
      {{ number + 1 }}
      {{ ok ? 'YES' : 'NO' }}
      {{ msg.split('').reverse().join('') }}
      {{ Math.random() }}
    </div>
    <p :id="'list-' + id">list-id</p>
    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  name: 'Chazhi',
  data() {
    return {
      msg: '这是一个基础变量',

      rawHtml: '<span style="color: red">This should be red.</span>',

      dynamicId: 'dongtai',
      dynamicId_2: 'dongtai_2',

      isButtonDisabled: false,

      number: 110,
      ok: true,
      id: 120,
    }
  },
  methods: {
    change() {
      this.msg = '已经改变'
    }
  }
}
</script>
