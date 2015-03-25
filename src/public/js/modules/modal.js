// comparison utility for plp

argos.modules.Modal = (function($){

	'use strict';

   	function Modal(el,cn) {
		var that = this;
		this.className = cn;
		this.body = $('body');
		this.elem = el;
		this.elem.bind('click', function() {
			that.build($(this).offset());
		});
		this.winWidth = $(window).width()/2;
	}

	Modal.prototype.build = function(offset) {
		var that = this;
		$.get("/module/snippet/quickview", function(data){
			var html = '<div style="position:absolute;left:'+that.winWidth+'px; top:'+offset.top+'px" class="modal '+that.className+'">'+ data +'<a class="button tertiary close">Close</a></div>';
			$('body').append(html);
			this.modal = $('.modal');
			var close = this.modal.find('.close');
			close.bind('click', function() {
				$('.modal').remove();
			});
		});

	};

	return Modal;
})(jQuery);


