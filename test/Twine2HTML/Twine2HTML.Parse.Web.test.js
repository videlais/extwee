/**
 * @jest-environment jsdom
 */
import { parse, LightweightTwine2Parser } from '../../src/Twine2HTML/parse-web.js';
import { Story } from '../../src/Story.js';

/**
 * Mock environment to force fallback parsing since jsdom doesn't behave like browser DOMParser
 * @param {string} content Content to parse
 * @returns {Story} Story object
 */
function parseTwine2HTMLWeb(content) {
  // Force fallback mode by temporarily hiding DOMParser
  const originalDOMParser = global.DOMParser;
  delete global.DOMParser;
  
  try {
    return parse(content);
  } finally {
    // Restore DOMParser
    if (originalDOMParser) {
      global.DOMParser = originalDOMParser;
    }
  }
}

describe('Twine2HTML', function () {
  describe('parse-web()', function () {
    describe('Error handling', function () {
      it('Should throw TypeError for non-string content', function () {
        expect(() => { parseTwine2HTMLWeb(null); }).toThrow('TypeError: Content is not a string!');
        expect(() => { parseTwine2HTMLWeb(undefined); }).toThrow('TypeError: Content is not a string!');
        expect(() => { parseTwine2HTMLWeb(123); }).toThrow('TypeError: Content is not a string!');
        expect(() => { parseTwine2HTMLWeb({}); }).toThrow('TypeError: Content is not a string!');
      });

      it('Should throw TypeError for non-Twine2 HTML content', function () {
        expect(() => { parseTwine2HTMLWeb('<div>not twine content</div>'); }).toThrow('TypeError: Not Twine 2 HTML content!');
        expect(() => { parseTwine2HTMLWeb(''); }).toThrow('TypeError: Not Twine 2 HTML content!');
      });

      it('Should throw Error for passages without PID', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata name="Test Passage">Content</tw-passagedata></tw-storydata>';
        expect(() => { parseTwine2HTMLWeb(content); }).toThrow('Error: Passages are required to have PID!');
      });
    });

    describe('Basic parsing functionality', function () {
      it('Should parse basic Twine2 HTML with required attributes', function () {
        const content = '<tw-storydata name="Test Story" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Hello World</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.name).toBe('Test Story');
        expect(story.IFID).toBe('12345678-1234-1234-1234-123456789012');
        expect(story.size()).toBe(1);
        
        const passage = story.getPassageByName('Start');
        expect(passage.name).toBe('Start');
        expect(passage.text).toBe('Hello World');
      });

      it('Should parse story with all optional attributes', function () {
        const content = '<tw-storydata name="Complex Story" ifid="12345678-1234-1234-1234-123456789012" creator="Twine" creator-version="2.3.9" format="Harlowe" format-version="3.1.0" startnode="2" zoom="1.5" options="key1:value1,key2:value2" hidden="passage1,passage2"><tw-passagedata pid="2" name="Start" position="100,200" size="150,100" tags="start important">Welcome to the story</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.name).toBe('Complex Story');
        expect(story.IFID).toBe('12345678-1234-1234-1234-123456789012');
        expect(story.creator).toBe('Twine');
        expect(story.creatorVersion).toBe('2.3.9');
        expect(story.format).toBe('Harlowe');
        expect(story.formatVersion).toBe('3.1.0');
        expect(story.start).toBe('Start');
        expect(story.zoom).toBe(1.5);
        expect(story.metadata.key1).toBe('value1');
        expect(story.metadata.key2).toBe('value2');
        expect(story.metadata.hidden).toBe('passage1,passage2');
        
        const passage = story.getPassageByName('Start');
        expect(passage.name).toBe('Start');
        expect(passage.text).toBe('Welcome to the story');
        expect(passage.tags).toEqual(['start', 'important']);
        expect(passage.metadata.position).toBe('100,200');
        expect(passage.metadata.size).toBe('150,100');
      });

      it('Should parse story with multiple passages', function () {
        const content = '<tw-storydata name="Multi Story" ifid="12345678-1234-1234-1234-123456789012" startnode="1"><tw-passagedata pid="1" name="Start">Start content</tw-passagedata><tw-passagedata pid="2" name="Second" tags="special">Second content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.size()).toBe(2);
        expect(story.start).toBe('Start');
        
        const startPassage = story.getPassageByName('Start');
        expect(startPassage.text).toBe('Start content');
        
        const secondPassage = story.getPassageByName('Second');
        expect(secondPassage.text).toBe('Second content');
        expect(secondPassage.tags).toEqual(['special']);
      });
    });

    describe('Warning generation', function () {
      let originalConsoleWarn;
      
      beforeEach(() => {
        originalConsoleWarn = console.warn;
      });
      
      afterEach(() => {
        console.warn = originalConsoleWarn;
      });

      it('Should warn for missing name attribute', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const content = '<tw-storydata ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warningMessage).toBe('Warning: The name attribute is missing from tw-storydata!');
      });

      it('Should warn for missing IFID attribute', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const content = '<tw-storydata name="Test Story"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warningMessage).toBe('Warning: The ifid attribute is missing from tw-storydata!');
      });

      it('Should warn for malformed IFID', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const content = '<tw-storydata name="Test Story" ifid="invalid-ifid"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warningMessage).toBe('Warning: The IFID is not in valid UUIDv4 formatting on tw-storydata!');
      });

      it('Should warn for passage without name', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const content = '<tw-storydata name="Test Story" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warningMessage).toBe('Warning: Cannot parse passage data without name!');
      });
    });

    describe('Tag color parsing from styles', function () {
      it('Should parse tag colors from style elements', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><style>tw-story-tag-important { color: red; } tw-story-tag-special { color: #00ff00; }</style><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.tagColors.important).toBe('red;');
        expect(story.tagColors.special).toBe('#00ff00;');
      });

      it('Should handle multiple style elements', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><style>tw-story-tag-red { color: red; }</style><style>tw-story-tag-blue { color: blue; }</style><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.tagColors.red).toBe('red;');
        expect(story.tagColors.blue).toBe('blue;');
      });
    });

    describe('HTML entity decoding', function () {
      it('Should decode HTML entities in passage text', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">&lt;p&gt;Hello &amp; welcome&lt;/p&gt;</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.text).toBe('<p>Hello & welcome</p>');
      });

      it('Should handle complex HTML entities', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">&quot;Quote&quot; &apos;Apostrophe&apos; &copy; &amp; more</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.text).toBe('"Quote" \'Apostrophe\' © & more');
      });
    });

    describe('Tag handling', function () {
      it('Should handle empty tags attribute', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start" tags="">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.tags.length).toBe(0);
      });

      it('Should handle quoted empty tags', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start" tags=\'""\'">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.tags.length).toBe(0);
      });

      it('Should handle multiple tags', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start" tags="tag1 tag2 tag3">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.tags).toEqual(['tag1', 'tag2', 'tag3']);
      });

      it('Should filter out empty tag strings', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start" tags="tag1  tag2   tag3">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Start');
        
        expect(passage.tags).toEqual(['tag1', 'tag2', 'tag3']);
      });
    });

    describe('Options parsing', function () {
      it('Should parse empty options', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012" options=""><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(Object.keys(story.metadata).length).toBe(0);
      });

      it('Should parse single option', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012" options="debug:true"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.metadata.debug).toBe('true');
      });

      it('Should parse multiple options', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012" options="debug:true,undo:false,jquery:disabled"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.metadata.debug).toBe('true');
        expect(story.metadata.undo).toBe('false');
        expect(story.metadata.jquery).toBe('disabled');
      });

      it('Should handle malformed options gracefully', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012" options="debug:true,malformed,another:value"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.metadata.debug).toBe('true');
        expect(story.metadata.another).toBe('value');
        expect(story.metadata.malformed).toBeUndefined();
      });
    });

    describe('Fallback DOM parsing', function () {
      it('Should work without DOMParser (fallback mode)', function () {
        const originalDOMParser = global.DOMParser;
        global.DOMParser = undefined;

        try {
          const content = '<tw-storydata name="Fallback Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start" tags="test" position="100,200">Fallback content</tw-passagedata></tw-storydata>';
          const story = parseTwine2HTMLWeb(content);
          
          expect(story.name).toBe('Fallback Test');
          expect(story.size()).toBe(1);
          
          const passage = story.getPassageByName('Start');
          expect(passage.text).toBe('Fallback content');
          expect(passage.tags).toEqual(['test']);
          expect(passage.metadata.position).toBe('100,200');
        } finally {
          global.DOMParser = originalDOMParser;
        }
      });
    });

    describe('Edge cases', function () {
      it('Should handle empty passage content', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Empty"></tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Empty');
        
        expect(passage.text).toBe('');
      });

      it('Should handle special characters in passage names', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Passage with special: chars & symbols!">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Passage with special: chars & symbols!');
        
        expect(passage.text).toBe('Content');
      });

      it('Should handle whitespace in passage content', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Whitespace">   \\n\\t  Content with whitespace  \\n\\t   </tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        const passage = story.getPassageByName('Whitespace');
        
        expect(passage.text).toBe('\\n\\t  Content with whitespace  \\n\\t');
      });

      it('Should handle numeric zoom values', function () {
        const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012" zoom="2.5"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        
        const story = parseTwine2HTMLWeb(content);
        
        expect(story.zoom).toBe(2.5);
        expect(typeof story.zoom).toBe('number');
      });
    });

    describe('DOMParser path (native browser DOM)', function () {
      it('Should parse using native DOMParser when available', function () {
        // In jsdom environment, DOMParser is available — use it directly (no deletion)
        const content = '<tw-storydata name="DOMParser Story" ifid="12345678-1234-1234-1234-123456789012" startnode="1"><tw-passagedata pid="1" name="Start" tags="test" position="100,200" size="100,100">Content here</tw-passagedata></tw-storydata>';
        const story = parse(content);
        expect(story.name).toBe('DOMParser Story');
        expect(story.IFID).toBe('12345678-1234-1234-1234-123456789012');
        expect(story.size()).toBe(1);
        const passage = story.getPassageByName('Start');
        expect(passage.name).toBe('Start');
        expect(passage.text).toBe('Content here');
        expect(passage.tags).toEqual(['test']);
        expect(passage.metadata.position).toBe('100,200');
      });

      it('Should fall back to regex on DOMParser parsererror', function () {
        const originalWarn = console.warn;
        const warnings = [];
        console.warn = (...args) => { warnings.push(args[0]); };
        const OriginalDOMParser = global.DOMParser;

        global.DOMParser = class {
          parseFromString() {
            const doc = document.implementation.createHTMLDocument('');
            const err = doc.createElement('parsererror');
            doc.body.appendChild(err);
            return doc;
          }
        };

        try {
          const parser = new LightweightTwine2Parser('<tw-storydata name="Test">content</tw-storydata>');
          expect(parser.usingDOMParser).toBe(false);
          expect(warnings.some(w => w.includes('DOMParser encountered an error'))).toBe(true);
        } finally {
          global.DOMParser = OriginalDOMParser;
          console.warn = originalWarn;
        }
      });

      it('Should fall back to regex when DOMParser throws', function () {
        const originalWarn = console.warn;
        const warnings = [];
        console.warn = (...args) => { warnings.push(args[0]); };
        const OriginalDOMParser = global.DOMParser;

        global.DOMParser = class {
          parseFromString() {
            throw new Error('DOMParser unavailable');
          }
        };

        try {
          const parser = new LightweightTwine2Parser('<tw-storydata name="Test">content</tw-storydata>');
          expect(parser.usingDOMParser).toBe(false);
          expect(warnings.some(w => w.includes('DOMParser failed'))).toBe(true);
        } finally {
          global.DOMParser = OriginalDOMParser;
          console.warn = originalWarn;
        }
      });
    });

    describe('Warning generation for empty/invalid attribute values', function () {
      let originalConsoleWarn;

      beforeEach(() => {
        originalConsoleWarn = console.warn;
      });

      afterEach(() => {
        console.warn = originalConsoleWarn;
      });

      it('Should warn for empty name attribute on tw-storydata', function () {
        const warnings = [];
        console.warn = (msg) => { warnings.push(msg); };
        const content = '<tw-storydata name="" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warnings.some(w => w.includes('name attribute is empty or invalid'))).toBe(true);
      });

      it('Should warn for empty ifid attribute on tw-storydata', function () {
        const warnings = [];
        console.warn = (msg) => { warnings.push(msg); };
        const content = '<tw-storydata name="Test" ifid=""><tw-passagedata pid="1" name="Start">Content</tw-passagedata></tw-storydata>';
        parseTwine2HTMLWeb(content);
        expect(warnings.some(w => w.includes('ifid attribute is empty or invalid'))).toBe(true);
      });
    });

    describe('LightweightTwine2Parser internal methods', function () {
      it('Should return empty array for unknown tag names via createSimpleDOM', function () {
        // Constructor HTML must not have passagedata/style elements since extraction uses this.html
        const parser = new LightweightTwine2Parser('<tw-storydata name="Test">content only</tw-storydata>');
        const simpleDOM = parser.createSimpleDOM('<tw-storydata name="Test">content</tw-storydata>');
        expect(simpleDOM.getElementsByTagName('unknown-tag')).toEqual([]);
        expect(simpleDOM.getElementsByTagName('tw-storydata').length).toBeGreaterThan(0);
        expect(simpleDOM.getElementsByTagName('tw-passagedata')).toEqual([]);
        expect(simpleDOM.getElementsByTagName('style')).toEqual([]);
      });

      it('Should return empty array for unknown tag in class getElementsByTagName fallback', function () {
        // Force fallback: create parser without DOMParser
        const OriginalDOMParser = global.DOMParser;
        delete global.DOMParser;
        try {
          const parser = new LightweightTwine2Parser('<tw-storydata name="Test">content</tw-storydata>');
          expect(parser.usingDOMParser).toBe(false);
          expect(parser.getElementsByTagName('completely-unknown')).toEqual([]);
        } finally {
          global.DOMParser = OriginalDOMParser;
        }
      });

      it('Should parse unquoted attribute values via parseAttributes', function () {
        const OriginalDOMParser = global.DOMParser;
        delete global.DOMParser;
        try {
          // pid=1 is an unquoted attribute value — exercises the unquoted attribute regex path
          const content = '<tw-storydata name="Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid=1 name="Unquoted">Text</tw-passagedata></tw-storydata>';
          const story = parse(content);
          expect(story.getPassageByName('Unquoted').text).toBe('Text');
        } finally {
          global.DOMParser = OriginalDOMParser;
        }
      });
    });
  });
});
