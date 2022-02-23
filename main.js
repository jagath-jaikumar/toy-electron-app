const { app, BrowserWindow, session } = require('electron')


const AUTH_HOST = 'https://www.google.com/'

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1000,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        devTools: true,
      }
    })
  
    win.loadURL("http://localhost:3000")
  }


  app.on("ready", () => {
    const burl = AUTH_HOST

    const targeturl = "http://localhost:3000"
    const filter = {
        urls: [
        `${burl}*`,
        ],
    }

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      callback({ url: details.url, requestHeaders: details.requestHeaders, referrer: details.referrer });
    }
  );

  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
        console.log(details)
        callback({ responseHeaders: details.responseHeaders });
    },
    createWindow())
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


  const {ipcMain} = require('electron');
    ipcMain.on('ABCD', (event, arg) => {
        const win2 = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
              enableRemoteModule: true,
              devTools: true,
            }
          })
        
          win2.loadURL(AUTH_HOST)
    
    });