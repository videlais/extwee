/**
 * Detects and returns the global object for the current runtime environment.
 * Checks globalThis, window, global, and self in order of preference.
 * @function getGlobalObject
 * @returns {object|null} The global object, or null if none is detectable.
 */
export function getGlobalObject() {
  if (typeof globalThis !== 'undefined') return globalThis;
  /* istanbul ignore next */
  if (typeof window !== 'undefined') return window;
  /* istanbul ignore next */
  if (typeof global !== 'undefined') return global;
  /* istanbul ignore next */
  if (typeof self !== 'undefined') return self;
  /* istanbul ignore next */
  return null;
}
