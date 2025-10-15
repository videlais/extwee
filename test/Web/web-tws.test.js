/**
 * @jest-environment node
 */

/**
 * Tests for web-tws.js module
 * Tests module exports and functionality
 */

import { describe, expect, it } from '@jest/globals';

// Import to test basic functionality
import { parse } from '../../src/Web/web-tws.js';
import Extwee from '../../src/Web/web-tws.js';

describe('web-tws.js module tests', () => {

  describe('ES6 module exports', () => {
    it('should export parse function', () => {
      expect(parse).toBeDefined();
      expect(typeof parse).toBe('function');
    });

    it('should export default object with parseTWS', () => {
      expect(Extwee.parseTWS).toBeDefined();
      expect(Extwee.parse).toBeDefined();
      expect(typeof Extwee.parseTWS).toBe('function');
      expect(typeof Extwee.parse).toBe('function');
    });
  });

  describe('Global object assignment', () => {
    it('should assign functions to global object when available', () => {
      // In Node.js environment, should assign to globalThis
      expect(globalThis.Extwee).toBeDefined();
      expect(globalThis.Extwee.parseTWS).toBeDefined();
      expect(typeof globalThis.Extwee.parseTWS).toBe('function');
    });

    it('should preserve existing Extwee properties', () => {
      // Should not overwrite the entire object, just add properties
      if (globalThis.Extwee && globalThis.Extwee.version) {
        expect(globalThis.Extwee.version).toBeDefined();
      }
      expect(globalThis.Extwee.parseTWS).toBeDefined();
    });
  });

  describe('Functional integration tests', () => {
    it('should have working parseTWS function', () => {
      // Create a minimal valid TWS buffer (pickled data)
      // This is a very basic test - TWS parsing is complex
      const validBuffer = Buffer.from([
        0x80, 0x02, // Python pickle protocol version 2
        0x7d, 0x71, 0x00, // Empty dict
        0x2e // STOP
      ]);
      
      expect(() => {
        const result = parse(validBuffer);
        expect(result).toBeDefined();
      }).not.toThrow();
    });

    it('should throw error for invalid input', () => {
      expect(() => {
        parse("not a buffer");
      }).toThrow();
    });

    it('should have same functions in exports and global', () => {
      // Test that parse is the same function
      expect(parse).toBe(Extwee.parse);
      expect(parse).toBe(Extwee.parseTWS);
    });
  });
});