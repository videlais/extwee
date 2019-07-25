# ExTwee 1.1.4

ExTwee is a Twee compiler supporting Twine 2-style formats using the [Twee 3 specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md).

It will read both Twee2 (Twee2) and Twee 3 formatted files, but does not understand or currently support Twee 1 (Twine 1.4.2) or Twee2 special passages for Twine 1.X formatting.

*Extwee does not support Twine 1.X story formats.*

## Binary Releases

Compiled versions for Windows, MacOS X, and Linux can be found under [Releases](https://github.com/videlais/extwee/releases)

## Story Formats

Because of potentially conflicting licenses, Extwee does not come with any Twine 2-style story formats.

## Compatibility With Other Tools

* Does not parse StorySettings
* Does not parse `@includes`
* Does not parse StoryIncludes
* Does not handle [haml]; will not parse HAML
* Does not handle [twee2] special passages

## Compiling

`extwee -i source.twee -o output.html -f path/format.js`

## Decompiling

`extwee -d file.html -o source.twee `

## File Formats

Extwee decides how to parse a file based on its extension. It understands Twee2 files to have either `.tw2` or `.twee2` extensions. Files created for Twee3 parsers should have the `.tw3` or `.twee3` file extension.

## Escaping Metacharacters

Extwee will attempt to escape the metacharacters of `{`, `}`, `[`, and `]` when moving to and from Twee notation. However, even with this support, it *highly recommended* to avoid these characters in passage name and tags to avoid confusion and potential issues.

## TODO

* Adding support for directory handling. Instead acting on a single file, a directory could be supplied that found and included the CSS and JS files organized within it.
