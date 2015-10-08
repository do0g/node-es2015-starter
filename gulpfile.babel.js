import gulp     from 'gulp';
import autoLoad from 'gulp-load-plugins';
import mkdirp   from 'mkdirp';
import del      from 'del';
import path     from 'path';
import manifest from './package.json';

const config            = manifest.config,
      $                 = autoLoad(),
      mainFile          = manifest.main,
      destinationFolder = path.dirname(mainFile);

gulp.task('default', () => {
  // place code for your default task here
});

gulp.task('test', () => gulp.src(['test/conf/mocha.js', 'test/unit/**/*.js'], { read: false })
                            .pipe($.plumber())
                            .pipe($.mocha({reporter: 'dot', globals: config.mocha.globals })));

gulp.task('clean', (cb) => del([destinationFolder], cb));

gulp.task('build', ['clean'], () => {
  mkdirp.sync(destinationFolder);
  return gulp.src('src/**/*.js')
             .pipe($.plumber())
//             .pipe($.babel({ blacklist: ['useStrict'] }))
             .pipe($.babel({ 
               blacklist: ['useStrict'], 
               optional: ['runtime'] }))
             .pipe(gulp.dest(destinationFolder));
});
