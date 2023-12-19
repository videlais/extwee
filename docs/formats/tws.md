# TWS

The [Twine 1 TWS documentation](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-twsoutput.md) details the Python pickle format used in Twine 1.

Extwee can only parse TWS files.

## Parsing

When using the `parseTWS()` function (or `TWS/parse.js` export), incoming TWS will be converted into a [**Story**](/objects/story.md) object.
