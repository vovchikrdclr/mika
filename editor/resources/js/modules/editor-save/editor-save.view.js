define(['dispatcher', 'popup/popup.store',], function(dispatcher, popupStore) {
	'use strict';

	var input1;
	var input2;
	var input3;
	var img;

	var _handle = function(btn) {
		var id;
		btn.addEventListener('click', function() {
			id = popupStore.getData().activeId;
			if (!id) return;

			dispatcher.dispatch({
				type: 'editor-item-change',
				id: id,
				hd: input1.value,
				subhd: input2.value,
				linkId: input3.value,
				img: img.files[0]
			});

			dispatcher.dispatch({
				type: 'editor-save'
			});
			
		}, false);
	}

	var init = function() {
		var storeData;
		var saveBtn = document.getElementById('save');
		if (!saveBtn) return;

		input1   = document.getElementById('hd-input');
		input2   = document.getElementById('subhd-input');
		input3	 = document.getElementById('link-id-input');
		img = document.getElementById('img-input');

		_handle(saveBtn);
	}

	return {
		init: init
	}
});