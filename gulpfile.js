var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

// 'gulp' task
/*  TODO understand the task integration and argument passing of multiple tasks and build out a macro function of 'gulp' that starts the fundamental requirements. BrowserSync may not be one of them. 
*/

// Gulp watch => css && html auto refresh 

gulp.task('watch', function(){

    browserSync.init({
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
    
});

// inject CSS into browserSync without reload 

gulp.task('cssInject', ['css'], function(){
    return gulp.src('app/temp/css/style.css')
    .pipe(browserSync.stream());
});


// Gulp CSS 

gulp.task('css', function() {
    return gulp.src('app/assets/css/style.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('app/temp/css/'));
});

