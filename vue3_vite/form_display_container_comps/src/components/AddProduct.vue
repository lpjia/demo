<template>
  <ProductForm :formData="formData" submitText="新增商品" :loading="loading" @finish="handleFinish" />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import ProductForm from './ProductForm.vue';

const formData = reactive({
  name: '',
  price: 0,
  services: []
});

const loading = ref(false);

function handleFinish(goods) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success({
      message: '添加商品成功'
    });
    console.log('goods:', goods);
  }, 1000);
}
</script>
