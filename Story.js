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
        this.name = "";
        this.metadata = {
            "ifid": "",
            "format": "",
            "formatVersion": "",
            "zoom": "",
            "start": ""
        };
        this.passages = null;
		this.tagColors = "";
		this.zoom = "";
        this.creator = "";
        this.creatorVersion = "";

    }

    /**
     * @method getStylePassages()
     */
    getStylePassages() {

        let stylePassages = [];

        stylePassages = this.passages.filter(function(passage){

            let results = passage.tags.filter(tag => tag == "style");

            return (results.length > 0);

        });

        return stylePassages;

    }

    /**
     * @method getScriptPassages()
     */
    getScriptPassages() {

        let scriptPassages = [];

        scriptPassages = this.passages.filter(function(passage) {

            let results = passage.tags.filter(tag => tag == "script");

            return (results.length > 0);

        });

        return scriptPassages;

    }

    /**
     * @method deleteAllByTag()
     */
    deleteAllByTag(searchTag) {

        this.passages = this.passages.filter(function(passage) {

            let results = passage.tags.filter(tag => tag != searchTag);

            return (results.length == 0);

        });

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

        for(let passage in this.passages) {

            if(this.passages[passage].name == searchName) {

                pid = this.passages[passage].pid;
                break;

            }

            if(this.passages[passage].name == "Start") {

                pid = this.passages[passage].pid;

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
