import gulp     from 'gulp';
import autoLoad from 'gulp-load-plugins';
import manifest from './package.json';

const config = manifest.config,
           $ = autoLoad();

gulp.task('default', () => {
  // place code for your default task here
});

gulp.task('test', () => gulp.src(['test/mocha_init.js', 'test/unit/**/*.js'], { read: false })
                            .pipe($.plumber())
                            .pipe($.mocha({reporter: 'dot', globals: config.mocha.globals })));
