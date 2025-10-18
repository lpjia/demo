<template>
  <div
    class="drag-area"
    :class="{
      draging: isDraging,
    }"
    @dragenter="dragInHandler"
    @dragover="dragInHandler"
    @drop="dropHandler"
    @dragleave="dragLeaveHandler"
  >
    <slot>
      <p class="section">
        <i class="iconfont i-shangchuan"></i>
        <span>将目录或多个文件拖拽到此进行扫描</span>
      </p>
      <p class="section">支持的文件类型：{{ supports }}</p>
      <p>每个文件允许的最大尺寸：{{ maxSize }}</p>
    </slot>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { fileSize, extname } from '../utils';

const props = defineProps({
  exts: {
    type: Array,
    default: () => ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'],
  },
  fileSize: {
    type: Number,
    default: 1024 * 1024,
  },
});

const emit = defineEmits(['drop']);

const supports = computed(() => props.exts.join('、'));

const maxSize = computed(() => fileSize(props.fileSize));

const isDraging = ref(false);

const dragInHandler = (e) => {
  if (!e.dataTransfer.types.includes('Files')) {
    return;
  }
  e.preventDefault();
  isDraging.value = true;
};
const dragLeaveHandler = (e) => {
  e.preventDefault();
  isDraging.value = false;
};
const dropHandler = async (e) => {
  e.preventDefault();
  isDraging.value = false;
  let results = await Promise.all(
    [...e.dataTransfer.items].map((item) =>
      handleEntry(item.webkitGetAsEntry())
    )
  );

  results = results
    .flat(Infinity)
    .filter((f) => validExt(f.name) && validSize(f.size));

  emit('drop', results);
};

const validExt = (name) => props.exts.includes(extname(name));

const validSize = (size) => size <= props.fileSize;

const handleEntry = (entry) => {
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file(resolve);
      return;
    }
    const dirReader = entry.createReader();
    dirReader.readEntries(async (entries) => {
      resolve(await Promise.all(entries.map(handleEntry)));
    });
  });
};
</script>

<style scoped>
.drag-area {
  width: 100%;
  line-height: 30px;
  color: #888;
  border: 1px dashed #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
}
.draging {
  border-color: #2565c1;
  background: #eee;
}
.section {
  display: flex;
  justify-content: center;
  column-gap: 1em;
  align-items: center;
}
.i-shangchuan {
  font-size: 3em;
}
</style>
