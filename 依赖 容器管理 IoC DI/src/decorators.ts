import "reflect-metadata"

/*
 * @Injectable()   标记类可被容器管理 (NestJS 里的 provider)
 * @Inject(token)  当依赖是接口/symbol 时, 手动指定 token (因为接口运行时不存在)
 */
export function Injectable() {
  return function (_target: any) {}
}

export function Inject(token: any) {
  return function (target: any, _key: string | undefined, index: number) {
    const types = Reflect.getMetadata("custom:paramtypes", target) || []
    types[index] = token
    Reflect.defineMetadata("custom:paramtypes", types, target)
  }
}
