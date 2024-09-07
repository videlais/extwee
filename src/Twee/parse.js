import Passage from '../Passage.js';
import { Story } from '../Story.js';

/**
 * Parses Twee 3 text into a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
 * @function parse
 * @param {string} fileContents - File contents to parse
 * @returns {Story} story
 */
function parse (fileContents) {
  // Create Story.
  const story = new Story();

  // Throw error if fileContents is not a string
  if (Object.prototype.toString.call(fileContents) !== '[object String]') {
    throw new Error('Contents not a String');
  }

  let adjusted = '';

  // Check if there are extra content in the files
  // If so, cut it all out for the parser
  if (fileContents[0] !== ':' && fileContents[1] !== ':') {
    adjusted = fileContents.slice(fileContents.indexOf('::'), fileContents.length);
  } else {
    adjusted = fileContents;
  }

  // Split the file based on the passage sigil (::) proceeded by a newline
  const parsingPassages = adjusted.split('\n::');

  // Fix the first result
  parsingPassages[0] = parsingPassages[0].slice(2, parsingPassages[0].length);

  // Set the initial pid
  let pid = 1;

  // Iterate through the passages
  parsingPassages.forEach((passage) => {
    // Set default values
    let tags = '';
    let metadata = '';
    let text = '';
    let name = '';

    // Header is everything to the first newline
    let header = passage.slice(0, passage.indexOf('\n'));
    // Text is everything else
    // (Also eat the leading newline character.)
    // (And trim any remaining whitespace.)
    text = passage.substring(header.length + 1, passage.length).trim();

    // Test for metadata
    const openingCurlyBracketPosition = header.lastIndexOf('{');
    const closingCurlyBracketPosition = header.lastIndexOf('}');

    if (openingCurlyBracketPosition !== -1 && closingCurlyBracketPosition !== -1) {
      // Save the text metadata
      metadata = header.slice(openingCurlyBracketPosition, closingCurlyBracketPosition + 1);

      // Remove the metadata from the header
      header = header.substring(0, openingCurlyBracketPosition) + header.substring(closingCurlyBracketPosition + 1);
    }

    // There was passage metadata
    if (metadata.length > 0) {
      // Try to parse the metadata
      try {
        metadata = JSON.parse(metadata);
      } catch (error) {
        console.info(`Info: Metadata could not be parsed. Setting to empty object. Reported error: ${error.message}`);
        metadata = {};
      }
    } else {
      // There wasn't any metadata, so set default
      metadata = {};
    }

    // Test for tags
    const openingSquareBracketPosition = header.lastIndexOf('[');
    const closingSquareBracketPosition = header.lastIndexOf(']');

    if (openingSquareBracketPosition !== -1 && closingSquareBracketPosition !== -1) {
      tags = header.slice(openingSquareBracketPosition, closingSquareBracketPosition + 1);

      // Remove the tags from the header
      header = header.substring(0, openingSquareBracketPosition) + header.substring(closingSquareBracketPosition + 1);
    }

    // Parse tags
    if (tags.length > 0) {
      // Eat the opening and closing square brackets
      tags = tags.substring(1, tags.length - 1);

      // Set empty default
      let tagsArray = [];

      // Test if tags is not single, empty string
      if (!(tags === '')) {
        tagsArray = tags.split(' ');
      }

      // There are multiple tags
      if (tagsArray.length > 1) {
        // Create future array
        const futureTagArray = [];

        // Move through entries
        // Add a trimmed version into future array
        tagsArray.forEach((tag) => { futureTagArray.push(tag.trim()); });

        // Set the tags back to the future array
        tags = futureTagArray;
      } else if (tagsArray.length === 1) {
        // There was only one tag
        // Store it
        const temp = tags;

        // Switch tags over to an array
        tags = [];
        // Push the single entry
        tags.push(temp);
      } else {
        // Make sure tags is set to empty array if no tags were found
        tags = [];
      }
    } else {
      // There were no tags, so set it to an empty array;
      tags = [];
    }

    // Filter out any empty string tags
    tags = tags.filter(tag => tag !== '');

    // Trim any remaining whitespace
    header = header.trim();

    // Check if there is a name left
    if (header.length > 0) {
      name = header;
    } else {
      // No name left. Something went wrong. Blame user.
      throw new Error('Malformed passage header!');
    }

    // addPassage() method does all the work.
    story.addPassage(new Passage(name, text, tags, metadata, pid));

    // Increase pid
    pid++;
  });

  // Return Story.
  return story;
}

export { parse };
