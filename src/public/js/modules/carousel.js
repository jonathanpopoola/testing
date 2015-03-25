/*global $:false */

argos.modules.Carousel = (function($, win){

	'use strict';

	function Carousel(rootEle){

		this.rootEle = $(rootEle);

		this.numItems = this.rootEle.attr('data-rel');

		this.elements = {
			win: $(win),
			carouselItems: $('.carousel-items', this.rootEle),
			carouselNav: $('.carousel-nav', this.rootEle)
		};

		this.addEvents();
		this.setTimer();

	}

	Carousel.prototype.currentItem = 0;

	Carousel.prototype.timerCount = 5000;

	Carousel.prototype.timerHandle = null;

	Carousel.prototype.selectNav = function(navIndex){
		$('a',  this.elements.carouselNav).removeClass("selected").eq(navIndex).addClass('selected');
	};

	Carousel.prototype.addEvents = function(){

		var ctx = this;

		$('a', this.elements.carouselNav).click(function(e){
			e.preventDefault();
			var pageRefIndex = e.target.getAttribute('data-rel');
			clearTimeout(ctx.timerHandle);
			ctx.selectNav(pageRefIndex);
			ctx.selectItem(pageRefIndex);
			ctx.setTimer();
		});

	};

	Carousel.prototype.setTimer = function(){

		var ctx = this;

		this.timerHandle = setInterval(function(){
			ctx.currentItem = (ctx.currentItem === ctx.numItems - 1 ? 0 : ctx.currentItem + 1);
			ctx.selectItem(ctx.currentItem);
			ctx.selectNav(ctx.currentItem);
		}, this.timerCount);
	};


	Carousel.prototype.selectItem = function(itemIndex){
		$('li', this.elements.carouselItems).removeClass("selected").eq(itemIndex).addClass('selected');
	};


	return Carousel;

})(jQuery, window);
