# NPM

While general compilation and de-compilation is possible using the CLI, more advanced usage patterns can be enabled through the API.

By installing `extwee`, developers can directly access its objects, parsers, and compilation functionality.

## Example

```javascript
import { Story, Passage } from 'extwee';

// Create the story.
const example = new Story( 'Example' );
// Add a new passage.
example.addPassage(new Passage( 'Test', 'Some Text') );

// Confirm size change.
// (Should produce 1).
console.log ( example.size() );
```
