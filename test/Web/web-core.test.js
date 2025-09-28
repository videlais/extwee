/**
 * @jest-environment node
 */

// Import to test basic functionality
import { parseTwee, parseJSON, parseStoryFormat, parseTwine2HTML, compileTwine2HTML, generateIFID, Story, Passage, StoryFormat } from '../../src/Web/web-core.js';
import Extwee from '../../src/Web/web-core.js';

describe('web-core.js Node.js environment tests', () => {
  describe('ES6 module exports', () => {
    it('should export all individual functions and classes', () => {
      expect(parseTwee).toBeDefined();
      expect(typeof parseTwee).toBe('function');
      
      expect(parseJSON).toBeDefined();
      expect(typeof parseJSON).toBe('function');
      
      expect(parseStoryFormat).toBeDefined();
      expect(typeof parseStoryFormat).toBe('function');
      
      expect(parseTwine2HTML).toBeDefined();
      expect(typeof parseTwine2HTML).toBe('function');
      
      expect(compileTwine2HTML).toBeDefined();
      expect(typeof compileTwine2HTML).toBe('function');
      
      expect(generateIFID).toBeDefined();
      expect(typeof generateIFID).toBe('function');
      
      expect(Story).toBeDefined();
      expect(typeof Story).toBe('function');
      
      expect(Passage).toBeDefined();
      expect(typeof Passage).toBe('function');
      
      expect(StoryFormat).toBeDefined();
      expect(typeof StoryFormat).toBe('function');
    });

    it('should export default Extwee object with all properties', () => {
      expect(Extwee).toBeDefined();
      expect(typeof Extwee).toBe('object');
      
      expect(Extwee.parseTwee).toBeDefined();
      expect(Extwee.parseJSON).toBeDefined();
      expect(Extwee.parseStoryFormat).toBeDefined();
      expect(Extwee.parseTwine2HTML).toBeDefined();
      expect(Extwee.compileTwine2HTML).toBeDefined();
      expect(Extwee.generateIFID).toBeDefined();
      expect(Extwee.Story).toBeDefined();
      expect(Extwee.Passage).toBeDefined();
      expect(Extwee.StoryFormat).toBeDefined();
      expect(Extwee.version).toBe('2.3.3');
    });

    it('should have same functions in default export as individual exports', () => {
      expect(Extwee.parseTwee).toBe(parseTwee);
      expect(Extwee.parseJSON).toBe(parseJSON);
      expect(Extwee.parseStoryFormat).toBe(parseStoryFormat);
      expect(Extwee.parseTwine2HTML).toBe(parseTwine2HTML);
      expect(Extwee.compileTwine2HTML).toBe(compileTwine2HTML);
      expect(Extwee.generateIFID).toBe(generateIFID);
      expect(Extwee.Story).toBe(Story);
      expect(Extwee.Passage).toBe(Passage);
      expect(Extwee.StoryFormat).toBe(StoryFormat);
    });
  });

  describe('Functional integration tests', () => {
    it('should have working parseTwee function', () => {
      const tweeContent = `:: Start
This is the start passage.`;
      
      const result = parseTwee(tweeContent);
      expect(result).toBeDefined();
      expect(result.passages).toBeDefined();
      expect(result.passages.length).toBe(1);
      expect(result.passages[0].name).toBe('Start');
    });

    it('should have working parseJSON function', () => {
      const jsonContent = JSON.stringify({
        passages: [{
          name: 'Start',
          text: 'This is the start passage.',
          tags: [],
          metadata: {}
        }],
        name: 'Test Story',
        IFID: '12345678-1234-5678-9012-123456789012'
      });
      
      const result = parseJSON(jsonContent);
      expect(result).toBeDefined();
      expect(result.passages).toBeDefined();
      expect(result.passages.length).toBe(1);
      expect(result.name).toBe('Test Story');
    });

    it('should have working generateIFID function', () => {
      const ifid = generateIFID();
      expect(ifid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/);
    });

    it('should have working Story constructor', () => {
      const story = new Story();
      expect(story).toBeDefined();
      expect(story.passages).toBeDefined();
      expect(Array.isArray(story.passages)).toBe(true);
    });

    it('should have working Passage constructor', () => {
      const passage = new Passage();
      expect(passage).toBeDefined();
      expect(passage.name).toBeDefined();
      expect(passage.text).toBeDefined();
      expect(passage.tags).toBeDefined();
      expect(Array.isArray(passage.tags)).toBe(true);
    });

    it('should have working StoryFormat constructor', () => {
      const storyFormat = new StoryFormat();
      expect(storyFormat).toBeDefined();
      expect(storyFormat.name).toBeDefined();
      expect(storyFormat.version).toBeDefined();
    });
  });

  describe('Global assignment in Node.js environment', () => {
    it('should assign to global.global in Node.js environment', () => {
      // In Node.js environment, it should assign to global.global
      expect(global.global.Extwee).toBeDefined();
      expect(global.global.Extwee.version).toBe('2.3.3');
      expect(global.global.Extwee).toBe(Extwee);
    });
    
    it('should verify global object detection logic execution', () => {
      // This test ensures the global object detection function runs
      // In Node.js, typeof globalThis is 'undefined' (in older versions), 
      // typeof window is 'undefined', typeof global is 'object', typeof self is 'undefined'
      expect(typeof global).toBe('object');
      expect(global.global).toBeDefined();
    });
  });

  describe('Version consistency', () => {
    it('should have consistent version across exports', () => {
      expect(Extwee.version).toBe('2.3.3');
    });

    it('should have version property as string', () => {
      expect(typeof Extwee.version).toBe('string');
      expect(Extwee.version.length).toBeGreaterThan(0);
    });
  });
});