import Passage from '../../src/Passage.js';
import { Story } from '../../src/Story.js';

describe('Snowman Compatibility Tests', function () {
  describe('JavaScript Code in Passages', function () {
    it('Should not HTML-encode JavaScript with quotes', function () {
      const p = new Passage('External', '<%\n$.getScript("https://code.jquery.com/jquery-3.6.0.min.js");\n%>');
      const html = p.toTwine2HTML();
      
      // Should preserve quotes in JavaScript
      expect(html.includes('$.getScript("https://code.jquery.com/jquery-3.6.0.min.js");')).toBe(true);
      // Should NOT have HTML entities
      expect(html.includes('&quot;')).toBe(false);
      expect(html.includes('&lt;')).toBe(false);
      expect(html.includes('&gt;')).toBe(false);
    });

    it('Should preserve complex JavaScript code', function () {
      const code = `<%
var data = {"key": "value", "test": true};
if (data.test) {
  console.log("This is a test");
}
%>`;
      const p = new Passage('Test', code);
      const html = p.toTwine2HTML();
      
      // Verify the exact code is preserved
      expect(html.includes(code)).toBe(true);
      expect(html.includes('&quot;')).toBe(false);
      expect(html.includes('&lt;')).toBe(false);
      expect(html.includes('&gt;')).toBe(false);
    });
  });

  describe('HTML Content in Passages', function () {
    it('Should not HTML-encode HTML tags', function () {
      const p = new Passage('HUD', '<h1>This is the HUD!</h1>\n<p>Status: <strong>Active</strong></p>');
      const html = p.toTwine2HTML();
      
      // Should preserve HTML tags
      expect(html.includes('<h1>This is the HUD!</h1>')).toBe(true);
      expect(html.includes('<strong>Active</strong>')).toBe(true);
      // Should NOT have HTML entities
      expect(html.includes('&lt;h1&gt;')).toBe(false);
      expect(html.includes('&lt;strong&gt;')).toBe(false);
    });

    it('Should preserve nested HTML structures', function () {
      const htmlContent = `<div class="container">
  <h2>Title</h2>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>`;
      const p = new Passage('Container', htmlContent);
      const html = p.toTwine2HTML();
      
      // Verify exact HTML is preserved
      expect(html.includes(htmlContent)).toBe(true);
      expect(html.includes('&lt;')).toBe(false);
      expect(html.includes('&gt;')).toBe(false);
    });
  });

  describe('Round-trip Compatibility', function () {
    it('Should round-trip JavaScript code correctly', function () {
      const code = '$.getScript("test.js");';
      const p1 = new Passage('Test', code);
      const html = p1.toTwine2HTML();
      
      // Parser should be able to read it back
      // (This would be tested in parse tests, but we verify the HTML is correct)
      expect(html.includes(code)).toBe(true);
    });

    it('Should generate valid Story HTML with unencoded content', function () {
      const story = new Story();
      story.name = 'Test Story';
      story.IFID = 'TEST-IFID-1234';
      
      const p1 = new Passage('Start', '<%\nconsole.log("test");\n%>');
      const p2 = new Passage('HUD', '<h1>Header</h1>');
      
      story.passages = [p1, p2];
      
      const html = story.toTwine2HTML();
      
      // Verify both passages have unencoded content
      expect(html.includes('console.log("test");')).toBe(true);
      expect(html.includes('<h1>Header</h1>')).toBe(true);
      expect(html.includes('&quot;')).toBe(false);
      expect(html.includes('&lt;h1&gt;')).toBe(false);
    });
  });

  describe('Edge Cases', function () {
    it('Should handle CDATA-like content', function () {
      const content = '<![CDATA[Some data]]>';
      const p = new Passage('Test', content);
      const html = p.toTwine2HTML();
      
      expect(html.includes(content)).toBe(true);
    });

    it('Should handle mixed quotes', function () {
      const content = `var str = "She said 'hello' to me";`;
      const p = new Passage('Test', content);
      const html = p.toTwine2HTML();
      
      expect(html.includes(content)).toBe(true);
      expect(html.includes('&quot;')).toBe(false);
      expect(html.includes('&#39;')).toBe(false);
    });

    it('Should handle template literals', function () {
      const content = 'const msg = `Hello ${name}`;';
      const p = new Passage('Test', content);
      const html = p.toTwine2HTML();
      
      expect(html.includes(content)).toBe(true);
    });
  });
});
