/**
 * StoryFormat representing a Twine 2 story format.
 *
 * This class has type checking on all of its properties.
 * If a property is set to a value of the wrong type, a TypeError will be thrown.
 *
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 *
 * @class
 * @classdesc A class representing a Twine 2 story format.
 * @property {string} name - The name of the story format.
 * @property {string} version - The semantic version of the story format.
 * @property {string} description - The description of the story format.
 * @property {string} author - The author of the story format.
 * @property {string} image - The image of the story format.
 * @property {string} url - The URL of the story format.
 * @property {string} license - The license of the story format.
 * @property {boolean} proofing - The proofing of the story format.
 * @property {string} source - The source of the story format.
 * @example
 * const sf = new StoryFormat();
 * sf.name = 'New';
 * sf.version = '1.0.0';
 * sf.description = 'New';
 * sf.author = 'New';
 * sf.image = 'New';
 * sf.url = 'New';
 * sf.license = 'New';
 * sf.proofing = true;
 * sf.source = 'New';
 */
export default class StoryFormat {
    constructor(name?: string, version?: string, description?: string, author?: string, image?: string, url?: string, license?: string, proofing?: boolean, source?: string);
    /**
     * @param {string} n - Replacement name.
     */
    set name(n: string);
    /**
     * Name
     * @returns {string} Name.
     */
    get name(): string;
    /**
     * @param {string} n - Replacement version.
     */
    set version(n: string);
    /**
     * Version.
     * @returns {string} Version.
     */
    get version(): string;
    /**
     * @param {string} d - Replacement description.
     */
    set description(d: string);
    /**
     * Description.
     * @returns {string} Description.
     */
    get description(): string;
    /**
     * @param {string} a - Replacement author.
     */
    set author(a: string);
    /**
     * Author.
     * @returns {string} Author.
     */
    get author(): string;
    /**
     * @param {string} i - Replacement image.
     */
    set image(i: string);
    /**
     * Image.
     * @returns {string} Image.
     */
    get image(): string;
    /**
     * @param {string} u - Replacement URL.
     */
    set url(u: string);
    /**
     * URL.
     * @returns {string} URL.
     */
    get url(): string;
    /**
     * @param {string} l - Replacement license.
     */
    set license(l: string);
    /**
     * License.
     * @returns {string} License.
     */
    get license(): string;
    /**
     * @param {boolean} p - Replacement proofing.
     */
    set proofing(p: boolean);
    /**
     * Proofing.
     * @returns {boolean} Proofing.
     */
    get proofing(): boolean;
    /**
     * @param {string} s - Replacement source.
     */
    set source(s: string);
    /**
     * Source.
     * @returns {string} Source.
     */
    get source(): string;
    /**
     * Produces a string representation of the story format object.
     * @method toString
     * @returns {string} - A string representation of the story format.
     */
    toString(): string;
    /**
     * Produces a JSON representation of the story format object.
     * @method toJSON
     * @returns {object} - A JSON representation of the story format.
     */
    toJSON(): object;
    #private;
}
