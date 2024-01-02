// Get the image element and the buttons from the HTML
const imageElement = document.getElementById('image');
const selectImageButton = document.getElementById('select-image-button');
const splitImageButton = document.getElementById('split-image-button');

let imagePath = '';

// When the 'Select Image' button is clicked...
selectImageButton.addEventListener('click', async () => {
  // Use the API to select an image
  imagePath = await window.api.selectImage();

  // If an image was selected...
  if (imagePath) {

    // Use the API to read the image
    const imageBuffer = await window.api.readImage(imagePath);

    // Convert the image to a Data URL and set it as the image element's source
    // const dataUrl = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
    imageElement.src = imagePath;
  }
 
});




//image Editor

const imageEditor = document.getElementById('imageEditor');
const resizeHandle1 = document.getElementById('resizeHandle1');
const resizeHandle2 = document.getElementById('resizeHandle2');
const resizeHandle3 = document.getElementById('resizeHandle3');
const resizeHandle4 = document.getElementById('resizeHandle4');

let isResizing0 = false;
let isResizing1 = false;
let isResizing2 = false;
let isResizing3 = false;
let isResizing4 = false;

let pointerX = false;
let pointerY = false;

//set Aspect Ratio
let aspectRatio;

if(aspectRatio===undefined){
  aspectRatio =3;

}
 // width : height = 3 : 1 (default)
document.getElementById('ratio-1-3').addEventListener('click', () => {
  aspectRatio = 3;

  //change the editorBox
  imageEditor.style.width = `${imageElement.offsetWidth}px`;
  imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;
});

document.getElementById('ratio-2-3').addEventListener('click', () => {
    aspectRatio = 1.5 ;
    //change the editorBox
    imageEditor.style.width = `${imageElement.offsetWidth}px`;
    imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;
    //초과방지
    if(imageEditor.offsetHeight>imageElement.offsetHeight-imageEditor.offsetTop){
      // alert("AAA");
      if(100>imageElement.offsetHeight-imageEditor.offsetHeight){
        alert("Error! Image is too small!");
        //1:3 return
        aspectRatio = 3;
        //change the editorBox
        imageEditor.style.width = `${imageElement.offsetWidth}px`;
        imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;
        //1:3버튼 포커스해야됨
        
      }else{
        imageEditor.style.top = `${imageElement.offsetHeight-imageEditor.offsetHeight}px`;
      }
    }
});

document.getElementById('ratio-3-3').addEventListener('click', () => {
  aspectRatio = 1; // 3:3 ratio is equivalent to 1:1 ratio
    //change the editorBox
    imageEditor.style.width = `${imageElement.offsetWidth}px`;
    imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;

    //초과방지
    if(imageEditor.offsetHeight>imageElement.offsetHeight-imageEditor.offsetTop){
      // alert("AAA");
      if(100>imageElement.offsetHeight-imageEditor.offsetHeight){
        alert("Error! Image is too small!");
        //1:3 return
        aspectRatio = 3;
        //change the editorBox
        imageEditor.style.width = `${imageElement.offsetWidth}px`;
        imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;
        //1:3버튼 포커스해야됨
        
      }else{
        imageEditor.style.top = `${imageElement.offsetHeight-imageEditor.offsetHeight}px`;
      }
    }
});


//When img selected, we have to match the editor's area.

imageElement.addEventListener("load", async ()=>{

  //message gone
  document.querySelector("#introMessage").classList.add("none");
  //editor on
  imageEditor.classList.remove("none");
  resizeHandle1.classList.remove("none");
  resizeHandle2.classList.remove("none");
  resizeHandle3.classList.remove("none");
  resizeHandle4.classList.remove("none");
  
  //centerize
  document.querySelector("#imageBox2").style.width=`${imageElement.offsetWidth}px`;

  //editor 동기화
  imageEditor.style.width = `${imageElement.offsetWidth}px`;
  imageEditor.style.height = `${imageElement.offsetWidth/aspectRatio}px`;


})

//translate function

imageEditor.addEventListener('mousedown', (e) => {
  e.preventDefault();
  e.stopPropagation()
  isResizing0 = true;
  // console.log(isResizing0);
  
  
});



resizeHandle1.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation()
    isResizing1 = true;
});

