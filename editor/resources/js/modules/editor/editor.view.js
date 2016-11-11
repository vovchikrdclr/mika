define(['dispatcher', 'resize/resize.store', 'scroll/scroll.store', 'editor-items/editor-items.store', 'utils'], function(dispatcher, resizeStore, scrollStore, editorItemsStore, utils) {
	'use strict';

	var area;

	var items = {};
	var marker = false;

	var areaOffset = {};
	var width;
	var height;

	// var _handleChange = function(storeData) {

	// }
	var _resize = function () {
		var width = resizeStore.getData().width;
		var height = resizeStore.getData().height;

		
	}

	var _draw = function(x, y) {

		marker = document.createElement('div');
		marker.classList.add('item');
		marker.style.left = (x/area.offsetWidth)*100 + '%';
		marker.style.top  = (y/area.offsetHeight)*100 + '%';
		marker.id = editorItemsStore.getNewId();
		area.appendChild(marker);

		dispatcher.dispatch({
			type: 'editor-item-add',
			id: marker.id,
			x: marker.style.left,
			y: marker.style.top
		});
	}

	var _handle = function(area) {

		var x = false;
		var y = false;

		area.addEventListener('click', function(e) {
			if (e.target.classList.contains('item')) {
				e.stopPropagation();
				return;
			}

			x = parseInt(e.clientX - utils.offset(area).left - 24);
			y = parseInt(e.clientY - utils.offset(area).top - 24);

			_draw(x,y)
		}, false);
	}

	var init = function() {
		var storeData;

		area = document.getElementById('draw-area');
		if (!area) return;

		_resize();
		resizeStore.eventEmitter.subscribe(_resize);
		
		_handle(area);

	}

	return {
		init: init
	}
});