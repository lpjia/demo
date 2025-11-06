import { npmAudit } from '../npmAudit.js';
import { getDirname } from '../../common/utils.js';
import { join } from 'path';
import fs from 'fs';

const workDir = join(getDirname(import.meta.url), './workdir');
const auditJson = join(workDir, './audit.json');

async function test() {
  const result = await npmAudit(workDir);
  fs.writeFileSync(auditJson, JSON.stringify(result, null, 2), 'utf8');
  console.log('ok');
}

test();
