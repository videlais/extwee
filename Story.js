const pkg = require('./package.json');
/**
 * @class Story
 * @module Story
 */
class Story {
	/**
     * @method Story
     * @constructor
     */
    constructor () {
        this.name = "Unknown";
        this.metadata = {
            "ifid": "",
            "format": "",
            "formatVersion": "",
            "zoom": "",
            "start": ""
        };

        this.passages = [];

        // Store the creator and version
        this.creator = pkg.name;
        this.creatorVersion = pkg.version;

    }

    /**
     * @method getStylePassages()
     */
    getStylePassages() {

        let stylePassages = [];

        if(this.passages.length > 0) {

          stylePassages = this.passages.filter(function(passage){

              let results = passage.tags.filter(tag => tag == "stylesheet");

              return (results.length > 0);

          });

        }

        return stylePassages;

    }

    /**
     * @method getScriptPassages()
     */
    getScriptPassages() {

        let scriptPassages = [];

        if(this.passages.length > 0) {

          scriptPassages = this.passages.filter(function(passage) {

              let results = passage.tags.filter(tag => tag == "script");

              return (results.length > 0);

          });

        }

        return scriptPassages;

    }

    /**
     * @method deleteAllByTag()
     */
    deleteAllByTag(searchTag) {

      if(this.passages.length > 0) {

          this.passages = this.passages.filter(function(passage) {

              return !passage.tags.includes(searchTag);

          });

      }

    }

    /**
     * @method getStartingPassage()
     * @return String
     */
    getStartingPassage() {

        let pid = null;
        let searchName = null;

        if(this.metadata.hasOwnProperty("start")) {

            // Check if the property is an empty string
            // If so, ignore it.
            if(this.metadata.start != "") {

                searchName = this.metadata.start;

            }

        }

        if(this.passages.length > 0) {

          for(let passage in this.passages) {

              if(this.passages[passage].name == searchName) {

                  pid = this.passages[passage].pid;
                  break;

              }

              if(this.passages[passage].name == "Start") {

                  pid = this.passages[passage].pid;

              }

          }

        }

        if(pid == null) {

            throw new Error("Starting passage not found!");

        } else {

          return pid;

        }

    }

}

module.exports = Story;
