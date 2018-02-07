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
webpack = require('webpack');

// 'gulp' task
/*  TODO understand the task integration and argument passing of multiple tasks and build out a macro function of 'gulp' that starts the fundamental requirements. BrowserSync may not be one of them. 
*/

// Gulp watch => css && html auto refresh 

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
        gulp.start('webpacks');
    });
    
});

// inject CSS into browserSync without reload 

gulp.task('cssInject', ['css'], function(){
    return gulp.src('./app/temp/css/style.css')
    .pipe(browserSync.stream());
});


// Gulp CSS 

gulp.task('css', function() {
    return gulp.src('./app/assets/css/style.css')
        .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/css/'))
});

gulp.task('webpacks', function(callback){
    webpack(require('./webpack.config.js'), function(){
        console.log('Webpack completed.');
        callback();
    });
});


// SVG Sprite generator 

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './app/templates/sprite.css'
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

gulp.task('copySprite', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('moveSprite', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))
        .pipe(gulp.dest('./app/assets/css/modules'));
});

gulp.task('endCleanSprite', ['moveSprite', 'copySprite'], function(){
    return del('./app/temp/sprite')
});


gulp.task('icons', ['startCleanSprite', 'createSprite', 'copySprite', 'moveSprite', 'endCleanSprite']);