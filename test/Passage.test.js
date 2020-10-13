const assert = require('assert');
const Passage = require('../src/Passage.js');

describe('Passage', function() {

  describe('#constructor()', function() {

		it('Should have default values', function() {

    	let p = new Passage();
			assert.equal(p.name, "");

    });

  });

});
