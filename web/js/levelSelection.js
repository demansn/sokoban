game.levelSelection = {
};

game.levelSelection.items = {
};
game.levelSelection.lockItems = {
};
game.levelSelection.selectionItem = null;

game.levelSelection.unlock = function(id) {
	this.lockItems[id] = false;
	this.items[id].removeClass("itemLock");
};

game.levelSelection.select = function(itemId) {
	for (var id in this.items) {
		if (id == itemId) {
			this.items[id].addClass("itemSelection");
		} else {
			this.items[id].removeClass("itemSelection");
		}
	}
	this.selectionItem = itemId;
	game.currentLevel = this.selectionItem;
};

game.levelSelection.init = function() {
	var itemsView = document.getElementsByClassName("item"), i, l, item;

	for (i = 0, l = itemsView.length; i < l; i += 1) {
		item = game.getDomObject(itemsView[i].id);
		item.addClass("itemLock");
		this.lockItems[i] = true;
		item.levelId = i;
		item.down(function() {
			if (!game.levelSelection.lockItems[this.levelId]) {
				this.addClass("itemSelected");
			}
		});

		item.up(function() {
			if (!game.levelSelection.lockItems[this.levelId]) {
				this.removeClass("itemSelected");
				game.levelSelection.select(this.levelId);
				game.setState("loadLevel");
			}
		});
		this.items[i] = item;
	}
};