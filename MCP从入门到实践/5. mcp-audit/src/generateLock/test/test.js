import { generateLock } from '../index.js';
import fs from 'fs';
import { join } from 'path';
import { getDirname } from '../../common/utils.js';

const packageJsonPath = join(getDirname(import.meta.url), '1.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

async function test() {
  const workDir =
    '/Users/yuanjin/Desktop/mcp-audit/src/generateLock/test/workdir';
  await generateLock(workDir, packageJson);
}

test();
