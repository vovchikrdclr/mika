define(['dispatcher', 'isotope'], function(dispatcher, Isotope) {

	"use strict";

	var _handleChange = function() {
		var iso = new Isotope( '.grid', {
			itemSelector: '.grid-item',
			percentPosition: true,
			 masonry: {
			    columnWidth: '.grid-sizer',
			    gutter: '.grid-margin'
			  }
		});
	}

	var _handleMutate = function() {

	}

	var init = function() {

	var grid = document.getElementsByClassName('grid')[0];

	if (!grid) {
		return
	}

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