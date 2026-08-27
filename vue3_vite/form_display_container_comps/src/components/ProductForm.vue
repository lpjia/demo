<template>
  <el-form
    ref="refForm"
    class="product-form"
    :model="props.formData"
    :rules="rules"
    status-icon
    label-width="80px"
    v-loading="props.loading"
    @submit.prevent="handleSubmit(refForm)"
  >
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="props.formData.name" placeholder="请输入商品名称" />
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input-number
        v-model="props.formData.price"
        :min="0"
        :precision="2"
        :step="1"
        :disabled="getFieldState('price').disabled"
      />
    </el-form-item>
    <el-form-item label="商品服务">
      <el-checkbox-group v-model="props.formData.services">
        <el-checkbox v-for="s in services" :key="s" :value="s">
          {{ s }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">
        {{ props.submitText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue';
import { rules, services, formProps } from './formUIData';
/* 展示组件 */

const props = defineProps(formProps);
const emit = defineEmits(['finish']);

const refForm = useTemplateRef('refForm');

function getFieldState(field) {
  return props.fieldStates?.[field] || {};
}

async function handleSubmit(form) {
  try {
    await form.validate();
    emit('finish', {
      ...props.formData
    });
  } catch (err) {}
}
</script>

<style scoped>
.product-form {
  max-width: 520px;
}
</style>
