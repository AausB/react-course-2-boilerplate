const path = require('path');
const webpack = require('webpack');

// create extra css file
// see: https://www.npmjs.com/package/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// get the environment variable NODE_ENV
// heroku sets NODE_ENV to "production" by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

// see: https://webpack.js.org/configuration/configuration-types/#exporting-a-function
module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  
  console.log('env:', env);

  return {
    // entry can be an array of entry points
    // babel-polyfill: adding support to older browsers
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        
        // include CSS in 
        // use: [
        //   'style-loader',
        //   'css-loader',
        //   'sass-loader'
        // ]

        // create extra css file
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },

    
    plugins: [
      CSSExtract, // create extra css file
      new webpack.DefinePlugin({ // JSON.stringify() wraps variable content in quotes ""
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_SENDER_ID': JSON.stringify(process.env.FIREBASE_SENDER_ID)
      })
    ],

    // see: https://webpack.js.org/configuration/devtool/
    // source-map: an extra file is created "bundle.js.map"
    //    bundle.js.map is only loaded when the devtools are opened
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true, // handle URLs by the history object not by requesting the server
      publicPath: '/dist/'
    }
  };
};
