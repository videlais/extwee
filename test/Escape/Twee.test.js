import { escapeName, escapeText } from '../../src/Escape/Twee';

describe('Escape.Twee', () => {
  it('Should escape brackets, curly quotes, and backslashes in the name', () => {
    expect(escapeName('[Hello] {world} \\')).toBe('\\[Hello\\] \\{world\\} \\\\');
  });

  it('Should escape `::` at the start of a line', () => {
    expect(escapeText(':: Hello')).toBe('\\:: Hello');
  });
});
