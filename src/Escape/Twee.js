/**
 * Escapes brackets, curly quotes, and backslashes in Twee passage names.
 * @function
 * @param {string} value - String to escape.
 * @returns {string} Escaped string.
 */
function escapeName (value) {
  return value.replace(/\\/g, '\\\\').replace(/([[\]{}])/g, '\\$1');
}

/**
 * Escapes `::` at the start of a line in Twee passage text.
 * @function
 * @param {string} value - String to escape.
 * @returns {string} Escaped string.
 */
function escapeText (value) {
  return value.replace(/^::/gm, '\\::');
}

export { escapeName, escapeText };
