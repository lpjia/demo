<template>
  <ATable
    :pagination="{
      hideOnSinglePage: true,
    }"
    :columns="columns"
    :dataSource="files"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.file.name }}
      </template>
      <template v-else-if="column.key === 'type'">
        {{ extname(record.file.name) }}
      </template>
      <template v-else-if="column.key === 'size'">
        {{ fileSize(record.file.size) }}
      </template>
      <template v-else-if="column.key === 'status'">
        <a-tag color="blue" v-if="record.status === 'pending'">待上传</a-tag>
        <a-tag color="green" v-else-if="record.status === 'uploaded'">
          已上传
        </a-tag>
        <a-progress v-else :percent="record.progress" size="small" />
      </template>
      <template v-else-if="column.key === 'operation'">
        <i class="iconfont i-shanchu" @click="emit('delete', record)"></i>
      </template>
    </template>
    <template #summary>
      <div class="summary">
        <a-tag>文件数量：{{ files.length }}</a-tag>
        <a-tag color="green">成功上传：{{ uploadedNumber }}</a-tag>
        <a-tag>总大小：{{ totalSize }}</a-tag>
      </div>
    </template>
  </ATable>
</template>

<script setup>
import { computed } from 'vue';
import { extname, fileSize } from '../utils';
const props = defineProps({
  files: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['delete']);

const columns = [
  {
    title: '文件名',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '大小',
    key: 'size',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '操作',
    key: 'operation',
  },
];

const totalSize = computed(() =>
  fileSize(props.files.reduce((s, it) => (s += it.file.size), 0))
);
const uploadedNumber = computed(
  () => props.files.filter((f) => f.status === 'uploaded').length
);
</script>

<style scoped>
.i-shanchu {
  cursor: pointer;
}
.i-shanchu:hover {
  color: #f50;
}
.summary {
  margin-top: 1em;
  display: flex;
}
</style>
