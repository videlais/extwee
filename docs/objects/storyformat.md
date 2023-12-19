# Story Format

For a story to be playable in Twine, it must be combined with a *story format*.

In Twine 1, story formats can exist across multiple files:

- `engine.js`: "engine" as included from Twine 1.
- `header.html`: HTML "header" the Twine 1 HTML will be added into to create published file.
- `code.js`: While technically optional, most story formats include extra code found in a `code.js` file.

In Twine 2, story formats are single files generally named `format.js`. These are [JSONP files](https://en.wikipedia.org/wiki/JSONP) with JSON data of the story format included within a function call payload.

## Properties

When working with Twine 2 story formats, the associated `parse()` function call be used to create a **StoryFormat** object with the following properties:

- name ( string ) Name of the story format.
- version ( string ) Semantic version.
- author ( string ) Author of the story format.
- description ( string ) Summary of the story format.
- image ( string ) URL of an image (ideally SVG) acting as its icon in Twine.
- url ( string ) URL of the directory containing the `format.js` file.
- license ( string ) License acronym and sometimes version.
- proofing ( boolean ) (defaults to false). True if the story format is a "proofing" format.
- source ( string ) Full HTML output of the story format including the two placeholders {{STORY_NAME}} and {{STORY_DATA}}. (The placeholders are not themselves required.)

**Note:** Generally, even when using the Extwee API, it is rare to work with story formats beyond parsing them as part of Twine 1 or Twine 2 HTML compilation.
