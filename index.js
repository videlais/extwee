/*
 *	 
 *    
 */

const util = require('util');

const argv = require('yargs')
	.usage('Usage: extwee -i [Source] -f [Story Format]')
	.describe('i', 'Source')
    .describe('h', 'Help')
    .describe('v', 'Version')
    .describe('f', 'Story Format')
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('i', 'input')
    .alias('f', 'format')
    .demandOption(['i, f'])
    .argv;

const TweeParser = require('./TweeParser.js');
const StoryFormatParser = require('./StoryFormatParser.js');

let tp = new TweeParser(argv.input);
let sfp = new StoryFormatParser(argv.format);

console.log(util.inspect(tp.story, { showHidden: true, depth: null, colors: true }));

console.log(util.inspect(sfp.storyformat, { showHidden: true, depth: null, colors: true }));

