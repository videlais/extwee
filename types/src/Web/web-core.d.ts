export default Extwee;
import { parse as parseTwee } from '../Twee/parse.js';
import { parse as parseJSON } from '../JSON/parse.js';
import { parse as parseStoryFormat } from '../StoryFormat/parse.js';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse-web.js';
import { compile as compileTwine2HTML } from '../Twine2HTML/compile.js';
import { generate as generateIFID } from '../IFID/generate.js';
import { Story } from '../Story.js';
import Passage from '../Passage.js';
import StoryFormat from '../StoryFormat.js';
declare namespace Extwee {
    export { parseTwee };
    export { parseJSON };
    export { parseStoryFormat };
    export { parseTwine2HTML };
    export { compileTwine2HTML };
    export { generateIFID };
    export { Story };
    export { Passage };
    export { StoryFormat };
    export { version };
}
import { version } from '../version.js';
export { parseTwee, parseJSON, parseStoryFormat, parseTwine2HTML, compileTwine2HTML, generateIFID, Story, Passage, StoryFormat };
