
const ones = [];
const zeros = [];

const supported = 'mediaDevices' in window.navigator;
console.log(`Supported: ${supported}`);

const constraints = { video: true };
window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  player.srcObject = stream;
});


const player = document.getElementById('video');

const bttn_0 = document.getElementById('bttn_0');
const bttn_1 = document.getElementById('bttn_1');

const canvasLeft = document.getElementById('canvasLeft');
const contextLeft = canvasLeft.getContext('2d');
const canvasStraight = document.getElementById('canvasStraight');
const contextStraight = canvasStraight.getContext('2d');
const canvasRight = document.getElementById('canvasRight');
const contextRight = canvasRight.getContext('2d');

player.style.cssText = "\
  -moz-transform: scale(-1, 1); \
  -webkit-transform: scale(-1, 1); \
  -o-transform: scale(-1, 1); \
  transform: scale(-1, 1); \
  filter: FlipH;";

canvasLeft.style.cssText = "\
  -moz-transform: scale(-1, 1); \
  -webkit-transform: scale(-1, 1); \
  -o-transform: scale(-1, 1); \
  transform: scale(-1, 1); \
  filter: FlipH;";

canvasLeft.addEventListener('click', () => {
  console.log("asdff");
  contextLeft.drawImage(player, 0, 0, canvasLeft.width, canvasLeft.height);
  const webcamImage = tf.fromPixels(canvasLeft, 1)
    .expandDims(0)
    .toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  zeros.push(webcamImage); /*global tf*/
  console.log(webcamImage.shape);
});

canvasRight.addEventListener('click', () => {
  contextRight.drawImage(player, 0, 0, canvasRight.width, canvasRight.height);
  const webcamImage = tf.fromPixels(canvasRight, 1)
    .expandDims(0)
    .toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  ones.push(stringifyTensor(webcamImage)); /*global tf*/
  console.log(webcamImage.shape);
});

function stringifyTensor(imgTensor, imgClass) {
  return JSON.stringify({
    data: imgTensor.dataSync(),
    shape: imgTensor.shape,
    imgClass: imgClass
  });
}

function parseTensor(str) {
  let obj = JSON.parse(str);
  return tf.tensor(obj[0], obj[1]);
}

function download(filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);
  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}

const wc = new Webcam(player);
//console.log(wc.capture());


