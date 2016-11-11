define(['dispatcher'], function(dispatcher) {

	"use strict";

	var item;

	var _handleChange = function(el) {
		var color = el.getAttribute("data-color");
		el.style.background = color;
	}

	var init = function() {

		item = document.getElementsByClassName('col');

		if (item) {
			for (var i = 0; i < item.length; i++) {
				_handleChange(item[i]);
			}
		}
	}

	return {
		init: init
	}
});