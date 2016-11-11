define(['dispatcher'], function(dispatcher) {

	"use strict";

	var initialized = false;
	var active = false;

	var _handleEvent = function(e) {
		if (e.type === 'ajax-form-submit' && e.id === 'login-form' && e.response.status === 'success') {
			if (active) return;

			active = true;

			eventEmitter.dispatch({
				type: 'change'
			});
		} 
	}

	var _init = function() {
		var body;

		if (initialized) return;
		initialized = true;

		body = document.body;
		if (body.classList.contains('logined')) {
			active = true;
		}

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
			logined: active
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