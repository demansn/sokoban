game.Caretaker = function() {

	this.completeLevel = function() {
		game.completeLevel();
	};

	this.step = function() {
		var boxes = game.level.boxes;
		var blocks = game.level.blocks;
		var target = 0;
		var bl;

		for (var i = 0, l = blocks.length; i < l; i += 1) {
			bl = blocks[i];
			if (bl.type == 2) {
				for (var j = 0; j < boxes.length; j += 1) {
					if (bl.x == boxes[j].x && bl.y == boxes[j].y) {
						target += 1;
					}
				}
			}
		}

		if (boxes.length > 0 && target == boxes.length) {
			this.completeLevel();
		}

	};

};

