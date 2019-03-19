/*
 *	 
 *    
 */

const util = require('util');

const argv = require('yargs')
	.usage('Usage: extwee -i [Source]')
	.describe('i', 'Source')
    .describe('h', 'Help')
    .describe('v', 'Version')
    .describe('f', 'Story Format')
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('i', 'input')
    .alias('f', 'format')
    .demandOption(['i'])
    .argv;

const Parser = require('./Parser.js');
const ExTweeFile = require('./ExTweeFile.js');

// Check and then read the file
let fc = new ExTweeFile();
fc.readFile(argv.input);

// Create a new parser
let p = new Parser();
	
// Parse the file
let story = p.parse(fc.contents, fc.extentsion);

console.log(util.inspect(story, { showHidden: true, depth: null, colors: true }));
