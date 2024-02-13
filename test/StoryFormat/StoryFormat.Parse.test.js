import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';

describe('StoryFormat', () => {
  describe('parse()', () => {
    describe('Removing setup', () => {
      it('Should remove setup', () => {
        const fr = 'window.storyFormat({"author":"A","description":"B","image":"C","name":"harlowe","proofing":false,"license":"MIT","source":"<html></html>","url":"example.com","version":"1.0.0","setup": function(){}});';
        const sfp = parseStoryFormat(fr);
        expect(sfp.name).toBe('harlowe');
        expect(sfp.version).toBe('1.0.0');
        expect(sfp.author).toBe('A');
        expect(sfp.description).toBe('B');
        expect(sfp.image).toBe('C');
        expect(sfp.url).toBe('example.com');
        expect(sfp.license).toBe('MIT');
        expect(sfp.proofing).toBe(false);
      });
    });

    describe('name', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse a name', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.name).toBe('My Story Format');
      });

      it('Should detect missing name and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.name;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.name).toBe('Untitled Story Format');
      });
    });

    describe('author', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse an author', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.author).toBe('Twine');
      });

      it('Should detect missing author and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.author;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.author).toBe('');
      });
    });

    describe('description', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse a description', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.description).toBe('A story format.');
      });

      it('Should detect missing description and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.description;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.description).toBe('');
      });
    });

    describe('image', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse an image', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.image).toBe('icon.svg');
      });

      it('Should detect missing image and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.image;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.image).toBe('');
      });
    });

    describe('url', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse a url', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.url).toBe('https://example.com');
      });

      it('Should detect missing url and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.url;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.url).toBe('');
      });
    });

    describe('version', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse a version', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.version).toBe('1.0.0');
      });
    });

    describe('license', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": false,
        "source": "<html></html>"
        }`;

      it('Should parse a license', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.license).toBe('MIT');
      });

      it('Should detect missing license and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.license;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.license).toBe('');
      });
    });

    describe('proofing', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;

      it('Should parse proofing', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.proofing).toBe(true);
      });

      it('Should detect missing proofing and set default', () => {
        const copy = JSON.parse(fr);
        delete copy.proofing;
        const sfp = parseStoryFormat(JSON.stringify(copy));
        expect(sfp.proofing).toBe(false);
      });
    });

    describe('source', function () {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;

      it('Should parse a source', () => {
        const sfp = parseStoryFormat(fr);
        expect(sfp.source).toBe('<html></html>');
      });
    });
  });

  describe('Errors', function () {
    it('Should throw error if JSON missing', () => {
      const fr = '[]';
      expect(() => { parseStoryFormat(fr); }).toThrow();
    });

    it('Should throw error if JSON is malformed', () => {
      const fr = '{"state"}';
      expect(() => { parseStoryFormat(fr); }).toThrow();
    });
  });

  describe('Warnings', () => {
    beforeEach(() => {
      // Mock console.warn.
      jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      // Restore all mocks.
      jest.restoreAllMocks();
    });

    it('Should produce warning if name is not a string', () => {
      const fr = `{
        "name": null,
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s name is not a string. It will be ignored.');
    });

    it('Should produce warning if author is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": null,
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s author is not a string. It will be ignored.');
    });

    it('Should produce warning if description is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": null,
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s description is not a string. It will be ignored.');
    });

    it('Should produce warning if image is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": null,
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s image is not a string. It will be ignored.');
    });

    it('Should produce warning if url is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": null,
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s url is not a string. It will be ignored.');
    });

    it('Should produce warning if license is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": null,
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s license is not a string. It will be ignored.');
    });

    it('Should produce warning if proofing is not a boolean', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": null,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s proofing is not a boolean. It will be ignored.');
    });

    it('Should produce warning if source is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": null
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s source is not a string! It will be ignored.');
    });

    it('Should produce warning if source is missing', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "1.0.0",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format does not have source property!');
    });

    it('Should produce warning if version is not a string', () => {
      const fr = `{
        "name": "My Story Format",
        "version": null,
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s version is not a string! It will be ignored.');
    });

    it('Should produce warning if version is not semantic', () => {
      const fr = `{
        "name": "My Story Format",
        "version": "fake version",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format\'s version is not semantic! It will be ignored.');
    });

    it('Should produce warning if version is missing', () => {
      const fr = `{
        "name": "My Story Format",
        "author": "Twine",
        "description": "A story format.",
        "image": "icon.svg",
        "url": "https://example.com",
        "license": "MIT",
        "proofing": true,
        "source": "<html></html>"
        }`;
      // Parse the story format.
      parseStoryFormat(fr);
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: Processed story format does not have version property!');
    });
  });
});
