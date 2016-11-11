define(['dispatcher', 'utils', 'resize/resize.store'], function(dispatcher, utils, store) {

	"use strict";

	var _handleChange = function(el, x, y) {
	
		var height = store.getData().height;
		var width = store.getData().width;

		if (y <= 80) {
			el.style.top = "30px"; 
		} else if (y >= height - el.offsetHeight/1.4) {
			el.style.top = "-" + (el.offsetHeight - 30) + "px"; 
		} else if (x >= width - el.offsetWidth) {
			el.style.left = "-" + (el.offsetWidth + 15) + "px"; 
		}
	}
	function _handleHover(el) {
		var smallPopup = el.getElementsByClassName('small-popup')[0];
		el.addEventListener("mouseenter", function (e) {
			var x = e.clientX;
			var y = e.clientY;
			_handleChange(smallPopup, x, y);
		});
	}

	var init = function() {
		var container = document.getElementsByClassName('project-preview')[0];
		if (!container) {
			return
		}
		var cursor = container.getElementsByClassName('item');
		for (var i = 0; i < cursor.length; i++) {
			_handleHover(cursor[i]);
		}
	}

	return {
		init: init
	}
});