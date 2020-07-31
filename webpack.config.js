// this is part of node library
const path = require('path');
// list post css plugins we want to use
const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('postcss-hexrgba'), require('autoprefixer')];

module.exports = {
	// where to look and which file to process
	entry: './app/assets/scripts/App.js',
	output: {
		// change name of generated file
		filename: 'bundled.js',
		// path where to put bundled js file. Webpack requires absolute path which we generate
		path: path.resolve(__dirname, 'app'),
	},
	// update page without full reload
	devServer: {
		before: function (app, server) {
			// watch for any file which ends with .html
			server._watch('./app/**/*.html');
		},
		// join two path segments and point to folder which we want webpack to serve
		contentBase: path.join(__dirname, 'app'),
		// allow to inject new css or js into browsers memory
		hot: true,
		port: 9000,
		// allow devices on the same network to access webpack dev server site by your LOCAL ip adress
		host: '0.0.0.0',
	},
	mode: 'development',
	// tell webpack what to do when it runs into certain files
	module: {
		rules: [
			// CSS
			{
				// if ends with .css use these packages
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }],
			},
		],
	},
};
