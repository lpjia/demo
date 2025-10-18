const uploadUrl = 'http://test.com:9527/upload/single';

export function upload(file, onProgress, onFinish) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const resp = JSON.parse(xhr.responseText);
    onFinish(resp);
  };
  xhr.upload.onprogress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    onProgress(percent);
  };
  xhr.open('POST', uploadUrl);
  const form = new FormData();
  form.append('avatar', file);
  xhr.send(form);
  return function () {
    xhr.abort();
  };
}
