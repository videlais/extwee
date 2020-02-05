const fs = require("fs");
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
      this.watcher = null;
      this.callback = callback;

      // Test if callback is a function or not
      if( !(this.callback instanceof Function) ) {

        throw new Error("Error: Expected function!");

      }

      try {

        this.directory = fs.realpathSync(this.directory);

      } catch(event) {

        throw new Error("Error: Directory does not exist!");

      }

    }

    watch() {

      console.info("Watching " + this.directory + " for changes.");
      console.info("Press CTRL+C to stop.");

      // Setup the Chokidar watcher
      this.watcher = chokidar.watch(this.directory, {
          ignored: /.html/,
          persistent: true,
          ignoreInitial: false
      });

      // Catch initial scan
      this.watcher.on('ready', () => {
        this.callback('ready');
      });

      // Catch change events
      this.watcher.on('change', (path) => {
        console.info("Change detected on " + path);
        this.callback('change');
      });

      // Catch add events
      this.watcher.on('add', (path) => {
        console.info("Addition detected on " + path);
        this.callback('add');
      });

    }

    stopWatching() {

      if(this.watcher == null) {

        throw new Error("Invalid watcher object!");

      } else {

        this.watcher.close().then(() => {
          console.log('Stopped watching.');
        });

      }

      
    }

}

module.exports = DirectoryWatcher;