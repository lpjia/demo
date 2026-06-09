// import SparkMD5 from './sparkmd5.js';
import SparkMD5 from './spark-md5.min.js';

export function createChunk(file, index, chunkSize) {
  return new Promise((resolve) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        start, // 字节的起始下标
        end, // 字节的结束下标
        index, // 第几个分片下标
        hash: spark.end(),
        blob, // 分片的二进制信息, 用于上传的
      });
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
