game.LevelBlock = function(w, h, x, y, z, type) {

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.z = z;
	this.type = type;

	var color;

	switch (type) {
		case 0:
			color = "rgb(0,0,0)";
			break;
		case 1:
			color = "rgb(255,255,255)";
			break;
		case 2:
			color = "rgb(0,255,0)";
			break;
	}

	this.color = color;

	this.draw = function() {

		game.canvas.fillRectangle(this.x, this.y, this.w, this.h, this.color);
	};


};