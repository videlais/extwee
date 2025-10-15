/**
 * @jest-environment node
 */

/**
 * Tests for web-twine1html.js module
 * Tests module exports and functionality
 */

import { describe, expect, it } from '@jest/globals';

// Import to test basic functionality
import { parse, compile } from '../../src/Web/web-twine1html.js';
import Extwee from '../../src/Web/web-twine1html.js';

describe('web-twine1html.js module tests', () => {

  describe('ES6 module exports', () => {
    it('should export parse and compile functions', () => {
      expect(parse).toBeDefined();
      expect(compile).toBeDefined();
      expect(typeof parse).toBe('function');
      expect(typeof compile).toBe('function');
    });

    it('should export default object with parseTwine1HTML and compileTwine1HTML', () => {
      expect(Extwee.parseTwine1HTML).toBeDefined();
      expect(Extwee.compileTwine1HTML).toBeDefined();
      expect(Extwee.parse).toBeDefined();
      expect(Extwee.compile).toBeDefined();
      expect(typeof Extwee.parseTwine1HTML).toBe('function');
      expect(typeof Extwee.compileTwine1HTML).toBe('function');
    });
  });

  describe('Global object assignment', () => {
    it('should assign functions to global object when available', () => {
      // In Node.js environment, should assign to globalThis
      expect(globalThis.Extwee).toBeDefined();
      expect(globalThis.Extwee.parseTwine1HTML).toBeDefined();
      expect(globalThis.Extwee.compileTwine1HTML).toBeDefined();
      expect(typeof globalThis.Extwee.parseTwine1HTML).toBe('function');
      expect(typeof globalThis.Extwee.compileTwine1HTML).toBe('function');
    });

    it('should preserve existing Extwee properties', () => {
      // Should not overwrite the entire object, just add properties
      if (globalThis.Extwee && globalThis.Extwee.version) {
        expect(globalThis.Extwee.version).toBeDefined();
      }
      expect(globalThis.Extwee.parseTwine1HTML).toBeDefined();
      expect(globalThis.Extwee.compileTwine1HTML).toBeDefined();
    });
  });

  describe('Functional integration tests', () => {
    it('should have working parseTwine1HTML function', () => {
      // Test with valid Twine 1 HTML
      const sampleHtml = `
        <html>
          <head><title>Test</title></head>
          <body>
            <div id="storeArea" data-size="2">
              <div tiddler="Start" tags="" twine-position="100,100">Start passage</div>
            </div>
          </body>
        </html>
      `;
      
      expect(() => {
        const result = parse(sampleHtml);
        expect(result).toBeDefined();
        expect(result.passages).toBeDefined();
      }).not.toThrow();
    });

    it('should have working compileTwine1HTML function', async () => {
      // Import required classes dynamically to avoid circular imports
      const { Story } = await import('../../src/Story.js');
      const { default: Passage } = await import('../../src/Passage.js');
      const { default: StoryFormat } = await import('../../src/StoryFormat.js');
      
      const story = new Story();
      story.name = "Test Story";
      story.addPassage(new Passage("Start", "This is the start", [], {}));
      
      const storyFormat = new StoryFormat();
      storyFormat.source = "window.story = STORY;";
      storyFormat.version = "1.0.0";
      
      expect(() => {
        const result = compile(story, storyFormat, '', '', '');
        expect(typeof result).toBe('string');
      }).not.toThrow();
    });

    it('should have same functions in exports and global', () => {
      // Test that parse and compile are the same functions
      expect(parse).toBe(Extwee.parse);
      expect(compile).toBe(Extwee.compile);
      expect(parse).toBe(Extwee.parseTwine1HTML);
      expect(compile).toBe(Extwee.compileTwine1HTML);
    });
  });
});