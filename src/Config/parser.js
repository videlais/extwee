/**
 * Parses a JSON object and extracts the StoryFormat, StoryTitle and StoryVersion.
 * @param {Object} obj 
 * @returns {Object} An object containing the extracted results.
 */
export function parser(obj) {
    // Check if the object is a valid JSON object.
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('Error: Invalid JSON object');
    }

    // Extracted results.
    let results = {
        StoryFormat: null,
        StoryTitle: null,
        StoryVersion: null
    };
    
    // Does the object contain 'StoryFormat'?
    if (Object.hasOwnProperty.call(obj, 'story-format')) {
        results.StoryFormat = obj['story-format'];
    }

    // Does the object contain 'StoryTitle'?
    if (Object.hasOwnProperty.call(obj, 'story-title')) {
        results.StoryTitle = obj['story-title'];
    }

    // Does the object contain 'StoryVersion'?
    if (Object.hasOwnProperty.call(obj, 'story-version')) {
        results.StoryVersion = obj['story-version'];
    }

    // Return the extracted results.
    return results;
}