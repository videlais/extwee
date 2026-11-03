import deepmerge from 'deepmerge';

describe('deepmerge security patch', () => {
  it('does not allow merged values to inherit attacker-controlled properties', () => {
    const source = JSON.parse('{"passage":{"__proto__":{"isAdmin":true}}}');
    const merged = deepmerge({ passage: null }, source);

    expect(Object.getPrototypeOf(merged.passage)).toBe(Object.prototype);
    expect(merged.passage.isAdmin).toBeUndefined();
    expect(Object.prototype.isAdmin).toBeUndefined();
  });
});
