# Converting Twine 2 JSON to Twee 3

Conversion from Twine 2 JSON to Twee 3 requires multiple steps:

1. Read the JSON file.
2. Use `parseJSON()` to convert JSON into a **Story** object.
3. Using `Story.toTwee()`, convert the **Story** object into Twee 3.

```javascript
// Import only Story and parseJSON().
import { Story, parseJSON } from 'extwee';
// Import only readFileSync() and writeFileSync() for reading and writing to files.
import { readFileSync, writeFileSync } from 'node:fs';

// Read in the JSON file
const inputFile = readFileSync( 'example.json', 'utf-8' );

// Convert from Twine 2 JSON to Story.
const s = parseJSON(inputFile);

// Write Twee output
writeFileSync( 'output.twee', s.toTwee() );
```
