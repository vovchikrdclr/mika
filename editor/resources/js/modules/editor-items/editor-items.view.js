define(['dispatcher', 'editor-items/editor-items.store'], function(dispatcher, store) {
	'use strict';

	var items = {};

	var _handleChange = function(storeData) {
		var storeItems = storeData.items;

		var checkItem = function(item) {
			var id = item.id;
			var el;
			if (!storeData.items[id]) {
				items[id].element.parentNode.removeChild(items[id].element);
				delete items[id];
			} else {
				item.element.style.left    = storeData.items[id].x;
				item.element.style.top     = storeData.items[id].y;
			}
		}

		var backCheckItem = function(storeItem) {
			var id = storeItem.id;
			var el;
			if (!items[id]) {
				el = document.getElementById(id);
				_add(el);
			}
		}

		for (var id in storeItems) {
			backCheckItem(storeItems[id]);
		}

		for (var id in items) {
			checkItem(items[id]);
		}
	}

	var _add = function(element) {
		var id = element.id;
		items[id] = {
			id: id,
			element: element
		}

		element.addEventListener('click', function(e) {
			dispatcher.dispatch({
				type: 'popup-open',
				id: id,
				item: store.getDataById(id)
			});
		}, false);
	}


	var init = function() {
		var storeData;

		var container = document.getElementById('draw-area');
		var elements;
		if (!container) return;

		elements = container.querySelectorAll('.item');

		for (var i = elements.length - 1; i >= 0; i--) {
			_add(elements[i]);
		}

		storeData = store.getData();
		_handleChange(storeData);

		store.eventEmitter.subscribe(function(e) {
			storeData = store.getData();
			_handleChange(storeData, e);
		});
	}

	return {
		init: init
	}
});