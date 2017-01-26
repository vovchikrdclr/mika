define(['dispatcher', 'utils', 'popup/popup.store'], function(dispatcher, utils, popupStore) {

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

				el.classList.add('active');
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
	var _unactive = function() {
		if (popupStore.getData().active === false || popupStore.getData().active === 'filter-popup') {
			var item = document.getElementsByClassName('input-btn');
			for (var i = 0; i < item.length; i++) {
				item[i].classList.remove('active');
			}
		}
		
	}

	var init = function() {

		// if (popupStore.getData().active === false) {
		// 	var data = new FormData();
		// 	data.append('act', 'delete quests');
			
		// 	utils.ajax.post(action, data, function(e) {

		// 	}, true);
		// }

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

		popupStore.eventEmitter.subscribe(_unactive);
	}

	return {
		init: init
	}
});