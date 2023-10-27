import shell from 'shelljs';

// We could get this from process,
//  but since we are using shelljs,
//  we ask for the pwd() instead of cwd().
const currentPath = shell.pwd().stdout;
const testFilePath = currentPath + '/test/CLI';

describe('CLI', () => {
  // Remove the test files, if they exist.
  beforeAll(() => {
    shell.rm(`${testFilePath}/test.*`);
  });

  // Test generating Twee files.
  describe('Decompile Twine 2 HTML', () => {
    it('Decompile: HTML into Twee', () => {
      shell.exec(`node ${currentPath}/bin/extwee.js -d -i ${testFilePath}/input.html -o ${testFilePath}/test.twee`);
      expect(shell.test('-e', `${testFilePath}/test.twee`)).toBe(true);
    });
  });

  // Test generating HTML files.
  describe('Compile Twee 3 into Twine 2 HTML', () => {
    it('Compile: Twee + StoryFormat into Twee', () => {
      shell.exec(`node ${currentPath}/bin/extwee.js -c -i ${testFilePath}/example6.twee -s ${testFilePath}/harlowe.js -o ${testFilePath}/test2.html`);
      expect(shell.test('-e', `${testFilePath}/test2.html`)).toBe(true);
    });
  });
});
