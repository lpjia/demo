import fs from 'node:fs/promises' // 都是异步方法, 返回promise
import path from 'node:path'
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const filePath = path.resolve(__dirname, "../scss/index.scss")

const compileResult = sass.compile(filePath, {
  style: 'expanded' // 必须用 expanded，才能拿到干净的 AST
});

function formatToCompact(cssString) {
  return cssString
    // 去掉开头的 @charset "UTF-8";
    .replace(/@charset\s*"UTF-8";\s*/i, '')
    // 先去掉所有 /* */ 注释, //注释sass会默认去掉
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // 1. 在每个 } 后面加两个换行（实现空行分隔）
    .replace(/}\s*/g, '}\n\n')
    // 2. 处理大括号周围的空格
    .replace(/\s*{\s*/g, ' { ')
    // 3. 分号后只留一个空格
    .replace(/;\s*/g, '; ')
    // 4. 去掉多余的多余空格（但不破坏换行）
    .replace(/[ \t]+/g, ' ')
    // 5. 按换行分割，清理每行前后空格（空行变成空字符串）
    .split(/\n/)
    .map(line => line.trim())
    // 6. 保留空行（不 filter），直接合并
    .join('\n')
    // 7. 将连续三个以上换行压缩为两个（即一个空行），并去掉首尾换行
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const compactCss = formatToCompact(compileResult.css);
const cssPath = path.resolve(__dirname, '../css/index.css')
await fs.mkdir(path.dirname(cssPath), { recursive: true }); // 不存在则自动创建 css 目录
await fs.writeFile(cssPath, compactCss, 'utf-8')