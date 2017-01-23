define(['dispatcher', 'utils'], function(dispatcher, utils) {

	"use strict";

	var href;
	var types = [];

	function _add(el) {
		var item = el.getElementsByClassName('input-btn');

		function _event(el) {
			var name = el.getAttribute('data-name');
			var type = el.getAttribute('data-type');
			var action = el.getAttribute('data-action');

			el.addEventListener('click', function () {

				var data = new FormData();
				// if (types.indexOf(type) !== -1) {
				// 	data.append('act', "replace");
				// } else {
				// 	data.append('act', "add");
				// 	types.push(type);
				// }
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