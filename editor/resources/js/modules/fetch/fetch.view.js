define(['dispatcher', 'editor-items/editor-items.store', 'utils'], function(dispatcher, itemsStore, utils) {
	'use strict';

	var successMsg;
	var errorMsg;
	var action;

	var _sendData = function(type) {
		var items = itemsStore.getData().items;
		var data = new FormData();
		var jsonData;

		errorMsg.classList.remove('visible');
		successMsg.classList.remove('visible');

		var convertData = function(item) {

			data.append('points['+id+'][type]', type);
			data.append('points['+id+'][id]', item.id);
			data.append('points['+id+'][left]', item.x);
			data.append('points['+id+'][top]', item.y);
			data.append('points['+id+'][width]', item.w);
			data.append('points['+id+'][height]', item.h);
			data.append('points['+id+'][header]', item.hd);
			data.append('points['+id+'][subHeader]', item.subhd);
			data.append('points['+id+'][linkId]', item.linkId);
			data.append('points['+id+'][img]', item.img);
		}

		for (var id in items) {
			convertData(items[id]);
		}

		utils.ajax.post(action, data, function(e) {

			var pars = JSON.parse(e);
			var done = (pars.hasOwnProperty('done') && (pars.done === 'true' || pars.done === true));

			if (!pars.hasOwnProperty('status') || pars.status === 'error') {
				errorMsg.classList.add('visible');
			} else if (pars.status === 'success') {
				successMsg.classList.add('visible');
			}

		}, true);
		// fetch(action, {
		// 	method: 'post',
		// 	credentials: 'include',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: jsonData
		// }).then(function(response) {
		// 	return response.json()
		// }).then(function(json) {
		// 	if (json.status === 'success') {
		// 		successMsg.classList.add('visible');
		// 	}
		// 	if (json.status === 'error') {
		// 		errorMsg.classList.add('visible');
		// 	}
		// });

	}

	var init = function() {
		var storeData;
		var container = document.querySelector('.area-editor');
		action = container.getAttribute('data-action');
		if (!action) {
			console.warn('data-action attribute is missing');
		}

		successMsg = document.getElementById('sucess-msg');
		errorMsg = document.getElementById('error-msg');

		dispatcher.subscribe(function(e) {
			if (e.type === 'editor-save') {
				_sendData(e.type);
			}
		});
	}

	return {
		init: init
	}
});