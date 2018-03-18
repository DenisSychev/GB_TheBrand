const gulp = require('gulp');
const sass = require('gulp-sass');
const uglifyJs = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const BS = require('browser-sync');

/**
 * Конфигурационный файл проекта для работы Гульпа
 */
const config = {
  devel: './TheBrand_devel',
  test: './TheBrand_test'
};

/**
 * Запускается локальный сервер, для отображения изменений сайта в реальном времени
 */
gulp.task('server', function () {
  BS({
    server: {
      baseDir: config.devel
    }
  })
});

/**
 * Наблюдатель. Будет автоматически выполнять задачи
 */
gulp.task('watch', function () {
  gulp.watch(config.devel + '/sass/**/*.sass', ['sass']);
  gulp.watch(config.devel + '/*.html', ['html']);
  gulp.watch(config.devel + '/js/**/*.js', ['js']);
});

/**
 * Перечень задач для выполнения в процессе разработки. Вызывается gulp
 */
gulp.task('default', ['html', 'sass', 'js', 'cssTransfer', 'fonts', 'img', 'video', 'watch', 'server'], function () {
  console.log('Запущено выполнение нескольких задач');
});

/**
 * Переносит все HTML-файлы в тестовую директорию
 */
gulp.task('html', function () {
  gulp.src(config.devel + '/*.html')
    .pipe(gulp.dest(config.test))
    .pipe(BS.reload({stream: true}))
});

/**
 * Конвертер sass-файлов в css
 */
gulp.task('sass', function () {
  gulp.src(config.devel + '/sass/**/*.sass')
    .pipe(sass()).pipe(gulp.dest(config.devel + '/css'))
    .pipe(gulp.dest(config.test + '/css'))
    .pipe(BS.reload({stream: true}))
});

/**
 * Перенос css в тестовую директорию
 */
gulp.task('cssTransfer', function () {
  gulp.src(config.devel + '/css/**/*.css')
    .pipe(gulp.dest(config.test + '/css'))
    .pipe(BS.reload({stream: true}))
});

/**
 * Конвертирует и переносит js-файлы в релизную директорию
 */
gulp.task('js', function () {
  gulp.src(config.devel + '/js/**/*.js')
    .pipe(uglifyJs())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(config.test + '/js'))
    .pipe(BS.reload({stream: true}))
});

/**
 * Переносит все шрифты в релизную директорию
 */
gulp.task('fonts', function () {
  gulp.src(config.devel + '/font/*')
    .pipe(gulp.dest(config.test + '/font'))
    .pipe(BS.reload({stream: true}))
});

/**
 * Переносит все картинки в релизную директорию
 */
gulp.task('img', function () {
  gulp.src(config.devel + '/img/**/*')
    .pipe(gulp.dest(config.test + '/img'))
    .pipe(BS.reload({stream: true}))
});

/**
 * Переносит все видео-файлы в релизную директорию
 */
gulp.task('video', function () {
  gulp.src(config.devel + '/video/*')
    .pipe(gulp.dest(config.test + '/video'))
    .pipe(BS.reload({stream: true}))
});