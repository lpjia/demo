import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';

/**
 * 对项目本身以及其所有直接和间接依赖进行安全审计
 * @param {string} projectRoot 项目根目录，可以是本地项目的路径或远程项目的URL
 */
export async function auditProject(projectRoot) {
  // 1. 创建工作目录
  const workDir = await createWorkDir();
  // 2. 解析项目的package.json文件
  const packageJSON = await parseProject(projectRoot);
  // 3. 在工作目录中写入
  const depTree = await generateDepTree(packageJSON);
  // 3. 解析依赖树，获取每个包的依赖关系
  const parsedTree = await parseTree(depTree);
  // 4. 创建审计任务
  const tasks = createTasks(parsedTree);
}

auditProject(
  '/Users/yuanjin/工作/课/录播课/付费课/60 天任务式学习/08. vue从入门到实战/案例/my-site'
);
