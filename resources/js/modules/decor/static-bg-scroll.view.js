define(['dispatcher', 'scroll/scroll.store', 'resize/resize.store', 'utils'], function(dispatcher, scrollStore, resizeStore, utils) {

	"use strict";

	var inner = document.getElementsByClassName('static')[0];
	var bg;
	var block = document.getElementsByClassName('block1')[0];
	var blurBlock;
	var bgIe = document.getElementsByClassName('bg-blur-ie')[0];


	var _handleChange = function() {
		var storeData = scrollStore.getData();

		if (storeData.top > blurBlock) {
			bg.classList.add("blur");
			bgIe.style.opacity = "0.7";
		} else {
			bg.classList.remove("blur")
			bgIe.style.opacity = "0";
		}

	}
	
	var _handleResize = function() {

		var height = resizeStore.getData().height;
		var topBlock = utils.offset(block).top;
		blurBlock = topBlock + height/2;
	}

	var init = function() {

		if (!block) {
			return
		}
		if (!inner) {
			return
		}

		bg = inner.getElementsByClassName('bg')[0];

		_handleResize();
		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleResize);
		scrollStore.eventEmitter.subscribe(_handleChange);
	}

	return {
		init: init
	}
});