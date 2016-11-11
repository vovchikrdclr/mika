define(['dispatcher', 'popup/popup.store'], function(dispatcher, store) {

	"use strict";

	var items = {}

	var idName = 'popup-control-id-';
	var idNum  = 1;
	var active = false;
	var inner = document.getElementsByClassName('page-wrapper')[0];
	var filter;

	var _handleChange = function() {

		var storeData = store.getData();

		filter = storeData.filter;

		if (active === storeData.active) return;

		if (active && items.hasOwnProperty(active)) {
			items[active].element.classList.remove('active');
		}
		active = storeData.active;
		if (active && items.hasOwnProperty(active)) {
			items[active].element.classList.add('active');
		}
	}
	function animate(e) {
		var el = document.createElement('div');
		el.classList.add('circle');
		el.style.cssText = 'background: #EE293B; width: 5px; height: 5px; border-radius: 50%; position: absolute; left:' + e.pageX + 'px; top:' + e.pageY + 'px; z-index: 1000; transition: opacity 0.3s ease 0s;';
		inner.appendChild(el);
		var width = 5;
		var height = 5;

		function step() {
			requestAnimationFrame(step);
			
			width += 200;
			height += 200;

			el.style.width = width + 'px';
			el.style.height = height + 'px';
			el.style.transform = 'translate3d(-50%,-50%,0)';
		}
		step();

		setTimeout(function del() {
			el.style.opacity = "0";
			inner.removeChild(el);
		}, 800);
	}
	var _add = function(items, element) {
		var id = element.getAttribute('data-id');

		if (!id) {
			id = idName + idNum;
			idNum++;
		}

		element.addEventListener('click', function(e) {
			if (e.currentTarget.classList.contains('btn-popup') && filter === false) {
				animate(e);
			}
			dispatcher.dispatch({
				type: 'popup-toggle',
				id: id
			});
		}, false);

		items[id] = {
			id: id,
			element: element
		}
	}

	var _remove = function(items, item) {
		delete items[item.id];
	}

	var _handleMutate = function() {
		var elements;

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


		elements = document.getElementsByClassName('view-popup-toggle');
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