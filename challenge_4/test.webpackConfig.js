const path = require('path');
const entry = path.join(__dirname, '/client/test/test.jsx');
const outputDir = path.join(__dirname, '/tests');

module.exports = {
  entry: entry,
  output: {
    filename: 'testBundle.js',
    path: outputDir
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  mode: 'development'
}