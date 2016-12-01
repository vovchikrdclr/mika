define(['dispatcher', 'utils'], function(dispatcher, utils) {

	"use strict";

	var _handleChange = function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			el.classList.toggle('active');
			var parent = el.parentElement;
			var id = el.getAttribute("data-id");
			
			var data = new FormData();
			var action = el.getAttribute('data-action');
			data.append('product-add', id);

			utils.ajax.post(action, data, function(e) {
			}, true);
		})
	}

	var init = function() {
		var like = document.getElementsByClassName('add-like');
		for (var i = 0; i < like.length; i++) {
			_handleChange(like[i]);
		}
	}

	return {
		init: init
	}
});