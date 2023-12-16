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

| **Format Support**               | **Input** | **Output**                      |
|----------------------------------|-----------|---------------------------------|
| [Twine 1 HTML (2006 - 2015)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)       | Yes       | Partial `StorySettings` support via API; not supported via CLI. |
| Twine 1 TWS (2009 - 2015)        | Yes       | No                              |
| [Twine 2 HTML (2015 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)    | Yes       | Yes                             |
| [Twine 2 Archive HTML (2015 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md) | Yes       | Yes                        |
| [Twee 3 (2021 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)          | Yes       | Yes                             |
| [Twine 2 JSON (2023 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md)            | Yes       | Yes                             |

**Note:** Round-trip translations can present problems because of required fields and properties per format. Some metadata may be added or removed based on the specification being followed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Node and Web API

The following objects and methods are available in Node.js or web contexts.

**Note:** When used in a web context, all objects and methods are part of the `window.Extwee` global.

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

Compiles story, story formats, or other data into a combination or playable format.

- `compileTwine2HTML()`
- `compileTwine1HTML()`
- `compileTwine2ArchiveHTML()`

**Note:** In order to create playable Twine 1 HTML, an `engine.js` file must be supplied.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation

Extwee has documentation on individual source files hosted on GitHub Pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Command-Line Usage

Extwee supports a general CLI interface shared across modes:

- Input file, `-i <inputFile>`.
- Output file, `-o <outputFile>`.
- Compile (`-c`) multiple files into HTML output.
- De-compile (`-d`) HTML into another format.

### Twine 2 HTML

- Compile Twee 3 + StoryFormat into Twine 2 HTML.

`extwee -c -i <tweeFile> -s <storyFormat> -o <Twine2HTML>`

- Compile Twine 2 JSON + StoryFormat into Twine 2 HTML.

`extwee -c -json_in -i <JSONFile> -s <storyFormat> -o <Twine2HTML>`

- De-compile Twine 2 HTML into Twee 3.

`extwee -d -i <twine2HTML> -o <outputTwee>`

- De-compile Twine 2 HTML into Twine 2 JSON.

`extwee -d -i <twine2HTML> -json_out -o <outputJSON>`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Twine 1 HTML

Use `-twine1` to enable Twine 1 mode.

- Compile Twee 3 + `engine.js` + `header.html` into Twine 1 HTML.

`extwee -twine1 -c -i <tweeFile> -e <engineJS> -h <headerHTML> -o <Twine1HTML>`

- De-compile Twine 1 HTML into Twee 3.

`extwee -twine1 -d -i <twine1HTML> -o <Twee3File>`

- De-compile Twine 1 HTML into Twine 2 JSON.

`extwee -twine1 -d -i <twine1HTML> -json_out -o <JSONFile>`

- Translate Twine 1 TWS into Twee 3.

`extwee -twine1 -d -tws <twine1TWS> -o <Twee3File>`

## Escaping Meta-Characters

Extwee will attempt to escape the meta-characters of `{`, `}`, `[`, and `]` when moving to and from Twee notation.

It is _highly recommended_ to avoid these characters in passage name and tags to avoid confusion and potential issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

Each major version has its own GitHub project:

- [Road to Extwee 2.2.0](https://github.com/users/videlais/projects/2)
- [Road to Extwee 2.4.0](https://github.com/users/videlais/projects/4)

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
