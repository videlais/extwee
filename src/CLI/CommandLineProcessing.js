// Import functions we need.
import {
    parseTwine2HTML,
    parseTwee,
    parseStoryFormat,
    parseTwine1HTML,
    compileTwine2HTML,
    compileTwine1HTML
  } from '../../index.js';
  
// Import fs.
import { readFileSync, writeFileSync } from 'node:fs';
  
// Import Commander.
import { Command } from 'commander';
  
// Import package.json.
import Package from '../../package.json' with { type: 'json' };

// Import isFile function.
import { isFile } from './isFile.js';



/**
 * Process command line arguments.
 * @function CommandLineProcessing  
 * @description This function processes the command line arguments passed to the Extwee CLI.
 * @module CLI/commandLineProcessing
 * @param {Array} argv - The command line arguments passed to the CLI.
 */
export function CommandLineProcessing(argv) {
  // Create a new Command.
  const program = new Command();

  program
    .name('extwee')
    .description('CLI for Extwee - A tool for compiling and decompiling Twine stories')
    .version(Package.version, '-v, --version', 'Show version number')
    .option('-c, --compile', 'Compile input into output')
    .option('-d, --decompile', 'De-compile input into output')
    .option('--twine1', 'Enable Twine 1 processing')
    .option('--name <storyFormatName>', 'Name of the Twine 1 story format (needed for `code.js` inclusion)')
    .option('--codejs <codeJSFile>', 'Twine 1 code.js file for use with Twine 1 HTML')
    .option('--engine <engineFile>', 'Twine 1 engine.js file for use with Twine 1 HTML')
    .option('--header <headerFile>', 'Twine 1 header.html file for use with Twine 1 HTML')
    .option('-s <storyformat>, --storyformat <storyformat>', 'Path to story format file for Twine 2')
    .option('-i <inputFile>, --input <inputFile>', 'Path to input file')
    .option('-o <outputFile>, --output <outputFile>', 'Path to output file')
    .addHelpText('after', `
Examples:
  Compile Twee to Twine 2 HTML:
    extwee -c -i story.twee -o story.html -s format.js

  Compile Twee to Twine 1 HTML:
    extwee --twine1 -c -i story.twee -o story.html --name "Sugarcane" --engine engine.js --header header.html --codejs code.js

  Decompile Twine 2 HTML to Twee:
    extwee -d -i story.html -o story.twee

  Decompile Twine 1 HTML to Twee:
    extwee --twine1 -d -i story.html -o story.twee
`);

  // Parse the passed arguments with improved error handling
  try {
    program.parse(argv);
    
    // Get parsed options
    const options = program.opts();
    
    // Validate and execute based on options
    handleCommand(options);
  } catch (error) {
    if (error.code === 'commander.invalidArgument') {
      console.error(`❌ ${error.message}`);
    } else {
      console.error(`❌ Error: ${error.message}`);
    }
    process.exit(1);
  }
}

/**
 * Handle the parsed command with improved validation and error messages
 * @param {object} options - Parsed command options
 */
function handleCommand(options) {
  try {
    // Commander uses the first option name as the property, so -i becomes 'i' and --input becomes 'input'
    const inputFile = options.input || options.i;
    const outputFile = options.output || options.o;
    const storyFormatFile = options.storyformat || options.s;
    
    // Validate required options
    if (!inputFile) {
      throw new Error('Input file (-i, --input) is required');
    }
    if (!outputFile) {
      throw new Error('Output file (-o, --output) is required');
    }
    
    if (!options.compile && !options.decompile) {
      throw new Error('Either --compile (-c) or --decompile (-d) must be specified');
    }
    
    if (options.compile && options.decompile) {
      throw new Error('Cannot specify both --compile and --decompile');
    }

    // Validate input file exists
    if (!isFile(inputFile)) {
      throw new Error(`Input file '${inputFile}' does not exist`);
    }

    const isTwine1Mode = options.twine1 === true;
    const isDecompileMode = options.decompile === true;
    const isCompileMode = options.compile === true;

    if (isDecompileMode) {
      // Decompile HTML to Twee
      console.log(`🔄 Decompiling ${isTwine1Mode ? 'Twine 1' : 'Twine 2'} HTML to Twee...`);
      
      const inputHTML = readFileSync(inputFile, 'utf-8');
      let storyObject;
      
      if (isTwine1Mode) {
        storyObject = parseTwine1HTML(inputHTML);
      } else {
        storyObject = parseTwine2HTML(inputHTML);
      }
      
      writeFileSync(outputFile, storyObject.toTwee());
      console.log(`✅ Successfully decompiled '${inputFile}' to '${outputFile}'`);
      
    } else if (isCompileMode) {
      // Compile Twee to HTML
      console.log(`🔄 Compiling Twee to ${isTwine1Mode ? 'Twine 1' : 'Twine 2'} HTML...`);
      
      const inputTwee = readFileSync(inputFile, 'utf-8');
      const story = parseTwee(inputTwee);
      
      if (isTwine1Mode) {
        // Validate Twine 1 required options and files
        const requiredOptions = [
          { opt: 'engine', desc: 'engine.js file' },
          { opt: 'header', desc: 'header.html file' },
          { opt: 'name', desc: 'story format name' },
          { opt: 'codejs', desc: 'code.js file' }
        ];
        
        const missingOptions = requiredOptions.filter(({ opt }) => !options[opt]);
        if (missingOptions.length > 0) {
          throw new Error(`Twine 1 compilation requires the following options: ${missingOptions.map(({ opt }) => `--${opt}`).join(', ')}`);
        }
        
        // Validate required files exist
        const requiredFiles = ['engine', 'header', 'codejs'];
        for (const fileOpt of requiredFiles) {
          if (!isFile(options[fileOpt])) {
            throw new Error(`Twine 1 ${fileOpt} file '${options[fileOpt]}' does not exist`);
          }
        }
        
        const Twine1HTML = compileTwine1HTML(story, options.engine, options.header, options.name, options.codejs);
        writeFileSync(outputFile, Twine1HTML);
      } else {
        // Validate Twine 2 required options
        if (!storyFormatFile) {
          throw new Error('Twine 2 compilation requires --storyformat option');
        }
        
        if (!isFile(storyFormatFile)) {
          throw new Error(`Story format file '${storyFormatFile}' does not exist`);
        }
        
        const inputStoryFormat = readFileSync(storyFormatFile, 'utf-8');
        const parsedStoryFormat = parseStoryFormat(inputStoryFormat);
        const Twine2HTML = compileTwine2HTML(story, parsedStoryFormat);
        writeFileSync(outputFile, Twine2HTML);
      }
      
      console.log(`✅ Successfully compiled '${inputFile}' to '${outputFile}'`);
    }
  } catch (error) {
    console.error(`❌ Operation failed: ${error.message}`);
    process.exit(1);
  }
}


