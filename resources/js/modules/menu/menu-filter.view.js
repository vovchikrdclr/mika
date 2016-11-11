define(['dispatcher', 'scroll/scroll.store', 'resize/resize.store', 'utils'], function(dispatcher, scrollStore, resizeStore, utils) {

	"use strict";
	var menu = document.getElementsByClassName('filter')[0];
	var header;
	var cut;
	var max;
	var active = false;

	var _handleChange = function() {
		var top = scrollStore.getData().top;

		if (top >= 375 && active === false) {
			menu.classList.add("fixed");
			active = true;
		} else if (top < 375 && active === true) {
			menu.classList.remove("fixed");
			active = false;
		}
	}

	var _handleMutate = function() {

	}

	var init = function() {
		if(!menu) {
			return
		}
		header = menu.getElementsByClassName('header')[0];
		cut = menu.getElementsByClassName('cut');
		var arr = [];

		for (var i = 0; i < cut.length; i++) {
			arr.push(cut[i].offsetHeight);
		}
		Array.max = function( array ) {
		    return Math.max.apply( Math, array );
		};
		max = Array.max(arr);

		header.addEventListener("mouseover", function(e) {
			header.style.height = max + 80 + 'px';
		}, false);
		header.addEventListener("mouseout", function(e) {
					header.style.height = '';
				}, false);


		_handleMutate();
		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleChange);
		scrollStore.eventEmitter.subscribe(_handleChange);

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