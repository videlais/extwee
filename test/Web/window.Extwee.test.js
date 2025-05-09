/**
 * @jest-environment jsdom
 */

import '../../web-index.js';

describe('Extwee', () => {
    it('should have all the expected properties', () => {
        expect(window.Extwee).toHaveProperty('parseTwee');
        expect(window.Extwee).toHaveProperty('parseJSON');
        expect(window.Extwee).toHaveProperty('parseTWS');
        expect(window.Extwee).toHaveProperty('parseStoryFormat');
        expect(window.Extwee).toHaveProperty('parseTwine1HTML');
        expect(window.Extwee).toHaveProperty('parseTwine2HTML');
        expect(window.Extwee).toHaveProperty('parseTwine2ArchiveHTML');
        expect(window.Extwee).toHaveProperty('compileTwine1HTML');
        expect(window.Extwee).toHaveProperty('compileTwine2HTML');
        expect(window.Extwee).toHaveProperty('compileTwine2ArchiveHTML');
        expect(window.Extwee).toHaveProperty('generateIFID');
        expect(window.Extwee).toHaveProperty('Story');
        expect(window.Extwee).toHaveProperty('Passage');
        expect(window.Extwee).toHaveProperty('StoryFormat');
    });

    it('should have the expected types', () => {
        expect(typeof window.Extwee.parseTwee).toBe('function');
        expect(typeof window.Extwee.parseJSON).toBe('function');
        expect(typeof window.Extwee.parseTWS).toBe('function');
        expect(typeof window.Extwee.parseStoryFormat).toBe('function');
        expect(typeof window.Extwee.parseTwine1HTML).toBe('function');
        expect(typeof window.Extwee.parseTwine2HTML).toBe('function');
        expect(typeof window.Extwee.parseTwine2ArchiveHTML).toBe('function');
        expect(typeof window.Extwee.compileTwine1HTML).toBe('function');
        expect(typeof window.Extwee.compileTwine2HTML).toBe('function');
        expect(typeof window.Extwee.compileTwine2ArchiveHTML).toBe('function');
        expect(typeof window.Extwee.generateIFID).toBe('function');
        expect(typeof window.Extwee.Story).toBe('function');
        expect(typeof window.Extwee.Passage).toBe('function');
        expect(typeof window.Extwee.StoryFormat).toBe('function');
    });

    it('should have the expected properties in StoryFormat', () => {
        const storyFormat = new window.Extwee.StoryFormat();
        expect(storyFormat).toHaveProperty('name');
        expect(storyFormat).toHaveProperty('version');
        expect(storyFormat).toHaveProperty('description');
        expect(storyFormat).toHaveProperty('author');
        expect(storyFormat).toHaveProperty('image');
        expect(storyFormat).toHaveProperty('url');
        expect(storyFormat).toHaveProperty('license');
        expect(storyFormat).toHaveProperty('proofing');
        expect(storyFormat).toHaveProperty('source');
    });

    it('should have the expected properties in Story', () => {
        const story = new window.Extwee.Story();
        expect(story).toHaveProperty('name');
        expect(story).toHaveProperty('IFID');
        expect(story).toHaveProperty('start');
        expect(story).toHaveProperty('format');
        expect(story).toHaveProperty('formatVersion');
        expect(story).toHaveProperty('zoom');
        expect(story).toHaveProperty('passages');
        expect(story).toHaveProperty('creator');
        expect(story).toHaveProperty('creatorVersion');
        expect(story).toHaveProperty('metadata');
        expect(story).toHaveProperty('tagColors');
        expect(story).toHaveProperty('storyJavaScript');
        expect(story).toHaveProperty('storyStylesheet');
    });
   
    it('should have the expected types in Passage', () => {
        const passage = new window.Extwee.Passage();
        expect(passage).toHaveProperty('name');
        expect(passage).toHaveProperty('text');
        expect(passage).toHaveProperty('tags');
        expect(passage).toHaveProperty('metadata');
    });

    it('should generate a valid IFID', () => {
        const ifid = window.Extwee.generateIFID();
        expect(ifid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/);
    });

});
