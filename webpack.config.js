import path from 'node:path';

export default {
  mode: 'production',
  entry: {
    // Core bundle with most common functionality
    'extwee.core': './src/Web/web-core.js',
    // Individual parser modules
    'extwee.twine1html': './src/Web/web-twine1html.js',
    'extwee.twine2archive': './src/Web/web-twine2archive.js',
    'extwee.tws': './src/Web/web-tws.js'
  },
  output: {
    path: path.resolve('./', 'build'),
    filename: '[name].min.js',
    library: {
      type: 'umd',
      name: 'Extwee', // Use a single library name for all modules
      export: 'default'  // Export the default export directly
    },
    globalObject: 'this'
  },
  optimization: {
    usedExports: true,
    sideEffects: false,
    splitChunks: false // Don't split chunks for individual modules
  },
  performance: {
    maxAssetSize: 250000, // 244 KiB
    maxEntrypointSize: 250000,
    hints: 'warning'
  }
};
