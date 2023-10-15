import path from 'node:path';

export default {
  mode: 'production',
  entry: './web-index.js',
  output: {
    path: path.resolve('./', 'build'),
    filename: 'extwee.bundle.js',
  },
};
