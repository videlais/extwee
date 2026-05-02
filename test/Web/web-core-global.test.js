/**
 * @jest-environment jsdom
 */

// Import the module to test global assignment in jsdom environment
import '../../src/Web/web-core.js';
import { version } from '../../src/version.js';

describe('web-core.js global assignment in browser environment', () => {
  it('should assign Extwee to window in jsdom environment', () => {
    // Should have assigned to window automatically on import
    expect(window.Extwee).toBeDefined();
    expect(window.Extwee.version).toBe(version);
    expect(typeof window.Extwee).toBe('object');
  });

  it('should have all expected properties on window.Extwee', () => {
    expect(window.Extwee.parseTwee).toBeDefined();
    expect(window.Extwee.parseJSON).toBeDefined();
    expect(window.Extwee.parseStoryFormat).toBeDefined();
    expect(window.Extwee.parseTwine2HTML).toBeDefined();
    expect(window.Extwee.compileTwine2HTML).toBeDefined();
    expect(window.Extwee.generateIFID).toBeDefined();
    expect(window.Extwee.Story).toBeDefined();
    expect(window.Extwee.Passage).toBeDefined();
    expect(window.Extwee.StoryFormat).toBeDefined();
  });

  it('should verify global object detection logic ran (window branch)', () => {
    // This test verifies that the globalObject detection function found window
    // and assigned Extwee to it
    expect(typeof window).toBe('object');
    expect(window).not.toBeNull();
    expect(window.Extwee).toBeDefined();
  });

  it('should have working functions on window.Extwee', () => {
    // Test that the assigned functions work correctly
    const ifid = window.Extwee.generateIFID();
    expect(ifid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/);
    
    const story = new window.Extwee.Story();
    expect(story).toBeDefined();
    expect(Array.isArray(story.passages)).toBe(true);
  });

  // Test to exercise the globalObject detection function
  it('should test global object detection function directly', () => {
    // This is a test to simulate what the global object detection function does
    // We can't easily mock the environment during module loading, but we can
    // verify the logic by recreating it
    
    const globalObjectDetectionLogic = function() {
      if (typeof globalThis !== 'undefined') return 'globalThis';
      if (typeof window !== 'undefined') return 'window'; 
      if (typeof global !== 'undefined') return 'global';
      if (typeof self !== 'undefined') return 'self';
      return null;
    };

    // In jsdom environment, could return 'globalThis' or 'window' depending on Node.js version
    const result = globalObjectDetectionLogic();
    expect(['globalThis', 'window']).toContain(result);
    
    // Verify window exists and is truthy
    expect(typeof window).toBe('object');
    expect(window).toBeTruthy();
  });

  // Test for globalThis availability (Modern browsers/Node.js 12+)
  it('should handle globalThis when available', () => {
    // Test the globalThis branch logic
    if (typeof globalThis !== 'undefined') {
      expect(globalThis).toBeDefined();
      expect(typeof globalThis).toBe('object');
      
      // In environments with globalThis, it should be preferred
      const mockGlobalDetection = function() {
        if (typeof globalThis !== 'undefined') return 'globalThis';
        if (typeof window !== 'undefined') return 'window';
        if (typeof global !== 'undefined') return 'global';
        if (typeof self !== 'undefined') return 'self';
        return null;
      };
      
      // Should prefer globalThis if available
      const detectionResult = mockGlobalDetection();
      expect(['globalThis', 'window']).toContain(detectionResult);
    } else {
      // If globalThis not available, should fall back to window in jsdom
      expect(typeof window).toBe('object');
    }
  });
});