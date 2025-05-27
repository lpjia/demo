const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

/**
 * 计算本地文件的MD5值
 * @param {string} filePath - 文件路径
 * @returns {Promise<string>} - 返回MD5值
 */
function getFileMd5(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);

    stream.on('data', chunk => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });

    stream.on('error', err => {
      reject(err);
    });
  });
}

// 批量处理 file 目录下所有文件
async function printAllFileMd5s(dir) {
  try {
    const files = fs.readdirSync(dir);
    if (files.length === 0) {
      console.log('file 目录下没有文件。');
      return;
    }
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isFile()) {
        const md5 = await getFileMd5(filePath);
        console.log(`${file} 的MD5值为: ${md5}`);
      }
    }
  } catch (err) {
    console.error('处理文件时出错:', err.message);
  }
}

if (require.main === module) {
  printAllFileMd5s(path.join(__dirname, 'file'));
}

module.exports = getFileMd5; 