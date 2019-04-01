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

        // Save the mode
        // This will affect which
        this.mode = "twee3";
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
     */
    getStartingPassage() {

        let pid = null;
        let searchName = null;
        let startPid = null;

        if(this.metadata.hasOwnProperty("start")) {

            if(this.metadata.start != "") {

                searchName = this.metadata.start;

            }

        }

        for(let passage in this.passages) {

            if(this.passages[passage].name == searchName) {

                pid = passage;
                break;

            }

            if(this.passages[passage].name == "Start") {

                startPid = passage;

            }

        }


        if(searchName == null && pid == null && startPid == null) {

            throw new Error("Starting passage not found!");

        }

        // Start exists
        // Return its PID
        if(startPid != null) {

            return parseInt(startPid, 10) + 1;

        } else {

            // There was an override and here is the correct PID
            return parseInt(pid, 10) + 1;

        }

    }

}

module.exports = Story;
