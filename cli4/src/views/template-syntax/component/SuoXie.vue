<template>
  <div>
    <section v-bind="{title:'绑定了一个对象','data-name':'绑定多个属性'}">
      v-bind="{title:'绑定了一个对象','data-name':'绑定多个属性'}"
    </section>
    <section :title="`绑定 title 属性`">
      :title="`绑定 title 属性`"
    </section>
    <section :[dynamicParameter]="`动态参数`">
      :[dynamicParameter]="动态参数"
    </section>

    <button v-on:click="clk">v-on:click="clk"</button>
    <button @click="clk">@click="clk"</button>
    <button @[dynamicMethod]="clk_2">@[dynamicMethod]="clk_2"</button>
    <input v-on="{ blur: blurMehtod, focus: focusMehtod}" />
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
      dynamicMethod: 'dblclick',
    };
  },
  methods: {
    clk() {
      console.log('clk()')
    },
    clk_2() {
      console.log('clk_2()')
    },
    blurMehtod() {
      console.log('blurMehtod()')
    },
    focusMehtod() {
      console.log('focusMehtod()')
    },
  },
};
</script>
