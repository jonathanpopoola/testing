var express = require( 'express' );
var config = require( './config' );
var routes = require( './routes' );
var swig = require( 'swig' );
var serveStatic = require( 'serve-static' );
var path = require( 'path' );
var logger = require( 'morgan' );
var compress = require( 'compression' );

var app = express();
var serverConfig = config.deployment.server;
var pathToPublic = path.resolve( __dirname, '../../dist' );

// This is where all the magic happens!
app.engine( 'html', swig.renderFile );

app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set( 'view cache', false );
// To disable Swig's cache, do the following:
swig.setDefaults( { cache: false } );

swig.setFilter( 'currency', function( input ){
	return ( '£' + input );
} );

swig.setFilter( 'getRatingClass', function( rating, max ){

	var blockFill = 100;
	var min = ( max - 1 );

	if( rating > min && rating < max ){
		blockFill = ( ( rating - min ).toFixed( 2 ) * 100 );
	} else if( max > rating ){
		blockFill = 0;
	}

	if( blockFill !== 100 ){
		return ( ' class="fill-' + blockFill + '"' );
	} else {
		return '';
	}

} );
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.use( compress() );
app.use( logger( 'dev' ) );
app.use( '/public', serveStatic( pathToPublic ) );

routes( app );

var server = app.listen( serverConfig.port, function(){

	console.log( 'Example app listening at http://%s:%s', serverConfig.host, serverConfig.port );
});
