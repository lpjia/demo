<template>
  <ProductForm
    :formData="formData"
    submitText="提交修改"
    :loading="loading"
    :fieldStates="fieldStates"
    @finish="handleFinish"
  />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import ProductForm from './ProductForm.vue';
import { getProduct } from '../api/product';
/* 容器组件 */

const props = defineProps({
  id: String
});

const formData = reactive({
  name: '',
  price: 0,
  services: []
});

const fieldStates = {
  price: {
    disabled: true
  }
};

const loading = ref(false);

async function loadProduct() {
  loading.value = true;

  try {
    const resp = await getProduct(props.id);
    Object.assign(formData, resp);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadProduct();
});

function handleFinish(goods) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success({
      message: '修改商品成功'
    });
    console.log('goods:', goods);
  }, 1000);
}
</script>
