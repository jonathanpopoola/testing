argos.modules.SearchSuggestion = (function($){

	'use strict';

	function SearchSuggestion(txt){
		var that= this;
		var options = {
			delayLength: 2000
		};

		this.txt = txt;
		this.body = $('body');
		this.container = $('#search');
		this.searchArea = $('.search-area');
		this.items = [];
		this.minChars = 2;
		this.interval = 100;
		this.nav = '<nav class="searchSuggestion"></nav>';
		this.searchSuggestion = function() {
			$('.searchSuggestion');
		};
		this.options = $.extend({}, options, txt);
		this.data = {
			results: [
				{
					title: "Suggestions", data: [
					{
						name: "Home",
						url: ""
					},
					{
						name: "House",
						url: ""
					},
					{
						name: "Hood",
						url: ""
					},
					{
						name: "Hob",
						url: ""
					},
					{
						name: "Hobs",
						url: ""
					},
					{
						name: "Armchair",
						url: ""
					},
					{
						name: "Alarm",
						url: ""
					},
					{
						name: "Fridge",
						url: ""
					}
				]
				},
				{
					title: "Categories", data: [
					{
						name: "Sports and leisure > Games Table > Air Hockey Tables",
						url: ""
					},
					{
						name: "Baby and nursery > Baby toys, Baby Rocking Horses",
						url: ""
					},
					{
						name: "Toys > Kids world > Barbie > Barbie Home",
						url: ""
					},
					{
						name: "Toys > Kids world > Barbie > Armour",
						url: ""
					},
					{
						name: "Sports and leisure > Games Table > Backgammon",
						url: ""
					}
				]
				},
				{
					title: "Shop by brand", data: [
					{
						name: "Air Hogs",
						url: ""
					},
					{
						name: "Animagic Rescue Hospitals",
						url: ""
					},
					{
						name: "Alans",
						url: ""
					},
					{
						name: "Best Plc",
						url: ""
					}
				]
				}
			]
		};
		this.setup();
		this.build();
		this.events();
	}

	SearchSuggestion.prototype.setup = function(){
		this.searchArea.append(this.nav);
		this.nav = $('nav.searchSuggestion').hide();
	};

	SearchSuggestion.prototype.kill = function(){
		$('.searchSuggestion').hide().empty();
	};

	SearchSuggestion.prototype.build = function(){
		var that = this;
		this.activeText = this.container.text();
		$.each(this.data.results, function() {
			that.items.push("<h2>" + this.title + "</h2>");
			$.each((this).data, function() {
				that.items.push("<a href="+ this.url +">" + this.name + "</a>");
			});
		});
		this.render();
	};

	SearchSuggestion.prototype.highlight = function(){
		var txt = $('#search').val();
		var regex = new RegExp(txt);
		$('.searchSuggestion').each(function() {
			var that = $(this);
			var text = that.text();
			if (regex.test(text)) {
				that.html(
					that.html().replace(regex, '<span>'+txt+'</span>')
				);
			}
		});
	};

	SearchSuggestion.prototype.render = function(){
		this.highlight();
		this.nav.append(this.items);
	};

	SearchSuggestion.prototype.checkStringLength = function(str){
		return str.length;
	};

	SearchSuggestion.prototype.events = function(){

		var that = this;

		//this.searchArea.bind('keyup', debounce(function(e){
		//		if (that.checkStringLength(e.target.value) >= that.minChars) {
		//			that.nav.show();
		//			that.render();
		//		} else {
		//			that.kill();
		//		}
		//	})
		//);


	};

	return SearchSuggestion;
})(jQuery);

