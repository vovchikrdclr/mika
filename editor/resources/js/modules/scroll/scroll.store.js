define(['dispatcher'], function(dispatcher) {

	"use strict";

	var initialized = false;
	var scrolledTop  = 0;
	var scrolledLeft = 0;

	var _scrollPositionTop = function() {
		var position = (window.pageYOffset || window.document.scrollTop) - (window.document.clientTop || 0);
		if (isNaN(position)) position = 0;
		return position;
	}
	var _scrollPositionLeft = function() {
		var position = (window.pageXOffset || window.document.scrollLeft) - (window.document.clientLeft || 0);
		if (isNaN(position)) position = 0;
		return position;
	}

	var _init = function() {
		scrolledTop  = _scrollPositionTop();
		scrolledLeft = _scrollPositionLeft();

		window.addEventListener('scroll', function(e) {
			scrolledTop  = _scrollPositionTop();
			scrolledLeft = _scrollPositionLeft();

			eventEmitter.dispatch({
				type: 'change'
			});
		}, false);
	}

	var eventEmitter = function() {
		var _handlers = [];

		var dispatch = function(event) {
			for (var i = _handlers.length - 1; i >= 0; i--) {
				_handlers[i](event);
			}
		}
		var subscribe = function(handler) {
			_handlers.push(handler);
		}
		var unsubscribe = function(handler) {
			for (var i = 0; i <= _handlers.length - 1; i++) {
				if (_handlers[i] == handler) {
					_handlers.splice(i--, 1);
				}
			}
		}

		return {
			dispatch: dispatch,
			subscribe: subscribe,
			unsubscribe: unsubscribe
		}
	}();

	var getData = function() {
		return {
			top:  scrolledTop,
			left: scrolledLeft
		}
	}

	if (!initialized) {
		initialized = true;
		_init();
	}

	return {
		eventEmitter: eventEmitter,
		getData: getData
	}
});