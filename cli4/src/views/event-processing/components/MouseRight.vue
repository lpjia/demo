<script>
function callback(e) {
  e.preventDefault()
  console.log(e)
}

export default {
  name: 'MouseRight', // 鼠标右键菜单
  methods: {
    // 禁止右键菜单
    disableMouseRight(el) {
      el.oncontextmenu = function (e) {
        e.preventDefault();
        // return false // 两个都可以
      };
    },
    // 开启右键
    enableMouseRight(el) {
      el.oncontextmenu = function (e) {
        return true;
      }
    },
    // 某节点
    openMenu() {
      // const dom = document.querySelector('.sec')
      const dom = this.$refs.secRef // 需要加 ref 属性
      this.enableMouseRight(dom)
    },
    closeMenu() {
      // const dom = document.querySelector('.sec')
      const dom = this.$refs.secRef
      this.disableMouseRight(dom)
    },

    // 整个 document
    openMenu_2() {
      const dom = document
      this.enableMouseRight(dom)
    },
    closeMenu_2() {
      const dom = document
      this.disableMouseRight(dom)
    },

    // 使用 addEventListener callback
    openMenu_3() {
      const el = document
      el.removeEventListener('contextmenu', callback)
    },
    closeMenu_3() {
      const el = document
      el.addEventListener('contextmenu', callback)
    },
  },
};
</script>

<template>
  <div>
    <el-divider></el-divider>
    <section>
      <button @click="closeMenu">closeMenu</button>
      <button class="marginLB" @click="openMenu">openMenu</button>
    </section>
    <section>
      <button @click="closeMenu_2">closeMenu document</button>
      <button class="marginLB" @click="openMenu_2">openMenu document</button>
    </section>
    <section>
      <button @click="closeMenu_3">closeMenu addEventListener</button>
      <button class="marginLB" @click="openMenu_3">openMenu removeEventListener</button>
    </section>
    <section class="sec" ref="secRef">sec</section>

    <el-divider></el-divider>
  </div>
</template>

<style scoped lang="scss">
.sec {
  width: 100px;
  height: 100px;
  background-color: deepskyblue;
}
</style>
