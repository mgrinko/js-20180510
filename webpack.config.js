const path = require('path');

module.exports = {
  mode: 'none',
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'build.js'
  },
  watch: true,
  devtool: 'source-map',
};


// const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//
// module.exports = {
//   mode: 'none',
//   entry: './frontend/scripts/app.js',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'build.js'
//   },
//   watch: true,
//   devtool: 'source-map',
//
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime']
//           }
//         }
//       },
//
//       {
//         test: /\.hbs/,
//         loader: "handlebars-loader"
//       },
//
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader' ]
//       }
//     ]
//   },
//
//   plugins: [
//     new UglifyJsPlugin({
//       sourceMap: true,
//     })
//   ],
//
//   devServer: {
//     contentBase: path.join(__dirname, "public"),
//     compress: true,
//     port: 9000
//   }
// };
