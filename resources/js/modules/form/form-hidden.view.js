define(['dispatcher', 'utils'], function(dispatcher, utils) {

	"use strict";

	var data = new FormData();
	var href;

	function _add(el) {
		var item = el.getElementsByClassName('input-btn');
		var active = false;

		function _event(el) {
			var name = el.getAttribute('data-name');
			var type = el.getAttribute('data-type');
			var action = el.getAttribute('data-action');

			el.addEventListener('click', function () {
				active = !active;

				var data = new FormData();

				data.append(type, name);

				utils.ajax.post(action, data, function(e) {
				}, true);

			}, false);
		}
		for (var i = 0; i < item.length; i++) {
			_event(item[i]);
		}
	}

	var init = function() {

		var btnResult = document.getElementsByClassName('form-result')[0];
		if (!btnResult) {
			return
		}

		href = btnResult.getAttribute('href');

		var popup = document.getElementsByClassName('popup-choice');
		if (!popup) {
			return
		}
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