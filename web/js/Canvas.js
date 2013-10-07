game.Canvas = function Canvas() {

};

game.Canvas.prototype.setup = function(width, height) {

 this.view = document.createElement("canvas");
 this.ctxt = this.view.getContext("2d");
 this.view.width = width || this.defaultWidth;
 this.view.height = height || this.defaultHeight;
 this.defaultWidth = width || this.defaultWidth;
 this.defaultHeight = height || this.defaultHeight;
};

game.Canvas.prototype.view = null;
game.Canvas.prototype.ctxt = null;
game.Canvas.prototype.defaultWidth = 0;
game.Canvas.prototype.defaultHeight = 0;

game.Canvas.prototype.drawRectangle = function(x, y, w, h, brushColor) {

 this.ctxt.save();

 this.ctxt.strokeStyle = brushColor;

 this.ctxt.lineWidth = 1;

 var X = x / this.view.offsetWidth * this.defaultWidth;
 var Y = y / this.view.offsetHeight * this.defaultHeight;

 this.ctxt.beginPath();
 this.ctxt.rect(x, y, w, h);
 this.ctxt.stroke();
 this.ctxt.closePath();
 this.ctxt.restore();

};

game.Canvas.prototype.fillRectangle = function(x, y, w, h, brushColor) {

 this.ctxt.save();

 this.ctxt.fillStyle = brushColor;

 var X = x / this.view.offsetWidth * this.defaultWidth;
 var Y = y / this.view.offsetHeight * this.defaultHeight;

 this.ctxt.beginPath();
 this.ctxt.fillRect(x, y, w, h);
 this.ctxt.stroke();
 this.ctxt.closePath();
 this.ctxt.restore();

};

game.Canvas.prototype.drawLine = function(x1, y1, x2, y2, brushSize, brushColor) {

 this.ctxt.save();

 this.ctxt.lineWidth = brushSize;
 this.ctxt.strokeStyle = brushColor;

 var nX1 = x1 / this.view.offsetWidth * this.defaultWidth;
 var nY1 = y1 / this.view.offsetHeight * this.defaultHeight;
 var nX2 = x2 / this.view.offsetWidth * this.defaultWidth;
 var nY2 = y2 / this.view.offsetHeight * this.defaultHeight;

 this.ctxt.beginPath();
 this.ctxt.moveTo(nX1, nY1);
 this.ctxt.lineTo(nX2, nY2);
 this.ctxt.stroke();
 this.ctxt.closePath();
 this.ctxt.restore();

};

game.Canvas.prototype.drawPoint = function(x, y, r, brushColor) {

 this.ctxt.save();
 this.ctxt.fillStyle = brushColor;
 this.ctxt.beginPath();

 var nX1 = x / this.view.offsetWidth * this.defaultWidth;
 var nY1 = y / this.view.offsetHeight * this.defaultHeight;

 this.ctxt.arc(nX1, nY1, r, 0, 2 * Math.PI, true);
 this.ctxt.closePath();
 this.ctxt.fill();
 this.ctxt.restore();

};

game.Canvas.prototype.drawSprite = function(owner) {

 this.ctxt.save();

 var
         //	X = x / this.canvas.offsetWidth * this.defaultWidth,
         //	Y = y / this.canvas.offsetHeight * this.defaultHeight,
         sprite = owner.sprite,
         image = owner.sprite.view;

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) // рисует фрагмент изображения
// Первый параметр указывает то, какое изображение обрабатывает
// sx, sy, sWidth, sHeight указывают параметры фрагмента на изображение-источнике
// dx, dy, dWidth, dHeight ответственны за координаты отрисовки фрагмента на холсте

 this.ctxt.drawImage(image, sprite.x, sprite.y, sprite.w, sprite.h, owner.x, owner.y, owner.w, owner.h);

 this.ctxt.stroke();
 this.ctxt.restore();

};

game.Canvas.prototype.fillCircle = function(x, y, r, color) {
 this.ctxt.beginPath();
 this.ctxt.arc(x, y, r, 0, 2 * Math.PI, false);
 this.ctxt.fillStyle = color;
 this.ctxt.fill();
 this.ctxt.lineWidth = 1;
 this.ctxt.strokeStyle = color;
 this.ctxt.stroke();
};

game.Canvas.prototype.fillPoligon = function(points, color) {

 this.ctxt.lineWidth = 1;
 this.ctxt.strokeStyle = color;
 this.ctxt.fillStyle = color;

 this.ctxt.beginPath();

 this.ctxt.moveTo(points[0].x, points[0].y);

 for (var i = 1; i < points.length; i += 1) {

  this.ctxt.lineTo(points[i].x, points[i].y);

 }

 this.ctxt.lineTo(points[0].x, points[0].y);

 this.ctxt.fill();
 this.ctxt.stroke();
 this.ctxt.closePath();
 /*this.ctxt.lineWidth = 1;
  this.ctxt.strokeStyle = color;
  this.ctxt.stroke();*/
};

game.Canvas.prototype.clear = function() {

// Store the current transformation matrix
 this.ctxt.save();

 // Use the identity matrix while clearing the canvas
 this.ctxt.beginPath();
 this.ctxt.setTransform(1, 0, 0, 1, 0, 0);

 this.ctxt.fillRect(0, 0, this.view.width, this.view.height);
 this.ctxt.clearRect(0, 0, this.view.width, this.view.height);
 this.ctxt.closePath();

 // Restore the transform
 this.ctxt.restore();

};