resizeHandle2.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation()
    isResizing2 = true;
});
resizeHandle3.addEventListener('mousedown', (e) => {
  e.preventDefault();
  e.stopPropagation()
  isResizing3 = true;
});

resizeHandle4.addEventListener('mousedown', (e) => {
  e.preventDefault();
  e.stopPropagation()
  isResizing4 = true;
});

window.addEventListener('mousemove', (e) => {
  let newLeft, newRight, newTop, newWidth, newHeight = 0;
  let basicTop =50;
  let basicLeft = document.querySelector("#imageBox").offsetLeft;



  if(isResizing0){
    
    

    

    newLeft = Math.min(Math.max((e.pageX-basicLeft-(imageEditor.offsetWidth/2)),imageElement.offsetLeft), imageElement.offsetWidth-imageEditor.offsetWidth);
    newTop = Math.min(Math.max((e.pageY-basicTop-(imageEditor.offsetHeight/2)),imageElement.offsetTop),imageElement.offsetHeight-imageEditor.offsetHeight);
    imageEditor.style.left = `${newLeft}px`;
    imageEditor.style.top = `${newTop}px`;
    
  }


  if (isResizing1) {
      // console.dir(imageElement.offsetTop);
      // console.log(imageElement.offsetWidth);

      newLeft = Math.max(e.pageX-basicLeft,imageElement.offsetLeft);
      newTop = Math.max(e.pageY-basicTop,imageElement.offsetTop);
      newWidth = imageElement.offsetWidth - newLeft;
      newHeight = newWidth / aspectRatio - newTop;


          imageEditor.style.left = `${newLeft}px`;
          imageEditor.style.top = `${newTop}px`;
          imageEditor.style.width = `${newWidth}px`;
          imageEditor.style.height = `${newWidth/aspectRatio}px`;
    
  }

  if (isResizing2) {

    //오른쪽을 튀어나오면 안됨. 그러면 이미지엘리먼트x - 이미지에디터.left 가 맥스
    // newLeft = Math.max(e.pageX-basicLeft,imageElement.offsetLeft);

    newTop = Math.max(e.pageY-basicTop,imageElement.offsetTop);
    newWidth = Math.min(e.pageX-basicLeft , imageElement.offsetWidth -imageEditor.offsetLeft);

    // 

    // imageEditor.style.right = `${newRight}px`;
    imageEditor.style.top = `${newTop}px`;
    imageEditor.style.width = `${newWidth}px`;
    imageEditor.style.height = `${newWidth/aspectRatio}px`;

    
  }

  if (isResizing3) {
      newLeft = Math.max(e.pageX-basicLeft,imageElement.offsetLeft);
      newWidth = (imageEditor.offsetLeft + imageEditor.offsetWidth) - newLeft;
      // newHeight = newWidth / aspectRatio;


      imageEditor.style.left = `${newLeft}px`;
      imageEditor.style.width = `${newWidth}px`;
      imageEditor.style.height = `${newWidth/aspectRatio}px`;
  }

  if (isResizing4) {
      newWidth = Math.min(e.pageX-basicLeft , imageElement.offsetWidth -imageEditor.offsetLeft);

      imageEditor.style.width = `${newWidth}px`;
      imageEditor.style.height = `${newWidth/aspectRatio}px`;
  }
});




window.addEventListener('mouseup', (e) => {
    isResizing1 = false;
    isResizing2 = false;
    isResizing3 = false;
    isResizing4 = false;
    isResizing0 = false;

});

//end


// When the 'Split Image' button is clicked...
splitImageButton.addEventListener('click', async () => {
  // If an image has been selected...
  if (imagePath) {
    let left = imageEditor.offsetLeft; 
    let top = imageEditor.offsetTop;
    let width = imageEditor.offsetWidth;
    let height = imageEditor.offsetHeight;
    let imageWidth = imageElement.offsetWidth;
    let row = 3/aspectRatio;



    // Use the API to split the image
    const message = await window.api.splitImage(imagePath,left,top,width,height,imageWidth,row);
    
    // Log the message
    alert("Done!!! Check your Desktop/result!");
  }
});

// Listen for the 'split-image-complete' event
window.api.on('split-image-complete', (message) => {
  // When the image has been split, log the message
  alert("completeMessage");
});
