define(['dispatcher', 'popup/popup.store', 'editor-items/editor-items.store'], function(dispatcher, popupStore, editorItemsStore) {

	'use strict';

	var colorItems;
	var items = {};
	var active = false;

	var _handleChange = function(storeData) {
		var editorItems = editorItemsStore.getData().items;
		if (storeData.active) {

			if (editorItems[storeData.activeId].bg === active) return;

			if (active) {
				items[active].element.classList.remove('active');
			}
			active = editorItems[storeData.activeId].bg;
			console.log(active);
			console.dir(items);
			if (active) {
				items[active].element.classList.add('active');
			}
		}
	}

	var _add = function(element) {
		var color = element.getAttribute('data-bg');
		if (!color) {
			console.warn('data-bg attribute is missing');
			return;
		}

		if (element.classList.contains('active')) {
			active = color.toLowerCase();
		}

		items[color] = {
			color: color,
			element: element
		}

		element.addEventListener('click', function() {
			if (items[active].element === element) return;

			if (active) {
				items[active].element.classList.remove('active');
			}
			active = color;
			if (active) {
				items[active].element.classList.add('active');
			}

			dispatcher.dispatch({
				type: 'editor-item-change',
				id: popupStore.getData().activeId,
				bg: color
			});
		}, false);
	}

	var init = function() {
		var storeData;
		var elements =  document.querySelectorAll('.view-color');

		if (!elements || !elements.length) return;

		for (var i = elements.length - 1; i >= 0; i--) {
			_add(elements[i]);
		}

		storeData = popupStore.getData();
		_handleChange(storeData);

		popupStore.eventEmitter.subscribe(function() {
			storeData = popupStore.getData();
			_handleChange(storeData);
		});
	}

	return {
		init: init
	}
});