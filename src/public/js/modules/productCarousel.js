argos.modules.ProductCarousel = (function($){

    'use strict';

	function ProductCarousel(rootEle, options) {

		this.rootEle = $(rootEle);

		var defaults = {
			speed: 500,
			wrapperHeight: 430,
			screenHeight: 300,
			screenWidth: 770,
			interval: 1000,
			reset: 100,
			autoNavOn: false,
			id: function() { return 'pc'+Math.floor((Math.random() * 9000) + 1); },
			navPosition: 1,
			items: '.recommendation-grid',
			item: '.recommendation-item',
			itemWidth: 146,
			debounce: 0,
			carrierOffset: 500,
			screensCounter: 1,
			eleCache: {}
		};

		this.config = $.extend({}, defaults, options);

		this.setupContainer();
		this.cacheElements();
		this.build();
		this.autoNav("go");
		this.tracking(this.config.autoNavOn);
		this.calcTotalScreens();
		this.events();
	}

	ProductCarousel.prototype.cacheElements = function(){
		this.eleCache = {
			carrier: $('.carrier', this.rootEle),
			wrapper: $('.product-carousel', this.rootEle),
			screen: $('.screen', this.rootEle),
			items: $(this.config.item, this.roorEle)
		};
	};

	ProductCarousel.prototype.calcTotalScreens = function(){
		var screenWidth = this.eleCache.screen.width();
		var totalItemsWidth = (this.eleCache.items.width() * this.eleCache.items.length);
		return Math.round(totalItemsWidth/screenWidth);
	};

	ProductCarousel.prototype.setupContainer = function(){
		this.rootEle.append('<div class="product-carousel"><span class="navigation left"></span><div class="screen"><ul class="carrier"></ul></div><span href="" class="navigation right"></span><div class="tracker-container"></div></div>');
	};

	ProductCarousel.prototype.getContainerHeight = function(){
		return this.eleCache.items.height();
	};

	ProductCarousel.prototype.build = function() {

		this.parentWrapper = this.eleCache.wrapper.parent();
		this.eleCache.screen.css({ height: this.getContainerHeight(), width: this.config.screenWidth});
		this.navLeft = this.eleCache.wrapper.find('.navigation.left');
		this.navRight = this.eleCache.wrapper.find('.navigation.right').hide();
		this.trackerContainer = this.eleCache.wrapper.find('.tracker-container').css('width',(this.eleCache.items.length*16)+'px');
		this.screenWidth = this.eleCache.screen.outerWidth();
		this.carrierWidth = (this.eleCache.items.length * this.config.itemWidth + this.config.carrierOffset);
		this.counter = this.eleCache.items.length;
		this.eleCache.items.css({'clear':'none','float':'left','width':this.screenWidth});
		this.eleCache.carrier.css({'width':this.carrierWidth,'height':this.config.screenHeight,'position':'absolute'}).append(this.eleCache.items);
		this.trackerItems = this.trackerContainer.find('.tracker');
		this.config.navPosition = this.navPosition();
		$(this.config.item).css('width',this.config.itemWidth+'px');
		this.changeDimensions(this.parentWrapper.width(),this.eleCache.wrapper.width(),this.eleCache.screen.width(),this.navPosition());
	};

	ProductCarousel.prototype.navPosition = function() {
		var position = this.navLeft.position();
		return position.left;
	};

	ProductCarousel.prototype.changeDimensions = function(parentWidth,wrapper) {
		//this.itemsVisible();
		this.eleCache.wrapper.css('width', parentWidth-90+'px');
		this.eleCache.screen.css('width', parentWidth-140+'px');
		this.navLeft.css('left', parentWidth-70+'px');
	};

	ProductCarousel.prototype.tracking = function(cnt) {
		var that = this;
		this.countTracker(cnt);
		this.setupTracker();
		this.trackerItems.last().addClass('active');
	};

	ProductCarousel.prototype.countTracker = function(cnt) {
			this.trackerItems.removeClass('active').eq(cnt).addClass('active');
	};

	ProductCarousel.prototype.setupTracker = function() {
		var that = this;
		this.eleCache.items.each(function() {
			that.trackerContainer.append('<div class="tracker"></div>');
		});
	};

	ProductCarousel.prototype.checkDirection = function(dir) {
		if (this.config.screensCounter) {
			this.navRight.show();
			this.navLeft.hide();
		} else if (dir === 'right' && this.counter === this.eleCache.items.length){
			this.navRight.hide();
			this.navLeft.show();
		} else {
			this.navRight.show();
			this.navLeft.show();
		}
	};

	ProductCarousel.prototype.directionalNav = function() {
		var that = this;
		this.navLeft.bind('click',function() {
			that.autoNav('stop');
			if (that.config.screensCounter <= that.calcTotalScreens() ) {
				that.config.screensCounter = that.config.screensCounter+1;
				that.moveLeft();
				console.log(that.config.screensCounter,that.calcTotalScreens());
			} else {
				console.log('no response')
			}

		});
		this.navRight.bind('click',function() {
			that.autoNav('stop');
			that.moveRight();
		});
	};

	ProductCarousel.prototype.moveLeft = function(arg) {

		this.eleCache.carrier.animate({
			left: "-=" + $('.screen').width()}, {
			duration: this.config.speed
		});
		this.counter--;
		this.countTracker(this.counter - 1);
		//this.checkDirection('left');
	};

	ProductCarousel.prototype.moveRight = function(arg) {
		this.countTracker(this.counter);
		this.eleCache.carrier.animate({
			left: "+="+$('.screen').width()}, {
			duration: this.config.speed
		});
		this.counter++;
		this.checkDirection('right');
	};

	ProductCarousel.prototype.autoNav = function(arg) {
		var that = this;
		if (arg === 'stop') {
			window.clearInterval(this.int);
		} else if (arg === 'go' && this.config.autoNavOn === true) {
			this.int = setInterval(function () {
				if (that.counter === 1) {
					that.counter = that.items.length;
					that.carrier.animate({
						left: "+="+(that.itemsVisible * that.itemWidth)}, {
						duration: that.config.reset});
					that.countTracker(that.counter-1);
					that.checkDirection('right');
				} else {
					that.moveLeft();
				}
			}, that.config.interval);
		}
	};

	ProductCarousel.prototype.resizeContainer = function(){
		var that = this;

		var debounce = this.config.debounce;
		$(window).debounce(function(debounce){
			that.changeDimensions(
				that.eleCache.wrapper.parent().width(),
				that.eleCache.wrapper.width());
		}, this.config.debounce);
		$(window).bind('resize', function() {
			that.calcTotalScreens();
		});
	};

	ProductCarousel.prototype.events = function() {
		this.resizeContainer();
		this.directionalNav();
	};

	return ProductCarousel;
})(jQuery);



