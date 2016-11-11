define(['dispatcher', 'popup/popup.store'], function(dispatcher, store) {
	'use strict';

	var active = false;
	var popup;

	var input1;
	var input2;
	var input3;
	var img;
	var inputX, inputY, inputW, inputH;
	var color;

	var _handleChange = function(storeData) {
		var editor;

		if (storeData.active === active) return;

		active = storeData.active;

		if (active) {
			input1.value = storeData.hd;
			input2.value = storeData.subhd;
			input3.value = storeData.linkId;
			img.file = storeData.img;

			editor = tinymce.get('text-input');

			if (editor) {
				editor.setContent(storeData.text);
			}

			if ('createEvent' in document) {
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent('change', false, true);
			}
		}

		if (active) {
			popup.classList.add('active');
		} else {
			popup.classList.remove('active');
		}
	}

	var init = function() {
		var storeData;

		input1   = document.getElementById('hd-input');
		input2   = document.getElementById('subhd-input');
		input3   = document.getElementById('link-id-input');
		img = document.getElementById('img-input');


		popup = document.getElementById('popup');
		if (!popup) return;

		storeData = store.getData();
		_handleChange(storeData);

		store.eventEmitter.subscribe(function() {
			storeData = store.getData();
			_handleChange(storeData);
		});
	}

	return {
		init: init
	}
});