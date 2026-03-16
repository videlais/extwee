import Passage from '../Passage.js';
import { Story } from '../Story.js';

/**
 * Unescapes Twee 3 metacharacters according to the specification.
 *
 * From the Twee 3 specification:
 * - Encoding: To avoid ambiguity, non-escape backslashes must also be escaped via
 * the same mechanism (i.e. `foo\bar` must become `foo\\bar`).
 * - Decoding: To make decoding more robust, any escaped character within a chunk of
 * encoded text must yield the character minus the backslash (i.e. `\q` must yield `q`).
 * @function unescapeTweeMetacharacters
 * @param {string} text - Text to unescape
 * @returns {string} Unescaped text
 */
function unescapeTweeMetacharacters(text) {
  if (typeof text !== 'string') {
    return text;
  }
  
  // Replace any escaped character with the character minus the backslash
  // This implements the robust decoding rule from the specification
  return text.replace(/\\(.)/g, '$1');
}

/**
 * Escapes Twee 3 metacharacters according to the specification.
 * This is used when writing Twee files to ensure special characters are properly escaped.
 * @function escapeTweeMetacharacters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeTweeMetacharacters(text) {
  if (typeof text !== 'string') {
    return text;
  }
  
  // First escape backslashes, then escape the metacharacters
  return text
    .replace(/\\/g, '\\\\')  // Escape backslashes first
    .replace(/\[/g, '\\[')   // Escape opening square brackets
    .replace(/\]/g, '\\]')   // Escape closing square brackets
    .replace(/\{/g, '\\{')   // Escape opening curly braces
    .replace(/\}/g, '\\}');  // Escape closing curly braces
}

/**
 * Finds the last unescaped occurrence of a character in a string.
 * @param {string} str - String to search in
 * @param {string} char - Character to find
 * @returns {number} Position of last unescaped occurrence, or -1 if not found
 */
function findLastUnescaped(str, char) {
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === char) {
      // Count consecutive backslashes before this character
      let backslashCount = 0;
      for (let j = i - 1; j >= 0 && str[j] === '\\'; j--) {
        backslashCount++;
      }
      // If even number of backslashes (including 0), the character is not escaped
      if (backslashCount % 2 === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Parses metadata from a header string, respecting escaped characters.
 * @param {string} header - Header string to parse
 * @returns {object | null} Object with {metadata, remainingHeader} or null if no metadata
 */
function parseMetadataFromHeader(header) {
  const openingPos = findLastUnescaped(header, '{');
  const closingPos = findLastUnescaped(header, '}');
  
  if (openingPos !== -1 && closingPos !== -1 && closingPos > openingPos) {
    const metadata = header.slice(openingPos, closingPos + 1);
    const remainingHeader = header.substring(0, openingPos) + header.substring(closingPos + 1);
    return { metadata, remainingHeader };
  }
  
  return null;
}

/**
 * Parses tags from a header string, respecting escaped characters.
 * @param {string} header - Header string to parse
 * @returns {object | null} Object with {tags, remainingHeader} or null if no tags
 */
function parseTagsFromHeader(header) {
  const openingPos = findLastUnescaped(header, '[');
  const closingPos = findLastUnescaped(header, ']');
  
  if (openingPos !== -1 && closingPos !== -1 && closingPos > openingPos) {
    const tags = header.slice(openingPos, closingPos + 1);
    const remainingHeader = header.substring(0, openingPos) + header.substring(closingPos + 1);
    return { tags, remainingHeader };
  }
  
  return null;
}

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

  let adjusted;

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
    let text;
    let name;

    // Header is everything to the first newline
    let header = passage.slice(0, passage.indexOf('\n'));
    // Text is everything else
    // (Also eat the leading newline character.)
    // (And trim any remaining whitespace.)
    text = passage.substring(header.length + 1, passage.length).trim();

    // Parse metadata using escape-aware logic
    const metadataMatch = parseMetadataFromHeader(header);
    if (metadataMatch) {
      metadata = metadataMatch.metadata;
      header = metadataMatch.remainingHeader;
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

    // Parse tags using escape-aware logic
    const tagsMatch = parseTagsFromHeader(header);
    if (tagsMatch) {
      tags = tagsMatch.tags;
      header = tagsMatch.remainingHeader;
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
      name = unescapeTweeMetacharacters(header);
    } else {
      // No name left. Something went wrong. Blame user.
      throw new Error('Malformed passage header!');
    }

    // Unescape tag names according to Twee 3 specification
    tags = tags.map(tag => unescapeTweeMetacharacters(tag));

    // addPassage() method does all the work.
    story.addPassage(new Passage(name, text, tags, metadata, pid));

    // Increase pid
    pid++;
  });

  // Return Story.
  return story;
}

export { parse, escapeTweeMetacharacters, unescapeTweeMetacharacters };
