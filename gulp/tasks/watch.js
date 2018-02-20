var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//------------------------------------------------------------------------------
// GULP WATCH
// css && html auto refresh in browser
//------------------------------------------------------------------------------

gulp.task('watch', function(){
   
    browserSync.init({
        notify: false, 
        browser: 'google chrome',
        server: {
            baseDir: "app"
        }
    });
});
    
    watch('app/index.html', function(){
        // TODO: update to *.html or any other front-end file type
        browserSync.reload();
    });

    watch('app/assets/css/**/*.scss', function(){
        gulp.start('cssInject');
    });

    watch('app/assets/scripts/**/*.js', function(){
        gulp.start('scriptsRefresh');
    });

// inject CSS into browserSync without reload 

gulp.task('cssInject', ['css'], function(){
    return gulp.src('./app/temp/css/style.css')
    .pipe(browserSync.stream());
});

// compiles JavaScript files [*.js && modernizr.js]

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});