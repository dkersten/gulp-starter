const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');

// file paths

const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js'
}

// compile style.scss into style.css
const scssTask = () => {
  return src(files.scssPath)
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile scss -> css
    .pipe(postcss([ autoprefixer(), cssnano() ])) // postcss plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps in current dir
    .pipe(dest('dist')) // put final css in dist folder
}

// concat and uglify JS files to all.js
const jsTask = () => {
  return src([
    files.jsPath
  ])
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(dest('dist'))
}

// cachebust
const cbString = new Date().getTime()

const cacheBustTask = () => {
  return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(dest('.'))
}

// watch task: watch scss and js files for changes. If any changes run scss and js task simultaneously
const watchTask = () => {
  watch([files.scssPath, files.jsPath],
      series(
        parallel(scssTask, jsTask),
        cacheBustTask
      )
    )
}

// export default gulp task so it can be run. runs the scss and js task simultaneously then runs cachebust, then watch task
exports.default = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  watchTask
)

// babel
// scss
// css prefixer
// css minify [x]
// js minify [x]
// image minify
// live reload