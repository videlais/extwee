<a name="readme-top"></a>

[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee)

[![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

## Table of Contents

<ol>
    <li>
      <a href="#format-support">Format Support</a>
    </li>
    <li><a href="#usage">Node and Web API</a></li>
    <ol>
    <li><a href="#objects">Objects</a></li>
    <li><a href="#parsers">Parsers</a></li>
    <li><a href="#compilers">Compilers</a></li>
    </ol>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#command-line-usage">Command-Line Usage</a></li>
    <li><a href="#escaping- meta-characters">Escaping Meta-Characters</a></li>
    <li><a href="#license">License</a></li>
  </ol>

## Format Support

Extwee is a story compilation tool supporting multiple historical and current Twine-compatible formats.

| Format                                                                                                                           | Input | Output                                                                                                                                                                                |
|----------------------------------------------------------------------------------------------------------------------------------|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [ Twine 1 HTML (2006 - 2015) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md )          | Yes   | Partial support. Twine 1 HTML can be produced, but the  `StorySettings`  optional passage introduced in Twine 1.4.0 requires external libraries like jQuery not included with Extwee. |
| [ Twine 1 TWS (2009 - 2015) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-twsoutput.md )                | Yes   | While the Python pickle format on which Twine 1 TWS is based can be produced from JavaScript, no current version of Twine supports it.                                                |
| [ Twine 2 HTML (2015 - Present) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md )      | Yes   | Yes                                                                                                                                                                                   |
| [ Twine 2 Archive HTML (2015 - Present) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md ) | Yes   | Yes                                                                                                                                                                                   |
| [ Twee 3 (2021 - Present) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md )               | Yes   | Yes                                                                                                                                                                                   |
| [ Twine 2 JSON (2023 - Present) ]( https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md )       | Yes   | Yes                                                                                                                                                                                   |

**Note:** Round-trip translations can present problems because of required fields and properties per format. Some metadata may be added or removed based on the specification being followed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Node and Web API

The following objects and methods are available in Node.js or browser contexts.

**Note:** When used in a browser context, all objects and methods are part of the `window.Extwee` global.

### Objects

An object must be created using either the `new` keyword in JavaScript or as the result of parsing data.

- `StoryFormat`
- `Passage`
- `Story`

Story and Passage objects can generate multiple output formats: `toTwee()`, `toTwine1HTML()`, `toTwine2HTML()`, and `toJSON()`. Stories cannot be played in a browser without the corresponding compiler combining it with story format data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Parsers

Translates output formats such as HTML, Twee, JSON, or JSONP into objects.

**Note:** Twine 1 story formats exist across multiple files (`header.html` and optional `code.js`). They cannot be parsed into a `StoryFormat` object.

- `parseTwee()`
- `parseJSON()`
- `parseStoryFormat()`
- `parseTwine1HTML()`
- `parseTwine2HTML()`
- `parseTwine2ArchiveHTML()`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Compilers

Compiles story, story formats, or other data into an archive or playable format.

- `compileTwine2HTML()`
- `compileTwine1HTML()`
- `compileTwine2ArchiveHTML()`

**Note:** In order to create playable Twine 1 HTML, an `engine.js` file must be supplied.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

Extwee has documentation on individual source files hosted on GitHub Pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

Each major version has its own GitHub project:

- [Road to Extwee 2.2.0](https://github.com/users/videlais/projects/2)
- [Road to Extwee 2.4.0](https://github.com/users/videlais/projects/4)

## Tree Shaking Support

For [advanced tree shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) patterns, most formats are broke into `compile.js` and `parse.js` files exporting associated `compile()` and `parse()` functions. When using the API, it is possible to only import a single function or object to produce smaller and potentially faster code in projects dependent on Extwee functionality.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
