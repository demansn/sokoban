game.Pusher = function(x, y, z, w, h) {

 this.x = x;
 this.y = y;
 this.z = z;
 this.w = w;
 this.h = h;
 this.color = "rgb(255,0,0)";
 this.type = 4;
 this.stp = 50;
 this.speed = 10;
 this.isMove = false;

 this.isNotMoveUp = false;
 this.isNotMoveDown = false;
 this.isNotMoveLeft = false;
 this.isNotMoveRight = false;

 this.oldStepTime = 0;
 this.time = 0;
 this.counter = 0;
 this.route = {
  x: 0,
  y: 0
 };

 this.checkMovement = function() {
  var blocks = game.level.blocks,
          bl;

  this.isNotMoveUp = false;
  this.isNotMoveDown = false;
  this.isNotMoveLeft = false;
  this.isNotMoveRight = false;

  for (var i = 0; i < blocks.length; i += 1) {
   bl = blocks[i];
   if (bl.type == 0) {
    if (this.x - 1 < bl.x + bl.w && this.x + this.w > bl.x && this.y == bl.y) {
     this.isNotMoveLeft = true;
    }
    if (this.x + this.w + 1 > bl.x && this.x < bl.x && this.y == bl.y) {
     this.isNotMoveRight = true;
    }
    if (this.y - 2 < bl.y + bl.h && this.y + this.h > bl.y && this.x == bl.x) {
     this.isNotMoveUp = true;
    }
    if (this.y + this.h + 1 > bl.y && this.y < bl.y && this.x == bl.x) {
     this.isNotMoveDown = true;
    }
   }
  }
 };


 this.draw = function() {
  game.canvas.fillRectangle(this.x, this.y, this.w, this.h, this.color);
 };
 this.stopMove = function() {
  this.isMove = false;
  this.counter = 0;
  this.route.x = 0;
  this.route.y = 0;
 };

 this.step = function(stepTime) {
  this.checkMovement();
  if (this.isMove) {

   var blocks = game.level.blocks,
           boxes = game.level.boxes,
           bl,
           i;
   this.counter += this.speed;

   if (this.counter <= this.stp) {
    this.move(this.speed, this.speed);
   } else {
    this.stopMove();
   }

   for (i = 0; i < blocks.length; i += 1) {
    bl = blocks[i];
    if (bl.type == 0) {
     if (game.collisionDetection.check(this, bl)) {
      var dif = game.collisionDetection.difference(this, bl);
      this.move(this.route.x * dif.x, this.route.y * dif.y);
      this.stopMove();
     }
    }
   }

   for (i = 0; i < boxes.length; i += 1) {
    bl = boxes[i];
    if (game.collisionDetection.check(this, bl)) {

     var dif = game.collisionDetection.difference(this, bl);
     if (bl.isNotMoveLeft && dif.x > 0) {
      this.move(-dif.x, 0);
      this.stopMove();
      dif.x = 0;
     }
     if (bl.isNotMoveRight && dif.x < 0) {
      this.move(dif.x, 0);
      this.stopMove();
      dif.x = 0;
     }
     if (bl.isNotMoveUp && dif.y > 0) {
      this.move(0, -dif.y);
      this.stopMove();
      dif.y = 0;
     }

     if (bl.isNotMoveDown && dif.y < 0) {
      this.move(0, dif.y);
      this.stopMove();
      dif.y = 0;
     }

     bl.move(-dif.x, -dif.y);
    }
   }
  }
 };

 this.moveUp = function() {
  if (!this.isMove) {
   this.isMove = true;
   this.route.y = -1;
  }
 };

 this.moveDown = function() {
  if (!this.isMove) {
   this.isMove = true;
   this.route.y = 1;
  }
 };

 this.moveRight = function() {
  if (!this.isMove) {
   this.isMove = true;
   this.route.x = 1;
  }
 };

 this.moveLeft = function() {
  if (!this.isMove) {
   this.isMove = true;
   this.route.x = -1;
  }
 };

 this.move = function(dx, dy) {
  this.x += this.route.x * dx;
  this.y += this.route.y * dy;
 };
};