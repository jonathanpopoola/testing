// comparison utility for plp

argos.modules.Facets = (function($){

	'use strict';

   	function Facets() {
		this.setup();
	}

	Facets.prototype.setup = function() {
		var that = this;
		this.facets = $('.facets');
		this.toggle = this.facets.find('.toggle');
		this.options = this.facets.find('.section .ul');
		this.checkboxes = this.facets.find('.section input[type=checkbox]');
		this.reset = this.facets.find('.reset-button');
		this.reset.bind('click',function() {
			that.checkboxes.attr('checked',false);
		});
		this.controller = function(el) {
			if (el.text() === '-') {
				el.text('+');
			} else {
				el.text('-');
			}
		};
		this.toggle.bind('click',function() {
			$(this).parents('.section').find('ul').slideToggle('fast');
			that.controller($(this));
		});

	};

	return Facets;
})(jQuery);


