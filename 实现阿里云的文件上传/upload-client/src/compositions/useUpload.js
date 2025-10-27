import { computed, reactive } from 'vue';
import { upload as uploadFile } from '../api/upload';
import { extname, fileSize } from '../utils';

const createNewFile = (f) => ({
  file: f,
  status: 'pending',
  progress: 0,
});

export function useUpload(initFiles = [], exts, maxSize) {
  const files = reactive([...initFiles.map(createNewFile)]);

  const addFiles = (...args) => {
    args = args.filter(
      (f) => exts.includes(extname(f.name)) && f.size <= maxSize
    );
    files.push(...args.map(createNewFile));
  };

  const deleteFiles = (...args) => {
    for (const f of args) {
      const i = files.indexOf(f);
      files.splice(i, 1);
      if (f.status === 'uploading') {
        f.abort();
      }
    }
  };

  const pendingFiles = computed(() =>
    files.filter((f) => f.status === 'pending')
  );

  const upload = () => {
    pendingFiles.value.forEach((f) => {
      f.status = 'uploading';
      f.abort = uploadFile(
        f.file,
        (p) => {
          f.progress = p;
        },
        (resp) => {
          f.status = 'uploaded';
          f.resp = resp;
        }
      );
    });
  };
  return {
    files,
    addFiles,
    deleteFiles,
    pendingFiles,
    upload,
  };
}
