
declare module '@/utils/commonMethod' {
  export const setStorage: (key: string, val: unknown, storage?: Storage) => void;
  export const getStorage: (key: string, storage?: Storage) => unknown;
  export const removeStorage: (key: string, storage?: Storage) => void;
  export const clearStorage: (storage?: Storage) => void;
  export function arrToObj(
    arr: Array,
    options?: {
      kField: string,
      vField: string
    }
  ): object
}


// declare function moduleLib(options: Options): void;

// interface Options {
//   [key: string]: any,
// }

// declare namespace moduleLib {
//   const version: string;
//   export const setStorage: (key: string, val: unknown, storage?: Storage) => void;
//   export const getStorage: (key: string, storage?: Storage) => unknown;
//   export const removeStorage: (key: string, storage?: Storage) => void;
//   export const clearStorage: (storage?: Storage) => void;
// }

// export = moduleLib; // 这样写兼容性更好