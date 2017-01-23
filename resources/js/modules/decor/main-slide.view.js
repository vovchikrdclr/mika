define(['dispatcher', 'scroll/scroll.store'], function(dispatcher, store) {

	"use strict";

	var item = document.getElementsByClassName('auto-scroll')[0];
	var active = false;
	var content = document.getElementsByClassName('content')[0];
	var header = document.getElementsByTagName('header')[0];
	var scrollTop = false;
	var blockUserActions = true;
	var reverseScrolling;
	var keys = [32, 37, 38, 39, 40];
	var touchCurrent = true;

	var _handleChange = function() {
		var storeData = store.getData().top;
		
		if (storeData > 10 && active === false && scrollTop === false) {
			_setupHandlers();
			item.classList.add("scroll");
			setTimeout(function() {
				dispatcher.dispatch({
					element: content,
					type: 'scroll-to'
				});
			}, 300)
			active = true;
			setTimeout(function() {
				scrollTop = true;
				_removeHandlers();
				blockUserActions = false;
			}, 1000)
		} else if (storeData <= 10 && active === true) {
			item.classList.remove("scroll");
			
			setTimeout(function() {
				active = false;
			},300)

		} else if (storeData <= item.offsetHeight/1.8 && scrollTop === true) {
			dispatcher.dispatch({
				element: header,
				type: 'scroll-to'
			});
			scrollTop = false;
			blockUserActions = true;
		}
	}
	function _setupHandlers() {
		window.addEventListener('mousewheel', _handleWheel);
		document.addEventListener('mousewheel', _handleWheel);
		document.addEventListener('DOMMouseScroll', _handleWheel);
		document.addEventListener('keydown', _handleKey);
		document.addEventListener('touchmove', _handleTouch);
	}

	function _removeHandlers() {
		window.removeEventListener('mousewheel', _handleWheel);
		document.removeEventListener('mousewheel', _handleWheel);
		document.removeEventListener('DOMMouseScroll', _handleWheel);
		document.removeEventListener('keydown', _handleKey);
		document.removeEventListener('touchmove', _handleTouch);
	}

	function _handleWheel(e) {
		var delta = e.deltaY || e.detail || e.wheelDelta;
		var scrolled = store.getData().top;

		if (reverseScrolling) delta = -delta;

		if (delta > 0) {
			if (blockUserActions) {
				e.preventDefault();
			}
			if (!active) {
				dispatcher.dispatch({
					type: 'first-scroll-activale'
				});
			}
		}
		if (delta < 0 && scrolled <= 0) {
			if (blockUserActions) {
				e.preventDefault();
			}
			if (active) {
				dispatcher.dispatch({
					type: 'first-scroll-deactivale'
				});
			}
		}
	}

	function _handleKey(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				if (blockUserActions) {
					e.preventDefault();
				}

				if (!active) {
					dispatcher.dispatch({
						type: 'first-scroll-activale'
					});
				}
			}
		}
	}

	function _handleTouch(e) {
		var delta = 0;
		var scrolled = store.getData().top;
		if (touchCurrent) {
			if(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) {
				delta = -e.touches[0].clientY;
			} else {
				delta = e.touches[0].clientY - touchCurrent.clientY;
			}
		}

		if (blockUserActions) {
			if (delta < 0) {
				e.preventDefault();
			}
		}

		if (touchCurrent) {
			if (delta < 0) {
				if (!active) {
					touchCurrent = false;
					dispatcher.dispatch({
						type: 'first-scroll-activale'
					});
				}
			} else if (delta > 0) {
				if (active && scrolled <= 0) {
					touchCurrent = false;
					dispatcher.dispatch({
						type: 'first-scroll-deactivale'
					});
				}
			}
		}

		touchCurrent = e.touches[0];
	}

	var _handleMutate = function() {

	}

	var init = function() {

		if (!item) {
			return
		}

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