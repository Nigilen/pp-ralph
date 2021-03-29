// ЗАПРОС/ПОДКЛЮЧЕНИЕ 
let gulp = require('gulp'); 
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let del = require('del');



// таск перевода sass в css. Части файлов нчинаются с underscore
gulp.task('sass', async function() {
  return gulp.src('app/sass/**/*.sass')
          .pipe(sass())
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({stream: true})) // обновление css на странице при изминениях
});

gulp.task('scripts', function() {
  return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({ stream: true }))
});


gulp.task('cssmin', function() {
  return gulp.src('app/sass/*.sass') //береv файлы из этого каталога
    .pipe(sass()) // переформатируем в css
    .pipe(cssnano()) // минифицируем
    .pipe(rename({suffix: '.min'})) // добавляем .min
    .pipe(gulp.dest('app/css')); // размещаем
});


// таск для автоматической перезагрузки страницы
gulp.task('browser-sync', function () {
  browserSync({       // выполняем browser sync
    server: {         // определение параметров сервера
      baseDir: 'app'  // директория для сервера - app
    },
    notify: false     // отключаем уведомления
  })
});





// ТАСКИ ДЛЯ ПРОДАКШЕНА

gulp.task('clean', async function(){
  return del.sync('dist'); // удаление папки dist перед сборкой
});


gulp.task('prebuild', async function () {

  let buildCss = gulp.src([
    'app/css/style.css',
    'app/css/style.min.css'
  ])
  .pipe(gulp.dest('dist/css'))

  let buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  let buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))

  let buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));

});


// НАБЛЮДЕНИЕ И ЗАПУСК


// таск наблюдение за изминениями в файлах
gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // наблюдение за SASS файлами
  gulp.watch('app/*.html', gulp.parallel('code')); // наблюдение за HTML файлами
  gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // наблюдение за JS файлами
});



gulp.task('default', gulp.parallel('cssmin', 'sass', 'scripts', 'browser-sync', 'watch'));

gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass', 'scripts'));
