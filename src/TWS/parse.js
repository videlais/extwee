import { Story } from '../Story.js';
import Passage from '../Passage.js';
import { Parser } from 'pickleparser';

/**
 * Parse TWS file (as Buffer) into Story.
 * Unless it throws an error, it will return a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {Buffer} binaryFileContents - File contents to parse as Buffer.
 * @returns {Story} Story object.
 */
function parse (binaryFileContents) {
  // Is this Buffer?
  if (!Buffer.isBuffer(binaryFileContents)) {
    // Throw an error. We cannot proceed.
    throw new Error('Only parsing of Buffer is allowed!');
  }

  // Create a new PickleParser.
  const parser = new Parser();

  // Set default value.
  let pythonObject = null;

  // Does the Buffer contain pickle data?
  try {
    // Try to parse the pickle data, assuming it is pickle data.
    pythonObject = parser.parse(binaryFileContents);
  } catch (error) {
    // This is a Buffer, but not pickle data.
    throw new Error('Buffer does not contain Python pickle data!');
  }

  // Create Story object.
  const result = new Story();

  // Does 'storyPanel' exist?
  // (While Twine 1 will always generate it, we must verify.)
  if (Object.prototype.hasOwnProperty.call(pythonObject, 'storyPanel')) {
    // Check and possibly override Zoom level.
    if (Object.prototype.hasOwnProperty.call(pythonObject.storyPanel, 'scale')) {
      // Save Zoom level from TWS.
      result.zoom = pythonObject.storyPanel.scale;
    }

    // Parse storyPanel.widgets.
    if (Object.prototype.hasOwnProperty.call(pythonObject.storyPanel, 'widgets')) {
      // Parse `widgets` for passages.
      for (const widget of pythonObject.storyPanel.widgets) {
        // Create a passage.
        const passage = new Passage();

        // Get title.
        passage.name = widget.passage.title;

        // Get position.
        // passage.attributes.position = `${widget.pos[0]},${widget.pos[1]}`;

        // Get tags.
        passage.tags = widget.passage.tags;

        // Get source.
        passage.text = widget.passage.text;

        // Set startingPassage (if found).
        if (passage.name === 'Start') {
          result.start = passage.name;
        }

        // Set the story name (if found).
        if (passage.name === 'StoryTitle') {
          result.name = passage.text;
        }

        // Add the passage.
        result.addPassage(passage);
      }
    }
  }

  // Return Story object.
  return result;
}

export { parse };
