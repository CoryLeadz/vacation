var gulp = require('gulp'),
modernizr = require('gulp-modernizr');

//------------------------------------------------------------------------------
// GULP MODERNIZER
// check browser for legacy requirements  
//------------------------------------------------------------------------------

gulp.task('modernizr', function(){
    return gulp.src(['./app/assets/css/**/*.css', './app/assets/scripts/**/*.js'])
        .pipe(modernizr({
            'options': [
                'setClasses' 
            ]   
        }))
        .pipe(gulp.dest('./app/temp/scripts'));
});