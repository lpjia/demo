// 这种方案还有待验证

declare function moduleLib(options: Options): void;

interface Options {
  [key: string]: any,
}

declare namespace moduleLib {
  const version: string;
  function formatTime(): string;
}

export = moduleLib; // 这样写兼容性更好