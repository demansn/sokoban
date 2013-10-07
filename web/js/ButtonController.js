game.ButtonContoller = function ButtonController(id) {
	this.domElement = game.getDomObject(id);
	this.id = id;

	this.up(function() {
		this.isDown = false;
		this.domElement.removeClass("selected");

		if (this.isCheck) {
			this.isCheck = false;
			this.domElement.removeClass("check");
		} else {
			this.isCheck = true;
			this.domElement.addClass("check");
		}
	});

	this.out(function() {
		if (this.isDown) {
			this.isDown = false;
			this.domElement.removeClass("selected");
		}
	});

	this.down(function() {
		this.isDown = true;

		this.domElement.addClass("selected");

	});

};

game.ButtonContoller.prototype.domElement = null;
game.ButtonContoller.prototype.isEnabled = true;
game.ButtonContoller.prototype.isDown = false;
game.ButtonContoller.prototype.isCheck = false;
game.ButtonContoller.prototype.id = null;

game.ButtonContoller.prototype.up = function(listener) {
	this.domElement.up(listener.bind(this));
};

game.ButtonContoller.prototype.down = function(listener) {
	this.domElement.down(listener.bind(this));
};

game.ButtonContoller.prototype.over = function(listener) {
	this.domElement.over(listener.bind(this));
};

game.ButtonContoller.prototype.out = function(listener) {
	this.domElement.out(listener.bind(this));
};