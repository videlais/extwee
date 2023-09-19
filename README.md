# Status

[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee) [![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

## Summary

Extwee is a Twee compiler supporting multiple Twine-compatible formats. It will parse many past and present encodings, but prefers newer formats for output.

| **Format Support**               | **Input** | **Output** |
|----------------------------------|-----------|------------|
| [Twine 1 HTML (2009 - 2015)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)       | Yes       | No         |
| [Twine 2 HTML (2015 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)    | Yes       | Yes        |
| [Twee 3 (2021 - Present)](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)          | Yes       | Yes        |
| Twine 1 TWS (2009 - 2015)        | Yes       | No         |
| Twine 2 Archive (2015 - Present) | Yes       | Yes        |
| JSON (2023 - Present)            | Yes       | Yes        |

## Command-Line Usage

Extwee supports a CLI interface:

[TBD]

### Escaping Meta-Characters

Extwee will attempt to escape the meta-characters of `{`, `}`, `[`, and `]` when moving to and from Twee notation. 

It is *highly recommended* to avoid these characters in passage name and tags to avoid confusion and potential issues.

## Installation

Extwee can be installed via NPM.

`npm i extwee`
