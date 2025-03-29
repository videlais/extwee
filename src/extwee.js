#! /usr/bin/env node

/**
 * @file CLI for Extwee
 * @author Dan Cox
 */

import { CommandLineProcessing } from "./CLI/commandLineProcessing.js";
import { ConfigFilePresent, ConfigFileProcessing } from "./CLI/processConfig.js";

/**
 * As a command-line tool, Extwee can be invoked multiple ways.
 * (1) Via NPX with command-line arguments. (process.argv.length > 2)
 * (2) Via NPX in the presence of a `extwee.config.json` file.
 */

// Check if the command line arguments are present.
if(process.argv.length > 2) {
    // Process the command line arguments.
    CommandLineProcessing(process.argv);
    // Exit the process.
    process.exit(0);
}

// Check if the config file exists.
if(ConfigFilePresent()) {
    // Process the config file.
    ConfigFileProcessing();
    // Exit the process.
    process.exit(0);
}