import { Injectable } from "./decorators"

@Injectable()
export class Logger {
  log(msg: string) {
    console.log(`[Logger] ${msg}`)
  }
}
