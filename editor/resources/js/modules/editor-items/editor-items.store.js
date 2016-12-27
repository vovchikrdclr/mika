define(['dispatcher'], function(dispatcher) {
	'use strict';

	var initialized = false;
	var items = {};
	var lastId = 0;

	var contW;
	var contH;

	var _handleEvent = function(e) {
		var id;
		var check = false;
		if (e.type === 'editor-item-add') {
			id = e.id;

			_add(document.getElementById(id));

			eventEmitter.dispatch({
				type: 'change'
			});
		}

		if (e.type === 'editor-item-delete') {
			id = e.id;

			delete items[id];
			eventEmitter.dispatch({
				type: 'change'
			});
		}

		if (e.type === 'editor-item-change') {
			id = e.id;

			if (e.hasOwnProperty('hd')) {
				check = true;
				items[id].hd = e.hd;
			}
			if (e.hasOwnProperty('subhd')) {
				check = true;
				items[id].subhd = e.subhd;
			}
			if (e.hasOwnProperty('linkId')) {
				check = true;
				items[id].linkId = e.linkId;
			}
			if (e.hasOwnProperty('text')) {
				check = true;
				items[id].text = e.text;
			}
			if (e.hasOwnProperty('img')) {
				check = true;
				items[id].img = e.img;
			}
			if (e.hasOwnProperty('x')) {
				check = true;
				items[id].x = parseInt(e.x);
				if (items[id].x < 0) items[id].x = 0;
				if (items[id].x > contW) items[id].x = contW;
			}
			if (e.hasOwnProperty('y')) {
				check = true;
				items[id].y = parseInt(e.y);
				if (items[id].y < 0) items[id].y = 0;
				if (items[id].y > contH) items[id].y = contH;
			}
			if (e.hasOwnProperty('w')) {
				check = true;
				items[id].w = parseInt(e.w);
				if (items[id].x + items[id].w > contW) {
					items[id].w = contW - items[id].x - 2;
				}
			}
			if (e.hasOwnProperty('h')) {
				check = true;
				items[id].h = parseInt(e.h);
				if (items[id].y + items[id].h > contH) {
					items[id].h = contH - items[id].y - 2;
				}
			}

			if (check) {
				eventEmitter.dispatch({
					type: 'change'
				});
			}
		}
	}

	var _add = function(element) {
		var hd;
		var subhd;
		var linkId;
		var text;
		var id;
		var idNum;
		var x, y, w, h;
		var styles;

		if (!element) return;

		hd = element.querySelector('.header');
		if (hd) {
			hd = hd.innerHTML;
		} else {
			hd = '';
		}

		subhd = element.querySelector('.subheader');
		if (subhd) {
			subhd = subhd.innerHTML;
		} else {
			subhd = '';
		}

		linkId = element.querySelector('.link-id');
		if (linkId) {
			linkId = linkId.innerHTML;
		} else {
			linkId = '';
		}

		text = element.querySelector('.bt');
		if (text) {
			text = text.innerHTML;
		} else {
			text = '';
		}

		styles = getComputedStyle(element);

		x = parseInt(styles.left)/contW*100;
		y = parseInt(styles.top)/contH*100;
		w = parseInt(styles.width);
		h = parseInt(styles.height);

		id = element.id;

		idNum = parseInt(id.split('item-')[1]);
		if (idNum > lastId) {
			lastId = idNum;
		}

		items[id] = {
			id: id,
			hd: hd,
			subhd: subhd,
			text: text,
			linkId: linkId,
			x: x,
			y: y,
			w: w,
			h: h
		}
	}

	var _init = function() {
		var container = document.getElementById('draw-area');
		var elements;
		if (!container) return;

		contW = container.clientWidth;
		contH = container.clientHeight;

		elements = container.querySelectorAll('.item');

		for (var i = elements.length - 1; i >= 0; i--) {
			_add(elements[i]);
		}

		dispatcher.subscribe(_handleEvent);
	}

	var eventEmitter = function() {
		var _handlers = [];

		var dispatch = function(event) {
			for (var i = _handlers.length - 1; i >= 0; i--) {
				_handlers[i](event);
			}
		}
		var subscribe = function(handler) {
			_handlers.push(handler);
		}
		var unsubscribe = function(handler) {
			for (var i = 0; i <= _handlers.length - 1; i++) {
				if (_handlers[i] == handler) {
					_handlers.splice(i--, 1);
				}
			}
		}

		return {
			dispatch: dispatch,
			subscribe: subscribe,
			unsubscribe: unsubscribe
		}
	}();

	var getData = function() {
		return {
			items: items
		}
	}

	var getDataById = function(id) {
		// for (var i = items.length - 1; i >= 0; i--) {
		// 	if (items[i].id === id) {
		// 		return items[i];
		// 	}
		// }
		if(items[id]) {
			return items[id];
		}
		return false;
	}

	var getNewId = function() {
		lastId = lastId + 1;
		return 'item-' + (lastId);
	}

	if (!initialized) {
		initialized = true;
		_init();
	}

	return {
		eventEmitter: eventEmitter,
		getData: getData,
		getDataById: getDataById,
		getNewId: getNewId
	}
});