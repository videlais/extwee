/**
 * Detects and returns the global object for the current runtime environment.
 * Checks globalThis, window, global, and self in order of preference.
 * @function getGlobalObject
 * @returns {object|null} The global object, or null if none is detectable.
 */
export function getGlobalObject(): object | null;
