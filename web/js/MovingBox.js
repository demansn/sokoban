game.MovingBox = function(x, y, z, w, h, type) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
	this.h = h;
	this.type = type;
	this.color = "rgb(0,0,255)";
	this.sp = 50;
	this.speed = 200;
	this.isMove = false;
	this.isMoveUp = false;
	this.isMoveDown = false;
	this.isMoveLeft = false;
	this.isMoveRight = false;

	this.isNotMoveUp = false;
	this.oldStepTime = 0;
	this.time = 0;
	this.counter = 0;

	this.draw = function() {
		game.canvas.fillRectangle(this.x, this.y, this.w, this.h, this.color);
	};

	this.checkMovement = function() {
		var blocks = game.level.blocks,
						boxes = game.level.boxes,
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

		for (var i = 0; i < boxes.length; i += 1) {
			bl = boxes[i];
			if (bl != this) {
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

	this.step = function(stepTime) {
		if (this.isMove) {

			var blocks = game.level.blocks,
							boxes = game.level.boxes,
							bl;

			for (var i = 0; i < blocks.length; i += 1) {
				if (game.collisionDetection.check(this, bl)) {
					var dif = game.collisionDetection.difference(this, bl);
					this.move(this.route.x * dif.x, this.route.y * dif.y);
					this.isMove = false;
				}
			}

			for (i = 0; i < boxes.length; i += 1) {
				bl = boxes[i];
				if (game.collisionDetection.check(this, bl)) {

					var dif = game.collisionDetection.difference(this, bl);
					bl.move(-dif.x, -dif.y);
					this.isMove = false;
				}
			}

		}
		this.checkMovement();
	};


	this.move = function(dx, dy) {

		this.x += dx;
		this.y += dy;
	};
};
