import { audit } from '../index.js';
import { getDirname } from '../../common/utils.js';
import { join } from 'path';
import fs from 'fs';

const workDir = join(getDirname(import.meta.url), './workdir');
const indexJson = join(workDir, './index.json');
const packageJsonPath = join(workDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

async function test() {
  const result = await audit(workDir, packageJson);
  fs.writeFileSync(indexJson, JSON.stringify(result, null, 2), 'utf8');
  console.log('ok');
}

test();
