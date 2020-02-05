const fs = require("fs");
const path = require('path');
/**
 * @class FileReader
 * @module FileReader
 */
class FileReader {
	/**
     * @method FileReader
     * @constructor
     */
    constructor (file) {

        this.contents = "";
        this.readFile(file);
    }

    readFile(file) {

        // Attempt to find the file
        if(fs.existsSync(file) ) {

            // The file exists.
            this.contents = fs.readFileSync(file, 'utf8');

        } else {

            throw new Error("Error: File not found!");

        }

    }

}

module.exports = FileReader;
