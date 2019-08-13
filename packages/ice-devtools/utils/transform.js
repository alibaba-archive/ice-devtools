module.exports = (files, data, done) => {
  Object.keys(files).forEach((filename) => {
    let newFilename = filename;

    if (/\.ejs$/.test(newFilename)) {
      newFilename = newFilename.replace(/\.ejs$/, '');
      files[newFilename] = files[filename];
      delete files[filename];
    }

    /* eslint-disable-next-line no-useless-escape */
    if (/[_\.]/.test(newFilename)) {
      /* eslint-disable-next-line no-useless-escape */
      newFilename = newFilename.replace(/[_\.]_className__/, data.className);
    }
    // if transformRegexp is passed, filename must match regexp
    if (data.transformRegexp && !data.transformRegexp.test(newFilename)) {
      return;
    }
    // _gitignore -> .gitignore
    // Special logic：_package.json -> package.json
    if (filename === '_package.json') {
      newFilename = newFilename.replace(/^_/, '');
    } else {
      newFilename = newFilename.replace(/^_/, '.');
    }

    if (newFilename !== filename) {
      files[newFilename] = files[filename];
      delete files[filename];
    }
  });
  done();
};
