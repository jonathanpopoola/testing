/* jshint node: true, strict: false */

var path = require( 'path' );
var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );
var jshint = require( 'gulp-jshint' );
//var notify = require( 'gulp-notify' );
var livereload = require( 'gulp-livereload' );
var sass = require( 'gulp-ruby-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );
var plummer = require( 'gulp-plumber' );
var debug = require( 'gulp-debug' );
var compass = require( 'gulp-compass' );
var clean = require( 'gulp-clean' );
var replace = require( 'gulp-regex-replace' );


var config = {
	project: path.join( process.cwd(), '/src/public/sass' ),
	scripts: {
		dest: 'dist/js/',
		destMaps: './maps',
		jsVendorSrc: [ 'src/public/js/ext/jquery-1.11.1.min.js', 'src/public/js/ext/tiny-pubsub.js', 'src/public/js/ext/jquery.cookie.js', 'src/public/js/ext/debounce.js' ],
		jsSrc: [ 'src/public/js/base.js', 'src/public/js/modules/*.js', 'src/public/js/init.js', 'src/public/js/pages/*.js' ],
		watchJsSrc: [ 'src/public/js/*.js', 'src/public/js/**/*.js' ],
		outputName: 'all.js',
		outputVendorName: 'vendor.js',
		jshintrc: 'src/public/js/.jshintrc'
	},
	styles: {
		dest: 'dist/css/',
		destMaps: './maps',
		src: [ 'src/public/css/base.scss' ],
		watchSrc: [ 'src/public/css/**/*.scss', '!src/public/css/compiled/*', '!src/public/css/sprites.scss' ],
		outputName: 'all.css'
	},
	sprites: {
		dest: 'src/public/css/',
		src: [ 'src/public/css/sprites.scss' ],
		watchSrc: [ 'src/public/css/sprites.scss' ]
	},
	staticFiles: {
		fonts: {
			src: 'src/public/fonts/*.*',
			dest: './dist/fonts'
		},
		images: {
			src: [ 'src/public/img/**/*.*', '!src/public/img/icons*/*.*' ],
			dest: 'dist/img'
		},
		stubs: {
			src: [ 'src/webapp/stubs/**/*.*' ],
			dest: 'dist/stubs'
		},
		clean: [ 'dist' ]
	}
};

gulp.task('clean', function () {
	return gulp.src( config.staticFiles.clean, { read: false, force: true } )
		.pipe( clean() );
});

gulp.task('compass', function(){
	return gulp
		.src( config.styles.src )
		.pipe( compass({
			project: path.join( __dirname, 'src/public' ),
			sass: 'css',
			image: 'img',
			css: '../../dist/css/'
		}))
		//.pipe(notify({message: 'compass task complete'}));
		.on('error', function( error ){
			console.log( error );
			this.emit( 'end' );
		});
});

gulp.task( 'makeSprite', function(){

	return gulp
		.src( config.sprites.src )
		.pipe( compass({
			project: path.join( __dirname, 'src/public' ),
			sass: 'css',
			image: 'img',
			css: 'css/compiled'
		}));
} );

gulp.task( 'sprite', [ 'makeSprite' ], function(){
	//we have to rename the sprite to work around an issue with SASS not importing files with a css extension
	//and the fact that they don't let us choose the output file extension
	return gulp
		.src( './src/public/css/compiled/sprites.css' )
		.pipe( rename( 'sprites.scss' ) )
		.pipe( replace( { regex: '../../img/', replace: '../img/' } ) )
		.pipe( gulp.dest( 'src/public/css/compiled/' ) );
} );

gulp.task('move', function(){

	gulp
		.src( config.staticFiles.fonts.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.fonts.dest ) );
	gulp
		.src( config.staticFiles.images.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.images.dest ) );
	gulp
		.src( config.staticFiles.stubs.src, { base: '' } )
		.pipe( gulp.dest( config.staticFiles.stubs.dest ) );
});

gulp.task('scripts:vendor', function() {

	return gulp
		.src( config.scripts.jsVendorSrc )
		.pipe( plummer() )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( concat( config.scripts.outputVendorName ) )
		.pipe( gulp.dest( config.scripts.dest ) )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( sourcemaps.write( config.scripts.destMaps ) )
		.pipe( gulp.dest( config.scripts.dest ) );
		//.pipe(notify({message: 'scripts:vendor task complete'}))
});

gulp.task('scripts:argos', function() {

	return gulp
		.src( config.scripts.jsSrc )
		//.pipe(debug( {verbose: true} ) )
		.pipe( plummer())
		.pipe( jshint( config.scripts.jshintrc) )
		.pipe( jshint.reporter( 'default' ) )
		.pipe( sourcemaps.init( { loadMaps: true } ) )
		.pipe( concat( config.scripts.outputName ) )
		.pipe( gulp.dest( config.scripts.dest ) )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( sourcemaps.write( config.scripts.destMaps ) )
		.pipe( gulp.dest( config.scripts.dest ) );
		//.pipe( notify( {message: 'scripts:argos task complete'} ) )
});

gulp.task('styles', function() {

	return gulp
		.src( config.styles.src )
		//.pipe( debug({verbose: true}))
		.pipe( plummer() )
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		//.pipe( minifyCSS())
		.pipe( sourcemaps.write( config.styles.destMaps ) )
		.pipe( gulp.dest( config.styles.dest ) );
		//.pipe( notify( { message: 'styles task complete' } ) )
});

gulp.task('watch', ['default'], function(){

	gulp.watch(
		[
			config.scripts.watchJsSrc,
			config.styles.watchSrc,
			config.staticFiles.images.src,
			config.staticFiles.fonts.src,
			'!src/public/img/icons*.png*'
		],
		['all']
	);

	gulp.watch(
		[ config.sprites.watchSrc ],
		[ 'sprite' ]
	);

	gulp.watch(
		[ 'src/public/css/compiled/sprites.scss' ],
		[ 'compass', 'move' ]
	);

});

gulp.task('watch:scripts', function(){
	gulp.watch(
		[ config.scripts.watchJsSrc ],
		[ 'scripts:vendor', 'scripts:argos', 'move' ]
	);
});

gulp.task('watch:styles', function(){
	gulp.watch(
		[ config.styles.watchSrc ],
		[ 'compass', 'move' ]
	);
});

gulp.task( 'watch:sprites', function(){
	gulp.watch(
		[ config.sprites.watchSrc ],
		[ 'sprite' ]
	);
} );

gulp.task('all', [ 'scripts:vendor', 'scripts:argos', 'compass' ], function(){
	gulp.start( 'move' );
});

gulp.task('default', [ 'sprite' ], function(){
	gulp.start( 'all' );
});
