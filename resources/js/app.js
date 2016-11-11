"use strict";

var path;
var pathElements =  document.getElementsByName('resources-path');
if (pathElements && pathElements.length) {
	path = pathElements[0].content;
} else {
	path = document.getElementsByTagName('head')[0].getAttribute('data-path');
}

// var path = document.getElementsByTagName('head')[0].getAttribute('data-path');
if (path.slice(-1) !== '/') path += '/';

require.config({
	baseUrl: path + 'js/modules',
	paths: {
		TweenMax: '../libs/TweenMax',
		swipe: '../libs/swipe',
		isotope: '../libs/isotope.pkgd.min',
		skrollr: '../libs/skrollr',
		swiper: '../libs/swiper.min'
	}

});

require([
	'domReady',
	'decor/load.view',
	'resize/vhUnits.view',
	'slider/slider-scroll.view',
	'slider/swiper.view',
	'decor/logo.view',
	'decor/main-slide.view',
	'decor/color.view',
	'decor/project-hover.view',
	'decor/static-bg-scroll.view',
	'decor/static-main-scroll.view',
	'decor/static-text1-scroll.view',
	'decor/static-text2-scroll.view',
	'decor/static-text3-scroll.view',
	'decor/scroll-fixed.view',
	'decor/blend.view',
	'search/search.view',
	'menu/menu-filter.view',
	'map/map.view',
	'map/map-markers.view',
	'popup/popup.view',
	'popup/popup-controls.view',
	'popup/popup-close.view',
	'grid/grid.view',
	'parallax/parallax.view',
	'form/form.view',
	'form/form-focus.view',
	'form/form-responce.view',
	'router/links.view',
	'router/fetch.view',
	'router/history.view',
	'page-transition/simple-transition.view',
	'infinite-load/infinite-load-controls.view',
	'infinite-load/infinite-load.view',
	'menu/menu.view',
	'login/login.view',
	'synthetic-scroll/elem-scroll.view',
	'synthetic-scroll/synthetic-scroll.view',
	'slider/slider-hover.view',
	'decor/scroll-show.view',
	'project/project.view',
	'fps/fps-scroll.view',
	'slider/slider.close.view',
	'form/form-hidden.view',
	'popup/small-popup.view'

	
	], function(
		domReady,
		loadView,
		vhUnits,
		logo,
		mainSlide,
		color,
		projectHover,
		staticBgScroll,
		staticMainScroll,
		staticText1Scroll,
		staticText2Scroll,
		staticText3Scroll,
		scrollFixed,
		blend,
		search,
		menuFilter,
		map,
		mapMarkers,
		popup,
		popupControls,
		popupClose,
		sliderScroll,
		swiper,
		grid,
		parallax,
		form,
		formFocus,
		formResponce,
		links,
		fetch,
		history,
		simpleTransition,
		infiniteLoadControls,
		infiniteLoad, 
		menu,
		login,
		elemScroll,
		syntheticScroll,
		sliderHover,
		scrollShow,
		projectView,
		fpsScrollView,
		sliderCloseView,
		formHiddenView,
		smallPopupView

	) {
	domReady(function () {
		loadView.init();
		vhUnits.init();
		logo.init();
		mainSlide.init();
		color.init();
		projectHover.init();
		staticBgScroll.init();
		staticMainScroll.init();
		staticText1Scroll.init();
		staticText2Scroll.init();
		staticText3Scroll.init();
		scrollFixed.init();
		blend.init();
		search.init();
		menuFilter.init();
		map.init();
		mapMarkers.init();
		popup.init();
		popupControls.init();
		popupClose.init();
		sliderScroll.init();
		swiper.init();
		grid.init();
		parallax.init();
		form.init();
		formFocus.init();
		formResponce.init();
		links.init();
		fetch.init();
		// history.init();
		// simpleTransition.init();
		infiniteLoadControls.init();
		infiniteLoad.init();
		menu.init();
		login.init();
		elemScroll.init();
		syntheticScroll.init();
		sliderHover.init();
		scrollShow.init();
		projectView.init();
		fpsScrollView.init();
		sliderCloseView.init();
		formHiddenView.init();
		smallPopupView.init();
		
	});
});