var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minimist = require('minimist');

var knownOptions = {
  string: "logLevel",
  default: { "logLevel": process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('default', function () {
  console.log('gulp has run!');
  console.log("[" + options.LOG_LEVEL + "] ", options.MESSAGE);
});

gulp.task('minify-css', function () {
  return gulp.src("./styles/*.css")
  .pipe(cleanCSS())
  .pipe(gulp.dest("./dest"));
});

gulp.task('minify-js', function () {
  return gulp.src("./js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("./dest"));
});
