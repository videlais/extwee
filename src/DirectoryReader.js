const fs = require('fs');
const FileReader = require('./FileReader.js');
const shell = require('shelljs');
// Tell shelljs to be quiet about warnings
shell.config.silent = true;
const CleanCSS = require('clean-css');

/**
 * @class DirectoryReader
 * @module DirectoryReader
 */
class DirectoryReader {
  /**
   * @function DirectoryReader
   * @class
   * @param {string} directory - Directory to read
   */
  constructor (directory) {
    try {
      this.directory = fs.realpathSync(directory);
    } catch (event) {
      throw new Error('Error: Cannot resolve to real path!');
    }

    this.CSScontents = '';
    this.JScontents = '';
    this.tweeContents = '';
  }
  /**
   * Start watching
   *
   * @function watch
   * @returns {void}
   */

  watch () {
    // Reset content
    this.CSScontents = this.JScontents = this.tweeContents = '';

    // Look for CSS files
    this.CSScontents = this.processCSS();
    // Look for JS files
    this.JScontents = this.processJS();
    // Look for Twee files
    this.tweeContents = this.processTwee();
  }

  /**
   * Process JavaScript files
   *
   * @function processJS
   * @returns {void}
   */
  processJS () {
    let fileContents = '';

    console.info('Processing JS files...');

    shell.ls('-R', this.directory + '/**/*.js').forEach(function (value) {
      console.info('  Loading ' + value);
      const file = new FileReader(value);
      fileContents += file.contents;
    });

    return fileContents;
  }

  /**
   * Process CSS files
   *
   * @function processCSS
   * @returns {void}
   */

  processCSS () {
    let fileContents = '';

    console.info('Processing CSS files...');
    shell.ls('-R', this.directory + '/**/*.css').forEach(function (value) {
      console.info('  Loading ' + value);
      const file = new FileReader(value);
      fileContents += file.contents;
    });

    const output = new CleanCSS({ level: 2 });
    const { styles } = output.minify(fileContents);
    return styles;
  }

  /**
   * Process Twee files
   *
   * @function processTwee
   * @returns {void}
   */
  processTwee () {
    const fileType = ['tw', 'tw2', 'twee', 'twee2', 'tw3', 'twee3'];

    let fileContents = '';

    console.info('Processing Twee files...');
    for (let i = 0; i < fileType.length; i++) {
      shell.ls('-R', this.directory + '/**/*.' + fileType[i]).forEach(function (value) {
        const file = new FileReader(value);
        console.info('  Loading ' + value);
        fileContents += file.contents;
      });
    }

    return fileContents;
  }
}

module.exports = DirectoryReader;
