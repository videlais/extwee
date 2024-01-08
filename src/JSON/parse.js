import { Story } from '../Story.js';
import Passage from '../Passage.js';

/**
 * Parse JSON representation into Story.
 * @function parse
 * @param {string} jsonString - JSON string to convert to Story.
 * @returns {Story} Story object.
 */
function parse (jsonString) {
  // Create future object.
  let result = {};

  // Create Story.
  const s = new Story();

  // Try to parse the string.
  try {
    result = JSON.parse(jsonString);
  } catch (error) {
    throw new Error('Invalid JSON!');
  }

  // Name
  if (Object.prototype.hasOwnProperty.call(result, 'name')) {
    // Convert to String (if not String).
    s.name = String(result.name);
  }

  // Start Passage
  if (Object.prototype.hasOwnProperty.call(result, 'start')) {
    // Convert to String (if not String).
    s.start = String(result.start);
  }

  // IFID
  if (Object.prototype.hasOwnProperty.call(result, 'ifid')) {
    // Convert to String (if not String).
    // Enforce the uppercase rule of Twine 2 and Twee 3.
    s.IFID = String(result.ifid).toUpperCase();
  }

  // Format
  if (Object.prototype.hasOwnProperty.call(result, 'format')) {
    // Convert to String (if not String).
    s.format = String(result.format);
  }

  // Format Version
  if (Object.prototype.hasOwnProperty.call(result, 'formatVersion')) {
    // Convert to String (if not String).
    s.formatVersion = String(result.formatVersion);
  }

  // Creator
  if (Object.prototype.hasOwnProperty.call(result, 'creator')) {
    // Convert to String (if not String).
    s.creator = String(result.creator);
  }

  // Creator Version
  if (Object.prototype.hasOwnProperty.call(result, 'creatorVersion')) {
    // Convert to String (if not String).
    s.creatorVersion = String(result.creatorVersion);
  }

  // Zoom
  if (Object.prototype.hasOwnProperty.call(result, 'zoom')) {
    // Set Zoom.
    s.zoom = result.zoom;
  }

  // Tag Colors
  if (Object.prototype.hasOwnProperty.call(result, 'tagColors')) {
    // Set tagColors.
    s.tagColors = result.tagColors;
  }

  // Metadata
  if (Object.prototype.hasOwnProperty.call(result, 'metadata')) {
    // Set metadata.
    s.metadata = result.metadata;
  }

  // Passages
  if (Object.prototype.hasOwnProperty.call(result, 'passages')) {
    // Is s an array?
    if (Array.isArray(result.passages)) {
      // For each passage, convert into Passage objects.
      result.passages.forEach((p) => {
        // Create default passage.
        const newP = new Passage();

        // Does s have a name?
        if (Object.prototype.hasOwnProperty.call(p, 'name')) {
          // Set name.
          newP.name = p.name;
        }

        // Does s have tags?
        if (Object.prototype.hasOwnProperty.call(p, 'tags')) {
          // Set tags.
          newP.tags = p.tags;
        }

        // Does s have metadata?
        if (Object.prototype.hasOwnProperty.call(p, 'metadata')) {
          // Set metadata.
          newP.metadata = p.metadata;
        }

        // Does s have text?
        if (Object.prototype.hasOwnProperty.call(p, 'text')) {
          // Set text.
          newP.text = p.text;
        }

        // Add the new passage.
        s.addPassage(newP);
      });
    }
  }

  // Return Story.
  return s;
}

export { parse };
