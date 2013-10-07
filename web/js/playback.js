game.playback = {
};

game.playback.init = function(data) {
		this.fps = 30;
		this.skipTiks = 1000 / this.fps;
		this.maxFrameSkip = 5;
		this.stepTimeCycle = 15;
		this.startTime = this.getCurrentTime();

		return this;
};
game.playback.aos = [];
game.playback.stepTimeCycle = 15;
game.playback.fps = 30;
game.playback.skipTiks = 1000 / 30;
game.playback.maxFrameSkip = 5;
game.playback.nextGameTick = 0;
game.playback.startTime = 0;
game.playback.counterFPS = 0;
game.playback.oldFPS = 0;
game.playback.oldStepTime = null;

game.playback.idTimerPlayback = null;
game.playback.idTimerResetCounterFPS = null;

game.playback.play = function() {

		//logToConsole("PlaybackController.prototype.play");
		this.nextGameTick = this.getCurrentTime() - this.startTime;
		if (this.idTimerPlayback) {
				window.clearInterval(this.idTimerPlayback);
		}
		this.idTimerPlayback = window.setInterval(this.playback.bind(this), this.stepTimeCycle);
		if (this.idTimerResetCounterFPS) {
				window.clearInterval(this.idTimerResetCounterFPS);
		}
		this.idTimerResetCounterFPS = window.setInterval(this.resetCounterFPS.bind(this), 1000);

		this.resetCounterFPS();
		this.playback();

};

game.playback.pause = function() {
		//logToConsole("PlaybackController.prototype.pause");
		window.clearInterval(this.idTimerPlayback);
		window.clearInterval(this.idTimerResetCounterFPS);

		this.idTimerResetCounterFPS = null;
		this.idTimerPlayback = null;

};

game.playback.resetCounterFPS = function() {
		this.oldFPS = 0 + this.counterFPS;
		this.counterFPS = 0;
};

game.playback.playback = function() {

		var loops = 0;
		var ct = this.getTickCount();
		var dt;

		if (this.oldStepTime == null) {
				this.oldStepTime = ct;
		}
		dt = (ct - this.oldStepTime);

		while (ct >= this.nextGameTick && loops < this.maxFrameSkip) {

				this.step(dt);
				this.nextGameTick += this.skipTiks;
				loops++;
				this.counterFPS++;
		}
		this.oldStepTime = ct;
		this.draw();

};

game.playback.step = function(stepTime) {
		for (var i = 0; i < this.aos.length; i += 1) {
				if (this.aos[i].step) {
						this.aos[i].step(stepTime);
				}
		}
};

game.playback.draw = function() {

		game.canvas.clear();
		for (var i = 0; i < this.aos.length; i += 1) {
				if (this.aos[i].draw) {
						this.aos[i].draw();
				}
		}

};
game.playback.addActiveObject = function(ao) {
		this.aos.push(ao);
};

game.playback.removeActiveObjects = function() {
		this.aos = [];
};

game.playback.getTickCount = function() {

		return  this.getCurrentTime() - this.startTime;

};

game.playback.getCurrentTime = function() {

		return new Date().getTime();

};

game.playback.getFPS = function() {
		return this.oldFPS;
};