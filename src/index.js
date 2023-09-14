import FileReader from './FileReader.js';
import TWSParser from './TWSParser.js';

const example = FileReader.readBinaryAsBuffer('../test/TWSParser/Example1.tws');

const result = TWSParser.parse(example);

console.log(result);
