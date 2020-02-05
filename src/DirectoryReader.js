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

      try {

        this.directory = fs.realpathSync(directory);

      } catch(event) {

        throw new Error("Error: Cannot resolve to real path!");

      }

      this.CSScontents = "";
      this.JScontents = "";
      this.tweeContents = "";

    }

    watch() {

      // Reset content
      this.CSScontents = this.JScontents = this.tweeContents = "";

      // Look for CSS files
      this.CSScontents = this.processCSS();
      // Look for JS files
      this.JScontents = this.processJS();
      // Look for Twee files
      this.tweeContents = this.processTwee();

      console.log("Some words", this.CSScontents, this.JScontents, this.tweeContents);

    }

    processJS() {

      let fileContents = "";

      console.info("Processing JS files...");
      
      shell.ls('-R', this.directory + '/**/*.js').forEach(function (value) {
        
        console.info("  Loading " + value);
        const file = new FileReader(value);
        fileContents += file.contents;

      });

      return fileContents;

    }

    processCSS() {

      let fileContents = "";

      console.info("Processing CSS files...");
      shell.ls('-R', this.directory + '/**/*.css').forEach(function (value) {
        console.info("  Loading " + value);
        const file = new FileReader(value);
        fileContents += file.contents;
      });

      const output = new CleanCSS({level: 2});
      let {styles} = output.minify(fileContents);
      return styles;

    }

    processTwee() {

      let fileType = ["tw", "tw2", "twee", "twee2", "tw3", "twee3"];

      let fileContents = "";

      console.info("Processing Twee files...");
      for(let i = 0; i < fileType.length; i++) {

        shell.ls('-R', this.directory + '/**/*.' + fileType[i]).forEach(function (value) {
          const file = new FileReader(value);
          console.info("  Loading " + value);
          fileContents += file.contents;
        });

      }

      return fileContents;

    }

}

module.exports = DirectoryReader;
