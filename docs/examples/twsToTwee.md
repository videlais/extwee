# TWS To Twee

Converting from TWS to Twee 3 is similar to many other conversion processes with one small difference. TWS conversion needs to be begin from the [**Buffer** data type in JavaScript](https://nodejs.org/api/buffer.html).

1. Read the binary file.
2. Convert the binary files into a Buffer.
3. Parse the Buffer into a Story.
4. Convert Story data into Twee.

```javascript
// Import only readFileSynce() and writeFileSync().
import { readFileSync, writeFileSync } from 'node:fs';
// Only import Story and parseTWS().
import { Story, parseTWS } from 'extwee';

// Read the file contents using binary encoding.
const contents = readFileSync( 'Example1.tws', 'binary' );
// Convert from binary into Buffer.
const b = Buffer.from( contents, 'binary' );
// convert TWS into Story.
const s = parseTWS( b );

// Write Twee to output file.
writeFileSync( 'example.twee', s.toTwee() );
```
