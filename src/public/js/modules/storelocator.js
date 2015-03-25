
argos.modules.StorelocatorDetails = (function($){

	'use strict';

   	function StorelocatorDetails() {
		$('.opening-hours li[name='+this.dateChecker()+']').addClass('active').prepend('TODAY ');
	}

	StorelocatorDetails.prototype.dateChecker = function() {
		var newDate = new Date(),
			dayNum = newDate.getDay()-1,
			getDay = ["Mon","tue","Wed","Thu","Fri","Sat","Sun"];
		return getDay[dayNum];
	};

	return StorelocatorDetails;
})(jQuery);

