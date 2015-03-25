(function($,functionName){

	var debounce = function (func, threshold, takeAction) {

		var timeout;

		return function debounced () {
			var obj = this, args = arguments;

			function delayed () {
				if (!takeAction)
					func.apply(obj, args);
				timeout = null;
			}

			if (timeout)
				clearTimeout(timeout);
			else if (takeAction)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold);
		};
	};

	jQuery.fn[functionName] = function(fn, threshold){  return fn ? this.bind('resize', debounce(fn, threshold)) : this.trigger(functionName); };

})(jQuery,'debounce');


