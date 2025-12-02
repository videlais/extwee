# Contributing to Extwee

Thank you for your interest in contributing to Extwee! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainer.

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher (LTS recommended)
- **npm** 9.x or higher
- **Git** for version control

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR-USERNAME/extwee.git
   cd extwee
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/videlais/extwee.git
   ```

4. **Install dependencies**:

   ```bash
   npm install
   ```

5. **Run tests to verify setup**:

   ```bash
   npm test
   ```

6. **Build the project**:

   ```bash
   npm run all
   ```

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Include**:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Your environment (Node.js version, OS, etc.)
   - Relevant code samples or error messages

### Suggesting Enhancements

1. **Check existing feature requests** to avoid duplicates
2. **Use the feature request template** when creating a new issue
3. **Explain**:
   - What problem this solves
   - How it should work
   - Why this would be useful to most users

### Pull Requests

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Write or update tests** for your changes

4. **Run the full test suite**:

   ```bash
   npm run all
   ```

5. **Commit your changes** with clear, descriptive messages:

   ```bash
   git commit -m "Add feature: brief description"
   ```

6. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub

## Coding Standards

### JavaScript Style

- Use **ES modules** (`import`/`export`)
- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Follow **ESLint** configuration (run `npm run lint`)

### Code Organization

```javascript
// 1. Imports at the top
import { Something } from './module.js';

// 2. Constants
const CONSTANT_VALUE = 'value';

// 3. Helper functions
function helperFunction() { }

// 4. Main exported functions/classes
export function mainFunction() { }
```

### Naming Conventions

- **Classes**: PascalCase (`Story`, `Passage`, `StoryFormat`)
- **Functions**: camelCase (`parseTwee`, `compileTwine2HTML`)
- **Constants**: UPPER_SNAKE_CASE (`CREATOR_VERSION`)
- **Private fields**: Prefix with `#_` (`#_passages`, `#_name`)

### Documentation

- **All public functions** must have JSDoc comments
- Include `@param`, `@returns`, `@throws` as appropriate
- Add usage examples for complex functions
- Update README.md if adding new features

Example:

```javascript
/**
 * Parse Twee 3 format into Story object.
 * @function parse
 * @param {string} contents - Twee 3 formatted string
 * @returns {Story} Parsed Story object
 * @throws {Error} If contents is not a string
 * @throws {Error} If no passages are found
 * @example
 * const story = parseTwee(':: Start\nHello World!');
 */
export function parse(contents) {
  // Implementation
}
```

## Testing Guidelines

### Test Requirements

- **All new features** must include tests
- **Bug fixes** should include regression tests
- Maintain **>90% code coverage**
- Tests must pass on all supported Node.js versions

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.js

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode (during development)
npm test -- --watch
```

### Writing Tests

- Use **Jest** testing framework
- Follow **AAA pattern** (Arrange, Act, Assert)
- Use **descriptive test names**
- Group related tests with `describe` blocks

Example:

```javascript
describe('parseTwee()', () => {
  it('should parse a simple Twee file', () => {
    // Arrange
    const input = ':: Start\nHello World!';
    
    // Act
    const story = parseTwee(input);
    
    // Assert
    expect(story.passages).toHaveLength(1);
    expect(story.passages[0].name).toBe('Start');
    expect(story.passages[0].text).toBe('Hello World!');
  });

  it('should throw error for invalid input', () => {
    expect(() => parseTwee(123)).toThrow();
  });
});
```

### Test Coverage Areas

- **Unit tests**: Individual functions and methods
- **Integration tests**: Multiple components working together
- **Edge cases**: Invalid input, empty strings, special characters
- **Error handling**: Proper error messages and types

## Submitting Changes

### Pull Request Guidelines

1. **Keep PRs focused** - One feature/fix per PR
2. **Update documentation** - README, JSDoc, CHANGELOG
3. **Add tests** - Maintain or improve coverage
4. **Follow commit conventions**:

   ```text
   type(scope): brief description
   
   Longer description if needed
   
   Fixes #123
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

5. **Ensure CI passes** - All tests and lints must pass
6. **Request review** - Wait for maintainer feedback
7. **Update your branch** if main has changed:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Commit Message Examples

```bash
# Good commit messages
feat(parser): add support for metadata in passage headers
fix(compiler): correct HTML entity encoding in passages
docs(readme): add examples for JSON format
test(twee): add edge case tests for escape sequences

# Bad commit messages  
fixed bug
updates
WIP
asdf
```

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Run full test suite: `npm run all`
4. Commit: `git commit -m "chore: release v2.3.13"`
5. Tag: `git tag v2.3.13`
6. Push: `git push && git push --tags`
7. Publish: `npm publish`
8. Create GitHub release with notes from CHANGELOG

## Additional Resources

- [Twine Specifications](https://github.com/iftechfoundation/twine-specs)
- [Twee 3 Specification](https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)

## Questions?

- Open a [Discussion](https://github.com/videlais/extwee/discussions) for questions
- Check existing [Issues](https://github.com/videlais/extwee/issues) for known problems
- Review [Documentation](https://videlais.github.io/extwee/) for usage help

Thank you for contributing to Extwee! 🎉
