import path from 'node:path';

export default {
  mode: 'production',
  entry: {
    'extwee.web.min': './web-index.js'
  },
  output: {
    path: path.resolve('./', 'build'),
    filename: '[name].js',
  },
};
