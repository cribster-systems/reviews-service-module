const path = require('path');
require('dotenv').config();
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '/public') 
  : path.join(__dirname,'/client/dist');

const suffix = process.env.NODE_ENV === 'production' 
  ? '.min' 
  : '';

const common = {
  context: SRC_DIR,
  module : {
    rules : [
      {
        test : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test : /\.css$/, 
        loader: 'style-loader!css-loader',
      }
    ]
  }
};

const client = {
  entry: './client.js',
  output: {
    path: DIST_DIR,
    filename: `client-bundle${suffix}.js`
  }
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: `server-bundle${suffix}.js`,
    libraryTarget: 'commonjs-module'
  }
}

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];