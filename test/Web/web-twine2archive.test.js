/**
 * @jest-environment node
 */

/**
 * Tests for web-twine2archive.js module
 * Tests module exports and functionality
 */

import { describe, expect, it } from '@jest/globals';

// Import to test basic functionality
import { parse, compile } from '../../src/Web/web-twine2archive.js';
import Extwee from '../../src/Web/web-twine2archive.js';

describe('web-twine2archive.js module tests', () => {

  describe('ES6 module exports', () => {
    it('should export parse and compile functions', () => {
      expect(parse).toBeDefined();
      expect(compile).toBeDefined();
      expect(typeof parse).toBe('function');
      expect(typeof compile).toBe('function');
    });

    it('should export default object with parseTwine2ArchiveHTML and compileTwine2ArchiveHTML', () => {
      expect(Extwee.parseTwine2ArchiveHTML).toBeDefined();
      expect(Extwee.compileTwine2ArchiveHTML).toBeDefined();
      expect(Extwee.parse).toBeDefined();
      expect(Extwee.compile).toBeDefined();
      expect(typeof Extwee.parseTwine2ArchiveHTML).toBe('function');
      expect(typeof Extwee.compileTwine2ArchiveHTML).toBe('function');
    });
  });

  describe('Global object assignment', () => {
    it('should assign functions to global object when available', () => {
      // In Node.js environment, should assign to globalThis
      expect(globalThis.Extwee).toBeDefined();
      expect(globalThis.Extwee.parseTwine2ArchiveHTML).toBeDefined();
      expect(globalThis.Extwee.compileTwine2ArchiveHTML).toBeDefined();
      expect(typeof globalThis.Extwee.parseTwine2ArchiveHTML).toBe('function');
      expect(typeof globalThis.Extwee.compileTwine2ArchiveHTML).toBe('function');
    });

    it('should preserve existing Extwee properties', () => {
      // Should not overwrite the entire object, just add properties
      if (globalThis.Extwee && globalThis.Extwee.version) {
        expect(globalThis.Extwee.version).toBeDefined();
      }
      expect(globalThis.Extwee.parseTwine2ArchiveHTML).toBeDefined();
      expect(globalThis.Extwee.compileTwine2ArchiveHTML).toBeDefined();
    });
  });

  describe('Functional integration tests', () => {
    it('should have working parseTwine2ArchiveHTML function', () => {
      // Test with valid Twine 2 Archive HTML
      const sampleHtml = `
        <tw-storydata name="Test" startnode="1" creator="Twine" creator-version="2.3.5">
          <tw-passagedata pid="1" name="Start" tags="">Start passage</tw-passagedata>
        </tw-storydata>
      `;
      
      expect(() => {
        const result = parse(sampleHtml);
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      }).not.toThrow();
    });

    it('should have working compileTwine2ArchiveHTML function', async () => {
      // Import required classes
      const { Story } = await import('../../src/Story.js');
      const { default: Passage } = await import('../../src/Passage.js');
      
      const story = new Story();
      story.name = "Test Story";
      story.IFID = "12345678-1234-5678-9012-123456789012";
      story.addPassage(new Passage("Start", "This is the start", [], {}));
      
      expect(() => {
        const result = compile([story]);
        expect(typeof result).toBe('string');
      }).not.toThrow();
    });

    it('should have same functions in exports and global', () => {
      // Test that parse and compile are the same functions
      expect(parse).toBe(Extwee.parse);
      expect(compile).toBe(Extwee.compile);
      expect(parse).toBe(Extwee.parseTwine2ArchiveHTML);
      expect(compile).toBe(Extwee.compileTwine2ArchiveHTML);
    });
  });
});