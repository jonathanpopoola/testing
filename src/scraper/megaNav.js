//to run this copy the IIFE below and paste into the console in chrome
//the data will be copied to your clipboard so you can pase into the megaNav.js stub file

( function(){

	var output = {};
	var $menu = $( '#menu' );
	var menuData = {};

	function cleanText( str ){
		return str.replace( /\n/gm, '' ).trim();
	}

	function removeCss( str ){
		return str.replace( /\..+}/, '' );
	}

	$( '.MenuActivatee' ).each( function(){

		var $category = $( this );
		var catId = $category.find( '.megaMenuDrawer' ).attr( 'id' );
		var catName = cleanText( $menu.find( '.' + catId ).text() );

		if( catName ){

			menuData[ catName ] = {};

			$category.find( '.column' ).each( function(){

				var $column = $( this );

				$column.find( 'dt' ).each( function(){

					var $dt = $( this );
					var dtName = $dt.text();
					var items = [];

					//if( dtName ){

						menuData[ catName][ dtName ] = {
							highlight: !!$dt.parent().prev( '.megaMenuMainCatHighlight' ).length
						};

						$dt.siblings( 'dd' ).each( function(){

							var $dd = $( this );
							var imageMatches = $dd.html().match( /background:url\((.*)\)/ );
							var ddInfo = {
								text: removeCss( cleanText( $dd.text() ) )
							};

							if( imageMatches ){
								ddInfo.image = 'http://www.argos.co.uk' + imageMatches[ 1 ];
							}

							items.push( ddInfo );
						} );

						menuData[ catName][ dtName ].items = items;
					//}
				} );
			} );
		}
	} );

	//get the current order of items and make our one match
	$( '#menu' ).find( '.navigation .MenuActivator' ).each( function(){
		var catName = cleanText( $(this).text() );

		output[ catName ] = menuData[ catName ];
	} );

	console.dir( output );
	copy( output );

}() );
