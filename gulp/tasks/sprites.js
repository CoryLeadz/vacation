var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del'),
svg2png = require('gulp-svg2png');

//------------------------------------------------------------------------------
// GULP ICONS 
// SVG and PNG Sprite generator from icon images 
//------------------------------------------------------------------------------

gulp.task('icons', ['startCleanSprite', 'createSprite', 'svgpng', 'copySprite', 'moveSprite', 'endCleanSprite']);

var config = {
    shape: {
        spacing: {
            padding: 1
        }
    },
    mode: {
        css: {
            variables: {
                replaceSvgWithPng: function() {
                    return function(sprite, render) {
                        return render(sprite).split('.svg').join('.png');
                    }
                }
            },
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

