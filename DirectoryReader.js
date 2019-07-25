const fs = require("fs");
const FileReader = require('./FileReader.js');
const glob = require("glob");

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

      this.CSScontents = "";
      this.JScontents = "";
      this.tweeContents = "";

      // Resolve symbolics
      const dir = fs.realpathSync(directory);

      // Does it exist?
      if(fs.existsSync(dir) ) {

        // Look for CSS files
        this.CSScontents += this.getGlob(dir, "css");
        // Look for JS files
        this.JScontents += this.getGlob(dir, "js");
        // Look for Twee files
        this.tweeContents += this.getGlob(dir, "tw");
        this.tweeContents += this.getGlob(dir, "twee");
        this.tweeContents += this.getGlob(dir, "twee2");
        this.tweeContents += this.getGlob(dir, "twee3");

      } else {
          throw new Error("Error: Directory does not exist!");
      }

    }

    getGlob(dir, type) {

      let fileContents = "";

      glob.sync(dir + "/**/*." + type).forEach( (value, key, map) => {
          const file = new FileReader(value);
          fileContents += file.contents;
      });

      return fileContents;

    }

}

module.exports = DirectoryReader;
