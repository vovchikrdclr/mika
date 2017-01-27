define(['dispatcher', 'utils', 'popup/popup.store'], function(dispatcher, utils, popupStore) {

	"use strict";

	var href;
	var action;
	var items = {};

	function _add(el) {
		var item = el.getElementsByClassName('input-btn');

		function _event(el) {
			var name = el.getAttribute('data-name');
			var type = el.getAttribute('data-type');

			el.addEventListener('click', function () {

				el.classList.add('active');

				items[type] = {
					type: type,
					name: name
				}
			}, false);
		}
		for (var i = 0; i < item.length; i++) {
			_event(item[i]);
		}
	}
	var _unactive = function() {
		var item = document.getElementsByClassName('input-btn');
		for (var i = 0; i < item.length; i++) {
			item[i].classList.remove('active');
		}
	}

	var init = function() {

		var btnResult = document.getElementsByClassName('form-result')[0];
		if (!btnResult) {
			return
		}

		action = btnResult.getAttribute('href');

		var popup = document.getElementsByClassName('popup-choice');
		if (!popup) {
			return
		}
		for (var i = 0; i < popup.length; i++) {
			_add(popup[i]);
		}

		btnResult.addEventListener('click', function (e) {
			e.preventDefault();

			var data = new FormData();
			for (var key in items) {
				data.append(items[key].type, items[key].name);
			}

			utils.ajax.post(action, data, function(e) {

				var pars = JSON.parse(e);
				
				setTimeout(function() {
					window.location.href = pars.href;
				}, 300);

			}, true);
			
		});

		popupStore.eventEmitter.subscribe(_unactive);
	}

	return {
		init: init
	}
});