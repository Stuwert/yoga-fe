var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync')
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon')

gulp.task('sass', function(){
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.stream())
})

gulp.task('browser-sync', ['nodemon'], function(){
  browserSync.init(null, {
    proxy: 'localhost:3000',
    port: '5000'
  })
})

gulp.task('nodemon', function(cb){
  var called = false;
  return nodemon({
    script:'./bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function(){
    if(!called){
      called = true;
      cb();
    }
  })
  .on('restart', function(){
    setTimeout(function(){
      reload({stream: false});
    }, 1000)
  })
})

gulp.task('default', ['browser-sync', 'sass'], function(){
  gulp.watch('./sass/*.scss', ['sass'])
  gulp.watch('./public/javascripts/*', reload);
  gulp.watch('./views/*', reload);
  gulp.watch('./views/about/*', reload);
  gulp.watch('./views/auth/*', reload);
  gulp.watch('./views/poses/*', reload);
  gulp.watch('./views/user/*', reload);
});
