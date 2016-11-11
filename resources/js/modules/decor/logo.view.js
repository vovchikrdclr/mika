define(['dispatcher', 'scroll/scroll.store'], function(dispatcher, store) {

	"use strict";

	var header = document.getElementsByTagName('header')[0];
	var active = false;

	var _handleChange = function() {
		var storeData = store.getData().top;
		if (storeData > 10 && active === false) {
			header.classList.add("scroll");
			active = true;
		} else if (storeData <= 10 && active === true) {
			header.classList.remove("scroll");
			active = false;
		}
	}

	var _handleMutate = function() {

	}

	var init = function() {

		_handleMutate();
		_handleChange();

		store.eventEmitter.subscribe(_handleChange);

		dispatcher.subscribe(function(e) {
			if (e.type === 'mutate') {
				_handleMutate();
				_handleChange();
			}
		});
	}

	return {
		init: init
	}
});