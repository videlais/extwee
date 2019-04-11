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

        let name = null;
        let searchName = null;
        let startName = null;

        if(this.metadata.hasOwnProperty("start")) {

            if(this.metadata.start != "") {

                searchName = this.metadata.start;

            }

        }

        for(let passage in this.passages) {

            if(this.passages[passage].name == searchName) {

                name = this.passages[passage].name;
                break;

            }

            if(this.passages[passage].name == "Start") {

                startName = this.passages[passage].name;

            }

        }


        if(searchName == null && name == null && startName == null) {

            throw new Error("Starting passage not found!");

        }

        // Start exists
        // Return its name
        if(startName != null) {

            return startName;

        } else {

            // There was an override and here is the correct name
            return name;

        }

    }

}

module.exports = Story;
