declare function moduleLib(options: Options): void;

interface Options {
  [key: string]: any,
}

declare namespace moduleLib {
  const version: string;
  function setStorage(key: string, val: any, storage?: Storage): void
  function getStorage(key: string, storage?: Storage): string
  function removeStorage(key: string, storage?: Storage): void
  function clearStorage(storage?: Storage): void
}

export = moduleLib; // 这样写兼容性更好
// 使用时, 既可以按需导入, 也可以默认导入
// import * as common from '@/utils/commonMethods.js'
// console.log(common.getStorage('token'))