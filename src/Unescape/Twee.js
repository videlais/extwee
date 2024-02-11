/**
 * Un-escapes brackets, curly quotes, and backslashes in Twee name.
 * @function
 * @param {string} value - String to unescape.
 * @returns {string} Unescaped string.
 */
function unescapeName (value) {
  return value.replace(/\\([[\]{}])/g, '$1').replace(/\\\\/g, '\\');
}

/**
 * Un-escapes `::` at the start of a line in Twee passage text.
 * @function
 * @param {string} value - String to unescape.
 * @returns {string} Unescaped string.
 */
function unescapeText (value) {
  return value.replace(/^\\:/gm, ':');
}

export { unescapeName, unescapeText };
