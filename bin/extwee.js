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

if(options.d) {
    const inputHTML = Extwee.readFile(options.i);
    const storyObject = Extwee.parseHTML(inputHTML);
    Extwee.writeTwee(storyObject, options.o);
}

if(options.c) {
    const inputTwee = Extwee.readFile(options.i);
    const storyObject = Extwee.parseTwee(inputTwee);
    const inputStoryFormat = Extwee.readFile(options.s);
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);
    Extwee.writeHTML(options.o, storyObject, parsedStoryFormat);
}
