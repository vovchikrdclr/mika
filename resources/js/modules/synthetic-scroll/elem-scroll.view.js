define(['dispatcher'], function(dispatcher) {

	"use strict";

	var sharesBut = document.getElementsByClassName('shares-but')[0];
	var shares = document.getElementsByClassName('shares')[0];

	var aboutBut = document.getElementsByClassName('about-but')[0];
	var about = document.getElementsByClassName('block block2 vh-height')[0];

	var contactsBut;
	var contacts = document.getElementsByTagName('footer')[0];

	var _handleChange = function(storeData) {

	}

	var init = function() {
		contactsBut = document.getElementsByClassName('contacts-but');
		for(var i = 0; i < contactsBut.length; i++) {
			contactsBut[i].addEventListener("click", function(e) {
				e.preventDefault();
				dispatcher.dispatch({
					element: contacts,
					type: 'scroll-to'
				});
			});
		}
		sharesBut.addEventListener("click", function(e) {
			if (document.getElementsByClassName('index')[0]) {
				e.preventDefault();
			} else {
				localStorage.setItem('scroll', 'shares');
			}
			dispatcher.dispatch({
				element: shares,
				type: 'scroll-to'
			});
		});
		aboutBut.addEventListener("click", function(e) {
			if (document.getElementsByClassName('index')[0]) {
				e.preventDefault();
			} else {
				localStorage.setItem('scroll', 'about');
			}
			dispatcher.dispatch({
				element: about,
				type: 'scroll-to'
			});
		});
		if (window.localStorage.scroll === 'shares') {
			dispatcher.dispatch({
				element: shares,
				type: 'scroll-to'
			});
			localStorage.clear();
		} else if (window.localStorage.scroll === 'about') {
			dispatcher.dispatch({
				element: about,
				type: 'scroll-to'
			});
			localStorage.clear();
		}
	}

	return {
		init: init
	}
});