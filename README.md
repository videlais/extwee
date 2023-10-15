# Status

[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee)

[![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

## Summary

Extwee is a story compilation tool supporting multiple historical and current Twine-compatible formats.

| **Format Support**               | **Input** | **Output**                      |
|----------------------------------|-----------|---------------------------------|
| [Twine 1 HTML (2009 - 2015)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)       | Yes       | Partial `StorySettings` support |
| Twine 1 TWS (2009 - 2015)        | Yes       | No                              |
| [Twine 2 HTML (2015 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)    | Yes       | Yes                             |
| Twine 2 Archive HTML (2015 - Present) | Yes       | Yes                             |
| [Twee 3 (2021 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)          | Yes       | Yes                             |
| JSON (2023 - Present)            | Yes       | Yes                             |

## Node and Web API

The following objects and methods are available in Node.js or web contexts.

**Note:** When used in a web context, all objects and methods are part of the `window.extwee` global.

### Objects

An object must be created using either the `new` keyword in JavaScript or as the result of parsing data.

- `StoryFormat`
- `Passage`
- `Story`

Story and Passage objects can generate multiple output formats: `toTwee()`, `toTwine1HTML()`, `toTwine2HTML()`, and `toJSON()`. Stories cannot be played in a browser without the corresponding compiler combining it with story format data.

### Parsers

Translates formats HTML, Twee, JSON, or JSONP into objects.

**Note:** Twine 1 story formats exist across multiple files (`header.html` and optional `code.js`). They cannot be parsed into a `StoryFormat` object.

- `parseTwee()`
- `parseJSON()`
- `parseStoryFormat()`
- `parseTwine1HTML()`
- `parseTwine2HTML()`
- `parseTwine2ArchiveHTML()`

### Compilers

Compiles story, story formats, or other data into a combination or playable format.

- `compileTwine2HTML()`
- `compileTwine1HTML()`
- `compileTwine2ArchiveHTML()`

**Note:** In order to create playable Twine 1 HTML, an `engine.js` file must be supplied.

## Documentation

Extwee has documentation on individual source files hosted on GitHub Pages.

## Command-Line Usage

Extwee supports a CLI interface:

[TBD]

### Escaping Meta-Characters

Extwee will attempt to escape the meta-characters of `{`, `}`, `[`, and `]` when moving to and from Twee notation.

It is _highly recommended_ to avoid these characters in passage name and tags to avoid confusion and potential issues.

## Installation

Extwee can be installed via NPM.

`npm i extwee`
