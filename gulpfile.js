///////// Gulp is set up for these tasks /////////
// scss [x]
// css prefixer [x]
// css minify [x]
// js minify [x]
// image minify [x]
// live reload [ using vscode live server instead ]
// (in the future) babel

////////////////////////////////////////

const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');

// file paths
const files = {
  scssPath: 'app/scss/**/*.scss',
  jsPath: 'app/js/**/*.js',
  imgPath: 'app/assets/img/*'
}

// minify images
const imgSquash = () => {
  return src(files.imgPath)
    .pipe(imagemin())
    .pipe(dest('./dist/assets/img'))
}

// compile style.scss into style.css
const scssTask = () => {
  // return src(files.scssPath)
  return src('./app/scss/styles.scss')
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile scss -> css
    .pipe(postcss([ autoprefixer(), cssnano() ])) // postcss plugins
    .pipe(sourcemaps.write('.')) // write sourcemaps in current dir
    .pipe(dest('dist')) // put final css in dist folder
}

// concat and terser JS files to all.js
const jsTask = () => {
  return src([
    files.jsPath
  ])
    .pipe(concat('all.js'))
    .pipe(terser())
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
  watch([files.scssPath, files.jsPath, files.imgPath],
      series(
        parallel(scssTask, jsTask, imgSquash),
        cacheBustTask
      )
    )
}

// export default gulp task so it can be run. runs the scss and js task simultaneously then runs cachebust, then watch task
exports.default = series(
  parallel(scssTask, jsTask, imgSquash),
  cacheBustTask,
  watchTask
)