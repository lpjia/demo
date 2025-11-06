import { normalizeAuditResult } from '../normalizeAuditResult.js';
import fs from 'fs';
import { join } from 'path';
import { getDirname } from '../../common/utils.js';

const auditJson = join(getDirname(import.meta.url), './workdir/audit.json');
const auditResult = JSON.parse(fs.readFileSync(auditJson, 'utf8'));
function test() {
  const r = normalizeAuditResult(auditResult);
  const normalizedPath = join(
    getDirname(import.meta.url),
    './workdir/normalized.json'
  );
  fs.writeFileSync(normalizedPath, JSON.stringify(r, null, 2), 'utf8');
  console.log('ok');
}

test();
