/**
 * StoryFormat representing a Twine 2 story format.
 *
 * This class has type checking on all of its properties.
 * If a property is set to a value of the wrong type, a TypeError will be thrown.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @class
 * @classdesc A class representing a Twine 2 story format.
 * @property {string} name - Display name shown in Twine (e.g. `Harlowe`).
 * @property {string} version - The semantic version of the story format.
 * @property {string} description - HTML description shown in Twine's story format list.
 * @property {string} author - Person or group credited with creating the story format.
 * @property {string} image - File name of an icon (relative to the format file) shown in Twine.
 * @property {string} url - Home page URL of the story format.
 * @property {string} license - License identifier (e.g. `MIT`).
 * @property {boolean} proofing - Whether this is a proofing format rather than a playable one.
 * @property {string} source - HTML template containing `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
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
    /**
     * Create a story format.
     * @param {string} [name] - Display name (defaults to `Untitled Story Format`).
     * @param {string} [version] - Semantic version (e.g. `1.0.0`).
     * @param {string} [description] - HTML description shown in Twine.
     * @param {string} [author] - Author name.
     * @param {string} [image] - Icon file name, relative to the format file.
     * @param {string} [url] - Home page URL.
     * @param {string} [license] - License name.
     * @param {boolean} [proofing] - Whether this is a proofing format.
     * @param {string} [source] - HTML template with `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
     * @throws {TypeError} If any argument has the wrong type (see the individual setters).
     */
    constructor(name?: string, version?: string, description?: string, author?: string, image?: string, url?: string, license?: string, proofing?: boolean, source?: string);
    /**
     * Set name.
     * @param {string} n - New story format name.
     * @throws {TypeError} Name must be a string!
     */
    set name(n: string);
    /**
     * Name of the story format as shown in Twine (e.g. `Harlowe`).
     * @returns {string} Display name.
     */
    get name(): string;
    /**
     * Set version. Semver validity is not checked until {@link StoryFormat#toJSON}.
     * @param {string} n - New version string.
     * @throws {TypeError} Version must be a string!
     */
    set version(n: string);
    /**
     * Semantic version of the story format. Must be valid semver when calling {@link StoryFormat#toJSON}.
     * @returns {string} Version string.
     */
    get version(): string;
    /**
     * Set description.
     * @param {string} d - New description markup.
     * @throws {TypeError} Description must be a string!
     */
    set description(d: string);
    /**
     * HTML description shown in Twine's story format list.
     * @returns {string} Description markup.
     */
    get description(): string;
    /**
     * Set author.
     * @param {string} a - New author name.
     * @throws {TypeError} Author must be a string!
     */
    set author(a: string);
    /**
     * Person or group credited with creating the story format.
     * @returns {string} Author name.
     */
    get author(): string;
    /**
     * Set image.
     * @param {string} i - New icon file name.
     * @throws {TypeError} Image must be a string!
     */
    set image(i: string);
    /**
     * File name of the icon shown in Twine, relative to the story format file.
     * @returns {string} Icon file name.
     */
    get image(): string;
    /**
     * Set URL.
     * @param {string} u - New home page URL.
     * @throws {TypeError} URL must be a string!
     */
    set url(u: string);
    /**
     * Home page URL of the story format.
     * @returns {string} Home page URL.
     */
    get url(): string;
    /**
     * Set license.
     * @param {string} l - New license name.
     * @throws {TypeError} License must be a string!
     */
    set license(l: string);
    /**
     * License of the story format (e.g. `MIT`).
     * @returns {string} License name.
     */
    get license(): string;
    /**
     * Set proofing.
     * @param {boolean} p - `true` to mark as a proofing format.
     * @throws {TypeError} Proofing must be a Boolean!
     */
    set proofing(p: boolean);
    /**
     * Whether this is a proofing format (for reviewing a story) rather than a playable one.
     * @returns {boolean} `true` for proofing formats.
     */
    get proofing(): boolean;
    /**
     * Set source.
     * @param {string} s - New HTML template.
     * @throws {TypeError} Source must be a String!
     */
    set source(s: string);
    /**
     * HTML template of the story format, containing `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
     * @returns {string} HTML template.
     */
    get source(): string;
    /**
     * Produces a string representation of the story format object.
     * @returns {string} Tab-indented JSON string.
     * @throws {TypeError} ERROR: Version must be a valid semantic version!
     */
    toString(): string;
    /**
     * Produces a JSON representation of the story format object. An empty name is written as `Untitled Story Format`.
     * @returns {string} JSON string of all story format properties.
     * @throws {TypeError} ERROR: Version must be a valid semantic version!
     */
    toJSON(): string;
    #private;
}
