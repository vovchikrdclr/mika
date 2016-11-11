define(['dispatcher'], function(dispatcher) {

	"use strict";

	var initialized = false;
	var size = {
		width: 0,
		height: 0
	};

	var _windowSize = function() {
		var width = 0, height = 0;
		if( typeof( window.innerWidth ) === 'number' ) {
			width = window.innerWidth;
			height = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			width = document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			width = document.body.clientWidth;
			height = document.body.clientHeight;
		}
		return {
			height: height,
			width: width
		}
	}

	var _init = function() {
		size = _windowSize();
		window.addEventListener('resize', function() {
			size = _windowSize();
			eventEmitter.dispatch({
				type: 'change'
			});
		}, false);
		window.addEventListener('orientationchange', function() {
			size = _windowSize();
			eventEmitter.dispatch({
				type: 'change'
			});
		}, false);
		window.addEventListener('load', function() {
			size = _windowSize();
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
			height: size.height,
			width: size.width
		};
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