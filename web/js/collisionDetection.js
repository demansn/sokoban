game.collisionDetection = {
};

game.collisionDetection.check = function(bl1, bl2) {
	var collision = false;

	if (bl1.x + bl1.w > bl2.x && bl1.x < bl2.x + bl2.w && bl1.y + bl1.h > bl2.y && bl1.y < bl2.y + bl2.h) {
		collision = true;
		;
	}

	return collision;
};

game.collisionDetection.difference = function(bl1, bl2) {

	var dx = 0, dy = 0;

	if (bl1.x != bl2.x) {
		if (bl1.x < bl2.x) {
			dx = -Math.abs(bl1.x + bl1.w - bl2.x);
		} else {
			dx = Math.abs(bl2.x + bl2.w - bl1.x);
		}
	}

	if (bl1.y != bl2.y) {
		if (bl1.y < bl2.y) {
			dy = -Math.abs(bl1.y + bl1.h - bl2.y);
		} else {
			dy = Math.abs(bl2.y + bl2.h - bl1.y);
		}
	}
	return {
		x: dx,
		y: dy
	};
};

