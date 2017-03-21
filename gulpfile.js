const jshint = require('gulp-jshint');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minimist = require('minimist');
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const jasmine = require('gulp-jasmine');
var git = require('gulp-git');


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

gulp.task('js-lint', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/gulp-css'));
});

gulp.task('imagemin', () =>
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dest/img/'))
);

gulp.task('jasmine', () =>
    gulp.src('spec/**/*Spec.js')
        // gulp-jasmine works on filepaths so you can't have any plugins before it
        .pipe(jasmine())
);


gulp.task('init', function(){
  git.init(function (err) {
    if (err) throw err;
  });
});

gulp.task('clone', function(){
  git.clone('https://github.com/stevelacy/gulp-git', function (err) {
    if (err) throw err;
  });
});

gulp.task('add', function(){
  return gulp.src('./*')
    .pipe(git.add());
});

gulp.task('commit', function(){
  return gulp.src('./git-test/*')
    .pipe(git.commit('initial commit'));
});

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('pull', function(){
  git.pull('origin', 'master', {args: '--rebase'}, function (err) {
    if (err) throw err;
  });
});

gulp.task('branch', function(){
  git.branch('newBranch', function (err) {
    if (err) throw err;
  });
});

gulp.task('checkout', function(){
  git.checkout('branchName', function (err) {
    if (err) throw err;
  });
});

