game = {
};

game.state = {
		mainMenu: "mainMenu",
		levelSelection: "levelSelection",
		loadLevel: "loadLevel",
		game: "game",
		pause: "pause",
		settings: 4,
		result: "result",
		about: 6
};

game.stackStates = [];
game.currentState = null;
game.nextLevel = 0;


game.setState = function(state) {
		var st = this.state;

		switch (state) {
				case st.mainMenu:
						this.gui.showScreen(state);
						break;

				case st.levelSelection:
						this.gui.showScreen(state);
						break;

				case st.settings:
						this.gui.showScreen(state);
						break;

				case st.loadLevel:
						this.loadLevel();
						break;

				case st.game:
						game.playback.play();
						this.gui.showScreen("game");
						break;

				case st.pause:
						game.playback.pause();
						this.gui.showScreen("pause");
						break;

				case st.result:
						this.gui.showScreen("result");
						break;
				case st.about:

						break;
		}

		if (this.currentState) {
				this.stackStates.push(this.currentState);
		}

		this.currentState = state;

};

game.setPreviousState = function() {
		var previusState = this.stackStates.pop();
		this.setState(previusState);
};

game.loadLevel = function() {
		try {
				if (this.currentLevel < this.data.levels.length) {
						this.level.init(this.data.levels[this.currentLevel]);
						this.setState("game");
				} else {
						this.setState("mainMenu");
				}
		} catch (e) {
				alert("error loadLevel: " + JSON.stringify(e) + " " + e.message);
		}
};

game.completeLevel = function() {

		this.playback.pause();

		if (this.currentLevel == this.nextLevel) {
				if (this.data.levels.length - 1 > this.nextLevel) {
						this.nextLevel += 1;
						this.levelSelection.unlock(this.nextLevel);
						this.currentLevel = this.nextLevel;
						//this.levelSelection.select(this.nextLevel);
				} else {
						this.currentLevel += 1;
				}
		}
		if (this.currentLevel < this.nextLevel) {
				this.currentLevel += 1;
		}

		this.setState("result");

};

game.init = function() {
		try {
				this.gui.addScreen("mainMenu");
				this.gui.addScreen("levelSelection");
				this.gui.addScreen("game");
				this.gui.addScreen("settings");
				this.gui.addScreen("pause");
				this.gui.addScreen("result");
				this.gui.addScreen("gameOver");

				this.canvas = new this.Canvas();
				this.canvas.setup(510, 390);
				document.getElementById("level").appendChild(this.canvas.view);

				this.gui.initPosition(600, 400);


				/* инициализация кнопок */

				//menu
				this.gui.addButton({
						id: "menuPlayBtn",
						up: function() {
								game.setState("levelSelection");
						}
				});

				this.gui.addButton({
						id: "lsBackBtn",
						up: function() {
								game.setState("mainMenu");
						}
				});
//game
				this.gui.addButton({
						id: "gamePauseBtn",
						up: function() {
								game.setState("pause");
						}
				});

				this.gui.addButton({
						id: "gameRetryBtn",
						up: function() {
								game.level.reset();
						}
				});
//result
				this.gui.addButton({
						id: "resultStopBtn",
						up: function() {
								game.setState("mainMenu");
						}
				});

				this.gui.addButton({
						id: "resultRetryBtn",
						up: function() {
								game.level.reset();
								game.setPreviousState();
						}
				});

				this.gui.addButton({
						id: "resultLSBtn",
						up: function() {
								game.setState("levelSelection");
						}
				});

				this.gui.addButton({
						id: "resultForwardBtn",
						up: function() {
								game.setState("loadLevel");
						}
				});

				//pause
				this.gui.addButton({
						id: "pauseStopBtn",
						up: function() {
								game.setState("mainMenu");
						}
				});

				this.gui.addButton({
						id: "pauseRetryBtn",
						up: function() {
								game.level.reset();
								game.setPreviousState();
						}
				});

				this.gui.addButton({
						id: "pauseLSBtn",
						up: function() {
								game.setState("levelSelection");
						}
				});

				this.gui.addButton({
						id: "pausePlayBtn",
						up: function() {
								game.setState("game");
						}
				});

				this.gui.addButton({
						id: "gameOverStopBtn",
						up: function() {
								game.setState("mainMenu");
						}
				});



				this.gui.hideScreens();
				window.addEventListener("resize", function() {
						game.gui.resize();
				}, false);

				this.gui.resize();
				this.levelSelection.init();
				this.levelSelection.unlock(this.nextLevel);
				this.userInput.init();
				this.setState("mainMenu");
		} catch (e) {
				alert(e.message);
		}
};

