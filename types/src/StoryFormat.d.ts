export default class StoryFormat {
    /**
     * Create a story format.
     * @param {string} name - Name
     * @param {string} version - Version
     * @param {string} description - Description
     * @param {string} author - Author
     * @param {string} image - Image
     * @param {string} url - URL
     * @param {string} license - License
     * @param {boolean} proofing - If proofing or not
     * @param {string} source - Source
     */
    constructor(name?: string, version?: string, description?: string, author?: string, image?: string, url?: string, license?: string, proofing?: boolean, source?: string);
    /**
     * @param {string} n - Replacement name
     */
    set name(n: string);
    /**
     * Name
     * @returns {string} Name
     */
    get name(): string;
    /**
     * @param {string} n - Replacement version
     */
    set version(n: string);
    /**
     * Version
     * @returns {string} Version
     */
    get version(): string;
    /**
     * @param {string} d - Replacement description
     */
    set description(d: string);
    /**
     * Description
     * @returns {string} Description
     */
    get description(): string;
    /**
     * @param {string} a - Replacement author
     */
    set author(a: string);
    /**
     * Author
     * @returns {string} Author
     */
    get author(): string;
    /**
     * @param {string} i - Replacement image
     */
    set image(i: string);
    /**
     * Image
     * @returns {string} Image
     */
    get image(): string;
    /**
     * @param {string} u - Replacement URL
     */
    set url(u: string);
    /**
     * URL
     * @returns {string} URL
     */
    get url(): string;
    /**
     * @param {string} l - Replacement license
     */
    set license(l: string);
    /**
     * License
     * @returns {string} License
     */
    get license(): string;
    /**
     * @param {boolean} p - Replacement proofing
     */
    set proofing(p: boolean);
    /**
     * Proofing
     * @returns {boolean} Proofing
     */
    get proofing(): boolean;
    /**
     * @param {string} s - Replacement source
     */
    set source(s: string);
    /**
     * Source
     * @returns {string} Source
     */
    get source(): string;
    #private;
}
