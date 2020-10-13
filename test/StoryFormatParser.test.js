const assert = require('assert');
const StoryFormatParser = require('../src/StoryFormatParser.js');

describe('StoryFormatParser', function() {
  describe('#parse()', function() {
    it('Should throw error if JSON missing', function() {
      assert.throws( () => StoryFormatParser.parse('test/StoryFormatParser/test.js'), Error );
    });

		it('Should throw error if JSON malformed', function() {
			assert.throws( () => StoryFormatParser.parse('test/StoryFormatParser/test2.js'), Error );
		});

		it('Should correctly parse a StoryFormat name', function() {
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			assert.equal(sfp.name, "Snowman");
		});

		it('Should correctly parse Harlowe story format', function() {
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/harlowe.js');
			assert.equal(sfp.name, "Harlowe");
		});
  });
});
