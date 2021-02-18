#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Import Commander
import { Command } from 'commander';
// Creat a new Command
const program = new Command();

program
.version('2.0.0')
.option('-h --help ', 'Show options')
.option('-c --compile', 'Compile Twee into HTML')
.option('-d --decompile', 'Decompile HTML into Twee')
.option('-i --input', 'Input file to process')
.option('--config', 'Load specific extwee.config.json file')
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
