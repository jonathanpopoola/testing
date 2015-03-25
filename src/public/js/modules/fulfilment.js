argos.modules.Fulfilment = (function( $ ){

	'use strict';

	var TAB_CONTAINER_CLASS = 'fulfilment-tabs';
	var TAB_CLASS = 'fulfilment-tab';
	var TAB_CONTENT = 'fulfilment-tab-content';
	var ACTIVE_TAB_CLASS = 'active';
	var ACTIVE_TAB_CONTENT_CLASS = 'active';

	function Fulfilment( selector ){

		var $root = $( selector );

		if( ! $root.length ){
			return; //no container found
		}

		this.elems = {
			root: $root,
			tabs: $root.find( '.' + TAB_CLASS ),
			tabContainer: $root.find( '.' + TAB_CONTAINER_CLASS ),
			tabContent: $root.find( '.' + TAB_CONTENT )
		};

		//if we have more than one tab then we need to control them
		//otherwise there is nothing to do here...
		if( this.elems.tabs.length > 1 ){

			this.addEvents();
		}
	}

	Fulfilment.prototype.addEvents = function(){

		var that = this;

		that.elems.tabContainer.delegate( ( '.' + TAB_CLASS ), 'click', function( e ){

			var $tab = $( this );

			if( $tab.hasClass( ACTIVE_TAB_CLASS ) ){
				return; //we don't need to handle clicks for the active tab
			}

			that.makeTabActive( $tab );
			that.showTabContent( $tab );
		} );
	};

	Fulfilment.prototype.makeTabActive = function( $tab ){

		this.elems.tabs.each( function(){

			$( this ).removeClass( ACTIVE_TAB_CLASS );
		} );

		$tab.addClass( ACTIVE_TAB_CLASS );
	};

	Fulfilment.prototype.showTabContent = function( $tab ){

		var tabContentClass = $tab.data( 'tab-content' );

		this.elems.tabContent.each( function(){

			var $tabContent = $( this );

			if( $tabContent.hasClass( tabContentClass ) ){

				$tabContent.addClass( ACTIVE_TAB_CONTENT_CLASS );

			} else if( $tabContent.hasClass( ACTIVE_TAB_CONTENT_CLASS ) ){

				$tabContent.removeClass( ACTIVE_TAB_CONTENT_CLASS );
			}
		} );
	};

	return Fulfilment;

}( jQuery ));
