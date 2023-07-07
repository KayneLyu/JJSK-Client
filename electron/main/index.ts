import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { release } from 'node:os';
import { resolve } from 'node:path';
import { fork, ChildProcess } from 'node:child_process';
import { initialize, enable } from '@electron/remote/main';
import { initUpdater, installUpdater } from '../utils/updater';

process.env.DIST_ELECTRON = resolve(__dirname, '../');

// Disable GPU Acceleration for Windows 7
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('--disable-gpu', 'true');
app.commandLine.appendSwitch('--no-sandbox', 'true');

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let worker: ChildProcess | null = null;

const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = resolve(process.env.DIST_ELECTRON, 'index.html');
const workerPath = resolve(__dirname, '../worker/index.js');

const createWindow = async () => {
  win = new BrowserWindow({
    title: 'ReBuff',
    width: 1300,
    height: 768,
    minWidth: 1300,
    minHeight: 768,
    useContentSize: true,
    frame: false, // 是否创建frameless窗口
    center: true, // 是否出现在屏幕居中的位置
    fullscreenable: false, // 是否允许全屏
    resizable: false, // 是否允许拉伸大小
    maximizable: false, // 双击不可以最大化
    transparent: false,
    titleBarStyle: 'hidden',
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged

  } else {
    win.loadFile(indexHtml);
  }
  if (process.env.NODE_ENV !== 'production' || process.argv.includes('--open-dev-tool')) {
    win?.webContents.openDevTools(); // 开发模式下默认打开调试窗口
  }
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    initWorker();
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });
  enable(win.webContents);
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  installUpdater();
  win = null;
  app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
const SendMessage = <O, R>(Data: WorkerMessage<O, R>) => {
  if (win && win.webContents.send) {
    console.log('send-message =>', Data);
    win.webContents.send(`${Data.Method}`, Data);
  }
};

ipcMain.on('worker-message', (_, args: WorkerMessage<unknown, unknown>) => {
  console.log('worker-message =>', args);
  worker?.send?.(args);
});
const initWorker = () => {
  worker = fork(workerPath, [], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env: process.env });
  worker.on('message', (Result: WorkerMessage<unknown, unknown>) => {
    SendMessage(Result);
  });
  worker.on('exit', code => {
    // 当进程退出
  });
  worker.on('uncaughtException', err => {
    // 捕获进程未捕获的异常
  });
  worker.on('error', err => {
    // 当进程出错
  });
};

initialize();

if (!process.env.VITE_DEV_SERVER_URL) {
  initUpdater();
}
