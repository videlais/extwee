# Status

[![Build Status](https://travis-ci.org/videlais/extwee.svg?branch=master)](https://travis-ci.org/videlais/extwee)

[![codecov](https://codecov.io/gh/videlais/extwee/branch/master/graph/badge.svg)](https://codecov.io/gh/videlais/extwee) [![npm version](https://badge.fury.io/js/extwee.svg)](https://badge.fury.io/js/extwee)

[![NPM Badge](https://nodei.co/npm/extwee.png?downloads=true)](https://www.npmjs.com/package/extwee)

## Summary

Extwee is a Twee compiler supporting Twine 2-style formats using the [Twee 3 specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md).

It will read both Twee 2 (Twee2) and Twee 3 formatted files, but does not understand or currently support Twee 1 (Twine 1.4.2) or Twee2 special passages for Twine 1.X formatting.

*Extwee does not support Twine 1.X story formats.*

## Story Formats

Starting with Extwee 1.5, the latest versions of Twine 2 story formats are included. See each story format for its own license.

## Command-Line Usage

Extwee supports NPX commands:

* Compile: `npx extwee -c -i <input twee> -s <input story format JS> -o <output HTML>`
* Decompile: `npx extwee -d -i <input HTML> -o <output twee>`

### Escaping Metacharacters

Extwee will attempt to escape the metacharacters of `{`, `}`, `[`, and `]` when moving to and from Twee notation. However, even with this support, it *highly recommended* to avoid these characters in passage name and tags to avoid confusion and potential issues.

## Installation

Extwee can be installed via NPM.

`npm i extwee`
