define(['dispatcher', 'scroll/scroll.store', 'resize/resize.store', 'utils'], function(dispatcher, scrollStore, resizeStore, utils) {

	"use strict";

	var el = document.getElementsByClassName('inner-text text3')[0];
	var block = document.getElementsByClassName('block4')[0];
	var showBlock;
	var hiddenBlock;
	var firstChange = false;

	var _handleChange = function() {
		var storeData = scrollStore.getData();
		if (storeData.top > showBlock && storeData.top < hiddenBlock && firstChange === false) {
			el.classList.add("show");
			firstChange = true;
		} else if (storeData.top <= showBlock && firstChange === true) {
			el.classList.add("hidden");
			setTimeout(function() {
				el.classList.remove("show");
				el.classList.remove("hidden");
			}, 200);
			firstChange = false;
		}
	}

	var _handleResize = function() {
		var height = resizeStore.getData().height;
		var topBlock = utils.offset(block).top;
		showBlock = topBlock - height/4;
		hiddenBlock = topBlock + height/2;
	}

	var init = function() {
		
		if (!block) {
			return
		}

		_handleResize();
		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleResize);
		scrollStore.eventEmitter.subscribe(_handleChange);
	}

	return {
		init: init
	}
});