<template>
  <main class="page-shell">
    <header class="page-head">
      <el-button type="primary" @click="add">新增商品</el-button>
      <el-button type="primary" @click="edit">修改商品</el-button>
    </header>

    <el-tabs v-model="activeTab" class="page-tabs">
      <el-tab-pane label="新增商品" name="add">
        <AddProduct />
      </el-tab-pane>
      <el-tab-pane label="修改商品" name="edit">
        <EditProduct id="1001" />
      </el-tab-pane>
    </el-tabs>
  </main>

  <el-dialog v-model="show" :close-on-click-modal="false">
    <AddProduct v-if="activeTab === 'add'" />
    <EditProduct id="1001" v-else />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import AddProduct from './components/AddProduct.vue';
import EditProduct from './components/EditProduct.vue';

const activeTab = ref('add');
const show = ref(false);

function add() {
  show.value = true;
  activeTab.value = 'add';
}

function edit() {
  show.value = true;
  activeTab.value = 'edit';
}
</script>

<style scoped>
.page-shell {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px 40px;
}

.page-head {
  margin-bottom: 20px;
}

.page-tabs {
  min-height: 320px;
}
</style>
