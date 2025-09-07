// Twine1HTML parser module
import { parse as parseTwine1HTML } from '../Twine1HTML/parse-web.js';
import { compile as compileTwine1HTML } from '../Twine1HTML/compile.js';

// Export for use as a separate module
export {
    parseTwine1HTML as parse,
    compileTwine1HTML as compile
};

// Also add to global Extwee if it exists
if (typeof window !== 'undefined' && window.Extwee) {
    window.Extwee.parseTwine1HTML = parseTwine1HTML;
    window.Extwee.compileTwine1HTML = compileTwine1HTML;
}
