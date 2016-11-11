define(['dispatcher', 'menu/menu.store'], function(dispatcher, menuStore) {

	"use strict";

	var view = document.getElementsByClassName('hiden-city')[0];
	var button = document.getElementsByClassName('city-active')[0];
	var el = document.getElementsByClassName('ct');
	var heightEl;
	var paddingEl;

	var _handleChange = function() {

		var storeData = menuStore.getData();

		if (storeData.active) {
			view.style.height = el.length * heightEl + "px";
		} else {
			view.style.height = "";
		}
	}

	var init = function() {

		heightEl = el[0].clientHeight;

		button.addEventListener("click", function(e) {
			e.preventDefault();
			dispatcher.dispatch( {
				type: 'menu-toggle'
			});
		}, false);

		_handleChange();

		menuStore.eventEmitter.subscribe(_handleChange);

	}

	return {
		init: init
	}
});