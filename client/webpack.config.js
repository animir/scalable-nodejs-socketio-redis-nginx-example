const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = config;