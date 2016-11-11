define(['dispatcher', 'swiper', 'resize/resize.store'], function(dispatcher, Swiper, resizeStore) {

	"use strict";

		var _handleChange = function() {
			
		    var galleryRight = new Swiper('.gallery-right', {
		    	direction: 'vertical',
		        effect: 'fade',
		        nextButton: '.swiper-button-next',
		     	prevButton: '.swiper-button-prev',
		        fade: {
				  crossFade: true
				}
		    });
		    var galleryThumbs = new Swiper('.gallery-thumbs', {
		    	autoplay: 7000,
		    	autoplayDisableOnInteraction: true,
		        spaceBetween: 3,
		        direction: 'vertical',
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        touchRatio: 0.2,
		        slideToClickedSlide: true,
		        onSlideNextStart: function(swiper) {
		        	galleryThumbs.stopAutoplay();
		        	galleryThumbs.startAutoplay();
		        }
		    });
		    window.galleryThumbs = galleryThumbs;
		    galleryRight.params.control = galleryThumbs;
		    galleryThumbs.params.control = galleryRight;

		    // main-slider

		    var mainSlider = new Swiper('.main-slider-container', {
		    	loop: true,
		    	autoHeight: true,
		    	speed: 700,
		    	nextButton: '.swiper-button-next',
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        direction: 'vertical',
		        effect: 'fade',
		        fade: {
				  crossFade: true
				}
		    });

		    // shares-slider

		     var sharesSlider = new Swiper('.shares-slider', {
		     	loop: true,
		     	speed: 700,
		     	nextButton: '.swiper-button-next',
		     	prevButton: '.swiper-button-prev',
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        parallax: true,
		        effect: 'fade',
		        fade: {
				  crossFade: true
				}
		    });

			// collections

		    var collectionSlider =  new Swiper('.collection-slider', {
		     	speed: 700,
		     	nextButton: '.swiper-button-next',
		     	prevButton: '.swiper-button-prev'
		    });
		    var controlCollectionSlider =  new Swiper('.control-collection-slider', {
		        direction: 'vertical',
		        height: 80,
		        slideToClickedSlide: true
		    });
		    collectionSlider.params.control = controlCollectionSlider;
		    controlCollectionSlider.params.control = collectionSlider;

		    // example

		    var exampleSlider = new Swiper('.example-slider', {
		    	loop: true,
		     	speed: 700,
		     	nextButton: '.swiper-button-next',
		     	prevButton: '.swiper-button-prev',
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        parallax: true,
		        effect: 'fade',
		        fade: {
				  crossFade: true
				}
		    });
	}

	var _handleMutate = function() {

	}

	var init = function() {

		_handleMutate();
		_handleChange();

		resizeStore.eventEmitter.subscribe(_handleChange);

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