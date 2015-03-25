argos.modules.MegaNav = (function($){

	'use strict';
	
	var DELAYED_NAV_CLASS = 'mega-nav-delayed';

	function MegaNav(opts){

		this.rootEle = $(opts.rootSelector);
		
		var options = {
			delayLength: 350
		};
		
		this.options = $.extend({}, options, opts);
		this.addEvents();
		this.enableDelayNav();
	}

	MegaNav.prototype.timeoutHandle = null;

	MegaNav.prototype.timeinHandle = null;

	MegaNav.prototype.delayActive = true;

	MegaNav.prototype.toggleHover = function(ele, isHovering){
		if( isHovering ) { $(ele).addClass('hover'); }
		else{ $(ele).removeClass('hover'); }
	};

	MegaNav.prototype.killHovers = function(){
		$('li', this.rootEle).removeClass('hover');
	};
	
	MegaNav.prototype.setTimerOut = function(e){
		var ctx = this;
		clearTimeout(this.timeoutHandle);
		clearTimeout(this.timeinHandle);

		this.timeoutHandle = setTimeout(function(){
			ctx.killHovers();
			ctx.delayActive = true;
			ctx.rootEle.on('mouseenter', 'li', function(e){ ctx.menuMouseoverEvt(e); });
		}, ctx.options.delayLength);
	};

	MegaNav.prototype.setTimerIn = function(e){
		var ctx = this;
		this.timeinHandle = setTimeout(function(){
			ctx.rootEle.unbind('mouseenter', ctx.menuMouseoverEvt);
			ctx.delayActive = true;
			ctx.toggleHover(e.currentTarget, true);
		}, this.options.delayLength);
	};

	MegaNav.prototype.clearHoveredTimeout = function(e){
		if($(e.currentTarget).hasClass('hover') && this.timeoutHandle) {
			// Menu item re-focused... clear existing timeoutHandle
			clearTimeout(this.timeoutHandle);
			this.timeoutHandle = null;
		}
		return this;
	};

	MegaNav.prototype.clearHoveredTimein = function(e){
		if(!$(e.currentTarget).hasClass('hover') && this.timeinHandle){
			// new menu item focused Clear existing timeinHandle
			clearTimeout(this.timeinHandle);
			this.timeinHandle = null;
		}
		return this;
	};
	
	MegaNav.prototype.checkMenuState = function(e){
		
		this.clearHoveredTimeout(e).clearHoveredTimein(e);

		if(!this.delayActive){
			// Delay not active, show menu
			this.rootEle.unbind('mouseenter', this.menuMouseoverEvt);
			this.delayActive = true;
			this.toggleHover(e.currentTarget, true);
		}
		else{
			this.setTimerIn(e);
		}
	};

	MegaNav.prototype.menuMouseoverEvt = function(e){ this.checkMenuState(e); };

	MegaNav.prototype.menuMouseoutEvt = function(e){ this.setTimerOut(e); };

	MegaNav.prototype.addEvents = function(){
		var ctx = this;
		$(this.rootEle)
			.on('mouseenter', 'li', function(e){ ctx.menuMouseoverEvt(e); })
			.on('mouseleave', 'li', function(e){ ctx.menuMouseoutEvt(e); });
	};
	
	MegaNav.prototype.enableDelayNav = function(){
		this.rootEle.addClass(DELAYED_NAV_CLASS);
	};

	return MegaNav;
})(jQuery);
