import shell from 'shelljs';

// We could get this from process,
//  but since we are using shelljs,
//  we ask for the pwd() instead of cwd().
const currentPath = shell.pwd().stdout;
const testFilePath = currentPath + '/test/CLI/files';

describe('CLI', function () {
  describe('Decompile', function () {
    test('Decompile: HTML into Twee', function () {
      shell.exec(`node ${currentPath}/bin/extwee.js -d -i ${testFilePath}/test.html -o ${testFilePath}/test.twee`);
      expect(shell.test('-e', `${testFilePath}/test.twee`)).toBe(true);
    });
  });
});
