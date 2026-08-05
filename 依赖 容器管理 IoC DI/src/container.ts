import "reflect-metadata"

export type Token = string | symbol | Function

export interface Provider {
  provide: Token
  useClass?: any
  useValue?: any
  useFactory?: (...args: any[]) => any
  inject?: Token[]
}

type Factory = () => any

/*
 * 核心 IoC 容器
 * register: 登记 provider (三种形式: useClass / useValue / useFactory)
 * get:      按 token 取实例, 懒加载 + 默认单例
 * resolve:  反射构造器参数, 自动注入依赖
 */
export class Container {
  private factories = new Map<Token, Factory>()
  private instances = new Map<Token, any>()

  register(provider: Provider | any) {
    if (typeof provider === "function") {
      provider = { provide: provider, useClass: provider }
    }
    const p = provider as Provider
    this.factories.set(p.provide, () => {
      if (p.useClass) return this.resolve(p.useClass)
      if (p.useFactory) {
        const deps = (p.inject || []).map(t => this.get(t))
        return p.useFactory!(...deps)
      }
      return p.useValue
    })
  }

  get<T = any>(token: Token): T {
    if (this.instances.has(token)) return this.instances.get(token)
    const factory = this.factories.get(token)
    if (!factory) throw new Error(`No provider for token: ${String(token)}`)
    const instance = factory()
    this.instances.set(token, instance)
    return instance
  }

  resolve(target: any) {
    const design = Reflect.getMetadata("design:paramtypes", target) || []
    const custom = Reflect.getMetadata("custom:paramtypes", target) || []
    const args = design.map((t: Token, i: number) => this.get(custom[i] ?? t))
    return new target(...args)
  }
}
