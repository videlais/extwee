# Twine 1 HTML

The [Twine 1 HTML Output specification](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md) defines the elements and attributes for encoding Twine 1 story and passage data.

Extwee can perform two actions with Twine 1 HTML.

## Parsing

When using the `parseTwine1HTML()` function (or `Twine1HTML/parse.js` export), incoming Twine 1 HTML will be converted into a [**Story**](/objects/story.md) object.

## Compilation

When using the `compileTwine1HTML()` function (or `Twine2HTML/compile.js` export), [**Story**](/objects/story.md) objects can be compiled into Twine 1 HTML output with additional content from `engine.js`, `header.html`, and `code.js` files.
