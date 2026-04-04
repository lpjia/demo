import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  /* const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod'); */

  /* const rootDir = process.cwd();
  const localEnv = path.resolve(rootDir, '.env');
  const prodEnv = path.resolve(rootDir, '.env.prod'); */

  /* 兼容 集成到electron */
  const PROJECT_ROOT = path.resolve(__dirname, '../../');
  const localEnv = path.join(PROJECT_ROOT, '.env'); // 清晰明了, 指向根目录的.env文件路径
  const prodEnv = path.join(PROJECT_ROOT, '.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;

  return { path: filePath };
}
export default parseEnv();