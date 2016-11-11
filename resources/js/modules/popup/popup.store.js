define(['dispatcher'], function(dispatcher) {
	"use strict";

	var active = false;
	var initialized = false;
	var filter = false;
	var counter = 0;

	var _handleEvent = function(e) {
		if (e.type === 'popup-toggle') {

			if (active === e.id) {
				active = false;
			} else {
				active = e.id;
			}

			if (e.id !== 'filter-popup') {
				filter = false;
				counter = 0;
			} else if (e.id === 'filter-popup' && counter === 0) {

				filter = true;
				counter += 1;
			}
			else if (e.id === 'filter-popup' && counter === 1) {
				filter = false;
				counter = 0;
			}
			eventEmitter.dispatch({
				type: 'change'
			});

		}

		if (e.type === 'popup-open') {
			if (active === e.id) return;
			active = e.id;

			eventEmitter.dispatch({
				type: 'change'
			});
		}

		if (e.type === 'popup-close') {
			if (active === false) return;
			active = false;

			filter = false;
			eventEmitter.dispatch({
				type: 'change'
			});
		}

		if (e.type === 'popup-close-all') {
			if (active === false) return;
			active = false;

			filter = false;
			eventEmitter.dispatch({
				type: 'change'
			});
		}
	}

	var _init = function() {
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
			active: active,
			filter: filter
		}
	}

	var getDataById = function(id) {
		for (var i = items.length - 1; i >= 0; i--) {
			if (items[i].id === id) return items[i];
		}

		return false;
	}

	if (!initialized) {
		initialized = true;
		_init();
	}

	return {
		eventEmitter: eventEmitter,
		getData: getData,
		getDataById: getDataById
	}
});