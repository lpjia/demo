<template>
  <div class="inlineB">
    <el-card class="box-card">
      <p class="inlineB">{{ obj.title }}</p>
      <div v-if="obj.children">
        <!-- 组件嵌套自身, 不需要引入 -->
        <NestItem :obj="child" v-for="child in obj.children" :key="child.id" />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NestItem',
  props: {
    obj: Object
  },
};
</script>

<style scoped lang="scss">
.box-card {
  min-width: 200px;
  min-height: 100px;
}

::v-deep {
  .el-card__body {
    display: flex;
  }
}

p {
  margin-top: 0;
  margin-right: 10px;
}

.inlineB {
  display: inline-block;
}
</style>
