/**
 * Parse Twine 2 Archive HTML and returns an array of story objects.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md Twine 2 Archive Specification}
 * @function parse
 * @param {string} content - Content to parse for Twine 2 HTML elements.
 * @throws {TypeError} - Content is not a string!
 * @returns {Array} Array of stories found in content.
 * @example
 * const content = '<tw-storydata name="Untitled" startnode="1" creator="Twine" creator-version="2.3.9" ifid="A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Untitled Passage" tags="" position="0,0" size="100,100"></tw-passagedata></tw-storydata>';
 * console.log(parse(content));
 * // => [
 * //     Story {
 * //      name: 'Untitled',
 * //      startnode: '1',
 * //      creator: 'Twine',
 * //      creatorVersion: '2.3.9',
 * //      ifid: 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6',
 * //      zoom: '1',
 * //      format: 'Harlowe',
 * //      formatVersion: '3.1.0',
 * //      options: '',
 * //      hidden: '',
 * //      passages: [
 * //        Passage {
 * //          pid: '1',
 * //          name: 'Untitled Passage',
 * //          tags: '',
 * //          position: '0,0',
 * //          size: '100,100',
 * //          text: ''
 * //        }
 * //      ]
 * //    }
 * //   ]
 */
export function parse(content: string): any[];
