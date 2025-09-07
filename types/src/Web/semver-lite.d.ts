/**
 * Lightweight semantic version validation for web builds
 * This replaces the full semver package to reduce bundle size
 */
/**
 * Validates if a string is a valid semantic version
 * @param {string} version - Version string to validate
 * @returns {string|null} Returns the version if valid, null if invalid
 */
export function valid(version: string): string | null;
