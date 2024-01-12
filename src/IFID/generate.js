import { v4 } from 'uuid';

/**
 * Generates an IFID based the Treaty of Babel.
 * @see {@link https://babel.ifarchive.org/babel_rev11.html#the-ifid-for-an-html-story-file}
 * @function generate
 * @description Generates a new IFID.
 * @returns {string} IFID
 */
function generate () {
  return v4().toUpperCase();
}

export { generate };
