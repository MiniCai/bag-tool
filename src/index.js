const fs = require('fs');
const path = require('path').posix;

module.exports = {
  getVersion() {
    console.log(JSON.parse(fs.readFileSync(path.join(__dirname.replace(/\\/g, '/'), '../package.json'), {
      encoding: 'utf8'
    })).version);
  },
  getHelp(lang = '') {
    console.log(fs.readFileSync(path.join(__dirname.replace(/\\/g, '/'), `../help${lang}.txt`), {
      encoding: 'utf8'
    }));
  },
  init(gulpFork) {
    return gulpFork(['init']);
  },
  clean(gulpFork) {
    return gulpFork(['clean']);
  },
  build(gulpFork) {
    return gulpFork(['build']);
  },
  start(gulpFork) {
    return gulpFork(['watch']);
  }
};