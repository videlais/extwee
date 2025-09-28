export default Extwee;
declare namespace Extwee {
    export { parseTwine1HTML };
    export { compileTwine1HTML };
    export { parseTwine1HTML as parse };
    export { compileTwine1HTML as compile };
}
import { parse as parseTwine1HTML } from '../Twine1HTML/parse-web.js';
import { compile as compileTwine1HTML } from '../Twine1HTML/compile.js';
export { parseTwine1HTML as parse, compileTwine1HTML as compile };
