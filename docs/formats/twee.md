# Twee

The [Twee 3 specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) defines a human-readable format for storing a Twine 2 compatible story and passage data.

Extwee can perform two actions with Twee.

## Parse

When using the `parseTwee()` function (or `Twee/parse.js` export), incoming Twee will be converted into a [**Story** object](/objects/story.md).

## Output

Every **Story** object can create a Twee representation of its data using the `Story.toTwee()` method.
