define(['dispatcher', 'login/login.store'], function(dispatcher, store) {

	"use strict";
	var logined = false;

	var _handleChange = function() {
		var storeData = store.getData();
		if (storeData.logined === logined) return;

		logined = storeData.logined;
		if (logined) {
			document.body.classList.add('logined');
		} else {
			document.body.classList.remove('logined');
		}

		dispatcher.dispatch({
			type: 'popup-close-all'
		});
	}

	var init = function() {
		
		_handleChange();
		store.eventEmitter.subscribe(_handleChange);
	}

	return {
		init: init
	}
});