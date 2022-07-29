<template>
  <div>
    <p v-bind="{title:'绑定了一个对象','data-name':'绑定多个属性'}">
      v-bind="{title:'绑定了一个对象','data-name':'绑定多个属性'}"
    </p>
    <p :title="`绑定 title 属性`">
      :title="`绑定 title 属性`"
    </p>
    <p :[dynamicParameter]="`动态参数`">
      :[dynamicParameter]="动态参数"
    </p>

    <button v-on:click="clk">v-on:click="clk"</button>
    <button class="marginLB" @click="clk">@click="clk"</button>
    <button class="marginLB" @[dynamicMethod]="clk_2">@[dynamicMethod]="clk_2"</button>
    <input class="marginLB" v-on="{ input: inputMethod, blur: blurMehtod, focus: focusMehtod}" placeholder="监听多个方法" />
    <p>----分割线----</p>
    <el-divider></el-divider>

  </div>
</template>

<script>
export default {
  name: 'SuoXie', // 缩写
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
    inputMethod() {
      console.log('inputMethod()')
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
