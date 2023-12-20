# JSON

The [Twine 2 JSON specification](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md) defines a format for storing a Twine 2 compatible story and passage data in JavaScript Objection Notation (JSON).

Extwee can perform two actions.

## Parse

When using the `parseJSON()` function (or `JSON/parse.js` export), incoming Twine 2 JSON will be converted into a [**Story**](/objects/story.md) object.

## Output

Every **Story** object can create a JSON representation of its data using the `Story.toJSON()` method.

## Format Caution

As of December 2023, no current story compilation (other than Extwee) or version of Twine supports input or output of the Twine 2 JSON format.
