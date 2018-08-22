const fs = require('fs');
const path = require('path').posix;
const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const requireDir = require('require-dir');
const makeDir = require('make-dir');

const tasks = requireDir('./src/tasks');
const {
  src: SRC,
  fullSrc: FULLSRC,
  dest: DEST,
  template: TEMPLATE,
  startPath: STARTPATH,
  project: PROJECT,
  noConfig: NOCONFIG,
  encoding: ENCODING
} = require('./src/utils/config');

// 设置build为默认task
gulp.task('default', ['build']);

gulp.task('init', () => {
  // 如果没有用户配置文件，就新建一个
  NOCONFIG && fs.writeFile(path.join(PROJECT, 'bag-tool-config.json'), `{}`, {
    encoding: ENCODING
  }, () => {});

  // 创建src目录以及template目录
  FULLSRC.forEach(src => {
    // 创建src目录
    !fs.existsSync(src) && makeDir.sync(src);

    // 创建template目录
    src = path.join(src, TEMPLATE);
    !fs.existsSync(src) && makeDir.sync(src);
  });
});

gulp.task('build', ['html', 'less', 'copy']);

gulp.task('watch', ['build'], () => {
  global.isWatch = true; // 全局标记为监听中

  // 在本地起一个服务并调起浏览器访问该服务
  browserSync.init({
    server: {
      baseDir: DEST
    },
    startPath: STARTPATH
  });

  // 监听src文件改动
  const stream = watch(SRC, {
    cwd: PROJECT
  }, () => {
    gulp.start('reload');
  });

  stream.on('error', e => {
    console.log('watch task error:', e);
  });

  return stream;
});

gulp.task('reload', ['build'], () => {
  browserSync.reload(); // 自动刷新页面
});