import { remoteAudit } from '../remoteAudit.js';
import { getDirname } from '../../common/utils.js';
import { join } from 'path';
import fs from 'fs';

const workDir = join(getDirname(import.meta.url), './workdir');
const remoteJson = join(workDir, './remote.json');

async function test() {
  const result = await remoteAudit('ejs', '3.1.9');
  fs.writeFileSync(remoteJson, JSON.stringify(result, null, 2), 'utf8');
  console.log('ok');
}

test();
