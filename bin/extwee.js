#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import everything 
import Extwee, { HTMLWriter } from '../index.js';

// Import Commander
import { Command } from 'commander';

// Creat a new Command
const program = new Command();

program
.version('2.0.0', '-v')
.option('-c, --compile', 'From Twee into HTML')
.option('-d, --decompile', 'From HTML into Twee')
.option('-i <inputFile>, --input <inputFile>', 'Input file to process')
.option('-o <outputFile>, --output <outputFile>', 'Output file to create')
.option('--config <file>', 'Load specific extwee.config.json file')
.option('init', 'Create default extwee.config.json file');

// Set the process title
process.title = 'extwee';

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

// init
if(options.init) {
    console.log("Create a file?");
}

// Compile option
if(options.compile) {
    // Read the file
    const tweeFile = Extwee.FileReader.read(options.I);
    // Read story format
    const storyFormatFile = Extwee.FileReader.read('test/CLI/files/harlowe.js');
    // Parse story format
    const storyFormat = Extwee.StoryFormatParser.parse(storyFormatFile);
    // Parse twee file
    const story = Extwee.TweeParser.parse(tweeFile);
    // Output file
    Extwee.HTMLWriter.write(options.O, story, storyFormat);
}
