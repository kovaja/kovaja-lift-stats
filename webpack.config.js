const HtmlWebPackPlugin = require("html-webpack-plugin");

console.log('KUBA', __dirname+ '/server/assets');

module.exports = {
  entry: './client/src/index.js',
  output: {
		path:  __dirname + '/server/assets',
		filename: 'index.js'
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./server/assets/public/index.html",
      filename: "./index.html"
    })
  ]
};