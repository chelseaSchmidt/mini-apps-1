const path = require('path');
const entry = path.join(__dirname, '/client/app.jsx');
const outputDir = path.join(__dirname, '/public');

module.exports = {
  entry: entry,
  output: {
    filename: 'bundle.js',
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