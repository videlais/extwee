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
.option('-c', 'Compile Twee 3 into Twine 2 HTML')
.option('-d', 'De-compile Twine 2 HTML into Twee 3')
.option('-twine1', 'Enable Twine 1 processing')
.option('-json_in', 'Enable input JSON file')
.option('-json_out', 'Enable output JSON file')
.option('-s <storyformat>', 'Path to storyformat')
.option('-i <inputFile>', 'Path to input file')
.option('-o <outputFile>', 'Path to output file')
.option('-tws <TWSFile>', 'Path to TWS file')
.option('-e <engineFile>', 'engine.js file for use with Twine 1 HTML')
.option('-h <headerFile>', 'header.html file for use with Twine 1 HTML');

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

// De-compile Twine 2 HTML into Twee 3 branch. If -d is passed, -i and -o are required.
if(options.d === true) {
    const inputHTML = fs.readFileSync(options.i, 'utf-8');
    const storyObject = Extwee.parseTwine2HTML(inputHTML);
    fs.writeFileSync(options.o, storyObject.toTwee());
    process.exit();
}

// Compile Twee 3 into Twine 2 HTML branch. If -c is passed, -i, -o, and -s are required.
if(options.c === true) {
    const inputTwee = fs.readFileSync(options.i, 'utf-8');
    const story = Extwee.parseTwee(inputTwee);
    const inputStoryFormat = fs.readFileSync(options.s, 'utf-8');
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);
    const Twine2HTML = Extwee.compileTwine2HTML(story, parsedStoryFormat);
    fs.writeFileSync(options.o, Twine2HTML);
    process.exit();
}

// Compile Twee 3 into Twine 1 HTML branch. If -c is passed, -i, -o, and -e are required.
if(options.twine1 === true && options.c === true) {
    const inputTwee = fs.readFileSync(options.i, 'utf-8');
    const story = Extwee.parseTwee(inputTwee);
    const Twine1HTML = Extwee.compileTwine1HTML(story, options.e, options.h);
    fs.writeFileSync(options.o, Twine1HTML);
    process.exit();
}
