define(['dispatcher'], function(dispatcher) {

	"use strict";

	var _handleChange = function() {
		if('CSS' in window && 'supports' in window.CSS) {
		    var support = window.CSS.supports('mix-blend-mode','color');
		        support = support?'mix-blend-mode':'no-mix-blend-mode';
		        document.getElementsByTagName('body')[0].classList.add(support);
		}
	}

	var _handleMutate = function() {

	}

	var init = function() {
		
		_handleMutate();
		_handleChange();

		dispatcher.subscribe(function(e) {
			if (e.type === 'mutate') {
				_handleMutate();
				_handleChange();
			}
		});
	}

	return {
		init: init
	}
});