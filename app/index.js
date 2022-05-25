const { app, BrowserWindow, ipcMain, Tray, nativeImage, Menu, autoUpdater, dialog } = require('electron')
const path = require('path')

if (require('electron-squirrel-startup')) {
  app.quit()
}

let mainWindow, loginWindow, aboutWindow

// 主窗口-设置
const mainView = () => {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    frame: false,
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'))
  } else {
    mainWindow.loadURL('http://localhost:3000')
    mainWindow.webContents.openDevTools()
  }

  // 托盘
  trayMenu(app, mainWindow)
}
// 登录窗口-设置
const loginView = () => {
  loginWindow = new BrowserWindow({
    width: 420,
    height: 300,
    frame: false,
    useContentSize: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (app.isPackaged) {
    loginWindow.loadFile(path.join(__dirname, 'build', 'index.html/#/login'))
  } else {
    loginWindow.loadURL('http://localhost:3000/#/login')
  }
}
// 关于窗口-设置
const aboutView = () => {
  aboutWindow = new BrowserWindow({
    width: 350,
    height: 220,
    frame: false,
    useContentSize: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (app.isPackaged) {
    aboutWindow.loadFile(path.join(__dirname, 'build', 'index.html/#/about'))
  } else {
    aboutWindow.loadURL('http://localhost:3000/#/about')
  }
}

// 初始化
app.whenReady().then(() => {
  loginView()

  // 检查更新，打包后检验
  if (app.isPackaged) {
    checkUpdate(app)
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      loginView()
    }
  })
})
// 关闭
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * renderer层
 */
// 启动主应用
ipcMain.handle('showMain', () => {
  loginWindow.close()
  mainView()
})
// 关闭
ipcMain.handle('closeApp', () => {
  mainWindow.hide()
})
// 刷新
ipcMain.handle('reloadApp', () => {
  mainWindow.reload()
})
// 最小化
ipcMain.handle('minApp', () => {
  mainWindow.minimize()
})
// 全屏
ipcMain.handle('maxApp', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})
// 更新检查
ipcMain.handle('checkForUpdate', () => {
  autoUpdater.checkForUpdates()
})
// 获取版本号
ipcMain.handle('version', () => app.getVersion())
// 消息
const getMsg = (msg) => {
  ipcMain.handle('message', () => msg)
}

/**
 * 事件
 */
// 托盘
const trayMenu = (app, mainWindow) => {
  // 托盘图标
  const icon = nativeImage.createFromPath(path.join(__dirname, 'icon/favicon.png'))
  // 托盘
  const tray = new Tray(icon)
  // 移动到托盘上的提示
  tray.setToolTip('electron+react')

  // 主界面显示事件
  const restoreApp = () => {
    if (mainWindow.isMaximized()) {
      mainWindow.maximize()
    } else {
      mainWindow.restore()
    }

    mainWindow.show()
  }

  // 监听托盘右键事件
  tray.on('right-click', () => {
    // 右键菜单模板
    const tempate = [
      {
        label: '打开应用',
        click: () => restoreApp()
      },
      {
        label: '关于应用',
        click: () => aboutView()
      },
      {
        label: '退出应用',
        click: () => app.quit()
      }
    ]
    // 创建托盘右键菜单
    const menuConfig = Menu.buildFromTemplate(tempate)
    // 托盘右键的菜单替代原来的
    tray.popUpContextMenu(menuConfig)
  })
  // 监听点击托盘的事件
  tray.on('click', () => restoreApp())
}

// 检查更新
const checkUpdate = () => {
  // 定义返回给渲染层的相关提示文案
  const message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }

  // 检查
  autoUpdater.checkForUpdates()

  // 设置要检测更新的路径
  if (process.platform === 'darwin') {
    autoUpdater.setFeedURL('线上版本地址')
  }
  // 默认会自动下载新版本，如果不想自动下载，设置为false
  autoUpdater.autoDownload = false

  // 监听'error'事件
  autoUpdater.on('error', (error) => {
    getMsg(`${message.error}:${error}`)
  })

  // 检测是否需要更新
  autoUpdater.on('checking-for-update', () => {
    getMsg(message.checking)
  })

  // 监听'update-available'事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '应用更新',
      message: '发现新版本，是否更新？',
      buttons: ['是', '否']
    }).then(({ response }) => {
      if (response === 0) {
        // 选择是，则退出程序，安装新版本
        autoUpdater.quitAndInstall()
        getMsg(message.updateAva)
      }
    })

    // 也可以默认直接更新，二选一即可
    // autoUpdater.downloadUpdate();
    // sendUpdateMessage(message.updateAva);
  })

  // 检测到不需要更新时
  autoUpdater.on('update-not-available', () => {
    getMsg(message.updateNotAva)
  })

  // 下载进度
  autoUpdater.on('download-progress', (progress) => {
    getMsg(progress)
  })

  // 监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        title: '安装更新',
        message: '更新下载完毕，应用将重启并进行安装'
      })
      .then(() => {
        // 退出并安装应用
        setImmediate(() => autoUpdater.quitAndInstall())
      })
  })
}
