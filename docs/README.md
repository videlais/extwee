# Extwee

[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee)

[![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

## Story Compilation

The process of *story compilation* converts human-readable content, what is generally called a *story*, into a playable format such as HyperText Markup Language (HTML) able to be read by another application such as a web browser. The result is then presented as links or other visual, interactive elements to a player or reader, depending on the work created.

The term *compilation* is used because different parts of code are put together in a specific arrangement to enable later play. As part of Twine-compatible HTML, this means combining story format JavaScript code with story HTML data.

Extwee is **not** an authoring tool. It cannot be used to create story content. This data must be created using other tools or processes. Extwee can then *compile* the story with story format code to produce something playable.

Playable formats are the following and require external story formats[^1] to enable play:

- Twine 2 HTML
- Twine 1 HTML

More human-readable formats include:

- Twee 3[^2]
- Twine 2 JSON[^3]

From 2009 to 2015, Twine 1 supported a now [historical format named TWS](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-twsoutput.md). This was a binary format used for archival purposes. Extwee can read this format but does not support creating it because no other tools, including current versions of Twine, accept it as valid input.

Twine 2 supports exporting a collection of stories (known as a *library*) in the [Twine 2 Archive HTML format](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md). Extwee can also read and write this format, creating either a collection of stories from the data or writing a collection of internal objects to a file.

[^1]: Extwee does not include or publish story formats. These can be found in the [Story Format Archive (SFA)](https://github.com/videlais/story-formats-archive).

[^2]: Twee exists in three versions. The first existed between 2006 to 2009 and was part of Twine 1. The move to Twine 2 in 2009 dropped support and the story compilation tools [Twee2](https://dan-q.github.io/twee2/) and [Tweego](https://www.motoslave.net/tweego/) adopted their own extensions and modifications. Beginning in 2017, work was done to unite the different projects. This resulted in [Twee 3](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md) in March 2021.

[^3]: In October 2023, JavaScript Object Notation (JSON) was added as a supported community format for story compilation tools. Extwee is the first tool to support this format.

## Format Support

Extwee is a story compilation tool supporting multiple historical and current Twine-compatible formats.

<table>
    <tr>
        <td>Format</td>
        <td>Input</td>
        <td>Output</td>
    </tr>
    <tr>
        <td><a href='https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md'>Twine 1 HTML (2006 - 2015)</a> </td>
        <td>Yes</td>
        <td>Partial support. Twine 1 HTML can be produced, but the StorySettings optional passage introduced in Twine 1.4.0 requires external libraries like jQuery not included with Extwee.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-twsoutput.md">Twine 1 TWS (2009 - 2015)</a></td>
        <td>Yes</td>
        <td>Extwee does not support TWS (Python pickle) output because no current version of Twine or other story compilation tool produces this historical format.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md">Twine 2 HTML (2015 - Present)</a></td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td><a href="https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md">Twine 2 Archive HTML (2015 - Present)</a></td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td><a href="https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md">Twee 3 (2021 - Present)</a></td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
    <tr>
        <td><a href="https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md">Twine 2 JSON (2023 - Present)</a></td>
        <td>Yes</td>
        <td>Yes</td>
    </tr>
</table>

**Note:** Round-trip translations can present problems because of required fields and properties per format. Some metadata may be added or removed based on the specification being followed.

## Node and Web API

The following objects and methods are available in Node.js or browser contexts.

**Note:** When used in a browser context, all objects and methods are part of the `window.Extwee` global.

### Objects

An object must be created using either the `new` keyword in JavaScript or as the result of parsing data.

- `StoryFormat`
- `Passage`
- `Story`

Story and Passage objects can generate multiple output formats: `toTwee()`, `toTwine1HTML()`, `toTwine2HTML()`, and `toJSON()`. Stories cannot be played in a browser without the corresponding compiler combining it with story format data.

### Parsers

Translates output formats such as HTML, Twee, JSON, or JSONP into objects.

**Note:** Twine 1 story formats exist across multiple files (`header.html` and optional `code.js`). They cannot be parsed into a `StoryFormat` object.

- `parseTwee()`
- `parseJSON()`
- `parseStoryFormat()`
- `parseTwine1HTML()`
- `parseTwine2HTML()`
- `parseTwine2ArchiveHTML()`

### Compilers

Compiles story, story formats, or other data into an archive or playable format.

- `compileTwine2HTML()`
- `compileTwine1HTML()`
- `compileTwine2ArchiveHTML()`

**Note:** In order to create playable Twine 1 HTML, an `engine.js` file must be supplied.

## Documentation

Extwee has documentation on individual source files hosted on GitHub Pages.

## Command-Line Usage

Extwee supports a command-line interface for four general scenarios:

### Compiling Twee 3 + Twine 2 Story Format into Twine 2 HTML

Compile Twee 3 + StoryFormat into Twine 2 HTML:

`extwee -c -i <tweeFile> -s <storyFormat> -o <Twine2HTML>`

### De-compiling Twine 2 HTML into Twee 3

De-compile Twine 2 HTML into Twee 3:

`extwee -d -i <twine2HTML> -o <outputTwee>`

### Compiling Twee 3 into Twine 1 HTML

Enabling Twine 1 mode requires using the `-t1` or `--twine1` flag.

`extwee -t1 -c -i <tweeFile> -o <Twine1HTML> -engine <engineJS> -name <storyFormatName> -codejs <CodeJS> -header <header>`

### De-compiling Twine 1 HTML into Twee 3

Enabling Twine 1 mode requires using the `-t1` or `--twine1` flag.

`extwee -t1 -d -i <twine1HTML> -o <outputTwee>`

## Roadmap

Each major version has its own GitHub project:

- [Road to Extwee 2.2.0](https://github.com/users/videlais/projects/2)
- [Road to Extwee 2.4.0](https://github.com/users/videlais/projects/4)

## Tree Shaking Support

For [advanced tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) patterns, most formats are broke into `compile.js` and `parse.js` files exporting associated `compile()` and `parse()` functions. When using the API, it is possible to only import a single function or object to produce smaller and potentially faster code in projects dependent on Extwee functionality.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.
