"use strict";

var path = document.getElementsByTagName('head')[0].getAttribute('data-path');
if (path.slice(-1) !== '/') path += '/';


require.config({
	baseUrl: path + 'js/modules',
	paths: {

	}
});


require([
	'domReady',
	'editor/editor.view',
	'editor-items/editor-items.view',
	'popup/popup.view',
	'popup/popup-close.view',
	'editor-save/editor-save.view',
	'editor-items/editor-items-delete.view',
	'color-picker/color-picker.view',
	'fetch/fetch.view'

	], function(
		domReady,
		editorView,
		editorItemsView,
		popupView,
		popupCloseView,
		editorSaveView,
		editorItemsDeleteView,
		colorPickerView,
		fetchView
	) {
	domReady(function () {
		editorView.init();
		editorItemsView.init();
		popupView.init();
		popupCloseView.init();
		editorSaveView.init();
		editorItemsDeleteView.init();
		colorPickerView.init();
		fetchView.init();
	});
});