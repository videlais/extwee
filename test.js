import { unescapeName, unescapeText } from './src/Unescape/Twee.js';
import Story from './src/Story.js';
import Passage from './src/Passage.js';

const source = `:: StoryTitle
Cursed


:: StoryData
{
  "ifid": "22F25A58-7062-4927-95B6-F424DDB2EC65",
  "format": "Harlowe",
  "format-version": "3.3.8",
  "start": "[Hello] {world} \\\\",
  "zoom": 1
}


:: \[Hello\] \{world\} \\\\ {"position":"400,200","size":"100,100"}
\:: Extra header
`;

/**
 * Parse Twee 3 text into a Story object.
 * (A) Split the file based on the passage sigil (::) proceeded by a newline
 * (B) Fix the first result
 * (C) Iterate through the passages
 * (D) Set default values
 * 
 * 
 */

function parse(fileContents) {
	  const story = new Story();
  if (Object.prototype.toString.call(fileContents) !== '[object String]') {
	throw new Error('Contents not a String');
  }
  let adjusted = '';
  if (fileContents[0] !== ':' && fileContents[1] !== ':') {
	adjusted = fileContents.slice(fileContents.indexOf('::'), fileContents.length);
  } else {
	adjusted = fileContents;
  }
  const parsingPassages = adjusted.split('\n::');
  parsingPassages[0] = parsingPassages[0].slice(2, parsingPassages[0].length);
  let pid = 1;
  parsingPassages.forEach((passage) => {
	let tags = '';
	let metadata = '';
	let text = '';
	let name = '';
	let header = passage.slice(0, passage.indexOf('\n'));
	text = passage.substring(header.length + 1, passage.length).trim();
	if (header.indexOf('[') !== -1) {
	  name = unescapeName(header.slice(0, header.indexOf('[')).trim());
	  tags = header.slice(header.indexOf('['), header.indexOf(']') + 1);
	} else {
	  name = unescapeName(header.trim());
	}
	if (text.indexOf('{') !== -1) {
	  metadata = text.slice(text.indexOf('{'), text.indexOf('}') + 1);
	  text = text.slice(text.indexOf('}') + 1, text.length).trim();
	}
	story.addPassage(new Passage(name, unescapeText(text), tags, metadata) );
	pid++;
  });
  return story;
}

console.log(parse(source));
