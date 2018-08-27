const gulp = require('gulp');
const requireDir = require('require-dir');
const lazypipe = require('lazypipe');

const {
  common: {
    getSrc
  },
  changedFiles,
  config: {
    fullSrc: FULLSRC,
    dest: DEST,
    tmplExtname: TMPLEXTNAME,
    styleExtname: STYLEEXTNAME
  }
} = requireDir('../utils');

const parseCopy = lazypipe()
  .pipe(gulp.dest, DEST);

gulp.task('copy', ['clean'], () => {
  const stream = gulp.src(getSrc(FULLSRC, ['*.*'], TMPLEXTNAME.concat(STYLEEXTNAME)), {
      base: FULLSRC
    })
    .pipe(parseCopy());

  stream.on('error', e => {
    console.log('copy task error:', e);
  });

  return stream;
});

gulp.task('copy_watch', () => {
  const stream = gulp.src(changedFiles.get('copy'), {
      base: FULLSRC
    })
    .pipe(parseCopy());

  stream.on('error', e => {
    console.log('copy_watch task error:', e);
  });

  return stream;
});