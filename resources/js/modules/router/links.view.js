define(['dispatcher', 'router/router.store'], function(dispatcher, store) {

	"use strict";

	var items =  {};
	var href;

	var _handleChange = function(storeData) {

		var storeData = store.getData().items;

		for (var key in storeData) {
			if (storeData[key].active === true) {
				items[key].element.classList.add('link-active');
			} else {
				items[key].element.classList.remove('link-active');
			}
		}
	}

	var _add = function(items, element) {
		var name = element.getAttribute('data-name');
		var type = element.getAttribute('data-type');
		var active;
		if (element.classList.contains('link-active')) {
			active = true;
		} else {
			active = false;
		}
		

		element.addEventListener('click', function(e) {
			e.preventDefault();
			var name = element.getAttribute('data-name');
			var type = element.getAttribute('data-type');

			if (name.indexOf("all") !== -1) {
				for (var key in items) {
					if (items[key].type === type) {
						if (key.indexOf("all") !== -1) {
							items[key].active = true;
						} else {
							items[key].active = false;
						}
					}
				}
			} else {
				for (var key in items) {
					if (items[key].type === type) {
						if (key.indexOf("all") !== -1) {
							items[key].active = false;

						}
					}
				}
				items[name].active = !items[name].active;
			}

			dispatcher.dispatch({
				type: 'route-change',
				items: items
			});
		});

		items[name] = {
			type: type,
			name: name,
			active: active,
			element: element,
			href: href
		}

		dispatcher.dispatch({
			type: 'route-add',
			items: items
		});
}

	var _remove = function(items, item) {
		delete items[item.id];
	}

	var _handleMutate = function() {
		var elements;
		var header = document.getElementsByClassName('header')[0];
		if (!header) {
			return
		}
		href = header.getAttribute('data-href');

		var check = function(items, element) {
			var found = false;
			for (var id in items) {
				if (items.hasOwnProperty(id)) {
					if (items[id].element === element) {
						found = true;
						break;
					}
				}
			}
			if (!found) {
				_add(items, element);
			}
		}

		var backCheck = function(items, elements, item) {
			var element = item.element;
			var found   = false;

			for (var i = 0; i < elements.length; i++) {
				if (elements[i] === item.element) {
					found = true;
					break;
				}
			}

			if (!found) {
				_remove(items, item);
			}
		}

		elements = document.getElementsByClassName('inner-link');
		for (var i = 0; i < elements.length; i++) {
			check(items, elements[i]);
		}
		for (var id in items) {
			if (items.hasOwnProperty(id)) {
				backCheck(items, elements, items[id]);
			}
		}
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