import   gulp           from 'gulp';
import   autoLoad       from 'gulp-load-plugins';
import   mkdirp         from 'mkdirp';
import   del            from 'del';
import   path           from 'path';
import { Instrumenter } from 'isparta'; // https://github.com/douglasduteil/isparta/issues/45
import   manifest       from './package.json';

const $              = autoLoad(),
    { config, main } = manifest,
      destPath       = path.dirname(main);

$.notify.logLevel(1);

gulp.task('default', ['test', 'build']);

gulp.task('test', ['lint-src', 'lint-test'], test);

gulp.task('clean', (cb) => del([destPath], cb));

gulp.task('build', ['clean'], () => {
  mkdirp.sync(destPath);
  return src('src/**/*.js')
             .pipe($.babel({ 
               blacklist: ['useStrict'], 
               optional:  [ 'runtime' ] 
             }))
             .pipe(gulp.dest(destPath));
});

gulp.task('jshint-src',  () => jshint(['src/**/*.js']));
gulp.task('jscs-src',    () => jscs(['src/**/*.js'], 'src'));  
gulp.task('lint-src',    ['jscs-src',  'jshint-src']);

gulp.task('jshint-test', () => jshint(['test/**/*.js']));
gulp.task('jscs-test',   () => jscs(['test/**/*.js'], 'test'));  
gulp.task('lint-test',   ['jscs-test', 'jshint-test']);

gulp.task('watch', ['test'], function() {
  gulp.watch(['src/**/*', 
              'test/**/*', 
              'package.json', 
              '**/.jshintrc', 
              '.jscsrc'], 
             ['test']);
});

gulp.task('coverage', (done) => {
  src(['src/**/*.js'])
     .pipe($.istanbul({ instrumenter: Instrumenter }))
     .pipe($.istanbul.hookRequire())
     .on('finish', () => test().pipe($.istanbul.writeReports())
                               .pipe($.istanbul.enforceThresholds({ thresholds: { global: 90 } }))
                               .on('end', done));
});

function src(files) {
  return gulp.src(files)
             .pipe($.plumber())
}

function test() {
  return src(['test/conf/mocha.js', 'test/spec/**/*.js'], { read: false })
            .pipe($.mocha({ reporter: 'dot', globals: config.mocha.globals }));
}

function jshint(files, overrides) {
  return src(files)
            .pipe($.jshint(overrides))
            .pipe($.jshint.reporter('jshint-stylish'))
            .pipe($.notify(jsHintNotify))
            .pipe($.jshint.reporter('fail'));
}

function jscs(files, dest) {
  return src(files)
            .pipe($.jscs(dest ? {fix: true} : {}))
            .pipe($.jscs.reporter())
            .pipe($.notify(jscsNotify))
            .pipe($.jscs.reporter('fail'))
            .pipe($.if(dest, gulp.dest(dest)))
}

function jscsNotify(file) {
  if (file.jscs.success) {
    return false;
  }  
  let colouriseOutput = false,
      jscs            = file.jscs,
      errors          = jscs.errors,
      errorList       = errors.getErrorList(),
      explainError    = errors.explainError.bind(errors),
      errorText       = errorList.map((err) => explainError(err, colouriseOutput)).join('\n'),
      response        = `${file.relative} (${errorList.length} errors)\n ${errorText}`;
  return response;
}

function jsHintNotify(file) {
  if (file.jshint.success) {
    return false;
  }  

  let errors = file.jshint.results.map((data) => {
    if (data.error) {
      return `(${data.error.line}:${data.error.character}) ${data.error.reason}`;
    }
  }).join("\n");
  return `${file.relative} (${file.jshint.results.length} errors)\n${errors}`;
}

