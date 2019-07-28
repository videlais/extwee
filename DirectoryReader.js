const fs = require("fs");
const FileReader = require('./FileReader.js');
const shell = require('shelljs');
// Tell shelljs to be quiet about warnings
shell.config.silent = true;
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');
const babel = require("@babel/core");

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

      // Read the directory
      this.update();

    }

    update() {

      // Reset
      this.CSScontents = this.JScontents = this.tweeContents = "";

      // Look for CSS files
      this.CSScontents += this.processCSS();
      // Look for JS files
      this.JScontents += this.processJS();
      // Look for Twee files
      this.tweeContents += this.processTwee();

    }

    processJS() {

      let fileContents = "";

      console.info("Processing JS files...");
      shell.ls('-R', this.directory + '/**/*.js').forEach(function (value) {
        console.info("  Loading " + value);
        const file = new FileReader(value);

        let babelResult = {
          code: ""
        };

        try {

          babelResult = babel.transformSync(file.contents, {
            "presets": ["@babel/preset-env"],
          });

        } catch(event) {

          console.info("Error Babel processing " + value + ". Skipping contents.");

        }

        let uglyResult = UglifyJS.minify(babelResult.code);

        fileContents += uglyResult.code;

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

      const output = new CleanCSS({level: 2}).minify(fileContents);
      return output.styles;

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
