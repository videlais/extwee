
const fs = require("fs");
const path = require('path');
/**
 * @class ExTweeFile
 * @module ExTweeFile
 */
class ExTweeFile {
	/**
     * @method ExTweeFile
     * @constructor
     */
    constructor () {
        this.contents = "";
        this.extentsion = "";
    }

    readFile(file) {

        // Attempt to find the file
        if(fs.existsSync(file) ) {

            this.extentsion = this._checkFileExtentsion(file);

            // Check if this is a known file extentsion
            if(this.extentsion != null) {

                // The file exists.
                // It is of a known type.
                // Time to read the file.
                this.contents = fs.readFileSync(file, 'utf8');

            } else {
                // The file was not a Twee or Twee2 file based on extension
                throw new Error("Error: Unknown filetype!");
            }


        } else {
            throw new Error("Error: Source file not found!");
        }

    }
 

    _checkFileExtentsion(input) {

        // Set default
        let fileType = null;

        // Test for Twee files
        if(path.extname(input) == ".tw" ||  path.extname(input) == ".twee" ) {
            fileType = "twee";
        }

        // Test for Twee files
        if(path.extname(input) == ".tw2" ||  path.extname(input) == ".twee2" ) {
            fileType = "twee2";
        }

        // Test for Twee3 files
        if (path.extname(input) ==".tw3" ||  path.extname(input) == ".twee3" ) {
            fileType = "twee3";
        }

        return fileType;

    }

}

module.exports = ExTweeFile;
