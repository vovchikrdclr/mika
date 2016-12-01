define(['dispatcher', 'scroll/scroll.store', 'resize/resize.store'], function(dispatcher, scrollStore, resizeStore) {

	"use strict";
	var elemShow = false;
	var mainStop = false;
	var main = document.getElementsByTagName('main')[0];
	var inner;
	var elem;

	var _handleChange = function() {
		var storeData = scrollStore.getData().top;

		if (storeData < 300 && elemShow === true || storeData >= 1400 && elemShow === false) {
			for (var i = 0; i < elem.length; i++) {
				elem[i].classList.remove('show');
			}
			main.style.zIndex = "1";
			elemShow = false;
		} else if (storeData >= 300 && elemShow === false) {
			for (var i = 0; i < elem.length; i++) {
				elem[i].classList.add('show');
			}
			main.style.zIndex = "1005";
			elemShow = true;
		} else if (storeData < 1400 && mainStop === true) {
			inner.classList.remove('stop');
			main.style.zIndex = "1005";
			mainStop = false;
		} else if (storeData >= 1400 && mainStop === false) {
			inner.classList.add('stop');
			mainStop = true;
			main.style.zIndex = "1";
			elemShow = false;
		}
	}

	var init = function() {
		inner = document.getElementsByClassName('main-slide-container')[0];
		if (!inner) {
			return
		}
		elem = inner.getElementsByClassName('item');

		for (var j = 0; j < elem.length; j++) {
			elem[j].addEventListener('mouseenter', function(e) {
				e.currentTarget.style.zIndex = "100";
			});
			elem[j].addEventListener('mouseleave', function(e) {
				e.currentTarget.style.zIndex = "";
			});
		}

		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleChange);
		scrollStore.eventEmitter.subscribe(_handleChange);

		dispatcher.subscribe(function(e) {
			if (e.type === 'mutate') {
				_handleChange();
			}
		});
	}

	return {
		init: init
	}
});