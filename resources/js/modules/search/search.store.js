define(['dispatcher'], function(dispatcher) {

	"use strict";

	var initialized = false;
	var active = false;
	var header;

	var _handleEvent = function(e) {
		if (e.type === 'search-toggle') {
			if (active === false) {
				active = true;
			} else {
				active = false;
			}

			eventEmitter.dispatch({
				type: 'change'
			});
		}
	}

	var _init = function() {
		header = document.getElementsByTagName('header')[0];
		if (header.classList.contains('search-active')) {
			active = true;
		}

		if (initialized) return;
		initialized = true;

		dispatcher.subscribe(_handleEvent);
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
			active: active
		}
	}

	if (!initialized) {
		_init();
	}

	return {
		eventEmitter: eventEmitter,
		getData: getData
	}
});