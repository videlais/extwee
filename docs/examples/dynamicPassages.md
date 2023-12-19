# Dynamically Generating Passages

Through using the API, it is possible to dynamically create passages and then export this story into Twee (or JSON) using only the **Story** and **Passage** objects.

Both **Story** and **Passage** objects can be created through the `new` keyword in JavaScript. After creating a **Story**, the use of the method `addPassage(Passage)` can be used to add new passages.

In the following example, the use of a `for()` loop is used to generate 20 passages and a starting passage is set. Finally, the **Story** data is converted into Twee and written to an output file.

```javascript
// Import only Story and Passage.
import { Story, Passage } from 'extwee';
// Import only writeFileSync() for writing to files.
import { writeFileSync } from 'node:fs';

// Create the story.
const example = new Story( 'Example' );

// Generate 20 passages and add them to the story.
for(let i = 0; i < 20; i++>) {
    example.addPassage( new Passage( `Passage ${i}`, 'Some Text') );
}

// Set a starting passage.
example.start = 'Passage 1';

// Create a Twee file.
writeFileSync( 'example.twee', example.toTwee() );
```
