/**
 * @jest-environment node
 */
import { getGlobalObject } from '../../src/Web/getGlobalObject.js';

describe('getGlobalObject()', function () {
  it('Should return a non-null object in Node.js environment', function () {
    const result = getGlobalObject();
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
  });

  it('Should return globalThis in Node.js environment', function () {
    expect(getGlobalObject()).toBe(globalThis);
  });
});
