var pixelSize = 6;
var offset;
var excite=0;
var mic;
function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  noStroke();
  fill(255);
}
var yPos=0; var yPosStore=0; var dogWidth=17;
function draw() {
  var vol = mic.getLevel()*5;
  background(0);
  pixelSize = Math.round(height/100);
  excite=map(mouseY, 0, height, 1, 0);
  //excite=vol;
  dogWidth=Math.round(map(excite,0,1,26,17));
  //dogWidth=Math.round(map(mouseX,0, width, 16, 23));
  scale(1,-1);
  translate(width/2-(dogWidth+4)/2*pixelSize, -height+20);
  yPos=0;
  new Feet();
  new Body(1,dogWidth+1);
  new Head(2,dogWidth);
  new Ear1(2);
  yPos=yPosStore;
  new Ear2(dogWidth);

}

function Pixel(X,Y,COLOR) {
  push();
  fill(COLOR);
  offset = createVector();
  rect(X*pixelSize,-Y*pixelSize,pixelSize,pixelSize);
  pop();
}
function Line(X1,X2,Y,COLOR) {
  push();
  fill(COLOR);
  rect(X1*pixelSize,-Y*pixelSize,(X2-X1+1)*pixelSize,pixelSize);
  pop();
}
function LineV(Y1,Y2,X,COLOR) {
  push();
  fill(COLOR);
  rect(X*pixelSize,-Y1*pixelSize,pixelSize,-(Y2-Y1+1)*pixelSize);
  pop();
}
function Rect(X1,X2,HEIGHT,COLOR) {
  for (var i=0; i<=HEIGHT; i++) {
    new Line(X1,X2,yPos,255);
    yPos+=-1;
  }
}
function Feet() {
  new Line(-2,5,yPos,255); new Line(dogWidth-3,dogWidth+4,yPos,255);
  new Pixel(-1,yPos,0); new Pixel(1,yPos,0);   new Pixel(dogWidth+3,yPos,0); new Pixel(dogWidth+1,yPos,0);
  yPos+=-1;
  new Line(-2,6,yPos,255); new Line(dogWidth-4,dogWidth+4,yPos,255);
  yPos+=-1;
  new Line(-2,6,yPos,255); new Line(dogWidth-4,dogWidth+4,yPos,255);
  yPos+=-1;
  new Line(-1,6,yPos,255); new Line(8,dogWidth-6,yPos,255); new Line(dogWidth-4,dogWidth+3,yPos,255);
  yPos+=-1;
  new Rect(0,dogWidth+2,3,255);
}
function Body(X1,X2) {
  var bodyExcite = Math.round(map(excite,0,1,0,40));
  var feetExcite = Math.round(map(excite,0,1,0,6));
  var armExcite = Math.round(map(excite,0,1,0,35));
  var height = 16 + bodyExcite;
  new LineV(yPos-height+3,yPos-2-feetExcite,X1-1,255);
  new LineV(yPos-height+3,yPos-2-feetExcite,X2+1,255);
  new Rect(X1,X2,height,255);
  //feet marks
  new Line(X1+1,X1+2,yPos+height-feetExcite,0);
  new Pixel(X1+3,yPos+height-feetExcite+1,0);
  new Line(X2-2,X2-1,yPos+height-feetExcite,0);
  new Pixel(X2-3,yPos+height-feetExcite+1,0);
  //paw 1
  new Pixel(X1+2,yPos+4,0);
  new LineV(yPos+4,yPos+height-armExcite-6,X1+3,0);
  new Line(X1,X1+2,yPos+height-armExcite-4,0);
  new Pixel(X1-1,yPos+height-armExcite-5,0);
  new Pixel(X1+1,yPos+height-armExcite-5,0);
  //paw 2
  new Pixel(X2-2,yPos+4,0);
  new LineV(yPos+4,yPos+height-armExcite-6,X2-3,0);
  new Line(X2+1,X2-3,yPos+height-armExcite-4,0);
  new Pixel(X2+1,yPos+height-armExcite-5,0);
  new Pixel(X2-1,yPos+height-armExcite-5,0);
  //belly button
  new Line(Math.ceil(dogWidth/2)+0.5, Math.floor(dogWidth/2)+1.5,yPos+height-feetExcite-4,0);
}
function Head(X1,X2) {
  var headExcite = Math.round(map(excite,0,1,0,3));
  var cheekExcite = Math.round(map(excite,0,1,0,1));
  var widthMap = Math.floor(map(dogWidth,16,23,0,2));
  var height = 13 + headExcite;
  //new Pixel(X1-1, yPos-5+cheekExcite,255);
  //new Pixel(X1-1, yPos-16-cheekExcite+5,255);
  new LineV(yPos-16-cheekExcite+5,yPos-5,X1-1,255);
  new LineV(yPos-16-cheekExcite+5,yPos-5,X2+1,255);
  Rect(X1,X2,height,255);
  //face
  new LineV(yPos+height-cheekExcite-8, yPos+height-cheekExcite-7, X1+2+widthMap, 0);
  new LineV(yPos+height-cheekExcite-8, yPos+height-cheekExcite-7, X2-2-widthMap, 0);
  new Line(Math.ceil(dogWidth/2), Math.floor(dogWidth/2)+2,yPos+height-cheekExcite-6,0);
  //mouth
  if(excite<0.2) {
    new Pixel(Math.ceil(dogWidth/2)-1-widthMap,yPos+height-cheekExcite-4,0); new Pixel(Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite-4,0);
    new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite-3,0);
  } else {
    new Pixel(Math.ceil(dogWidth/2)-2-widthMap,yPos+height-cheekExcite-4,0); new Pixel(Math.floor(dogWidth/2)+4+widthMap,yPos+height-cheekExcite-4,0);
    new Line(Math.ceil(dogWidth/2)-1-widthMap, Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite-3,0);
    if (excite>0.4 && excite<0.6) {
      new Line(Math.ceil(dogWidth/2)-1-widthMap, Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite-2,0);
      new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite-2,255);
      new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite-1,0);
    } else if (excite>0.6) {
      new Line(Math.ceil(dogWidth/2)-1-widthMap, Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite-2,0);
      new Line(Math.ceil(dogWidth/2)-1-widthMap, Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite-1,0);
      if (excite<0.8) {
        new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite-1,255);
        new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite,0);
      } else {
        new Line(Math.ceil(dogWidth/2)-widthMap-1, Math.floor(dogWidth/2)+3+widthMap,yPos+height-cheekExcite,0);
        new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite+1,0);
        new Line(Math.ceil(dogWidth/2)-widthMap, Math.floor(dogWidth/2)+2+widthMap,yPos+height-cheekExcite,255);
      }

    }
  }

}
function Ear1(X) {
  yPosStore=yPos;
  var earExcite=Math.round(map(excite,0,1,0,1));
  new Line(X,X+3,yPos,255);
  yPos+=-1;
  for (i=0; i<=earExcite; i++) {
    new Line(X,X+2,yPos,255);
    yPos+=-1;
  }
  for (i=0; i<=earExcite; i++) {
    new Line(X,X+1,yPos,255);
    yPos+=-1;
  }
  new Pixel(X,yPos,255);
  yPos+=-1;
}
function Ear2(X) {
  var earExcite=Math.round(map(excite,0,1,0,1));
  new Line(X-3,X,yPos,255);
  yPos+=-1;
  for (i=0; i<=earExcite; i++) {
    new Line(X-2,X,yPos,255);
    yPos+=-1;
  }
  for (i=0; i<=earExcite; i++) {
    new Line(X-1,X,yPos,255);
    yPos+=-1;
  }
  new Pixel(X,yPos,255);
  yPos+=-1;
}
