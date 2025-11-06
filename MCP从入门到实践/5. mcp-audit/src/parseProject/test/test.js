import { parseProject } from '../index.js';

// 测试本地项目解析
async function testLocalProject() {
  const localProjectPath = '/Users/yuanjin/Desktop/mcp-audit';
  try {
    const packageJson = await parseProject(localProjectPath);
    console.log('本地项目解析成功:', packageJson);
  } catch (error) {
    console.error('本地项目解析失败:', error);
  }
}

// 测试远程项目解析
async function testRemoteProject() {
  const remoteProjectUrl = 'https://github.com/webpack/webpack';
  try {
    const packageJson = await parseProject(remoteProjectUrl);
    console.log('远程项目解析成功:', packageJson);
  } catch (error) {
    console.error('远程项目解析失败:', error);
  }
}

testLocalProject();
testRemoteProject();
