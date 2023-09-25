import Twine1HTMLParser from '../src/Twine1HTMLParser';

describe('Twine1Parser', function () {
  describe('parse()', function () {
    it('Should throw error if elements cannot be found', function () {
      expect(() => { Twine1HTMLParser.parse('{'); }).toThrow();
    });

    it('Should parse a single passage - storeArea', function () {
      const el = '<div id="storeArea"><div tiddler="Untitled Passage 4" tags="" created="202309031439" modifier="twee" twine-position="401,10">dd</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect creator
      expect(s.creator).toBe('twee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 4');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 4');

      // Expect no tags.
      expect(p.tags.length).toBe(0);

      // Expect position
      expect(p.metadata.position).toBe('401,10');

      // Expect text
      expect(p.text).toBe('dd');
    });

    it('Should parse a single passage - store-area', function () {
      const el = '<div id="store-area"><div tiddler="Untitled Passage 4" tags="" created="202309031439" modifier="twee" twine-position="401,10">dd</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect creator
      expect(s.creator).toBe('twee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 4');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 4');

      // Expect no tags.
      expect(p.tags.length).toBe(0);

      // Expect position
      expect(p.metadata.position).toBe('401,10');

      // Expect text
      expect(p.text).toBe('dd');
    });

    it('Should override name with StoryTitle', function () {
      const el = '<div id="storeArea"><div tiddler="StoryTitle" tags="" created="202309031438" modifier="twee" twine-position="10,150">Untitled Story</div></div>';
      const s = Twine1HTMLParser.parse(el);
      expect(s.name).toBe('Untitled Story');
    });

    it('Should parse a single passage with multiple tags', function () {
      const el = '<div id="storeArea"><div tiddler="Untitled Passage 1" tags="tag1, tag2, tag3" created="202309031439" modifier="twee" twine-position="262,10">[[Untitled Passage 2]]</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect creator
      expect(s.creator).toBe('twee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 1');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 1');

      // Expect no tags.
      expect(p.tags.length).toBe(3);

      // Expect position
      expect(p.metadata.position).toBe('262,10');

      // Expect text
      expect(p.text).toBe('[[Untitled Passage 2]]');
    });

    it('Should parse a single passage without twine-position', function () {
      const el = '<div id="storeArea"><div tiddler="Untitled Passage 1" tags="tag1, tag2, tag3" created="202309031439" modifier="twee">[[Untitled Passage 2]]</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect creator
      expect(s.creator).toBe('twee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 1');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 1');

      // Expect no tags.
      expect(p.tags.length).toBe(3);

      // Expect position to not exist.
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);

      // Expect text.
      expect(p.text).toBe('[[Untitled Passage 2]]');
    });

    it('Should parse a single passage without tags', function () {
      const el = '<div id="storeArea"><div tiddler="Untitled Passage 1" created="202309031439" modifier="twee">[[Untitled Passage 2]]</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect creator
      expect(s.creator).toBe('twee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 1');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 1');

      // Expect no tags.
      expect(p.tags.length).toBe(0);

      // Expect position to not exist.
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);

      // Expect text.
      expect(p.text).toBe('[[Untitled Passage 2]]');
    });

    it('Should parse a single passage without modifier', function () {
      const el = '<div id="storeArea"><div tiddler="Untitled Passage 1" tags="tag1, tag2, tag3" created="202309031439">[[Untitled Passage 2]]</div></div>';

      // Parse Twine 1 HTML.
      const s = Twine1HTMLParser.parse(el);

      // Expect a single passage.
      expect(s.size()).toBe(1);

      // Expect default creator
      expect(s.creator).toBe('extwee');

      // Look for the passage.
      const p = s.getPassageByName('Untitled Passage 1');

      // Expect passage name.
      expect(p.name).toBe('Untitled Passage 1');

      // Expect no tags.
      expect(p.tags.length).toBe(3);

      // Expect position to not exist.
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);

      // Expect text.
      expect(p.text).toBe('[[Untitled Passage 2]]');
    });
  });
});
