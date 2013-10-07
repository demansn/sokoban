game.DOMObjectController = function DOMObjectController(domObject) {
	this.view = domObject;
	this.style = domObject.style;
	this.style.opacity = 1;
	this.appearTimerId = null;
	this.disappearTimerId = null;
};

game.DOMObjectController.prototype.view = null;
game.DOMObjectController.prototype.style = null;
game.DOMObjectController.prototype.isShow = true;
game.DOMObjectController.prototype.isVisible = true;
game.DOMObjectController.prototype.appearTimerId = null;
game.DOMObjectController.prototype.disappearTimerId = null;

game.DOMObjectController.prototype.setHTML = function(html) {
	this.view.innerHTML = html;
};

game.DOMObjectController.prototype.getHTML = function() {
	return this.view.innerHTML;
};

game.DOMObjectController.prototype.setVisible = function(visible) {
	if (visible) {
		this.style.visibility = "visible";
	} else {
		this.style.visibility = "hidden";
	}
	this.isVisible = visible;
};

game.DOMObjectController.prototype.show = function() {
	this.isShow = true;
	this.style.display = "block";
	this.view.style.display = "block";
};

game.DOMObjectController.prototype.hide = function() {
	this.isShow = false;
	this.style.display = "none";
	this.view.style.display = "none";
};

game.DOMObjectController.prototype.bind = function(type, handler, preventBubble) {
	this.view.addEventListener(type, handler, preventBubble);
};

game.DOMObjectController.prototype.unbind = function(type, handler, preventBubble) {
	this.view.removeEventListener(type, handler, preventBubble);
};

game.DOMObjectController.prototype.appear = function(deley, x) {

	/*	var op;
	 x = x || 1;

	 if (!this.isVisible) {
	 this.setVisible(true);
	 }

	 op = (this.style.opacity) ? parseFloat(this.style.opacity) : parseInt(this.style.filter) / 100;
	 if (op < x) {

	 clearTimeout(this.appearTimerId);

	 op += 0.10;

	 this.style.opacity = op;

	 this.style.filter = 'alpha(opacity=' + op * 100 + ')';

	 this.appearTimerId = setTimeout(this.appear.bind(this, deley, x), deley);

	 }*/

};

game.DOMObjectController.prototype.disappear = function(deley, x) {
	/*var op = parseFloat(this.style.opacity);
	 x = x || 0.10;

	 op = (this.style.opacity) ? parseFloat(this.style.opacity) : parseInt(this.style.filter) / 100;

	 if (op > x) {

	 clearTimeout(this.disappearTimerId);

	 op -= 0.10;

	 this.style.opacity = op;

	 this.style.filter = 'alpha(opacity=' + op * 100 + ')';

	 this.disappearTimerId = setTimeout(this.disappear.bind(this, deley, x), deley);

	 } else {
	 this.setVisible(false);
	 }*/

};


game.DOMObjectController.prototype.addClass = function addClass(klass) {
	var classes = this.view.className.split(" "),
					newClassName = "";

	for (var i = 0; i < classes.length; i += 1) {
		if (classes[i] != klass) {
			newClassName += classes[i] + " ";
		}
	}


	this.view.className = newClassName + klass;
};

game.DOMObjectController.prototype.removeClass = function removeClass(klass) {
	var classes = this.view.className.split(" "),
					newClassName = "";

	for (var i = 0; i < classes.length; i += 1) {
		if (classes[i] != klass) {
			newClassName += classes[i] + " ";
		}
	}


	this.view.className = newClassName;
};

game.DOMObjectController.prototype.up = function up(listener) {
	game.eventHandling.addListener(game.ScreenEvents.UP, listener.bind(this), this.view, false);
};

game.DOMObjectController.prototype.down = function down(listener) {
	game.eventHandling.addListener(game.ScreenEvents.DOWN, listener.bind(this), this.view, false);
};

game.DOMObjectController.prototype.move = function move(listener) {
	game.eventHandling.addListener(game.ScreenEvents.MOVE, listener.bind(this), this.view, false);
};

game.DOMObjectController.prototype.over = function over(listener) {
	game.eventHandling.addListener(game.ScreenEvents.OVER, listener.bind(this), this.view, false);
};

game.DOMObjectController.prototype.out = function out(listener) {
	game.eventHandling.addListener(game.ScreenEvents.OUT, listener.bind(this), this.view, false);
};



game.DOMObjectController.prototype.reset = function() {
	this.style.visibility = "visible";
	this.style.display = "block";
	this.style.opacity = 1;
};

game.newDomObject = function(tagName) {
	var element = document.createElement(tagName),
					doc = new game.DOMObjectController(element);

	return doc;
};

game.getDomObject = function(id) {
	var element = document.getElementById(id),
					doc = new game.DOMObjectController(element);

	return doc;
};