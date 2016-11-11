define(['dispatcher'], function(dispatcher) {

	"use strict";

	var _handleChange = function(el, id) {
		el.addEventListener('mouseover', function(e) {
			e.stopPropagation();
		    galleryThumbs.slideTo(id);
		    galleryThumbs.lockSwipes();
		    setTimeout(function() {
		    	galleryThumbs.unlockSwipes();
		    },500)
		});

	}

	var init = function() {

		
		// var slider = document.getElementsByClassName('gallery-left')[0];
		// if (!slider) {
		// 	return
		// }
		// var slide = slider.getElementsByClassName('swiper-slide');

		// for (var i = 0; i < slide.length; i++) {
		// 	_handleChange(slide[i], i);
		// }
		
	}

	return {
		init: init
	}
});