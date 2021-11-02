import shell from 'shelljs';

// We could get this from process,
//  but since we are using shelljs,
//  we ask for the pwd() instead of cwd().
const currentPath = shell.pwd().stdout;
const testFilePath = currentPath + '/test/CLI';

describe('CLI', function () {
  // Remove the test files, if they exist
  beforeAll(function () {
    shell.rm(`${testFilePath}/test.*`);
  });

  // Test generating Twee files
  describe('Decompile', function () {
    test('Decompile: HTML into Twee', function () {
      shell.exec(`node ${currentPath}/bin/extwee.js -d -i ${testFilePath}/input.html -o ${testFilePath}/test.twee`);
      expect(shell.test('-e', `${testFilePath}/test.twee`)).toBe(true);
    });
  });

  // Test generating HTML files
  describe('Compile', function () {
    test('Compile: Twee + StoryFormat into Twee', function () {
      shell.exec(`node ${currentPath}/bin/extwee.js -c -i ${testFilePath}/example6.twee -s ${testFilePath}/harlowe.js -o ${testFilePath}/test2.html`);
      expect(shell.test('-e', `${testFilePath}/test2.html`)).toBe(true);
    });
  });
});
