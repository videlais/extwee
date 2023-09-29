[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee) [![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

# Summary

Extwee is a story compilation tool supporting multiple historical and current Twine-compatible formats.

| **Format Support**               | **Input** | **Output**                      |
|----------------------------------|-----------|---------------------------------|
| [Twine 1 HTML (2009 - 2015)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)       | Yes       | Partial `StorySettings` support |
| Twine 1 TWS (2009 - 2015)        | Yes       | No                              |
| [Twine 2 HTML (2015 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)    | Yes       | Yes                             |
| Twine 2 Archive HTML (2015 - Present) | Yes       | Yes                             |
| [Twee 3 (2021 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)          | Yes       | Yes                             |
| JSON (2023 - Present)            | Yes       | Yes                             |

## Objects, Parsers, and Writers

Extwee is organized into three categories of classes:

### Objects

`Passage`, `Story`, and `StoryFormat`. An object must be created using either the `new` keyword in JavaScript or as the result of parsing data.

### Parsers

Translates formats (`Twine1HTMLParser`, `Twine2HTMLParser`, `Twine2ArchiveHTML` `TweeParser`, and `JSONParser`) into `Story` objects or JSONP into a `StoryFormat` object (`StoryFormatParser`).

Every parser is _static_. They do not need to be created as objects and can be called using their corresponding `parse()` method (i.e. `Twine1HTMLParser.parse()`).

**Note:** Twine 1 story formats exist only as JavaScript without descriptive metadata. They cannot be parsed into a `StoryFormat` object.

### Writers

Combines story, story formats, or other data into a combination format (`Twine1HTMLWriter`, `Twine2HTMLWriter`, `Twine2ArchiveHTML`).

Every writer is _static_. They do not need to be created as objects and can be called using their corresponding `write()` method (i.e. `Twine2HTMLWriter.write()`).

Story and Passage objects can generate multiple representations internally (`toTwee()`, `toTwine1HTML()`, `toTwine2HTML()`, and `toJSON()`) but stories cannot be played in a browser without the corresponding writer combining it with story format data.

## Documentation

Extwee has documentation hosted on GitHub Pages.

## Command-Line Usage

Extwee supports a CLI interface:

[TBD]

### Escaping Meta-Characters

Extwee will attempt to escape the meta-characters of `{`, `}`, `[`, and `]` when moving to and from Twee notation.

It is _highly recommended_ to avoid these characters in passage name and tags to avoid confusion and potential issues.

## Installation

Extwee can be installed via NPM.

`npm i extwee`
