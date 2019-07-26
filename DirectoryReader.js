const fs = require("fs");
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
     * @method DirectoryReader
     * @constructor
     */
    constructor (directory) {

      this.directory = fs.realpathSync(directory);
      this.CSScontents = "";
      this.JScontents = "";
      this.tweeContents = "";
      // Read the directory
      if(fs.existsSync(this.directory) ) {
            this.update();
      } else {
          throw new Error("Error: Directory does not exist!");
      }

    }

    getGlob(type) {

      let fileContents = "";

      shell.ls('-R', this.directory + '/**/*.' + type).forEach(function (value) {
        const file = new FileReader(value);
        fileContents += file.contents;
      });

      return fileContents;

    }

    update() {

      // Reset
      this.CSScontents = "";
      this.JScontents = "";
      this.tweeContents = "";

      // Look for CSS files
      this.CSScontents += this.processCSS();
      // Look for JS files
      this.JScontents += this.getGlob("js");
      // Look for Twee files
      this.tweeContents += this.getGlob("tw");
      this.tweeContents += this.getGlob("twee");
      this.tweeContents += this.getGlob("twee2");
      this.tweeContents += this.getGlob("twee3");

    }

    processCSS() {

      let fileContents = "";

      console.info("Processing CSS files...");
      shell.ls('-R', this.directory + '/**/*.css').forEach(function (value) {
        console.info("  Loading " + value);
        const file = new FileReader(value);
        fileContents += file.contents;
      });

       const output = new CleanCSS({level: 2}).minify(fileContents);
       return output.styles;
    }

}

module.exports = DirectoryReader;
