<template>
  <div>
    <section v-bind="{title:'绑定了一个对象'}">
      v-bind="{title:'绑定了一个对象'}"
    </section>
    <section :title="`绑定 title 属性`">
      :title="`绑定 title 属性`"
    </section>
    <section :[dynamicParameter]="`动态参数`">
      :[dynamicParameter]="动态参数"
    </section>

    <button v-on:click="clk">v-on:click="clk"</button>
    <button @click="clk">@click="clk"</button>
    <button @[dynamicMethod]="clk">@[dynamicMethod]="clk"</button>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'SuoXie',
  data() {
    return {
      // 动态参数
      dynamicParameter: 'title',

      // 动态方法
      dynamicMethod: 'dblclick'
    };
  },
  methods: {
    clk() {
      console.log('clk()')
    }
  },
};
</script>
