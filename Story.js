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

    getStylePassages() {

        let stylePassages = [];

        stylePassages = this.passages.filter(function(passage){

            let results = passage.tags.filter(tag => tag == "style");

            return (results.length > 0);

        });

        return stylePassages;

    }

    getScriptPassages() {

        let scriptPassages = [];

        scriptPassages = this.passages.filter(function(passage){

            let results = passage.tags.filter(tag => tag == "script");

            return (results.length > 0);

        });

        return scriptPassages;

    }

}

module.exports = Story;
