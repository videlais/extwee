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

    checkSpecialPassages() {

    }

}

module.exports = Story;
