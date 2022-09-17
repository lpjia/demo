
interface ObjKeyToOrmFieldOpti {
  assign?: Object
  exclude?: string[]
}

export = mylib;
export as namespace mylib;
declare namespace mylib {
  function objKeyToOrmField(obj: Object, options: ObjKeyToOrmFieldOpti): object[];
}