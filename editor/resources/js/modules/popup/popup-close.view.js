define(['dispatcher'], function(dispatcher) {
	'use strict';

	var _handle = function(close) {
		close.addEventListener('click', function() {
			dispatcher.dispatch({
				type: 'popup-close'
			});
		}, false);
	}

	var init = function() {
		var storeData;

		var close = document.getElementById('popup-close');
		if (!close) return;
 
		_handle(close);
	}

	return {
		init: init
	}
});