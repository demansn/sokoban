game.level = {
};
game.level.width = 0;
game.level.height = 0;
game.level.bWidth = 50;
game.level.bHeight = 50;
game.level.blocks = [];
game.level.boxes = [];
game.level.domObject = null;
game.level.pusher = null;
game.level.currentLevelData = null;


game.level.reset = function() {
	this.init(this.currentLevelData);
};



game.level.init = function(data) {

	var x,
					y,
					bl,
					i;

	this.blocks = [];
	this.boxes = [];
	this.pusher = null;

	game.playback.removeActiveObjects();

	for (y = 0; y < data.blocks.length; y += 1) {
		for (x = 0; x < data.blocks[y].length; x += 1) {
			bl = new game.LevelBlock(this.bWidth, this.bHeight, x * this.bWidth, y * this.bHeight, 0, data.blocks[y][x]);
			this.blocks.push(bl);
			game.playback.addActiveObject(bl);
		}
	}

	for (i = 0; i < data.boxes.length; i += 1) {
		bl = new game.MovingBox(data.boxes[i].x * this.bWidth, data.boxes[i].y * this.bHeight, 1, this.bWidth, this.bHeight, 3);
		this.boxes.push(bl);
		game.playback.addActiveObject(bl);
	}

	this.pusher = new game.Pusher(data.pusher.x * this.bWidth, data.pusher.y * this.bHeight, 1, this.bWidth, this.bHeight);
	game.playback.addActiveObject(this.pusher);

	game.playback.addActiveObject(new game.Caretaker());

	game.drawInput = new game.DrawInput();
	game.playback.addActiveObject(game.drawInput);

	this.currentLevelData = data;
};


