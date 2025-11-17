<template>
  <div style="padding: 10px;">
    <h3 class="title">商品价格</h3>
    <nav>
      <!-- 使用栅格系统 -->
      <el-row :gutter="10">
        <el-col :xs="12" :sm="zhuYe.lg" :md="zhuYe.lg" :lg="zhuYe.lg">
          <RouterLink :to="{ name: 'zhu_ye' }" active-class="active">录入</RouterLink>
        </el-col>
        <el-col :xs="12" :sm="chaXun.lg" :md="chaXun.lg" :lg="chaXun.lg">
          <RouterLink :to="{ name: 'cha_xun' }" active-class="active">查询</RouterLink>
        </el-col>
      </el-row>
    </nav>
    <main :style="route.name === 'cha_xun' ? stl : {}">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <Component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const stl = {
  padding: '0px',
  border: 'none',
  borderRadius: 'initial'
}



const zhuYe = ref({
  lg: { span: 2, offset: 6 },
})
const chaXun = ref({
  lg: { span: 2, offset: 8 }
})


</script>

<style scoped lang="scss">
.title {
  text-align: center;
  word-spacing: 5px;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}

nav {
  padding: 0 20px;
  margin: 2rem 0;

  a {
    display: block;
    text-align: center;
    min-width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;

    &.active {
      background-color: #64967e;
      color: #ffc268;
      font-weight: 900;
      text-shadow: 0 0 1px black;
      font-family: 微软雅黑;
    }
  }
}

main {
  margin: 0 auto;
  border-radius: 10px;
  width: 90%;
  border: 1px solid;
  padding: 20px 0;
}

@media screen and (max-width: 768px) {
  nav {
    margin: 0.5rem 0;
  }

  main {
    border: none;
    width: 100%;
  }
}
</style>
