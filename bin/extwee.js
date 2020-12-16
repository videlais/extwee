#!/usr/bin/env node

/**
 * @fileoverview CLI for Extwee
 * @author Dan Cox
 */

// Slice the arguments and parse them
const argv = require('minimist')(process.argv.slice(2));

// Set the process title
process.title = 'extwee';

// Show help messages
if(argv.h || argv.help) {
    console.log([
        'usage: extwee [options] [files]',
        '',
        'options:',
        ' -h --help         Show options',
        ' -c --compile      Compile Twee into HTML',
        ' -d --decompile    Decompile HTML into Twee',
        ' -i --input        Input file for process',
        ' -o --output       Output file to create',
        ' --config          Load specific extwee.config.json file',
        ' --init            Create default extwee.config.json file',
        ' -v --version      Display current version'
    ].join('\n'));
    process.exit();
}

// Display version
if(argv.v || argv.version) {
    console.log('Version: ' + require('../package.json').version);
    process.exit();
}

// Decompile
if(argv.d || argv.decompile) {
    // Do we have an input file?
    if(argv.i || argv.input) {
        // Decompile
        //
        // Lazy-load FileReader
        const FileReader = require('../src/FileReader');
        // Lazy-load HTMLParser
        const HTMLParser = require('../src/HTMLParser');
        // Get the input file
        const inputFile = argv.i || argv.input;
        // Read the input file
        const fr = FileReader.read(inputFile);
        // Attempt to parse the input file
        const tp = HTMLParser.parse(fr);
        // Lazy-load TweeWriter
        const TweeWriter = require('../src/TweeWriter');

        // Is there an output file?
        if(argv.o || argv.output) {
            const outputFile = argv.o || argv.output;
            // Write file based on argument given
            TweeWriter.write(tp, outputFile);
        } else {
            // No output specified
            // Take the input file and add '.twee' at the end
            TweeWriter.write(tp, inputFile + '.twee');
        }

    } else {
        // No input file!
        throw new Error("Specify file to decompile using -i or --input!");
    }
}
