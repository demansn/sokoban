game.userInput = {
};
game.userInput.display = null;
game.userInput.selectedPusher = false;
game.userInput.duration = null;
game.userInput.moveRoute = {
	x: 0,
	y: 0
};
game.userInput.startPoint = {
};

game.userInput.isSelectPusher = function(x, y) {
	var
					offsetDisplay = getOffset(game.canvas.view),
					canvas = game.canvas,
					bx = parseInt((x - offsetDisplay.left) / canvas.view.offsetWidth * canvas.defaultWidth),
					by = parseInt((y - offsetDisplay.top) / canvas.view.offsetHeight * canvas.defaultHeight),
					ao = null,
					aos = game.playback.aos,
					select = false,
					left = 0,
					right = 0,
					top = 0,
					down = 0,
					dd = 10;


	for (var i = 0; i < aos.length; i += 1) {

		ao = aos[i];
		left = ao.x - dd;
		right = ao.x + ao.w + dd;
		top = ao.y - dd;
		down = ao.y + ao.h + dd;

		if (ao.type == game.level.pusher.type && left <= bx && right >= bx && top <= by && down >= by) {
			select = true;
			break;
		}
	}

	return select;
};

game.userInput.init = function() {

	//
	this.display = game.getDomObject("level");

	this.display.down(function(e) {

		var touch = e.touches ? e.touches[0] : {
		};
		var lx = parseInt(e.clientX || e.pageX || touch.pageX);
		var ly = parseInt(e.clientY || e.pageY || touch.pageY);

		game.userInput.selectedPusher = game.userInput.isSelectPusher(lx, ly);
		if (game.userInput.selectedPusher && !game.level.pusher.isMove) {
			game.drawInput.setShow(true);
			game.userInput.startPoint = {
				x: lx,
				y: ly
			};
		}
	});

	this.display.move(function(e) {

		var touch = e.touches ? e.touches[0] : {
		};
		var lx = parseInt(e.clientX || e.pageX || touch.pageX);
		var ly = parseInt(e.clientY || e.pageY || touch.pageY);

		if (game.userInput.selectedPusher) {

			var
							offsetDisplay = getOffset(game.canvas.view),
							canvas = game.canvas,
							x1 = parseInt((lx - offsetDisplay.left) / canvas.view.offsetWidth * canvas.defaultWidth),
							y1 = parseInt((ly - offsetDisplay.top) / canvas.view.offsetHeight * canvas.defaultHeight),
							x2 = parseInt((game.userInput.startPoint.x - offsetDisplay.left) / canvas.view.offsetWidth * canvas.defaultWidth),
							y2 = parseInt((game.userInput.startPoint.y - offsetDisplay.top) / canvas.view.offsetHeight * canvas.defaultHeight),
							dx = x1 - x2,
							dy = y1 - y2,
							adx = Math.abs(dx),
							ady = Math.abs(dy);

			if (this.duration == null) {

				this.duration = {
					x: adx + 5,
					y: ady + 5
				};

			} else if (this.duration.x < adx || this.duration.y < ady) {
				game.userInput.moveRoute.y = 0;
				game.userInput.moveRoute.x = 0;
				if (adx < ady) {

					if (dy > 0) {
						game.userInput.moveRoute.y = -1;
					} else if (dy < 0) {
						game.userInput.moveRoute.y = 1;
					}
				} else if (adx > ady) {
					if (dx < 0) {
						game.userInput.moveRoute.x = -1;
					} else if (dx > 0) {
						game.userInput.moveRoute.x = 1;
					}
				}

				game.userInput.startPoint = {
					x: lx,
					y: ly
				};

			}

			//game.userInput.selectedPusher = game.userInput.isSelectPusher(lx, ly);
		}

	});

	this.display.up(function() {
		if (game.userInput.selectedPusher) {

			if (game.userInput.moveRoute.x < 0) {
				game.level.pusher.moveLeft();
			} else if (game.userInput.moveRoute.x > 0) {
				game.level.pusher.moveRight();
			} else if (game.userInput.moveRoute.y < 0) {
				game.level.pusher.moveDown();
			} else if (game.userInput.moveRoute.y > 0) {
				game.level.pusher.moveUp();
			}

			game.userInput.moveRoute.x = 0;
			game.userInput.moveRoute.y = 0;
			game.userInput.selectedPusher = false;

		}
		game.drawInput.setShow(false);
	});
	this.display.out(function() {
		if (game.userInput.selectedPusher) {
			game.userInput.selectedPusher = false;

		}
		game.drawInput.setShow(false);
	});



};








