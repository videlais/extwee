import Story from './Story.js';
import Passage from './Passage.js';
import {Parser} from 'pickleparser';

export default class TWSParser {
  /**
   * Parse TWS into Story.
   *
   * @public
   * @static
   * @function parse
   * @param {Buffer} binaryFileContents - File contents to parse as Buffer.
   * @returns {Story} story
   */
  static parse (binaryFileContents) {
    // Is this Buffer?
    if(!Buffer.isBuffer(binaryFileContents) ) {
      // Throw an error. We cannot proceed.
      throw new Error("Only parsing of Buffer is allowed!");
    }

    // Create a new PickleParser.
    const parser = new Parser();

    // Can this ever fail?
    const pythonObject = parser.parse(binaryFileContents);
    
    // Create Story.
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

      }

      
    }

    for (const widget of pythonObject.storyPanel.widgets) {
      // Create a passage.
      const passage = new Passage();

      // Get title.
      passage.name = widget.passage.title;

      // Get position.
      //passage.attributes.position = `${widget.pos[0]},${widget.pos[1]}`;
      
      // Get tags.
      passage.tags = widget.passage.tags;
      
      // Get source.
      passage.text = widget.passage.text;

      // Set startingPassage (if found).
      if (passage.name === 'Start') {
        result.start = passage;
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
