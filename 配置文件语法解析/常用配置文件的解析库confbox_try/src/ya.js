import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import * as confbox from 'confbox'

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = path.resolve(__dirname, "../../yaml语法_try/src/try.yaml")
const file = await fs.readFile(filePath, 'utf-8')
// console.log(file)
const yamlObj = confbox.parseYAML(file)
console.log(yamlObj.scripts)
console.log(yamlObj.devDependencies.vitest)