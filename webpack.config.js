// current npm script that is executed
const currentTask = process.env.npm_lifecycle_event;
// this is part of node library
const path = require('path');

// cleans dist folder everytime new build command is run
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// separate css file from js-css bundle
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// auto includes js and css files into html file
const HtmlWebpackPlugin = require('html-webpack-plugin');
// to import many html files
const fse = require('fs-extra');

// list post css plugins we want to use
const postCSSPlugins = [require('postcss-import'), require('postcss-mixins'), require('postcss-simple-vars'), require('postcss-nested'), require('postcss-hexrgba'), require('autoprefixer')];

// copy images to dist folder
class RunAfterCompile {
	apply(compiler) {
		compiler.hooks.done.tap('Copy images', () => fse.copySync('./app/assets/images', './docs/assets/images'));
	}
}

// general cssConfig rules
const cssConfig = {
	// if ends with .css use these packages
	test: /\.css$/i,
	use: ['css-loader', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }],
};

// returns an array of all files in app folder -> filter return new array of .html files -> map use each webpack plugin for each html doc
let pages = fse
	.readdirSync('./app')
	.filter((file) => file.endsWith('.html'))
	.map((page) => {
		return new HtmlWebpackPlugin({
			filename: page,
			template: `./app/${page}`,
		});
	});

// shared config between dev and build will live here
const config = {
	// where to look and which file to process
	entry: './app/assets/scripts/App.js',
	plugins: pages,
	// tell webpack what to do when it runs into certain files
	module: {
		rules: [cssConfig],
	},
};

if (currentTask === 'dev') {
	// add style-loader for dev
	cssConfig.use.unshift('style-loader');

	config.output = {
		// change name of generated file
		filename: 'bundled.js',
		// path where to put bundled js file. Webpack requires absolute path which we generate
		path: path.resolve(__dirname, 'app'),
	};

	// update page without full reload
	config.devServer = {
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
	};

	config.mode = 'development';
}

if (currentTask === 'build') {
	// add js compiler to make our js backwards compatible
	config.module.rules.push({
		test: /\.js$/i,
		exclude: /(node_modules)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
			},
		},
	});

	// for build - extract css
	cssConfig.use.unshift(MiniCssExtractPlugin.loader);
	// leverage cssnano to compress css file
	postCSSPlugins.push(require('cssnano'));

	config.output = {
		// chunkhash changes everytime files are edited
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'docs'),
	};

	config.mode = 'production';

	// split main and vendor files
	config.optimization = {
		splitChunks: { chunks: 'all' },
	};

	// leverage plugins
	config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }), new RunAfterCompile());
}

module.exports = config;
