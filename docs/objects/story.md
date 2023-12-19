# Story

A *story* is a collection of [passages](/guide/passage.md) with its own metadata.

## Properties

Depending on the incoming format or creation method, many possible properties can be populated.

- name ( string ) Name of the story.
- start ( string ) Starting passage for Twine 2 HTML or Twee 3.
- IFID ( string ) When converting to multiple formats, a new IFID will be generated if it does not exist.
- format ( string ) Name of the story format for Twine 2 HTML.
- formatVersion ( string ) Semantic version of the named story format for Twine 2 HTML or Twee 3.
- zoom ( float ) Zoom level for Twine 2 HTML or Twee 3.
- passages ( array(Passage) ) **[Read-only]** Collection of internal passages.
- creator ( string ) Name of story creation tool. (Defaults to "Extwee").
- creatorVersion ( string ) Semantic version of named creation tool.
- metadata ( object ) Key-value pairs of metadata values.
- tagColors ( object ) Key-value pairs of tags and their named colors.

## Creation Example

```javascript
import { Story } from 'extwee';

// Create a story.
const example = new Story('Example');

// Show story name
console.log ( example.name );
```

**Note:** All properties have protections. Attempting to assign the wrong type will result in an error.

## Passage Methods

As collections of passages, each **Story** has multiple methods for accessing and mutating its data:

- `addPassage(Passage)`: Adds a new passage to the collection. (In Twine, passage names must be unique. Extwee will produce a console warning and ignore any repeating names.)
- `removePassageByName(string)`: Looks for an removes a passage based on its name. If the passage does not exist, nothing happens.
- `getPassagesByTags(string)`: Returns an array of any passages containing a particular tag value.
- `getPassageByName(string)`: Returns either `null`` or the named passage.
- `size()`: Returns the number of passages in the collection.
- `forEachPassage(callback)`: Allows for iterating over the passage collection.

## Passage Creation Example

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

**Note:** It is not possible to directly access and act on the *passages* property. All actions must take place through available methods.

Like passages, each **Story** can generate multiple formats based on its data:

- `toTwee()`: Convert the story, its properties, and all its passages into Twee 3.
- `toJSON()`: Converts the story, its properties, and all its passages into Twine 2 JSON.
- `toTwine1HTML()`: Converts the story, its properties, and all its passages into Twine 1 HTML.
- `toTwine2HTML()`: Converts the story, its properties, and all its passages into Twine 2 HTML.

**Note:** While stories can create different representations of its data, most conversions are considered partial without the corresponding story format to create the playable form.
