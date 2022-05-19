const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')

if (require('electron-squirrel-startup')) {
	app.quit()
}

let mainWindow = null
let newWin = null

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1210,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
		},
	})
	if (app.isPackaged) {
		mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'))
	} else {
		mainWindow.loadURL('http://localhost:3000')
		mainWindow.webContents.openDevTools()
	}
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
ipcMain.on('applyStart', (event, data) => {
	newWin = new BrowserWindow({
		width: 375,
		height: 872,
		webPreferences: {
			preload: path.join(__dirname, '../electron-preload/index.js'),
			nodeIntegration: true,
			contextIsolation: false,
		},
		useContentSize: true,
		frame: false,
	})
	newWin.loadURL(`http://localhost:${process.env['VITE_DEV_SERVER_PORT']}/apply-start`)
	newWin.webContents.openDevTools()
	newWin.on('close', () => {
		newWin = null
	})
})
ipcMain.on('closeApplyStart', () => {
	newWin.close()
	newWin = null
})
ipcMain.on('closeApp', () => {
	mainWindow.close()
	mainWindow = null
})
