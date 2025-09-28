/**
 * @jest-environment jsdom
 */
import { parse } from '../../src/Twine2ArchiveHTML/parse-web.js';

/**
 * Mock environment to force fallback parsing since jsdom doesn't behave like browser DOMParser
 * @param {string} content Content to parse
 * @returns {Array} Array of Story objects
 */
function parseTwine2ArchiveHTMLWeb(content) {
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

describe('Twine2ArchiveHTML', function () {
  describe('parse-web()', function () {
    describe('Error handling', function () {
      it('Should throw TypeError for non-string content', function () {
        expect(() => { parseTwine2ArchiveHTMLWeb(null); }).toThrow('Content is not a string!');
        expect(() => { parseTwine2ArchiveHTMLWeb(undefined); }).toThrow('Content is not a string!');
        expect(() => { parseTwine2ArchiveHTMLWeb(123); }).toThrow('Content is not a string!');
        expect(() => { parseTwine2ArchiveHTMLWeb({}); }).toThrow('Content is not a string!');
        expect(() => { parseTwine2ArchiveHTMLWeb([]); }).toThrow('Content is not a string!');
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

      it('Should warn when no Twine 2 HTML content is found', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const result = parseTwine2ArchiveHTMLWeb('<div>no twine content here</div>');
        expect(warningMessage).toBe('Warning: No Twine 2 HTML content found!');
        expect(result).toEqual([]);
      });

      it('Should warn for empty string content', function () {
        let warningMessage = '';
        console.warn = (msg) => { warningMessage = msg; };
        
        const result = parseTwine2ArchiveHTMLWeb('');
        expect(warningMessage).toBe('Warning: No Twine 2 HTML content found!');
        expect(result).toEqual([]);
      });
    });

    describe('Basic parsing functionality', function () {
      it('Should parse single story from archive', function () {
        const content = '<tw-storydata name="Test Story" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Hello World</tw-passagedata></tw-storydata>';
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].name).toBe('Test Story');
        expect(stories[0].IFID).toBe('12345678-1234-1234-1234-123456789012');
        expect(stories[0].size()).toBe(1);
        
        const passage = stories[0].getPassageByName('Start');
        expect(passage.name).toBe('Start');
        expect(passage.text).toBe('Hello World');
      });

      it('Should parse multiple stories from archive', function () {
        const content = `
          <tw-storydata name="First Story" ifid="11111111-1111-1111-1111-111111111111">
            <tw-passagedata pid="1" name="Start">First story content</tw-passagedata>
          </tw-storydata>
          <tw-storydata name="Second Story" ifid="22222222-2222-2222-2222-222222222222">
            <tw-passagedata pid="1" name="Begin">Second story content</tw-passagedata>
            <tw-passagedata pid="2" name="Next">More content</tw-passagedata>
          </tw-storydata>
        `;
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(2);
        
        // First story
        expect(stories[0].name).toBe('First Story');
        expect(stories[0].IFID).toBe('11111111-1111-1111-1111-111111111111');
        expect(stories[0].size()).toBe(1);
        expect(stories[0].getPassageByName('Start').text).toBe('First story content');
        
        // Second story
        expect(stories[1].name).toBe('Second Story');
        expect(stories[1].IFID).toBe('22222222-2222-2222-2222-222222222222');
        expect(stories[1].size()).toBe(2);
        expect(stories[1].getPassageByName('Begin').text).toBe('Second story content');
        expect(stories[1].getPassageByName('Next').text).toBe('More content');
      });

      it('Should parse story with complex attributes', function () {
        const content = '<tw-storydata name="Complex Story" ifid="12345678-1234-1234-1234-123456789012" creator="Twine" creator-version="2.3.9" format="Harlowe" format-version="3.1.0" startnode="2" zoom="1.5"><tw-passagedata pid="2" name="Start" position="100,200" size="150,100" tags="start important">Welcome to the story</tw-passagedata></tw-storydata>';
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        const story = stories[0];
        
        expect(story.name).toBe('Complex Story');
        expect(story.creator).toBe('Twine');
        expect(story.creatorVersion).toBe('2.3.9');
        expect(story.format).toBe('Harlowe');
        expect(story.formatVersion).toBe('3.1.0');
        expect(story.start).toBe('Start');
        expect(story.zoom).toBe(1.5);
        
        const passage = story.getPassageByName('Start');
        expect(passage.tags).toEqual(['start', 'important']);
        expect(passage.metadata.position).toBe('100,200');
        expect(passage.metadata.size).toBe('150,100');
      });
    });

    describe('HTML content handling', function () {
      it('Should handle nested HTML content in stories', function () {
        const content = `
          <div class="wrapper">
            <tw-storydata name="Nested Story" ifid="12345678-1234-1234-1234-123456789012">
              <tw-passagedata pid="1" name="Start">Story content</tw-passagedata>
            </tw-storydata>
          </div>
        `;
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].name).toBe('Nested Story');
      });

      it('Should handle stories with style elements', function () {
        const content = '<tw-storydata name="Styled Story" ifid="12345678-1234-1234-1234-123456789012"><style>tw-story-tag-important { color: red; }</style><tw-passagedata pid="1" name="Start" tags="important">Styled content</tw-passagedata></tw-storydata>';
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        const story = stories[0];
        expect(story.tagColors.important).toBe('red;');
        
        const passage = story.getPassageByName('Start');
        expect(passage.tags).toEqual(['important']);
      });

      it('Should handle stories with script elements', function () {
        const content = '<tw-storydata name="Scripted Story" ifid="12345678-1234-1234-1234-123456789012"><script>console.log("test");</script><tw-passagedata pid="1" name="Start">Script content</tw-passagedata></tw-storydata>';
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].name).toBe('Scripted Story');
      });
    });

    describe('Malformed content handling', function () {
      it('Should handle incomplete tw-storydata elements', function () {
        const content = '<tw-storydata name="Incomplete" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Content';
        
        // Should not throw, but should handle gracefully
        expect(() => parseTwine2ArchiveHTMLWeb(content)).not.toThrow();
      });

      it('Should handle mixed valid and invalid content', function () {
        const content = `
          <div>Random content</div>
          <tw-storydata name="Valid Story" ifid="12345678-1234-1234-1234-123456789012">
            <tw-passagedata pid="1" name="Start">Valid content</tw-passagedata>
          </tw-storydata>
          <div>More random content</div>
        `;
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].name).toBe('Valid Story');
      });
    });

    describe('Fallback DOM parsing', function () {
      it('Should work without DOMParser (fallback mode)', function () {
        const originalDOMParser = global.DOMParser;
        global.DOMParser = undefined;

        try {
          const content = '<tw-storydata name="Fallback Test" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Fallback content</tw-passagedata></tw-storydata>';
          const stories = parseTwine2ArchiveHTMLWeb(content);
          
          expect(stories.length).toBe(1);
          expect(stories[0].name).toBe('Fallback Test');
          expect(stories[0].getPassageByName('Start').text).toBe('Fallback content');
        } finally {
          global.DOMParser = originalDOMParser;
        }
      });

      it('Should handle multiple stories in fallback mode', function () {
        const originalDOMParser = global.DOMParser;
        global.DOMParser = undefined;

        try {
          const content = `
            <tw-storydata name="First" ifid="11111111-1111-1111-1111-111111111111">
              <tw-passagedata pid="1" name="Start">First</tw-passagedata>
            </tw-storydata>
            <tw-storydata name="Second" ifid="22222222-2222-2222-2222-222222222222">
              <tw-passagedata pid="1" name="Begin">Second</tw-passagedata>
            </tw-storydata>
          `;
          const stories = parseTwine2ArchiveHTMLWeb(content);
          
          expect(stories.length).toBe(2);
          expect(stories[0].name).toBe('First');
          expect(stories[1].name).toBe('Second');
        } finally {
          global.DOMParser = originalDOMParser;
        }
      });
    });

    describe('Edge cases', function () {
      it('Should handle empty archive content', function () {
        const result = parseTwine2ArchiveHTMLWeb('');
        expect(result).toEqual([]);
      });

      it('Should handle whitespace-only content', function () {
        const result = parseTwine2ArchiveHTMLWeb('   \n\t   ');
        expect(result).toEqual([]);
      });

      it('Should handle stories with unusual character encodings', function () {
        const content = '<tw-storydata name="Unicode Story 📚" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">Content with emojis 🎮 and unicode ü ñ</tw-passagedata></tw-storydata>';
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].name).toBe('Unicode Story 📚');
        expect(stories[0].getPassageByName('Start').text).toBe('Content with emojis 🎮 and unicode ü ñ');
      });

      it('Should handle stories with very long content', function () {
        const longContent = 'A'.repeat(10000);
        const content = `<tw-storydata name="Long Story" ifid="12345678-1234-1234-1234-123456789012"><tw-passagedata pid="1" name="Start">${longContent}</tw-passagedata></tw-storydata>`;
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(1);
        expect(stories[0].getPassageByName('Start').text).toBe(longContent);
      });

      it('Should handle archive with multiple identical story names but different IFIDs', function () {
        const content = `
          <tw-storydata name="Same Name" ifid="11111111-1111-1111-1111-111111111111">
            <tw-passagedata pid="1" name="Start">First version</tw-passagedata>
          </tw-storydata>
          <tw-storydata name="Same Name" ifid="22222222-2222-2222-2222-222222222222">
            <tw-passagedata pid="1" name="Start">Second version</tw-passagedata>
          </tw-storydata>
        `;
        
        const stories = parseTwine2ArchiveHTMLWeb(content);
        
        expect(stories.length).toBe(2);
        expect(stories[0].name).toBe('Same Name');
        expect(stories[1].name).toBe('Same Name');
        expect(stories[0].IFID).toBe('11111111-1111-1111-1111-111111111111');
        expect(stories[1].IFID).toBe('22222222-2222-2222-2222-222222222222');
        expect(stories[0].getPassageByName('Start').text).toBe('First version');
        expect(stories[1].getPassageByName('Start').text).toBe('Second version');
      });
    });
  });
});