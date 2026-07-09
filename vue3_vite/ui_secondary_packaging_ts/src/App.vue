<template>
  <MyInput ref="inputRef" v-model="data" placeholder="输入提示">
    <template #prepend>
      <el-select v-model="selectVal" placeholder="Select" style="width: 115px;">
        <el-option label="Restart" value="1"></el-option>
        <el-option label="Order No." value="2"></el-option>
        <el-option label="Tel" value="3"></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" @click="clk"></el-button>
    </template>
  </MyInput>
</template>

<script setup lang="ts">
// import MyInput from './components/MyInput.vue';
import MyInput from './components/MyInputTs.vue';
import { onMounted, ref } from 'vue';
import { ElSelect, ElOption, ElButton } from 'element-plus';
import { Search } from '@element-plus/icons-vue'

const data = ref('')
const inputRef = ref()
const selectVal = ref()

onMounted(() => {
  data.value = '12321' // 父传子传孙 数据

  console.log(inputRef.value)
  inputRef.value.focus() // 调用el-input的focus方法
})

const clk = (e: MouseEvent) => {
  console.log('e:', e)
  console.log(data.value)
  console.log(inputRef.value)
  console.log(selectVal.value)
}

</script>
