<template>
  <div class="container">
    <DragArea
      :exts="exts"
      :fileSize="maxSize"
      @drop="addFiles(...$event)"
    ></DragArea>
    <div class="operation">
      <a-button type="primary">
        选择文件
        <input type="file" multiple @change="handleFileChange" />
      </a-button>
      <a-button type="primary">
        选择文件夹
        <input type="file" webkitdirectory @change="handleFileChange" />
      </a-button>
    </div>
    <FileTable :files="files" @delete="deleteFiles($event)"></FileTable>
    <div class="operation">
      <a-button
        :disabled="pendingFiles.length === 0"
        type="primary"
        @click="upload"
      >
        开始上传
      </a-button>
    </div>
  </div>
</template>

<script setup>
import DragArea from './components/DragArea.vue';
import FileTable from './components/FileTable.vue';
import { useUpload } from './compositions/useUpload';
const exts = ['.jpg', '.jpeg', '.bmp', '.webp', '.gif', '.png'];
const maxSize = 1024 * 1024;
const { files, addFiles, deleteFiles, pendingFiles, upload } = useUpload(
  [],
  exts,
  maxSize
);

const handleFileChange = (e) => {
  addFiles(...e.target.files);
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 20px auto;
  padding-bottom: 50vh;
}
.operation {
  margin: 1em 0;
  display: flex;
  column-gap: 10px;
}
.operation button {
  position: relative;
  cursor: pointer;
}
.operation input[type='file'] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
