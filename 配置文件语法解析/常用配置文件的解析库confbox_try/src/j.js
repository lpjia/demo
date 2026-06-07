import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import * as confbox from 'confbox'

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = path.resolve(__dirname, "../../json5_try/try.json")
const file = await fs.readFile(filePath, 'utf-8')
// console.log(file)
const jObj = confbox.parseJSON(file)
console.log(jObj.name)
console.log(jObj.version)
console.log(jObj.type)