var argos = {
	app: {},
	modules: {},
	global: {},
	page: {},
	base: {}
};

argos.base = function(){

	'use strict';

	argos.app.appBanner = new argos.modules.AppBanner();
	argos.app.megaNav = new argos.modules.MegaNav({ rootSelector: '.mega-nav' });
	argos.app.searchSuggestion = new argos.modules.SearchSuggestion();

	var pageName = $('body').attr('data-page');

	switch (pageName){

		case 'home':

			argos.app.carousel = new argos.modules.Carousel('section.carousel');
			argos.app.productCarousel = new argos.modules.ProductCarousel('.product-carousel-container', {});

		break;

		case 'plp':

			argos.app.compare = new argos.modules.Compare($('.compare input:checkbox'));
			argos.app.modal = new argos.modules.Modal($('.actions .button.tertiary'),'quickview-modal');
			argos.app.facets = new argos.modules.Facets();

		break;

		case 'pdp':
			argos.app.fulfilment = new argos.modules.Fulfilment( '.fulfilment' );
		break;

		case 'storelocator-details':
			argos.app.StorelocatorDetails = new argos.modules.StorelocatorDetails();
			argos.app.Accordion = new argos.modules.Accordion('accordion','accordion-header','accordion-wrapper');
		break;

		case 'storelocator-details-map':
			argos.app.StorelocatorDetails = new argos.modules.StorelocatorDetails();
		break;

		default:
			var moduleName = pageName;
			if(!argos.modules[capitalize(moduleName)]){ return; }

			argos.app[moduleName] = new argos.modules[capitalize(moduleName)]('.' + moduleName + ':not(body)');
		break;

	}

	function capitalize(s){
		return s[0].toUpperCase() + s.slice(1);
	}

};
