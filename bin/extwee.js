#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import everything
import Extwee from '../index.js';
// Import Commander
import { Command } from 'commander';

// Create a new Command
const program = new Command();

program
.name('extwee')
.version('2.0.5')
.option('-c', 'From Twee into HTML')
.option('-d', 'From HTML into Twee')
.option('-s <storyformat>', 'Path to storyformat')
.option('-i <inputFile>', 'Path to input file')
.option('-o <outputFile>', 'Path to output file');

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

// Decompile branch
if(options.d === true) {
    const inputHTML = Extwee.readFile(options.i);
    const storyObject = Extwee.parseHTML(inputHTML);
    Extwee.writeTwee(storyObject, options.o);
    process.exit();
}

// Compile branch
if(options.c === true) {
    const inputTwee = Extwee.readFile(options.i);
    const story = Extwee.parseTwee(inputTwee);
    const inputStoryFormat = Extwee.readFile(options.s);
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);
    Extwee.writeHTML(options.o, story, parsedStoryFormat);
    process.exit();
}
