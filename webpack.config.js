import path from 'node:path';

export default {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve('./', 'build'),
    filename: 'extwee.bundle.js',
  },
};
