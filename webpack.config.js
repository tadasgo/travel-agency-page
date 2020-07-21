// this is part of node library
const path = require('path');

module.exports = {
	// where to look and which file to process
	entry: './app/assets/scripts/App.js',
	output: {
		// change name of generated file
		filename: 'bundled.js',
		// path where to put bundled js file. Webpack requires absolute path which we generate
		path: path.resolve(__dirname, 'app'),
	},
	mode: 'development',
	watch: true,
};
