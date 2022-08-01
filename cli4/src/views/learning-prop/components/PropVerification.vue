<script>
export default {
  name: 'PropVerification', // prop 验证
  // 注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的 property (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  },
  data() {
    return {
      num: this.propD
    };
  },
  watch: {
    num(val, oldVal) {
      console.log('val:', val)
      console.log('oldVal:', oldVal)
    },
  },
};
</script>

<template>
  <div>
    <span class="inlineB">{{ propA }}</span>
    <span class="inlineB marginLB">{{ propB }}</span>
    <span class="inlineB marginLB">{{ propC }}</span>
    <span class="inlineB marginLB">{{ propD }}</span>
    <span class="inlineB marginLB">{{ propE }}</span>
    <span class="inlineB marginLB">{{ propF }}</span>
    <span class="inlineB marginLB">{{ num }}</span>
    <button class="inlineB marginLB" @click="num++">watch 监听变化</button>
  </div>
</template>
