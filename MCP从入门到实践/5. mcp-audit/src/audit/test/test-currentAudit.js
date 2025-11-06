import { currentAudit } from '../currentAudit.js';
import { getDirname } from '../../common/utils.js';
import { join } from 'path';
import fs from 'fs';

const workDir = join(getDirname(import.meta.url), './workdir');
const currentJson = join(workDir, './current.json');

async function test() {
  const result = await currentAudit('my-site', '0.1.0');
  fs.writeFileSync(currentJson, JSON.stringify(result, null, 2), 'utf8');
  console.log('ok');
}

test();
