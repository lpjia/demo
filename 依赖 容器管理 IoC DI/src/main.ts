import { Container } from "./container"
import { buildModule } from "./app.module"
import { STORE, StorageStore, IndexdbStore } from "./store"
import { UserService } from "./service"
import { Logger } from "./logger"

async function bootstrap() {
  const container = new Container()

  buildModule({
    name: "StoreModule",
    providers: [
      // { provide: STORE, useClass: StorageStore }, // 换存储方案只改这一行
      { provide: STORE, useClass: IndexdbStore },
    ],
    exports: [STORE],
  })(container)

  buildModule({
    name: "UserModule",
    providers: [UserService, Logger],
    exports: [UserService],
  })(container)

  // 业务层拿到的是 UserService, 完全不关心底层 store 是谁
  const service = container.get(UserService)
  const users = await service.getUsers()
  console.log("结果:", JSON.stringify(users))
}

bootstrap()
