const assert = require('assert');
const StoryFormat = require('../src/StoryFormat.js');

describe('StoryFormat', function() {
  describe('#constructor()', function() {
		it('Should throw error on non-JS-object', function() {
    	assert.throws( () => new StoryFormat('testing'), Error );
    });

    it('Accept object values', function() {
      let sf = new StoryFormat({name: "testing"});
			assert.equal(sf.name, "testing");
    });

		it('Defaults to null values', function() {
      let sf = new StoryFormat({});
			assert.equal(sf.name, null);
    });
  });
});
