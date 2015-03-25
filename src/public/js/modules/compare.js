// comparison utility for plp

argos.modules.Compare = (function($){

    'use strict';

	function Compare(el) {
		this.elem = el;
		this.elem.bind('click', function() {
			$(this).parent().find('.button').toggle();
		});
	}

	return Compare;
})(jQuery);


