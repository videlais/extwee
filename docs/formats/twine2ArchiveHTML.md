# Twine 2 Archive HTML

The [Twine 2 Archive HTML specification](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md) defines a collection of Twine 2 stories stored in HTML.

Extwee can perform two actions with Twine 2 archive HTML.

## Parsing

When using the `parseTwine2ArchiveHTML()` function (or `Twine2ArchiveHTML/parse.js` export), incoming Twine 2 Archive HTML will be converted into an array of [**Story**](/objects/story.md) objects.

## Compilation

When using the `compileTwine2ArchiveHTML()` function (or `Twine2ArchiveHTML/compile.js` export), an array of **Story** objects can be converted into Twine 2 Archive HTML.
