import shell from 'shelljs';

// We could get this from process,
//  but since we are using shelljs,
//  we ask for the pwd() instead of cwd().
const currentPath = shell.pwd().stdout;
const testFilePath = currentPath + '/test/CLI/files';

describe('CLI', () => {
  // Remove the test files, if they exist.
  beforeAll(() => {
    // Test for files beginning with "test." in the output directory.
    if (shell.ls('-A', `${testFilePath}/output/`).length > 0) {
      // Remove the files.
      shell.rm(`${testFilePath}/output/*`);
    }
  });

  it('Twine 2 - de-compile: Twine 2 HTML into Twee 3', () => {
    shell.exec(`node ${currentPath}/src/extwee.js -d -i ${testFilePath}/input.html -o ${testFilePath}/output/test.twee`);
    expect(shell.test('-e', `${testFilePath}/output/test.twee`)).toBe(true);
  });

  it('Twine 2 - compile: Twee 3 + StoryFormat into Twine 2 HTML', () => {
    shell.exec(`node ${currentPath}/src/extwee.js -c -i ${testFilePath}/example6.twee -s ${testFilePath}/harlowe.js -o ${testFilePath}/output/test2.html`);
    expect(shell.test('-e', `${testFilePath}/output/test2.html`)).toBe(true);
  });

  it('Twine 1 - compile: Twee 3 + Twine 1 engine.js + Twine 1 code.js + Twine 1 header.html', () => {
    shell.exec(`node ${currentPath}/src/extwee.js -t1 -c -i ${testFilePath}/example6.twee -o ${testFilePath}/output/test3.html -codejs ${testFilePath}/twine1/code.js -engine ${testFilePath}/twine1/engine.js -header ${testFilePath}/twine1/header.html -name Test`);
    expect(shell.test('-e', `${testFilePath}/output/test3.html`)).toBe(true);
  });

  it('Twine 1 - de-compile: Twine 1 HTML into Twee 3', () => {
    shell.exec(`node ${currentPath}/src/extwee.js -t1 -d -i ${testFilePath}/twine1Test.html -o ${testFilePath}/output/test.twee`);
    expect(shell.test('-e', `${testFilePath}/output/test.twee`)).toBe(true);
  });

  // Remove the test files, if they exist.
  afterAll(() => {
    // Test for files in the output directory.
    if (shell.ls('-A', `${testFilePath}/output/`).length > 0) {
      // Remove the files.
      shell.rm(`${testFilePath}/output/*`);
    }
  });
});
