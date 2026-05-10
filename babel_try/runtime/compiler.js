import regenerator from 'regenerator'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const file = readFileSync(resolve(__dirname, 'source.js'), 'utf-8')
// console.log(file)

const result = regenerator.compile(file, {
  includeRuntime: true
})
// console.log(result.code)

writeFileSync(resolve(__dirname, 'target.js'), result.code, 'utf-8')
console.log('compile success!')