define(['dispatcher', 'search/search.store'], function(dispatcher, store) {

	"use strict";
	var control;
	var active = false;
	var empty  = true;
	var header;
	var wrapper;
	var input;
	var form;
	var to = false;
	var defaultValue = '';

	var _handleChange = function() {
		var storeData = store.getData();
		
		if (storeData.active === active) return;
		active = storeData.active;

		clearTimeout(to);

		if (active) {
			header.classList.add('search-active');
			input.focus();
		} else {
			header.classList.remove('search-active');
			to = setTimeout(function() {
			}, 300);
		}
	}

	var _handleInput = function() {

	}


	var init = function() {
		control = document.getElementById('search-btn');
		header  = document.getElementsByTagName('header')[0];
		form    = document.querySelector('.search-form');
		input   = document.querySelector('.search-input');

		if (!control) return;

		defaultValue = input.value;

		if (header.classList.contains('active')) {
			active = true;
		}

		control.addEventListener('click', function() {
			if (!empty && active) {
				form.submit();
			} else {
				dispatcher.dispatch({
					type: 'search-toggle'
				});
			}
		}, false);

		input.addEventListener('keyup', function() {
			if (this.value === '' || this.value === defaultValue) {
				empty = true;
			} else {
				empty = false;
			}
		}, false);

		_handleChange();
		store.eventEmitter.subscribe(_handleChange);
	}

	return {
		init: init
	}
});