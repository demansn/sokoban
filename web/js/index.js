function DOMLoad() {
	document.addEventListener('touchmove', preventDefaultScroll, false);
	document.addEventListener("deviceready", onDeviceReady, false);
	game.init();

}

function onDeviceReady() {
	if (game.isInit) {
		game.init();
	}
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function(thisAgrg) {

		var fn = this,
						slice = Array.prototype.slice,
						agrs = slice.call(arguments, 1);

		return function() {
			return fn.apply(thisAgrg, agrs.concat(slice.call(arguments)));
		};
	};
}

preventDefaultScroll = function(event) {
	// Prevent scrolling on this element
	event.preventDefault();
	window.scroll(0, 0);
	return false;
};

function getOffset(elem) {
	if (elem.getBoundingClientRect) {
		// "правильный" вариант
		return getOffsetRect(elem);
	} else {
		// пусть работает хоть как-то
		return getOffsetSum(elem);
	}
}

function getOffsetSum(elem) {
	var top = 0,
					left = 0;
	while (elem) {
		top = top + parseInt(elem.offsetTop);
		left = left + parseInt(elem.offsetLeft);
		elem = elem.offsetParent;
	}

	return {
		top: top,
		left: left
	};
}

function getOffsetRect(elem) {
	// (1)
	var box = elem.getBoundingClientRect();

	// (2)
	var body = document.body;
	var docElem = document.documentElement;

	// (3)
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

	// (4)
	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;

	// (5)
	var top = box.top + scrollTop - clientTop;
	var left = box.left + scrollLeft - clientLeft;

	return {
		top: Math.round(top),
		left: Math.round(left)
	};
}

