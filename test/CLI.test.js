// Import FileReader for reading package.json.
import FileReader from '../src/FileReader.js';
// Import promisify() from 'util'.
import { promisify } from 'util';
// Overwrite exec() locally as a Promise.
const exec = promisify(require('child_process').exec);

// Pull the version of this project from package.json.
const { version } = JSON.parse(FileReader.read('package.json'));

describe('CLI', () => {
  it('Should show correct version', async () => {
    // Wait for the Promise exec() to finish.
    const { stdout } = await exec('node ./bin/extwee.js --version');
    // Compare the package.json version to the console output in stdout
    expect(stdout).toBe(`${version}\n`);
  });
});
