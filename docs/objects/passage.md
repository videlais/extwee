# Passage

The smallest unit in Twine is a *passage*.

## Properties

When using the Extwee API, a **Passage** object holds four properties:

- name ( string ) Name of the passage.
- text ( string ) Content of the passage.
- tags ( array(string) ) Array of tags associated with the passage.
- Metadata ( object ) Key-value pairs associated with the passage.

### Property Example

```javascript
import { Passage } from 'extwee';

// Create a single passage.
const example = new Passage('Example', 'Some text');

// Output current passage text.
console.log( example.text );
```

## Methods

Each passage is capable of producing multiple formats of its internal data:

- `toTwee()`: Converts passage data into Twee 3.
- `toJSONString()`: Converts passage data into Twine 2 JSON.
- `toJSON()`: Same as `toJSONString()`. Returns a string, not an object, so do not pass a Passage to `JSON.stringify()` (see [#799](https://github.com/videlais/extwee/issues/799)).
- `toTwine2HTML()`: Converts passage data into Twine 2 HTML.
- `toTwine1HTML()`: Converts passage data into Twine 1 HTML.

### Method Example

```javascript
import { Passage } from 'extwee';

// Create a single passage.
const example = new Passage('Example', 'Some text');

// Convert to Twee 3.
console.log( example.toTwee() );
```

**Note:** While each passage can create different representations of its data, each conversion is considered partial without the corresponding story metadata or story format to create the playable form.
