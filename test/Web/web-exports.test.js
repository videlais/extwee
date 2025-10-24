/**
 * @jest-environment node
 */

/**
 * Tests for package.json web exports
 * These tests verify that users can import the web builds directly
 */

import { describe, expect, it } from '@jest/globals';
import fs from 'node:fs';
import path from 'node:path';

describe('Web build exports', () => {
  const buildDir = path.resolve(process.cwd(), 'build');
  
  describe('Web build files exist', () => {
    it('should have core web build file', () => {
      const corePath = path.join(buildDir, 'extwee.core.min.js');
      expect(fs.existsSync(corePath)).toBe(true);
    });

    it('should have twine1html web build file', () => {
      const twine1Path = path.join(buildDir, 'extwee.twine1html.min.js');
      expect(fs.existsSync(twine1Path)).toBe(true);
    });

    it('should have twine2archive web build file', () => {
      const twine2ArchivePath = path.join(buildDir, 'extwee.twine2archive.min.js');
      expect(fs.existsSync(twine2ArchivePath)).toBe(true);
    });

    it('should have tws web build file', () => {
      const twsPath = path.join(buildDir, 'extwee.tws.min.js');
      expect(fs.existsSync(twsPath)).toBe(true);
    });
  });

  describe('Web build content validation', () => {
    it('should have UMD wrapper in core build', () => {
      const corePath = path.join(buildDir, 'extwee.core.min.js');
      const content = fs.readFileSync(corePath, 'utf8');
      
      // Should contain UMD pattern
      expect(content).toMatch(/function.*webpackUniversalModuleDefinition|define.*function|module\.exports.*function/);
      
      // Should be minified (no excessive whitespace)
      expect(content.split('\n').length).toBeLessThan(10);
    });

    it('should have Extwee functionality in core build', () => {
      const corePath = path.join(buildDir, 'extwee.core.min.js');
      const content = fs.readFileSync(corePath, 'utf8');
      
      // Should contain core Extwee functionality
      expect(content).toMatch(/parseTwee|parseJSON|generateIFID|Story/);
    });

    it('should have appropriate size for minified builds', () => {
      const corePath = path.join(buildDir, 'extwee.core.min.js');
      const stats = fs.statSync(corePath);
      
      // Core build should be substantial but not excessive (roughly 50-150KB)
      expect(stats.size).toBeGreaterThan(50000); // > 50KB
      expect(stats.size).toBeLessThan(150000);   // < 150KB
    });

    it('should have smaller specialized builds', () => {
      const corePath = path.join(buildDir, 'extwee.core.min.js');
      const twine1Path = path.join(buildDir, 'extwee.twine1html.min.js');
      const coreStats = fs.statSync(corePath);
      const twine1Stats = fs.statSync(twine1Path);
      
      // Specialized builds should be smaller than core
      expect(twine1Stats.size).toBeLessThan(coreStats.size);
    });
  });

  describe('Package.json exports configuration', () => {
    it('should have exports field in package.json', () => {
      const packagePath = path.resolve(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      expect(packageJson.exports).toBeDefined();
      expect(typeof packageJson.exports).toBe('object');
    });

    it('should have correct web export paths', () => {
      const packagePath = path.resolve(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      expect(packageJson.exports['.']).toBe('./index.js');
      expect(packageJson.exports['./web']).toBe('./build/extwee.core.min.js');
      expect(packageJson.exports['./web/core']).toBe('./build/extwee.core.min.js');
      expect(packageJson.exports['./web/twine1html']).toBe('./build/extwee.twine1html.min.js');
      expect(packageJson.exports['./web/twine2archive']).toBe('./build/extwee.twine2archive.min.js');
      expect(packageJson.exports['./web/tws']).toBe('./build/extwee.tws.min.js');
    });

    it('should point to files that actually exist', () => {
      const packagePath = path.resolve(process.cwd(), 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Check each web export path exists
      const webExports = [
        packageJson.exports['./web'],
        packageJson.exports['./web/core'],
        packageJson.exports['./web/twine1html'],
        packageJson.exports['./web/twine2archive'],
        packageJson.exports['./web/tws']
      ];
      
      for (const exportPath of webExports) {
        const fullPath = path.resolve(process.cwd(), exportPath);
        expect(fs.existsSync(fullPath)).toBe(true);
      }
    });
  });

  describe('Documentation for web exports', () => {
    it('should provide clear usage examples', () => {
      // This test documents how users can import the web builds
      const usageExamples = {
        'import Extwee from "extwee/web"': 'Core web build with most functionality',
        'import Extwee from "extwee/web/core"': 'Same as above (explicit)',
        'import Extwee from "extwee/web/twine1html"': 'Twine 1 HTML parsing only',
        'import Extwee from "extwee/web/twine2archive"': 'Twine 2 Archive HTML parsing only',
        'import Extwee from "extwee/web/tws"': 'TWS (Twine 1 workspace) parsing only'
      };
      
      // Just verify we have documented the usage patterns
      expect(Object.keys(usageExamples)).toHaveLength(5);
      expect(usageExamples['import Extwee from "extwee/web"']).toContain('Core web build');
    });
  });
});