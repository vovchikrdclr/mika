define(['dispatcher'], function(dispatcher) {
	'use strict';

	var initialized = false;
	var active = false;
	var activeId = false;

	var hd = '';
	var subhd = '';
	var linkId = '';
	var img = '';

	var _handleEvent = function(e) {
		if (e.type === 'popup-open') {
			if (active) return;

			active = true;
			activeId = e.item.id;

			hd = e.item.hd;
			subhd = e.item.subhd;
			linkId = e.item.linkId;
			img = e.item.img;

			eventEmitter.dispatch({
				type: 'change'
			});
		}

		if (e.type === 'popup-close') {
			if (!active) return;

			active = false;
			activeId = false;

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
			activeId: activeId,
			hd: hd,
			subhd: subhd,
			linkId: linkId,
			img: img
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