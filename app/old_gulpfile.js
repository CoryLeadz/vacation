var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create(),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
hexrgba = require('postcss-hexrgba'),
webpack = require('webpack'),
svg2png = require('gulp-svg2png'),
modernizr = require('gulp-modernizr');



// 'gulp' task
/*  TODO understand the task integration and argument passing of multiple tasks and build out a macro function of 'gulp' that starts the fundamental requirements. BrowserSync may not be one of them. 
*/


//------------------------------------------------------------------------------
// GULP WATCH
// css && html auto refresh in browser
//------------------------------------------------------------------------------

gulp.task('watch', function(){

    browserSync.init({
        browser: 'google chrome',
        notify: false, 
        server: "app"
    });
    
    watch('app/index.html', function(){
        // TODO update to *.html or any other front-end file type
        browserSync.reload();
    });

    watch('app/assets/css/**/*.scss', function(){
        gulp.start('cssInject');
    });

    watch('app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });
    
});

// inject CSS into browserSync without reload 

gulp.task('cssInject', ['css'], function(){
    return gulp.src('./app/temp/css/style.css')
    .pipe(browserSync.stream());
});


//------------------------------------------------------------------------------
// GULP CSS 
// compile all CSS files 
//------------------------------------------------------------------------------

gulp.task('css', function() {
    return gulp.src('./app/assets/css/style.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/css/'))
});


//------------------------------------------------------------------------------
// GULP SCRIPTS 
// Webpack javascript file compilation 
//------------------------------------------------------------------------------

gulp.task('scripts', ['modernizr'], function(callback){
    webpack(require('./webpack.config.js'), function(err, stats){
        if (err) {
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});


//------------------------------------------------------------------------------
// GULP ICONS 
// SVG and PNG Sprite generator from icon images 
//------------------------------------------------------------------------------

gulp.task('icons', ['startCleanSprite', 'createSprite', 'svgpng', 'copySprite', 'moveSprite', 'endCleanSprite']);

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

gulp.task('startCleanSprite', function(){
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['startCleanSprite'], function() {
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite/'));
});


// .svg to .png for legacy browser support 

gulp.task('svgpng', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});


gulp.task('copySprite', ['svgpng'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('moveSprite', ['svgpng'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/css/modules'));
});

gulp.task('endCleanSprite', ['moveSprite', 'copySprite'], function(){
    return del('./app/temp/sprite');
});


//------------------------------------------------------------------------------
// gulp MODERNIZR
// check browser for legacy requirements  

gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/css/**/*.css', './app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            'options': [
                'setClasses' 
            ]   
        }))
        .pipe(gulp.dest('./app/temp/scripts'));
});