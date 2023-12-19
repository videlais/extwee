# Twine 2 HTML

The [Twine 2 HTML Output specification](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md) defines the elements and attributes for encoding Twine 2 story and passage data.

Extwee can perform two actions with Twine 2 HTML.

## Parsing

When using the `parseTwine2HTML()` function (or `Twine2HTML/parse.js` export), incoming Twine 2 HTML will be converted into a [**Story**](/objects/story.md) object.

## Compilation

When using the `compileTwine2HTML()` function (or `Twine2HTML/compile.js` export), [**Story**](/objects/story.md) and [**StoryFormat**](/objects/storyformat.md) objects can be compiled into Twine 2 HTML output.
