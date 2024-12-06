/**
 * Parses a JSON object and extracts the StoryFormat, StoryTitle and StoryVersion.
 * @param {Object} obj
 * @returns
 */
export function parser(obj: any): {
    StoryFormat: any;
    StoryTitle: any;
    StoryVersion: any;
};
