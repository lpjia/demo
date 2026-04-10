import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  /* 兼容 集成到electron */
  /* 开发环境下 __dirname 是 backend/config
  打包环境下 __dirname 是 backend/dist/config */
  const PROJECT_ROOT = path.resolve(__dirname, '../../');
  // 尝试多个可能的路径，确保在开发和打包后都能找到文件
  const possiblePaths = [
    path.join(PROJECT_ROOT, '.env'),
    path.join(PROJECT_ROOT, '.env.prod'),
    path.join(PROJECT_ROOT, '../.env'),
    path.join(PROJECT_ROOT, '../.env.prod'),
  ];

  let filePath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      // 如果是生产环境且找到了 .env.prod，优先使用它
      if (isProd && p.endsWith('.env.prod')) {
        break;
      }
      if (!isProd) break;
    }
  }

  if (!filePath) {
    throw new Error('缺少环境配置文件');
  }

  return { path: filePath };
}
export default parseEnv();