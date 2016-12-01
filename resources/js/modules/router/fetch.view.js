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
	var response = false;
	var preloader;


	var _handleRouteChange = function(storeData) {

		storeData = routerStore.getData().items;

		if (!storeData) return;

		var data = new FormData();
		var href;
		
		for (var key in storeData) {
			// if (storeData[key].active === true) {
				href = storeData[key].href;
				data.append('type', storeData[key].type);
				data.append('name', storeData[key].name);
			// }
		}

		utils.ajax.post(href, data, function(e) {

			var pars = JSON.parse(e);
			var done = (pars.hasOwnProperty('done') && (pars.done === 'true' || pars.done === true));

			if (!pars.hasOwnProperty('status') || pars.status === 'error') {
				responseInner.innerHTML = json.response;
			} else if (pars.status === 'success') {
				response = pars.response;
				_replace();
			}

		}, true);

		setTimeout(function() {
			dispatcher.dispatch({
				type: 'mutate'
			})
		}, 20);
	}

	var _replace = function() {
		preloader.style.opacity = "1";
		preloader.classList.add("loading");
		var div;
		for (var key in replaceable) {
			replaceable[key].container.innerHTML=" ";
		}

		var _replaceContainer = function(element) {
			element.classList.add('hidden');

			for (var key in replaceable) {
				replaceable[key].container.appendChild(element);
			}

			setTimeout(function() {
				element.classList.remove('hidden');
				preloader.style.opacity = "0";
				preloader.classList.remove("loading");
			}, 600);
		}

		if (!response) return;


		div = document.createElement('div');

		div.innerHTML = response;

		for (var i = 0; i < div.childNodes.length; i++) {
			_replaceContainer(div.childNodes[i]);
		}

		setTimeout(function() {
			dispatcher.dispatch({
				type: 'mutate'
			})
		}, 20);
	}


	var _add = function(container) {
		var id = container.getAttribute('data-id');

		if (!id) {
			id = idName + idNum;
			idNum++;
			container.setAttribute('data-id', id);
		}

		replaceable[id] = {
			id: id,
			container: container
		}
	}

	var _handleMutate = function() {
		preloader = document.getElementsByClassName('preloader')[0];
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