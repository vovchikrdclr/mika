define(['dispatcher', 'scroll/scroll.store', 'resize/resize.store', 'utils'], function(dispatcher, scrollStore, resizeStore, utils) {

	"use strict";

	var items = {};


	var _handleChange = function() {
		var storeData = scrollStore.getData();

		if (storeData.left > 0) {
			for (var key in items) {
				items[key].style.transform = "translateX(-" + storeData.left + "px)";
			}
		} else {
			for (var key in items) {
				items[key].style.transform = "translateX(0)";
			}
			
		}


	}

	var _add = function(el, index) {
		items[index] = el;
	}

	var init = function() {

		var elems = document.getElementsByClassName('sk');
		for (var i = 0; i < elems.length; i++) {
			_add(elems[i], i);
		}

		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleChange);
		scrollStore.eventEmitter.subscribe(_handleChange);
	}

	return {
		init: init
	}
});