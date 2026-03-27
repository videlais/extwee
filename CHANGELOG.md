# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.15] - 2026-3-27

### Changed

- Added more JSDocs comments.
- Updated ESLint usage to better support Windows platforms.
- Removed Node 20.x support and added Node 24.x support for GitHub CI Action.

## [2.3.14] - 2026-2-1

### Changed

- Updated dependencies.

## [2.3.13] - 2026-1-20

### Changed

- Updated dependencies.

## [2.3.12] - 2025-12-1

### Added

- CHANGELOG.md to track project changes
- CONTRIBUTING.md with development guidelines
- GitHub issue templates (bug reports, feature requests)
- GitHub pull request template
- .npmignore to optimize package size
- Script-tagged passages now automatically added to `storyJavaScript` property instead of passages array
- Comprehensive Snowman story format compatibility tests
- Enhanced HTML entity handling for passage content
- CI/CD testing across multiple Node.js versions (20.x, 22.x, 23.x)
- CI/CD testing across multiple operating systems (Ubuntu, Windows, macOS)

### Changed

- Passage text content no longer HTML-encoded in output (attributes still encoded)
- Improved round-trip compatibility between formats
- Enhanced GitHub Actions workflow for better test coverage

### Fixed

- HTML entity encoding bug that broke JavaScript and HTML content in passages
- Snowman story format compatibility issues with dynamic content

## [2.3.11] - 2025-11-15

### Fixed

- Regression of encoding behavior back to original, correct encoding of HTML-like entities
- Accidentally introduced encoding issue from 2.3.9

## [2.3.10] - 2025-11-15

### Fixed

- Issue with parsing of Twee passages using "script" and "stylesheet" keywords
- Passages not always being processed as Story JavaScript and Story Stylesheet
- Duplication of passages and incorrect encoding into Twine 2 HTML

## [2.3.9] - 2025-11-15

### Fixed

- Edge case issue when encoding special symbols in writing and confirming when reading

## [2.3.8] - 2025-11-15

### Added

- Native crypto.randomUUID() for IFID generation (Node.js)
- Browser-based Crypto API randomUUID() for web builds
- Performance improvement: UUID generation is much faster

### Changed

- Updated dependencies

### Removed

- uuid package dependency (replaced with native crypto APIs)

## [2.3.2] - 2025-08-03

### Changed

- Monthly maintenance update
- Updated dependencies (jest, eslint, webpack, eslint-plugin-jsdoc, @inquirer/prompts)

## [2.3.0] - 2024-08-01

- May impact older browsers (pre-2021) for web builds

## [2.3.7] - 2025-10-25

### Added

- New decompile demo showing Twine 2 HTML analysis with statistics

### Fixed

- Issues with web parsing of attributes inside `<tw-storydata>` and `<tw-passagedata>` elements

## [2.3.6] - 2025-10-24

### Changed

- Minor release to re-align versions on NPM and GitHub

## [2.3.5] - 2025-10-24

### Added

- Exports for various web builds to help with packaging

## [2.3.4] - 2025-10-01

### Added

- "Compiler" demo showing browser-based Twee compilation with Story Formats Archive

### Changed

- Internal WebPack changes to fix edge cases with loading Extwee in browser
- Updated dependencies

### Security

- Fixed code scanning alert #133: Exception text reinterpreted as HTML

## [2.3.3] - 2025-09-07

### Added

- Web-specific versions of major HTML parsers (Twine1HTML, Twine2HTML, Twine2ArchiveHTML) using DOM functionality
- Separate build files: core, TWS, Twine2Archive, Twine1HTML

### Changed

- Optimized web build from 290 KiB to 78.5 KiB (core)
- Updated UUID to pure ESM module
- Rewrote Jest mocking functions for compatibility

## [2.3.2] - 2025-08-03

### Added

- Support for Twine 2 JSON format
- Enhanced web build exports
- Tree-shaking support for better bundle optimization

### Changed

- Improved command-line interface with better error messages
- Updated documentation with more examples

## [2.2.5] - 2024-07-01

### Changed

- Separated short and long command-line option flags
- Improved CLI help documentation

## [2.2.0] - 2024-06-01

### Added

- Config file support (extwee.config.json)
- Better story format version handling

### Changed

- Enhanced error messages throughout the application

## [2.1.0] - 2024-05-01

### Added

- Twine 2 Archive HTML support
- Round-trip testing for format conversions

### Fixed

- Various parser edge cases

## [2.0.0] - 2024-04-01

### Added

- Complete rewrite using ES modules
- TypeScript type definitions
- Web builds for browser usage
- Comprehensive test suite with Jest

### Changed

- Modern JavaScript (ES2020+)
- Improved API design
- Better separation of concerns

### Breaking Changes

- API incompatible with 1.x versions
- Node.js 14+ required

## [1.6.0] - 2023-12-01

### Added

- Twee 3 specification support
- StoryFormat parsing improvements

### Deprecated

- Version 1.x line (replaced by 2.x)

---

## Migration Guides

### From 1.x to 2.x

- Update Node.js to version 14 or higher
- Change CommonJS `require()` to ES `import`
- Review API changes in object constructors
- Update file paths to use absolute paths in CLI

### From uuid package to native crypto

- No user action required - internal change only
- IFID generation is now 3.6x faster
