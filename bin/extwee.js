#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import everything
import Extwee from '../index.js';
// Import fs
import fs from 'node:fs';
// Import Commander
import { Command } from 'commander';

// Create a new Command
const program = new Command();

program
.name('extwee')
.version('2.2.0')
.option('-c', 'From Twee into Twine HTML')
.option('-d', 'From Twine HTML into Twee')
.option('-twine1', 'Enable Twine 1 processing')
.option('-s <storyformat>', 'Path to storyformat')
.option('-i <inputFile>', 'Path to input file')
.option('-o <outputFile>', 'Path to output file');

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

// Decompile Twine 2 HTML branch. If -d is passed, -i and -o are required.
if(options.d === true) {
    const inputHTML = fs.readFileSync(options.i, 'utf-8');
    const storyObject = Extwee.parseTwine2HTML(inputHTML);
    fs.writeFileSync(options.o, storyObject.toTwee());
    process.exit();
}

// Compile branch. If -c is passed, -i, -o, and -s are required.
if(options.c === true) {
    const inputTwee = fs.readFileSync(options.i, 'utf-8');
    const story = Extwee.parseTwee(inputTwee);
    const inputStoryFormat = fs.readFileSync(options.s, 'utf-8');
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);
    const Twine2HTML = Extwee.compileTwine2HTML(story, parsedStoryFormat);
    fs.writeFileSync(options.o, Twine2HTML);
    process.exit();
}

