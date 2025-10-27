<script>
import JsxSlot from './JsxSlot.vue'

export default {
  name: 'ChildTen',
  render(h) {

    // jsx 不识别 v-bind 指令, 导致子组件获取不到 level
    // return <JsxSlot vBind:level="1">Hello world!</JsxSlot>

    /*
    return (
      // <JsxSlot level={1}>
      //   <template slot="default">
      //     <i>Hello world!</i>
      //   </template>
      // </JsxSlot>

      // slot="default" 可以不需要 <template>
      // <JsxSlot level={1}>
      //   <i slot="default">Hello world!</i>
      // </JsxSlot>

      // 默认插槽可以不用写 slot="default"
      <JsxSlot level={1}>
        <i slot="default">Hello world!</i>
      </JsxSlot>
    )
    */


    // 新示例, 不用旧的
    const scopedS = {
      // header: () => <header>header</header>
      // 箭头函数 单行代码可这样写
      // 下面的多行代码可得再 return 一次

      // person 属性对应 this.$scopedSlots.person()
      person: params => {
        return (
          <div style='backgroundColor:orange'>
            {params.name} 今年{params.age}岁
          </div>
        )
      }
    }
    return (
      // scopedSlots 属性一定要写在子组件上
      <JsxSlot level={1} scopedSlots={scopedS} />
    )
    /**
     * // 父组件 作用域插槽
     * <JsxSlot level={1}>
     *  <template v-slot:person="params">
     *    <div style='backgroundColor:orange'>
     *      {{ params.name }} 今年{{ params.age }}岁
     *    </div>
     *  </template>
     * </JsxSlot>
     */
  },
};
</script>
