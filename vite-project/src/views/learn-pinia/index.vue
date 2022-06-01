<script lang="ts" setup>
import { useUserStore } from '../../store/main';

const userStore = useUserStore()

const double = computed(() => userStore.doubleCountPlusOne)

const store = storeToRefs(userStore)

function updateName() {
  userStore.name = '修改后的值'
}

function updateName_2() {
  userStore.$patch({
    name: '修改后的值_2'
  })
}

function updateName_3() {
  userStore.updateUser('修改后的值_3')
}


</script>

<template>
  <div title="直接获取 state">{{ userStore.name }}</div>
  <div title="直接用 store.getters 属性">{{ userStore.nameLength }}</div>
  <div title="computed 获取">{{ double }}</div>
  <div title="结构获取">{{ store }}</div>
  <hr>
  <el-button type="primary" @click="updateName">直接修改 state</el-button>
  <el-button type="warning" @click="updateName_2">$patch修改后名字</el-button>
  <el-button type="danger" @click="updateName_3">actions修改后名字</el-button>

  <hr>
</template>

<style lang="scss" scoped>
</style>
