const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const os = require('os');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 440,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

ipcMain.handle('select-image', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  });
  // console.log(result);
  if (result.canceled) {
    return;
  }

  return result.filePaths[0];
});

ipcMain.handle('read-image', async (event, imagePath) => {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer;
});

ipcMain.handle('split-image', async (event, imagePath, left, top, width, height, imageWidth, row) => {

  //folder 생성
  // console.log(path.basename(imagePath, path.extname(imagePath)));
  // console.log(__dirname);
  let imageName = path.basename(imagePath, path.extname(imagePath));

  let desktopDir = path.join(os.homedir(), 'Desktop');
  let resultDir = path.join(desktopDir, 'result', imageName);
  
  // 폴더가 없으면 만들기
  if (!fs.existsSync(resultDir)){
      fs.mkdirSync(resultDir, { recursive: true });
  }

  //이미지 분해시작
  let splitHeight;
  let splitWidth;
  let multi;
  (async () => {
    const image = await sharp(imagePath)
        .metadata().then((meta)=>{
          // console.log(meta);
          splitWidth = Math.floor(meta.width / 3);
          splitHeight = meta.height;
          // console.log(splitHeight);
          multi = meta.width/imageWidth;
          // console.log(multi);
        });
        for(let i=0;i<3;i++){
          for(let j=0;j<row;j++){
            (async ()=>{
              const image2 = await sharp(imagePath)
              .toFormat('jpeg', { quality : 100 })// 포맷, 퀄리티 지정
              .extract({width: parseInt(width*multi), height: parseInt(height*multi), left: parseInt(left*multi), top:parseInt(top*multi)})
              .extract({ width: parseInt(width*multi/3), height: parseInt(height*multi/row), left: parseInt(width*multi/3)*i, top: parseInt(height*multi/row)*j })
              .toFile(path.join(resultDir, `resizeIMG${j}${i}.jpeg`), (err, info) => { // 리사이징된 이미지를 로컬에 저장
                // console.log(`리사이징 이미지 info : ${JSON.stringify(info, null, 2)}`);
              })
              .toBuffer(); // 리사이징된 이미지를 노드에서 읽을수 있게 buffer로 변환
          
            })();
          }
        }
        
  })();
  // console.log(splitHeight);
  

});
