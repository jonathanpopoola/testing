
argos.modules.Accordion = (function($){

	'use strict';

	function Accordion(el,header,wrapper) {
		this.el = $('.'+el);
		this.header = header;
		this.wrapper = wrapper;
		this.accordionHeader = this.el.find('.'+this.header);
		this.accordionWrapper = this.el.find('.'+this.wrapper);
		this.setup();
	}

	Accordion.prototype.setup = function() {
		this.accordionHeader.first().addClass('active');
		this.accordionWrapper.hide();
		this.accordionWrapper.first().show();
		this.accordionWrapper.last().addClass('last');
		this.accordionHeader.click(function() {
			if($(this).next().is(':visible')) {
				$(this).next().slideUp();
				$(this).removeClass('active');
			}else{
				$(this).next().slideDown();
				$(this).addClass('active');
			}
			return false;
		});
	};

	return Accordion;
})(jQuery);
















