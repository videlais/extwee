#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import everything
import Extwee from '../index.js';

// Import fs
import {readFileSync, writeFileSync, statSync} from 'node:fs';

// Import Commander
import { Command } from 'commander';

// Create a new Command
const program = new Command();

/*
 * Check if a passed option is a valid file.
 * @function isFile
 * @description Check if a file exists.
 * @param {string} path - Path to file.
 * @returns {boolean} True if file exists, false if not.
 */
const isFile = (path) => {
    // set default.
    let result = false;

    try {
        // Attempt tp get stats.
        const stats = statSync(path);

        // Return if path is a file.
        result = stats.isFile();

    } catch (e) {
        // There was an error, so return false.
        result = false;
    }

    // Return either the default (false) or the result (true).
    return result;
};

program
.name('extwee')
.version('2.2.0')
.option('-c, --compile', 'Compile input into output')
.option('-d, --decompile', 'De-compile input into output')
.option('-t1, --twine1', 'Enable Twine 1 processing')
.option('-tws <TWSFile>', 'Path to Twine 1 TWS file', (value) => {
    // Does the input file exist?
    if(isFile(value) === false) {

        // We cannot do anything without valid input.
        throw new Command.InvalidArgumentError(`Twine 1 TWS ${value} does not exist.`);
    }

    return value;
})
.option('-name <storyFormatName>', 'Name of the Twine 1 story format (needed for `code.js` inclusion)')
.option('-codejs <codeJSFile>', 'Twine 1 code.js file for use with Twine 1 HTML', (value) => {
        // Does the input file exist?
        if(isFile(value) === false) {
    
            // We cannot do anything without valid input.
            throw new Command.InvalidArgumentError(`Twine 1 code.js ${value} does not exist.`);
        }
    
        return value;
    })
.option('-engine <engineFile>', 'Twine 1 engine.js file for use with Twine 1 HTML', (value) => {
    // Does the input file exist?
    if(isFile(value) === false) {

        // We cannot do anything without valid input.
        throw new Command.InvalidArgumentError(`Twine 1 engine.js ${value} does not exist.`);
    }

    return value;
})
.option('-header <headerFile>', 'Twine 1 header.html file for use with Twine 1 HTML', (value) => {
    // Does the input file exist?
    if(isFile(value) === false) {

        // We cannot do anything without valid input.
        throw new Command.InvalidArgumentError(`Twine 1 header.html ${value} does not exist.`);
    }

    return value;
})
.option('-json_in', 'Input flag for Twine 2 JSON')
.option('-json_out', 'Output flag for Twine 2 JSON')
.option('-s <storyformat>', 'Path to story format file for Twine 2', (value) => {
    // Does the input file exist?
    if(isFile(value) === false) {

        // We cannot do anything without valid input.
        throw new Command.InvalidArgumentError(`Story format ${value} does not exist.`);
    }

    return value;
})
.option('-i <inputFile>', 'Path to input file', (value) => {
    // Does the input file exist?
    if(isFile(value) === false) {

        // We cannot do anything without valid input.
        throw new Command.InvalidArgumentError(`Input file ${value} does not exist.`);
    }

    return value;
})
.option('-o <outputFile>', 'Path to output file');

// Parse the passed arguments
program.parse(process.argv);

// Create object of passed arguments parsed by Commander
const options = program.opts();

/*
 * Prepare some (soon to be) global variables.
 */
// Check if Twine 1 is enabled.
let isTwine1Mode = (options.twine1 === true) ? true : false;

// Check if Twine 2 is enabled.
let isTwine2Mode = (isTwine1Mode === false) ? true : false;

// Check if de-compile mode is enabled.
let isDecompileMode = (options.decompile === true) ? true : false;

// Check if compile mode is enabled.
let isCompileMode = (options.compile === true) ? true : false;

// Check if JSON input is enabled.
let isJSONInput = (options.json_in === true) ? true : false;

// Check if JSON output is enabled.
let isJSONOutput = (options.json_out === true) ? true : false;

// De-compile Twine 2 HTML into Twee 3 branch.
// If -d is passed, -i and -o are required.
if(isTwine2Mode === true && isDecompileMode === true) {
    
    // Read the input HTML file.
    const inputHTML = readFileSync(options.i, 'utf-8');

    // Parse the input HTML file into Story object.
    const storyObject = Extwee.parseTwine2HTML(inputHTML);

    // Write the output file from Story as Twee 3.
    writeFileSync(options.o, storyObject.toTwee());

    // Exit the process.
    process.exit();
}

// Compile Twee 3 into Twine 2 HTML branch. 
// If -c is passed, -i, -o, and -s are required.
if(isTwine2Mode === true && isCompileMode === true) {
    
    // Read the input file.
    const inputTwee = readFileSync(options.i, 'utf-8');
    
    // Parse the input file.
    const story = Extwee.parseTwee(inputTwee);

    // Read the story format file.
    const inputStoryFormat = readFileSync(options.s, 'utf-8');

    // Parse the story format file.
    const parsedStoryFormat = Extwee.parseStoryFormat(inputStoryFormat);

    // Compile the story.
    const Twine2HTML = Extwee.compileTwine2HTML(story, parsedStoryFormat);

    // Write the output file.
    writeFileSync(options.o, Twine2HTML);

    // Exit the process.
    process.exit();
}

// Compile Twee 3 into Twine 1 HTML branch.
// Twine 1 compilation is complicated, so we have to check for all the required options.
// * options.engine (from Twine 1 itself)
// * options.header (from Twine 1 story format)
// * options.name (from Twine 1 story format)
// * options.codejs (from Twine 1 story format)
if(isTwine1Mode == true && isCompileMode == true) {
     
    // Read the input file.
    const inputTwee = readFileSync(options.i, 'utf-8');

    // Parse the input file.
    const story = Extwee.parseTwee(inputTwee);

    // Does the engine file exist?
    const Twine1HTML = Extwee.compileTwine1HTML(story, options.engine, options.header, options.name, options.codejs);
    
    // Write the output file.
    writeFileSync(options.o, Twine1HTML);

    // Exit the process.
    process.exit();
}
