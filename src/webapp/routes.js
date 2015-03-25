module.exports = function( app ){

	'use strict';

	var megaNavStub = require( './stubs/modules/megaNav' );

	function getData( file ){

		var data = {};

		if( file ){
			data = require( file );
		}

		data.megaNav = megaNavStub;

		return data;
	}

	app.get( '/', function( req, res ){

		res.render( 'pages/home.html', {
			name: 'home',
			data: getData( './stubs/pages/home/stub_home' )
		});
	});

	app.get( '/module/static/:moduleName', function( req, res ){

		var moduleName = req.params.moduleName;

		res.render( 'module_helper.html', {
			name: moduleName,
			moduleTemplate: './modules/' + moduleName + '.html',
		});
	});

	app.get( '/module/snippet/:moduleName', function( req, res ){

		var moduleName = req.params.moduleName;
		var moduleData = require( './stubs/modules/' + moduleName );
		var data = getData();
		data[moduleName] = moduleData;

		res.render(  './modules/' + moduleName + '.html', {
			name: moduleName,
			data: data
		});
	});

	app.get( '/module/:moduleName', function( req, res ){

		var moduleName = req.params.moduleName;

		res.render( 'module_helper.html', {
			name: moduleName,
			moduleTemplate: './modules/' + moduleName + '.html',
			data: getData( './stubs/modules/' + moduleName )
		});
	});

	app.get( '/page/:pageName/:variant', function( req, res ){

		var pageName = req.params.pageName;
		var variant = req.params.variant;

		res.render( 'pages/' + pageName + '.html', {
			name: pageName,
			data: getData( './stubs/pages/' + pageName + '/stub_' + variant )
		});
	});

	app.get( '/page/:pageName', function( req, res ){
		var pageName = req.params.pageName;
		res.render( 'pages/' + pageName + '.html', {
			name: pageName
		});
	});

	/* WIKI Routing */

	app.get( '/wiki', function( req, res ){
		res.render( 'wiki/home.html', {
			name: 'wiki',
			data: require( './stubs/wiki/home/stub_home' )
		} );
	});

	app.get( '/wiki/:pageName/', function( req, res ){
		var pageName = req.params.pageName;
		res.render( 'wiki/' + pageName + '.html', {
			name: pageName
		});
	});

};
