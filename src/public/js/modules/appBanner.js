/*global $:false */

argos.modules.AppBanner = (function($, win, doc, cookie){

	'use strict';

	var COOKIENAME = 'appBanner';
	var APPBANNER_CLASSNAME = 'show-app-banner';

	function AppBanner(widthCutoff){

		this.rootEle = $('.app-banner');

		this.elements = {
			body: $('body'),
			win: $(win),
			header: $('.main-header'),
			footerLogo: $('#sitefooter #logo'),
			close: $('.close', this.rootEle),
			getItNow: $('.button.tertiary', this.rootEle),
			downloadApp: $('.appBanner_download'),
			staticPageLink: $('p a', this.rootEle)
		};

		this.cookieTimeout = this.getCookieFromStoreText();
		this.widthCutoff = (widthCutoff || this.widthCutoff);
		this.mobileSite = null; // Assumes mobile site

		if(this.checkMobileSite()){
			this.mobileSite = true;
			this.updateAppBannerStaticURL();
		}
		else{
			this.mobileSite = false;
		}
		this.addEvents();
		this.showBanner();

	}

	AppBanner.prototype.getCookieFromStoreText = function(){
		// Collects cookie timeout value from a property passed into the module from a storetext.properties file
		return this.rootEle.attr('data-rel');
	};

	AppBanner.prototype.widthCutoff = 1024; // Default width cutoff - width at which the banner hides itself

	AppBanner.prototype.cookieTimeout = 30; // Default cookie timeout - gets overridden by storetext.property

	AppBanner.prototype.showBanner = function() {
		// cookie not set, show AppBanner
		if(this.checkResize() && this.toggleBanner(true)){
			this.analytics('ar:appbanner:displayed:', 'show appBanner');
		}
	};

	AppBanner.prototype.addEvents = function(){
		var ctx = this;

		this.elements.close.on('click', function(e){
			ctx.createCookie(ctx);
			ctx.toggleBanner(false);
			ctx.analytics('ar:appbanner:close:', 'x (Close app banner)');
			e.preventDefault();
		});

		this.elements.getItNow.on('click', function(){
			ctx.createCookie();
			ctx.analytics('ar:appbanner:getitnow:', 'Get it now');
		});

		this.elements.downloadApp.on('click', function(e){
			var appBannerDownloadType = 'ar:utilities:appdownload:' + $(e.target).attr('data-rel');
			ctx.analytics(appBannerDownloadType, 'Get it now');
		});

		this.elements.win.on('resize', function(){
			return ctx.checkResize() ? ctx.toggleBanner(true) : ctx.toggleBanner(false);
		});
	};

	AppBanner.prototype.checkCookie = function(){
		// return value of cookie or false
		return (cookie(COOKIENAME) || false);
	};

	AppBanner.prototype.createCookie = function(){
		// Creates a site global cookie, named and expiring based on module vars
		cookie(COOKIENAME, 'true', { expires: parseFloat(this.cookieTimeout), path: '/' });
	};

	AppBanner.prototype.checkMobileSite = function(){
		if(doc.URL.indexOf('argos.co.uk/m') > -1){
			return true;
		}
		return false;
	};

	AppBanner.prototype.updateAppBannerStaticURL = function(){
		this.elements.staticPageLink.attr('href', '/m/static/StaticDisplay/includeName/apps.htm');
	};

	AppBanner.prototype.analytics = function(prop25Value, linkName){
		//var s = s_gi(s_account);
		//s.linkTrackVars='prop25';
		//s.linkTrackEvents='none';
		//s.prop25 = prop25Value;
		//s.tl(this,'o',linkName);
	};

	AppBanner.prototype.toggleBanner = function(toggle){

		if(toggle && !this.checkCookie()){
			if(this.mobileSite){
				this.elements.body.addClass(APPBANNER_CLASSNAME);
			}
			else{
				this.elements.header.addClass(APPBANNER_CLASSNAME);
				this.elements.footerLogo.addClass(APPBANNER_CLASSNAME);
			}
			return true;
		}
		else{
			if(this.mobileSite){
				this.elements.body.removeClass(APPBANNER_CLASSNAME);
			}
			else{
				this.elements.header.removeClass(APPBANNER_CLASSNAME);
				this.elements.footerLogo.removeClass(APPBANNER_CLASSNAME);
			}
			return false;
		}
	};

	AppBanner.prototype.checkResize = function(){
		var viewportWidth = this.elements.win.width();

		if(viewportWidth >= this.widthCutoff){
			return false;
		}
		else{
			return true;
		}
	};

	return AppBanner;
})(jQuery, window, document, jQuery.cookie);
