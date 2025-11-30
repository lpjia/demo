import regenerator from 'regenerator'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve as pathResolve, dirname as pathDirname } from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

const file = readFileSync(pathResolve(__dirname, 'source.js'), 'utf-8')
// console.log(file)

const result = regenerator.compile(file, {
  includeRuntime: true
})
// console.log(result.code)

writeFileSync(pathResolve(__dirname, 'target.js'), result.code, 'utf-8')
console.log('compile success!')