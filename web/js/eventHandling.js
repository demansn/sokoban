/**
 *
 * @type type
 */
game.MouseEvents = {
	MOUSE_DOWN: ["onmousedown", "mousedown"],
	MOUSE_MOVE: ["onmousemove", "mousemove"],
	MOUSE_UP: ["onmouseup", "mouseup"],
	MOUSE_CLICK: ["onclick", "click"],
	MOUSE_OUT: ["onmouseout", "mouseout"],
	MOUSE_OVER: ["onmouseover", "mouseover"]
};

/**
 *
 * @type type
 */
game.TouchEvents = {
	TOUCH_START: "touchstart",
	TOUCH_MOVE: "touchmove",
	TOUCH_END: "touchend",
	TOUCH_ENTER: "touchenter",
	TOUCH_LEAVE: "touchleave",
	TOUCH_CANCEL: "touchcancel"
};

/**
 *
 * @type type
 */
game.ScreenEvents = {
	DOWN: "",
	UP: "",
	MOVE: "",
	OVER: "",
	OUT: ""
};
game.eventHandling = {
	isAttachEventUsed: false,
	isIE: false,
	ieListenerFunc: null,
	MOUSE_BUTTON_LEFT: null,
	MOUSE_BUTTON_RIGHT: null,
	isTouchSupported: "ontouchend" in document || "ontouchend" in document.body || "ontouchend" in window,
	fixEvents: function() {
		if (this.isTouchSupported) {
			game.ScreenEvents.DOWN = game.TouchEvents.TOUCH_START;
			game.ScreenEvents.UP = game.TouchEvents.TOUCH_END;
			game.ScreenEvents.MOVE = game.TouchEvents.TOUCH_MOVE;
			game.ScreenEvents.OVER = game.TouchEvents.TOUCH_ENTER;
			game.ScreenEvents.OUT = game.TOUCH_LEAVE;
		} else {
			game.ScreenEvents.DOWN = game.MouseEvents.MOUSE_DOWN;
			game.ScreenEvents.UP = game.MouseEvents.MOUSE_UP;
			game.ScreenEvents.MOVE = game.MouseEvents.MOUSE_MOVE;
			game.ScreenEvents.OVER = game.MouseEvents.MOUSE_OVER;
			game.ScreenEvents.OUT = game.MouseEvents.MOUSE_OUT;
		}
	},
	addListener: function(type, handler, domObject, preventing) {
		if (!domObject) {
			domObject = this.isAttachEventUsed ? document : window;
		}

		if (preventing) {
			handler = function(handlerFunc) {
				return function(e) {
					e.preventDefault();
					handlerFunc(e.changedTouches ? e.changedTouches[e.changedTouches.length - 1] : e);
				};
			}(handler);
		}

		if (this.isAttachEventUsed) {
			if (type instanceof Array) {
				domObject.attachEvent(type[0], handler);
			} else {
				domObject.attachEvent(type, handler);
			}
		} else {
			if (type instanceof Array) {
				domObject.addEventListener(type[1], handler, false);
			} else {
				domObject.addEventListener(type, handler, false);
			}
		}
		return handler;
	},
	removeListener: function(type, handler, domObject) {
		if (!domObject) {
			domObject = this.isAttachEventUsed ? document : window;
		}
		if (this.isAttachEventUsed) {
			if (type instanceof Array) {
				domObject.detachEvent(type[0], handler);
			} else {
				domObject.detachEvent(type, handler);
			}
		} else {
			if (type instanceof Array) {
				domObject.removeEventListener(type[1], handler, false);
			} else {
				domObject.removeEventListener(type, handler, false);
			}
		}
	},
	init: function() {
		this.isIE = (/MSIE (\d+\.\d+);/.test(navigator.userAgent));

		try {
			if (this.isIE && window.opera) {
				this.isIE = false;
			}
		} catch (err) {
			ERROR(err);
		}

		this.MOUSE_BUTTON_LEFT = this.isIE ? 1 : 0;
		this.MOUSE_BUTTON_RIGHT = this.isIE ? 2 : 3;

		if (document && document.body) {
			this.ieListenerFunc = document["attachEvent"] || document.body["attachEvent"];
			this.isAttachEventUsed = (this.ieListenerFunc != undefined);
		} else {
			alert("can't init listener func, page not loaded yet");
		}

		this.fixEvents();
	}
};

game.eventHandling.init();