import path from 'node:path';
import webpack from 'webpack';

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
  plugins: [
    // Replace Node.js IFID generator with browser version for web builds
    new webpack.NormalModuleReplacementPlugin(
      /src[\\/]IFID[\\/]generate\.js$/,
      './generate-web.js'
    )
  ],
  resolve: {
    fallback: {
      // Exclude Node.js core modules from browser builds
      'crypto': false
    }
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
