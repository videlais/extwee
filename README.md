# Extwee 1.5.0

Extwee is a Twee compiler supporting Twine 2-style formats using the [Twee 3 specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md).

It will read both Twee 2 (Twee2) and Twee 3 formatted files, but does not understand or currently support Twee 1 (Twine 1.4.2) or Twee2 special passages for Twine 1.X formatting.

*Extwee does not support Twine 1.X story formats.*

## Binary Releases

Compiled versions for Windows, MacOS X, and Linux can be found under [Releases](https://github.com/videlais/extwee/releases)

## Story Formats

Starting with Extwee 1.5, the latest versions of Harlowe (1.X, 2.X, and 3.X), SugarCube (1.X and 2.X) and Snowman (1.X) are now packaged with binary builds.

## Compatibility With Other Tools

* Does not parse StorySettings
* Does not parse `@includes`
* Does not parse StoryIncludes
* Does not handle [haml]; will not parse HAML
* Does not handle [twee2] special passages

## Command-Line Usage

When working with the binary builds of Extwee, the operating system is part of the file name. In Windows, for examples, the build is called `extwee-win.exe`.

Extwee supports the following command-line arguments:

* `i`: Input Twee file
* `v`: Version of Extwee
* `f`: Path to the Story Format's `format.js` file
* `d`: HTML file to decompile into Twee code
* `o`: Output file
* `r`: Path of directory to read
* `w`: Enable directory watching mode

Using the command-line arguments, Extwee operates in four "modes":
* Twee to HTML

For simple, single-file compiling of Twee code into HTML, the arguments `i`, `o`, and `f` are used. These specify the input Twee file, the output HTML file, and the story format to use.

`extwee-[OS] -i source.twee -o output.html -f path/format.js`

* HTML to Twee

For simple, single-file decompiling of HTML into Twee code, the arguments `d` and `o` are used. They specify the HTML file to read and the Twee file to create.

`extwee-[OS] -d file.html -o source.twee `

* Directory Reading

For more complex, multiple file usage, the argument `r` can be used to read a directory. This is used with the `o` and `f` options to specify what output file and which story format to use.

When operating in directory reading mode, all CSS files will be processed using [CleanCSS](https://github.com/jakubpawlowicz/clean-css) using the Level-2 minification. All JS files are first processed using [Babel](https://www.npmjs.com/package/@babel/core) to transpile any ES6 code into ES5. Additional post-processing is done using [UglifyJS](https://www.npmjs.com/package/uglify-js).

`extwee-[OS] -r path/ -o output.html -f path/format.js`

* Directory Watching

For more complex, multiple file usage, the argument `w` can be used to "watch" a directory for any new files or changes. While in this mode, Extwee will re-use the Directory Reading mode when it detects any additional files or changes. The specified output file will be re-build fresh each time.

`extwee-[OS] -w path/ -o output.html -f path/format.js`

### File Formats

When watching a directory, Extwee will look for `tw`, `tw2`, `tw3`, `twee`, `twee2`, and `twee3` files. All other modes will accept any text files as input.

### Escaping Metacharacters

Extwee will attempt to escape the metacharacters of `{`, `}`, `[`, and `]` when moving to and from Twee notation. However, even with this support, it *highly recommended* to avoid these characters in passage name and tags to avoid confusion and potential issues.

## API Usage

Extwee can be used via NPM.

`npm i extwee`

As a NPM package, Extwee's objects can also be used independent of the binary builds as part of other projects. It exposes the following objects and their properties and functions.

### *FileReader*

*FileReader* wraps *fs.existsSync* and *fs.readFileSync*. It accepts the path to a file and will throw an error if the file cannot be found or read.

`let fr = new FileReader("path");`

#### Properties

* *contents*: The textual content of the read file.

### *TweeParser*

*TweeParser* accepts Twee textual content and saves an internal *Story* object populated with any passages found.

`let tp = new TweeParser("tweeContent");`

#### Properties

* *story*: The internal *Story* object created and populated during parsing.

### *TweeWriter*

*TweeWriter* accepts a *Story* and path to file the Twee file.

`let tw = new TweeWriter(Story, "path/");`

### *StoryFormat*

*StoryFormat* accepts a JS object (and will throw an error if not).

It is uncommon for *StoryFormat* to be used directly.

#### Properties

* *name*: Name of the story format.
* *version*: Version of the story format.
* *description*: Description of the story format.
* *author*: Author of the story format.
* *image*: Logo image URL
* *url*: URL of story format
* *license*: License of the story format
* *proofing*: If story format is a proofing story format or not
* *source*: The JS source of the story format

### *Passage*

*Passage* represents a single passage in a Twine story. It accepts `name` (String), `tags` (Array), `metadata` (JS Object), `text` (String), and `pid` (Integer).

It is uncommon for *Passage* to be used directly.

#### Properties:

* *name*: Name of passage.
* *tags*: Array of any tags.
* *metadata*: Object holding any passage metadata
* *text*: Text of the passage.
* *pid*: Passage Identification Number (PID)

### *Story*

The *Story* object holds all information about a Twine story including its metadata, passages, and name.

`let s = new Story();`

#### Properties

* *name*: Name of the story. (Defaults to "Unknown").
* *metadata*: Story metadata represented by `StoryData` passage in Twee 3
* *passages*: Array of *Passage* objects.
* *creator*: Set to `package.json` name (i.e. Exwee).
* *creatorVersion*: Set to `package.json` version.

#### Functions

* *getStylePassages()*: Returns an array of any passages with the tag "stylesheet".
* *getScriptPassages()*: Returns an array of any passages with the tag "script".
* *deleteAllByTag(tag)*: Deletes any passages with the tag `tag`.
* *getStartingPassage()*: Returns the PID of the starting passage (either `Start` or `StoryData`'s' `start` override, if found).

### *StoryFormatParser*

*StoryFormatParser* accepts the path to a story format's `format.js` file. Upon successful parsing, it keeps an internal *StoryFormat* object.

`let sfp = new StoryFormatParser("path/format.js");`

#### Properties

* *storyFormat*: Either `null` (upon failure to parse) or a *StoryFormat* object

### *HTMLParser*

*HTMLParser* accepts HTML content to parse. Upon successful parsing, it stores an internal *Story* object.

#### Properties

* *story*: Upon successful parsing, this object will hold the story and all passages found.

### *HTMLWriter*

*HTMLWriter* accepts the path to an output file, a *Story* object, a *StoryFormat* object, and optional extra CSS and JS content.

`let hw = new HTMLWriter("path/", Story, StoryFormat, extraCSS, extraJS)`

## Common API Usage Patterns

### Reading and Parsing a Twee file
```
const Extwee = require("extwee");

let file = new Extwee.FileReader("tweefile.twee");
let tp = new Extwee.TweeParser(file.contents);
// tp.story will hold the parsed story and passages
```

### Reading and Parsing a Twine 2 HTML file
```
const Extwee = require("extwee");

let file = new Extwee.FileReader("twine2.html");
let hp = new Extwee.HTMLParser(file.contents);
// hp.story will hold the parsed story and passages
```
