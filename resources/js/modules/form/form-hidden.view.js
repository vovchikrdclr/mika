define(['dispatcher', 'utils'], function(dispatcher, utils) {

	"use strict";

	var form = document.getElementsByClassName('form-hidden')[0];
	var data = new FormData();
	var href;

	function _add(el) {
		var item = el.getElementsByClassName('input-btn');
		var active = false;

		function _event(el) {
			var name = el.getAttribute('data-name');
			var type = el.getAttribute('data-type');

			el.addEventListener('click', function () {
				active = !active;

				var data = new FormData();

				data.append('type', type);
				data.append('name', name);

				utils.ajax.post(href, data, function(e) {
				}, true);

			}, false);
		}
		for (var i = 0; i < item.length; i++) {
			_event(item[i]);
		}
	}

	var init = function() {
		var btnResult = document.getElementsByClassName('form-result')[0];
		href = btnResult.getAttribute('href');

		var popup = document.getElementsByClassName('popup-choice');
		for (var i = 0; i < popup.length; i++) {
			_add(popup[i]);
		}

		btnResult.addEventListener('click', function (e) {
			e.preventDefault();

			window.location.href = href;
		});

	}

	return {
		init: init
	}
});