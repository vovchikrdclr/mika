define(['dispatcher'], function(dispatcher) {

	"use strict";
	var slider;

	var init = function() {
		slider = document.getElementsByClassName('slider-chemistry')[0];
		if (!slider) {
			return
		}
		var close = slider.getElementsByClassName('close')[0];

		close.addEventListener('click', function() {
			slider.classList.toggle('show');
		});
	}

	return {
		init: init
	}
});