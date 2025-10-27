const { app, BrowserWindow, shell, globalShortcut } = require('electron');
const path = require('path');
// const { exec } = require('child_process');

let mainWindow;
// let eggProcess;

// // 启动 Egg.js 后端
// function startEggServer() {
//   // 判断是否是开发环境
//   const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

//   // 设置后端路径
//   const eggBackendPath = path.join(__dirname, 'backend');

//   // 根据环境选择启动命令
//   const startCmd = isDev
//     ? 'pnpm egg-bin dev'
//     : 'pnpm egg-scripts start';

//   console.log(`启动Egg.js服务: ${startCmd}`);
//   eggProcess = exec(`cd "${eggBackendPath}" && ${startCmd}`, { shell: true });

//   eggProcess.stdout.on('data', (data) => {
//     console.log(`Egg.js: ${data}`);
//   });

//   eggProcess.stderr.on('data', (data) => {
//     console.error(`Egg.js 错误: ${data}`);
//   });

//   // 添加错误处理
//   eggProcess.on('error', (err) => {
//     console.error(`启动Egg.js服务失败: ${err}`);
//   });
// }


// 创建 Electron 窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    autoHideMenuBar: true, // 可选：启用自动隐藏
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // 允许加载本地资源
    },
  });

  // 加载打包后的 Vue 应用
  mainWindow.loadFile(path.join(__dirname, 'frontend/dist/index.html')); // 替换为实际路径

  // // 开发环境加载 Vue 开发服务器
  // if (isDev) {
  //   mainWindow.loadURL('http://localhost:5173');
  // }
  // // 生产环境加载打包后的文件
  // else {
  //   mainWindow.loadFile(path.join(__dirname, 'frontend/dist/index.html'));
  // }

  // 注册 F5 和 Ctrl+R/Cmd+R 快捷键
  mainWindow.webContents.on('did-finish-load', () => {
    // 注册全局快捷键
    globalShortcut.register('F5', () => {
      mainWindow.reload();
    });

    globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.reload();
    });
  });

  // 打开开发者工具
  mainWindow.webContents.openDevTools();

  // 关闭窗口时停止 Egg.js 进程
  mainWindow.on('closed', () => {
    // if (eggProcess) eggProcess.kill();
    mainWindow = null;
  });

  // 处理外部链接（防止在 Electron 窗口中打开）
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// 应用就绪时启动
app.whenReady().then(() => {
  // startEggServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // if (eggProcess) eggProcess.kill();

    mainWindow = null;
    globalShortcut.unregisterAll();

    app.quit();
  }
});