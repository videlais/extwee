const assert = require('assert');
const FileReader = require('../src/FileReader.js');

describe('FileReader', function() {
	describe('#readFile()', function() {
	    it('Should throw error if file not found', function() {
	    	assert.throws( () => FileReader.read("test/FileReader/t2.txt"), Error );
	    });

      it('Should read the contents of a file', function() {
	    	let fr = FileReader.read("test/FileReader/t1.txt");
	    	assert.equal(fr,"Gibberish");
	    });
  	});
});
