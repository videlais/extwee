const fs = require("fs");
const FileReader = require('./FileReader.js');
const chokidar = require('chokidar');

/**
 * @class DirectoryWatcher
 * @module DirectoryWatcher
 */
class DirectoryWatcher {
	/**
     * @method DirectoryWatcher
     * @constructor
     */
    constructor (directory, callback) {

      this.directory = directory;

      // Test if callback is a function or not
      if( !(callback instanceof Function) ) {
        throw new Error("Error: Expected function!");
      }

      // Verify that directory exists before watching it
      if(this.check() ) {

        console.info("Watching " + this.directory + " for changes.");

        // Setup the Chokidar watcher
        let watcher = chokidar.watch(this.directory, {
            ignored: /.html/,
            persistent: true,
            ignoreInitial: true
          });

       // Catch all events
       watcher.on('change', (path) => {
            console.info("Change detected on " + path);
            callback();
       });

      }

    }

    check() {

      // Resolve symbolics
      this.directory = fs.realpathSync(this.directory);

      // Does it exist?
      if(fs.existsSync(this.directory) ) {

        return true;

      } else {
          throw new Error("Error: Directory does not exist!");
          return false;
      }

    }

}

module.exports = DirectoryWatcher;
