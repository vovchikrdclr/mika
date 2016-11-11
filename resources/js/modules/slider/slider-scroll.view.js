define(['dispatcher', 'scroll/scroll.store'], function(dispatcher, scrollStore) {

	"use strict";

	var num;
	var items;
	var scrollHeight;
	var hidden = false;
	var storeData;
	var slider;
	var content;
	var mainSlide;


	var _handleChange = function() {
		var top = scrollStore.getData().top;

		if (top >= scrollHeight - 600 && hidden === false) {
			mainSlide.style.position = "absolute";
			mainSlide.style.top = scrollHeight - 1250 + "px";
			mainSlide.style.width = "auto";
			mainSlide.style.right = "0%";
			mainSlide.style.left = "0%";
			hidden = true;
		} else if (top < scrollHeight - 600 && hidden === true) {
			mainSlide.style.position = "fixed";
			mainSlide.style.top = "120px";
			mainSlide.style.width = "79%";
			mainSlide.style.right = "0";
			mainSlide.style.left = "0";
			hidden = false;
		}

	}

	var _handleMutate = function() {

	}

	var init = function() {
		slider = document.getElementsByClassName('collection-slider')[0]; 
		mainSlide = document.getElementsByClassName('main-slide')[0];
		content = document.getElementsByClassName('content')[0];
		if (!content || !slider || !mainSlide) {
			return
		}

		scrollHeight = content.offsetHeight;

		num = (scrollHeight - 700)/items;


		_handleMutate();
		_handleChange();

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