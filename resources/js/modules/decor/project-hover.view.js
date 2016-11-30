define(['dispatcher', 'resize/resize.store', 'scroll/scroll.store'], function(dispatcher, resizeStore, scrollStore) {

	"use strict";

	var items = {}

	var idName = 'project-hover-';
	var idNum  = 1;
	var number = 5;
	var transform;
	var cursor;
	var transform;
	var shown = false;
	var x = 0;
	var y = 0;
	var sc;
	var butHid = {};

	var _hadleScroll = function() {
		// sc = scrollStore.getData().top;
		// _draw();
	}

	var _draw = function(derection) {
		if (!cursor) return;
		if (derection === 'next') {
			cursor.firstElementChild.style[transform] = 'rotate(0deg)';
			cursor.style[transform] = 'translateX(' + x + 'px) translateY(' + (y) + 'px) translateZ(0px)';
		} else if (derection === 'prev') {
			cursor.firstElementChild.style[transform] = 'rotate(-180deg)';
			cursor.style[transform] = 'translateX(' + x + 'px) translateY(' + (y) + 'px) translateZ(0px)';
		}
		
	}

	var _show = function(item, e, derection) {
		var wh = resizeStore.getData().height;

		if (!cursor) return;

		shown = true;
		cursor.classList.add('show');
		cursor.classList.remove('hidden');
		
		x = e.clientX;
		y = e.clientY;

		_draw(derection);
	}
	var _move = function(item, e, derection) {
		var wh = resizeStore.getData().height;

		if (!cursor) return;
		if (!shown) return;

		cursor.classList.add('show');
		cursor.classList.remove('hidden');

		x = e.clientX;
		y = e.clientY;

		_draw(derection);
	}
	var _hide = function(item, e, derection) {
		var wh = resizeStore.getData().height;

		if (!cursor) return;

		shown = false;

		cursor.classList.remove('show');
		cursor.classList.add('hidden');

		if (!e) return;

		x = e.clientX;
		y = e.clientY;

		_draw(derection);
	}



	var _add = function(items, element) {
		var linkPrev   = element.getElementsByClassName('swiper-button-prev')[0];
		var linkNext   = element.getElementsByClassName('swiper-button-next')[0];
		var linkEditor = element.getElementsByClassName('item');
		var id = element.getAttribute('data-id');
		var hoverHid = document.getElementsByClassName('hover-hid');

		var _ctrlAddHid = function(el, index) {
			if (butHid.hasOwnProperty(index)) {
				index = index + 1;
				butHid[index] = el;
			} else {
				butHid[index] = el;
			}
		}
		var _linkEditorList = function(el) {
			el.addEventListener('mouseenter', function(e) {
				_show(items[id], e);
			});
			el.addEventListener('mousemove', function(e) {
				_move(items[id], e);
			});
			el.addEventListener('mouseleave', function(e) {
				_hide(items[id], e);
			});
		}

		for (var i = 0; i < hoverHid.length; i++) {
			_ctrlAddHid(hoverHid[i], i);
		}
		if (linkEditor) {
			for (var i = 0; i < linkEditor.length; i++) {
				_linkEditorList(linkEditor[i]);
			}
		}
		

		if (!id) {
			id = idName + idNum;
			idNum++;
		}

		items[id] = {
			id: id,
			cursor: cursor,
			element: element
		}
		if (linkPrev || linkNext) {
			linkPrev.addEventListener('mouseenter', function(e) {
				var derection = 'prev';
				_show(items[id], e, derection);
			});
			linkPrev.addEventListener('mousemove', function(e) {
				var derection = 'prev';
				_move(items[id], e, derection);
			});
			linkPrev.addEventListener('mouseleave', function(e) {
				var derection = 'prev';
				_hide(items[id], e, derection);
			});
			linkNext.addEventListener('mouseenter', function(e) {
				var derection = 'next';
				_show(items[id], e, derection);
			});
			linkNext.addEventListener('mousemove', function(e) {
				var derection = 'next';
				_move(items[id], e, derection);
			});
			linkNext.addEventListener('mouseleave', function(e) {
				var derection = 'next';
				_hide(items[id], e, derection);
			});
		}
		

		var _hiden = function(el) {
			el.addEventListener('mouseenter', function(e) {
				_hide(items[id], e);
			}, false);
		}
		var _showed = function(el) {
			el.addEventListener('mouseleave', function(e) {
				_show(items[id], e);
			}, false);
		}

		for (var key in butHid) {
			_hiden(butHid[key]);
			_showed(butHid[key]);
		}
	}

	var _remove = function(items, item) {
		delete items[item.id];
	}

	var _handleMutate = function() {
		var elements;

		cursor = document.getElementById('cursor');
		if (!cursor) {
			return
		}
		cursor.classList.add("hidden");

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


		elements = document.getElementsByClassName('project-preview');
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
		transform = Modernizr.prefixed('transform');

		_handleMutate();
		_hadleScroll();

		scrollStore.eventEmitter.subscribe(_hadleScroll);

		dispatcher.subscribe(function(e) {
			if (e.type === 'mutate') {
				_handleMutate();
				_hide(false, false);
			}
			if (e.type === 'project-open') {
				if (items.hasOwnProperty(e.id)) {
					_hide(items[e.id])
				}
			}
		});
	}

	return {
		init: init
	}
});