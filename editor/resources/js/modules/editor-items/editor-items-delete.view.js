define(['dispatcher', 'popup/popup.store'], function(dispatcher, popupStore) {
	'use strict';

	var _handle = function(control) {
		control.addEventListener('click', function() {
			var id = popupStore.getData().activeId;
			if (!id) return;

			dispatcher.dispatch({
				type: 'editor-item-delete',
				id: id
			});

			dispatcher.dispatch({
				type: 'popup-close'
			});

		}, false);
	}

	var init = function() {
		var storeData;

		var control = document.querySelector('.delete');
		if (!control) return;

		_handle(control);
	}

	return {
		init: init
	}
});