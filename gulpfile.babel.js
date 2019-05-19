const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const webpackStream = require('webpack-stream'); //webpackをgulpで使用する為のプラグイン
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js'); //webpack設定ファイル(webpack.config.js)を読み込み

//scssファイルをcssファイルにコンパイル
gulp.task('sass', () => {
  return gulp.src('./src/sass/style.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./public/css'));
});

//jsを1つのファイルにバインド＋ES6をES5にコンパイル(webpack.config.jsの内容)
gulp.task('build', () => {
  return gulp.src('./src/js/index.js')
  .pipe(webpackStream(webpackConfig, webpack)).on('error', function (e) {
        this.emit('end'); //エラー発生時にgulp処理を止めない
    })
  .pipe(gulp.dest('./public/js'));
});

//ファイル変更を監視＋更新
gulp.task('watch', () => {
  gulp.watch('./src/sass/*.scss', gulp.task('sass'));
  gulp.watch('./src/sass/**/*.scss', gulp.task('sass'));
  gulp.watch('./src/js/*.js', gulp.task('build'));
});

//デフォルト設定(コマンドに『gulp』を叩くだけで実行される処理)
gulp.task('default', gulp.parallel('watch'));
