import { Injectable, Inject } from "./decorators"
import { STORE, Store } from "./store"
import { Logger } from "./logger"

@Injectable()
export class UserService {
  // STORE 是接口, 用 @Inject(STORE) 指定 token; Logger 是类, 容器直接反射注入
  constructor(
    @Inject(STORE)
    private store: Store,

    private logger: Logger,
  ) { }

  async getUsers() {
    this.logger.log("开始查询用户")
    const data = await this.store.get("users")
    this.logger.log("查询完成")
    return data ?? []
  }
}
