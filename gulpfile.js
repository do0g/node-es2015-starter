var gulp     = require('gulp')
    $        = require('gulp-load-plugins')();
    manifest = require('./package.json'),
    config   = manifest.config;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('test', function() {
  return gulp.src(['test/mocha_init.js', 'test/unit/**/*.js'], {read: false})
             .pipe($.plumber())
             .pipe($.mocha({reporter: 'dot', globals: config.mocha.globals }));
});
