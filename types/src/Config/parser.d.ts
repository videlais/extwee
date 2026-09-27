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
export function parser(obj: Record<string, unknown>): ExtweeConfig;
/**
 * Settings extracted from an `extwee.config.json` object.
 */
export type ExtweeConfig = {
    /**
     * - Value of `story-format`, or `null` if absent.
     */
    StoryFormat: string | null;
    /**
     * - Value of `story-format-version`, or `latest` if absent.
     */
    StoryFormatVersion: string;
    /**
     * - Value of `mode` (e.g. `compile`, `decompile`), or `null` if absent.
     */
    Mode: string | null;
    /**
     * - Value of `input`, or `null` if absent.
     */
    Input: string | null;
    /**
     * - Value of `output`, or `null` if absent.
     */
    Output: string | null;
    /**
     * - Value of `twine1-project`, or `false` if absent.
     */
    Twine1Project: boolean;
};
