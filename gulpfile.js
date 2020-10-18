const {series} = require ('gulp');

function transpile (cb) {
  cb ();
}

function bundle (cb) {
  cb ();
}

exports.build = series (transpile, build);

// babel
// scss
// css prefixer
// css minify
// js minify
// image minify
// live reload
