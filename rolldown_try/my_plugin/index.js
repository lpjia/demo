import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = path.resolve(__dirname, 'ver.json')
const file = await fs.readFile(filePath, 'utf-8')
const fileObj = JSON.parse(file)


export default function rollupPluginMyLog(options = {}) {
  const { message = '默认日志信息' } = options;

  return {
    name: fileObj.name,
    version: fileObj.version,

    // buildStart —— 打包开始时执行
    buildStart() {
      console.log('✅ 打包开始');
      console.log('插件配置：', options);
    },

    // transform —— 转换代码（核心！）
    transform(code, id) { // code = 文件内容, id = 文件路径
      // 排除 Rolldown 内部 runtime 模块
      if (id.startsWith('\0rolldown/')) {
        return null;
      }
      if (id.endsWith('.js')) {
        console.log(`\n📄 处理文件：${id}`);
        console.log('原始代码：\n', code);

        const newCode = `
// 由 ${fileObj.name} 自动添加
console.log("${message}");
${code}`;

        return newCode;
      }
    },

    // buildEnd —— 打包结束钩子
    buildEnd() {
      console.log('\n🏁 打包结束');
    }
  };
}