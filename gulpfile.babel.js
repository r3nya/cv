import gulp from 'gulp'

const config = {
  dest: './dest/',
  template: './app/template/index.pug',
  style: [
    './node_modules/muicss/dist/css/mui.css',
    './app/style/style.css'
  ]
}

gulp.task('html', () => {
  const pug = require('gulp-pug')

  return gulp.src(config.template)
    .pipe(pug({
      locals: {}
    }))
    .pipe(gulp.dest(config.dest))
});

gulp.task('css', () => {
  const concat = require('gulp-concat')
  const purify = require('gulp-purifycss')
  const cleanCSS = require('gulp-clean-css')

  return gulp.src(config.style)
    .pipe(concat('style.css'))
    .pipe(purify([ config.dest + 'index.html' ]))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(config.dest))
})

gulp.task('open', () => {
  const open = require('gulp-open')

  return gulp.src(config.dest + 'index.html')
    .pipe(open());
})

gulp.task('clean', () => {
  const del = require('del')

  return del([ `#{config.dest}` ])
})

gulp.task('w', () => {
  return gulp.watch(
    'app/**/*.(pug|css)',
    gulp.parallel('html', 'css')
  )
})

gulp.task('default',
  gulp.series('clean',
    gulp.series('html',
      gulp.parallel('css')
    )
  )
)
