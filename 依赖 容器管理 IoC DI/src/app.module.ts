import { Container, Provider, Token } from "./container"

export interface ModuleMetadata {
  name: string
  providers: (Provider | any)[]
  exports?: Token[]
}

/*
 * 简化版 @Module: 把一批 provider 注册进容器
 * exports 只做语义记录 (真正的作用域隔离需要独立实例上下文, 这里从简)
 */
export function buildModule(meta: ModuleMetadata) {
  return (container: Container) => {
    meta.providers.forEach(p => container.register(p))
    console.log(`[Module:${meta.name}] 注册 ${meta.providers.length} 个 provider`)
    if (meta.exports) {
      console.log(`[Module:${meta.name}] exports: ${meta.exports.map(String).join(", ")}`)
    }
  }
}
