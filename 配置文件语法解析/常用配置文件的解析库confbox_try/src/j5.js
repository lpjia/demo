// 以前的fs模块的方法 readFile writeFile, 都是回调, 是异步
// 同步方法是加Sync
// 后来又加了fs/promises子模块, 全是基于promise, 方便async await
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import * as confbox from 'confbox'

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = path.resolve(__dirname, "../../json5_try/try.json5")
const file = await fs.readFile(filePath, 'utf-8')
// console.log(file)
const j5Obj = confbox.parseJSON5(file)
console.log(j5Obj.name)
console.log(j5Obj.version)
console.log(j5Obj.type)