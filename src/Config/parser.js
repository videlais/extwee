/**
 * Settings extracted from an `extwee.config.json` object.
 * @typedef {object} ExtweeConfig
 * @property {string|null} StoryFormat - Value of `story-format`, or `null` if absent.
 * @property {string} StoryFormatVersion - Value of `story-format-version`, or `latest` if absent.
 * @property {string|null} Mode - Value of `mode` (e.g. `compile`, `decompile`), or `null` if absent.
 * @property {string|null} Input - Value of `input`, or `null` if absent.
 * @property {string|null} Output - Value of `output`, or `null` if absent.
 * @property {boolean} Twine1Project - Value of `twine1-project`, or `false` if absent.
 */

/**
 * Extracts Extwee settings from a parsed `extwee.config.json` object. Unknown keys are ignored.
 * @param {Record<string, unknown>} obj Parsed configuration object.
 * @returns {ExtweeConfig} Extracted settings with defaults applied.
 * @throws {Error} Error: Invalid JSON object
 */
export function parser(obj) {
    // Check if the object is a valid JSON object.
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('Error: Invalid JSON object');
    }

    // Extracted results.
    let results = {
        StoryFormat: null,
        Input: null,
        Output: null,
        Mode: null,
        Twine1Project: false,
        StoryFormatVersion: null
    };
    
    // Does the object contain 'StoryFormat'?
    if (Object.prototype.hasOwnProperty.call(obj, 'story-format')) {
        results.StoryFormat = obj['story-format'];
    }

    // Does the object contain 'StoryFormatVersion'?
    if (Object.prototype.hasOwnProperty.call(obj, 'story-format-version')) {
        results.StoryFormatVersion = obj['story-format-version'];
    } else {
        results.StoryFormatVersion = "latest";
    }

    // Does the object contain 'mode'?
    if (Object.prototype.hasOwnProperty.call(obj, 'mode')) {
        results.Mode = obj['mode'];
    }

    // Does the object contain 'input'?
    if (Object.prototype.hasOwnProperty.call(obj, 'input')) {
        results.Input = obj['input'];
    }

    // Does the object contain 'output'?
    if (Object.prototype.hasOwnProperty.call(obj, 'output')) {
        results.Output = obj['output'];
    }

    // Does the object contain 'twine1-project'?
    if (Object.prototype.hasOwnProperty.call(obj, 'twine1-project')) {
        results.Twine1Project = obj['twine1-project'];
    } else {
        results.Twine1Project = false;
    }

    // Return the extracted results.
    return results;
}