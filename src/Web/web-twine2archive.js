// Twine2ArchiveHTML parser module
import { parse as parseTwine2ArchiveHTML } from '../Twine2ArchiveHTML/parse-web.js';
import { compile as compileTwine2ArchiveHTML } from '../Twine2ArchiveHTML/compile.js';

// Export for use as a separate module
export {
    parseTwine2ArchiveHTML as parse,
    compileTwine2ArchiveHTML as compile
};

// Also add to global Extwee if it exists
if (typeof window !== 'undefined' && window.Extwee) {
    window.Extwee.parseTwine2ArchiveHTML = parseTwine2ArchiveHTML;
    window.Extwee.compileTwine2ArchiveHTML = compileTwine2ArchiveHTML;
}
