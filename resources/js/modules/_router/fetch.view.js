define([
	'dispatcher', 
	'router/router.store',
	'utils'
], function(
	dispatcher, 
	routerStore,
	utils
) {
	"use strict";

	var idName = 'replaceable-id-';
	var idNum  = 1;

	var replaceable = {};
	var responce = false;


	var _handleRouteChange = function(storeData) {

		storeData = routerStore.getData().items;

		if (!storeData) return;

		var data = new FormData();
		var href;

		for (var key in storeData) {
			if (storeData[key].active === true) {
				console.log(storeData[key]);
				href = storeData[key].href;
				data.append('type', storeData[key].type);
				data.append('name', storeData[key].name);
			}
		}

		utils.ajax.post(href, data, function(rs) {
			responce = rs;
		}, false);

		_replace();

		setTimeout(function() {
			dispatcher.dispatch({
				type: 'mutate'
			})
		}, 20);
	}

	var _replace = function() {
		var div;
		var newContainers = [];
		var header, pageNames;
		var pageNameId = false;
		var title, titleValue;

		var _replaceContainer = function(newContainer) {
			var id = newContainer.getAttribute('data-id');
			if (!id) {
				console.warn('data-id attribute is missing');
				return;
			}

			if (!replaceable.hasOwnProperty(id)) {
				console.warn('container with id ' + id + ' is missing');
				return;
			}
			replaceable[id].conatainer.innerHTML = newContainer.innerHTML;
		}

		if (!responce) return;


		div = document.createElement('div');

		div.innerHTML = responce;
		newContainers = div.getElementsByClassName('replaceable');
		header     = div.getElementsByTagName('header')[0];
		title      = div.getElementsByTagName('title')[0];
		titleValue = title.innerHTML;

		document.title = titleValue;

		if (!header) {
			console.warn('header element is missing');
		}

		for (var i = 0; i < newContainers.length; i++) {
			_replaceContainer(newContainers[i]);
		}

		setTimeout(function() {
			dispatcher.dispatch({
				type: 'mutate'
			})
		}, 20);
	}


	var _add = function(conatainer) {
		var id = conatainer.getAttribute('data-id');

		if (!id) {
			id = idName + idNum;
			idNum++;
			conatainer.setAttribute('data-id', id);
		}

		replaceable[id] = {
			id: id,
			conatainer: conatainer
		}
	}

	var _handleMutate = function() {
		var containers = document.getElementsByClassName('replaceable');
		for (var i = 0; i < containers.length; i++) {
			_add(containers[i]);
		}
	}

	var init = function() {
		_handleMutate();
		routerStore.eventEmitter.subscribe(_handleRouteChange);

		dispatcher.subscribe(function(e) {
			if (e.type === 'mutate') {
				_handleMutate();
			}
		});
	}

	return {
		init: init
	}
});