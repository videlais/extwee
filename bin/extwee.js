#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import everything
import Extwee from '../index.js';
// Import Commander
import { Command } from 'commander';

// Creat a new Command
const program = new Command();

program
.version('2.0.0')
.option('-c', 'From Twee into HTML')
.option('-d', 'From HTML into Twee')
.option('-s <storyformat>', 'Path to storyformat')
.option('-i <inputFile>', 'Path to input file')
.option('-o <outputFile>', 'Path to output file');

// Set the process title
process.title = 'extwee';

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

// Decompile branch
if(options.D === true) {
    const inputHTML = Extwee.readFile(options.I);
    const storyObject = Extwee.parseHTML(inputHTML);
    Extwee.writeTwee(storyObject, options.O);
    process.exit();
}

// Compile branch
if(options.C === true) {
    const inputTwee = Extwee.readFile(options.I);
    const story = Extwee.parseTwee(inputTwee);
    const inputStoryFormat = Extwee.readFile(options.S);
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);
    Extwee.writeHTML(options.O, story, parsedStoryFormat);
    process.exit();
}
