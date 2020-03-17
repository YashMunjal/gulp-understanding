const gulp = require('gulp');
const imagemin=require('gulp-imagemin');
const sass=require('gulp-sass');
const uglify=require('gulp-uglify');
const csso=require('gulp-csso');
const autoprefixer=require('gulp-autoprefixer');
const concat=require('gulp-concat');
var htmlmin = require('gulp-html-minifier');

/*

    Gulp.task = define task
    src= point to files used
    gulp.dest=points to output folder
    gulp.watch=watch for changes
*/

gulp.task('message',async function(){
    return console.log('Gulp Started');
});
gulp.task('copyHtml',async ()=>{
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

//image-optimization
gulp.task('imageMin',async ()=>{
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});
//js minimization

gulp.task('jsMin',async ()=>{
    gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    gulp.src('src/js/vendor/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/vendor'));
});

//sass compilation
gulp.task('sassCompile',async ()=>{
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'));
});
//minify css+autoprefix cross browser compatibility
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
  //task
gulp.task('cssMin',async ()=>{
    gulp.src('src/css/*.css')
    .pipe(autoprefixer({overrideBrowserslist: AUTOPREFIXER_BROWSERS}))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dist/css'))
});
//concat
gulp.task('combine',async ()=>{
    gulp.src('src/js/*.js')
    .pipe(concat('mainFull.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});
//minify html
gulp.task('minifyHtml', async function() {
    gulp.src('./src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./dist'))
  });


//all tasks automated

gulp.task('default',gulp.series('message','combine','minifyHtml','imageMin','jsMin','jsMin','sassCompile','cssMin'));