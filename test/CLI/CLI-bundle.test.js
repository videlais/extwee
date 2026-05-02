/**
 * Bundle equivalence tests for the CLI.
 *
 * These tests run the same operations as CLI.test.js, but invoke the CJS
 * bundle (dist/extwee.cjs) produced by `npm run build:cli` instead of the
 * ESM source. The outputs are compared against those produced by the ESM
 * source to verify that esbuild's ESM→CJS transformation does not alter
 * behaviour on any platform.
 *
 * Prerequisites: `npm run build:cli` must have been run before this suite.
 * The suite is skipped automatically if the bundle is not present so it does
 * not break a plain `npm test` run in a clean checkout.
 */

import shell from 'shelljs';
import { existsSync, readFileSync } from 'node:fs';

// UUID v4 pattern — used to normalise IFID fields before content comparison
// so that randomly regenerated IFIDs don't cause false mismatches.
const UUID_V4 = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;
const IFID_PLACEHOLDER = '00000000-0000-4000-8000-000000000000';

const currentPath = shell.pwd().stdout;
const testFilePath = `${currentPath}/test/CLI/files`;
const bundlePath = `${currentPath}/dist/extwee.cjs`;
const esmEntry  = `${currentPath}/src/extwee.js`;

// Skip the whole suite when the bundle hasn't been built yet.
const describeOrSkip = existsSync(bundlePath) ? describe : describe.skip;

describeOrSkip('CLI bundle equivalence (dist/extwee.cjs vs src/extwee.js)', () => {

  // Temp output directories so ESM and bundle outputs don't collide.
  const esmOut    = `${testFilePath}/output-esm`;
  const bundleOut = `${testFilePath}/output-bundle`;

  beforeAll(() => {
    shell.mkdir('-p', esmOut, bundleOut);
    // Clean any files left over from a previous run.
    shell.rm('-f', `${esmOut}/*`, `${bundleOut}/*`);
  });

  afterAll(() => {
    shell.rm('-rf', esmOut, bundleOut);
  });

  describe('Twine 2 decompile: HTML → Twee 3', () => {
    const esmFile    = `${esmOut}/decompile.twee`;
    const bundleFile = `${bundleOut}/decompile.twee`;

    it('ESM source produces output file', () => {
      shell.exec(`node ${esmEntry} -d -i ${testFilePath}/input.html -o ${esmFile}`, { silent: true });
      expect(existsSync(esmFile)).toBe(true);
    });

    it('Bundle produces output file', () => {
      shell.exec(`node ${bundlePath} -d -i ${testFilePath}/input.html -o ${bundleFile}`, { silent: true });
      expect(existsSync(bundleFile)).toBe(true);
    });

    it('Bundle output matches ESM output', () => {
      const normalise = s => s.replace(UUID_V4, IFID_PLACEHOLDER);
      expect(normalise(readFileSync(bundleFile, 'utf8'))).toBe(normalise(readFileSync(esmFile, 'utf8')));
    });
  });

  describe('Twine 2 compile: Twee 3 + StoryFormat → HTML', () => {
    const esmFile    = `${esmOut}/compile.html`;
    const bundleFile = `${bundleOut}/compile.html`;

    it('ESM source produces output file', () => {
      shell.exec(
        `node ${esmEntry} -c -i ${testFilePath}/example6.twee -s ${testFilePath}/harlowe.js -o ${esmFile}`,
        { silent: true }
      );
      expect(existsSync(esmFile)).toBe(true);
    });

    it('Bundle produces output file', () => {
      shell.exec(
        `node ${bundlePath} -c -i ${testFilePath}/example6.twee -s ${testFilePath}/harlowe.js -o ${bundleFile}`,
        { silent: true }
      );
      expect(existsSync(bundleFile)).toBe(true);
    });

    it('Bundle output matches ESM output', () => {
      const normalise = s => s.replace(UUID_V4, IFID_PLACEHOLDER);
      expect(normalise(readFileSync(bundleFile, 'utf8'))).toBe(normalise(readFileSync(esmFile, 'utf8')));
    });
  });

  describe('Twine 1 compile: Twee 3 + engine/code/header → HTML', () => {
    const esmFile    = `${esmOut}/twine1-compile.html`;
    const bundleFile = `${bundleOut}/twine1-compile.html`;

    it('ESM source produces output file', () => {
      shell.exec(
        `node ${esmEntry} --twine1 -c -i ${testFilePath}/example6.twee -o ${esmFile} --codejs ${testFilePath}/twine1/code.js --engine ${testFilePath}/twine1/engine.js --header ${testFilePath}/twine1/header.html --name Test`,
        { silent: true }
      );
      expect(existsSync(esmFile)).toBe(true);
    });

    it('Bundle produces output file', () => {
      shell.exec(
        `node ${bundlePath} --twine1 -c -i ${testFilePath}/example6.twee -o ${bundleFile} --codejs ${testFilePath}/twine1/code.js --engine ${testFilePath}/twine1/engine.js --header ${testFilePath}/twine1/header.html --name Test`,
        { silent: true }
      );
      expect(existsSync(bundleFile)).toBe(true);
    });

    it('Bundle output matches ESM output', () => {
      const normalise = s => s.replace(UUID_V4, IFID_PLACEHOLDER);
      expect(normalise(readFileSync(bundleFile, 'utf8'))).toBe(normalise(readFileSync(esmFile, 'utf8')));
    });
  });

  describe('Twine 1 decompile: Twine 1 HTML → Twee 3', () => {
    const esmFile    = `${esmOut}/twine1-decompile.twee`;
    const bundleFile = `${bundleOut}/twine1-decompile.twee`;

    it('ESM source produces output file', () => {
      shell.exec(
        `node ${esmEntry} --twine1 -d -i ${testFilePath}/twine1Test.html -o ${esmFile}`,
        { silent: true }
      );
      expect(existsSync(esmFile)).toBe(true);
    });

    it('Bundle produces output file', () => {
      shell.exec(
        `node ${bundlePath} --twine1 -d -i ${testFilePath}/twine1Test.html -o ${bundleFile}`,
        { silent: true }
      );
      expect(existsSync(bundleFile)).toBe(true);
    });

    it('Bundle output matches ESM output', () => {
      const normalise = s => s.replace(UUID_V4, IFID_PLACEHOLDER);
      expect(normalise(readFileSync(bundleFile, 'utf8'))).toBe(normalise(readFileSync(esmFile, 'utf8')));
    });
  });

  describe('Version flag', () => {
    it('Bundle reports same version as ESM source', () => {
      const esmVersion    = shell.exec(`node ${esmEntry} -v`,    { silent: true }).stdout.trim();
      const bundleVersion = shell.exec(`node ${bundlePath} -v`, { silent: true }).stdout.trim();
      expect(bundleVersion).toBe(esmVersion);
    });
  });
});
