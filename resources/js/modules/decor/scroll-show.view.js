define(['dispatcher', 'resize/resize.store', 'scroll/scroll.store', 'utils'], function(dispatcher, resizeStore, scrollStore, utils) {

	"use strict";

	var block,
		height,
		width,
		scrollTop;
	var items = {};	
	var idName = 'new-id-';
	var idNum  = 1;

	// var bg = false;
	// var body = document.getElementsByTagName('body')[0];


	var _handleChange = function() {
		var show = function (el) {
			if (scrollTop >= utils.offset(el.element).top - height/1.5) {
				el.element.classList.add('show');

				// if (el.element.classList.contains('man') && bg === false) {
				// 	body.style.background = "#232323";
				// 	bg = true;
				// } else if (!el.element.classList.contains('man') && bg === true) {
				// 	body.style.background = "";
				// 	bg = false;
				// }
			}
		}
		for (var id in items) {
			show(items[id]);
		}
	}

	var _scroll = function () {
		var storeData = scrollStore.getData();
		scrollTop = storeData.top;
	}
	var _resize = function () {
		var storeData = resizeStore.getData();
		height = storeData.height;
		width = storeData.width;
	}
	var _add = function (element) {
		var id = element.getAttribute('data-id');

		if (!id) {
			id = idName + idNum;
			idNum++;
		}

		items[id] = {
			id: id,
			element: element
		}
	}

	var init = function() {

		block = document.getElementsByClassName('scroll-block');
		if (!block) {
			return
		}

		for (var i = 0; i < block.length; i++) {
			_add(block[i]);
		}

		_resize();
		_scroll();
		_handleChange();

		resizeStore.eventEmitter.subscribe(_resize);
		scrollStore.eventEmitter.subscribe(_scroll);
		resizeStore.eventEmitter.subscribe(_handleChange);
		scrollStore.eventEmitter.subscribe(_handleChange);

	}

	return {
		init: init
	}
});