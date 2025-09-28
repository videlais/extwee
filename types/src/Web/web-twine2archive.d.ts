export default Extwee;
declare namespace Extwee {
    export { parseTwine2ArchiveHTML };
    export { compileTwine2ArchiveHTML };
    export { parseTwine2ArchiveHTML as parse };
    export { compileTwine2ArchiveHTML as compile };
}
import { parse as parseTwine2ArchiveHTML } from '../Twine2ArchiveHTML/parse-web.js';
import { compile as compileTwine2ArchiveHTML } from '../Twine2ArchiveHTML/compile.js';
export { parseTwine2ArchiveHTML as parse, compileTwine2ArchiveHTML as compile };
