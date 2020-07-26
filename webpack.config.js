const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isDev = process.env.NODE_env === 'development';
const isProd = !isDev;


const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		},
	}

	if (isProd) {
		config.minimizer = [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}

	return config;
}

module.exports = {

	entry: {
		index: './src/index.js',
	},

	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
		// publicPath: isProd ? '/Photobooks/' : '',
	},

	devServer: {
		port: 4300,
		stats: 'errors-only',
		
		// openPage: '',
		historyApiFallback: true,
		noInfo: false,
		overlay: true,
	},

	plugins: [


		new HTMLWebpackPlugin({ 
			template: 'src/markup/index.html',
			filename: 'index.html',
			// chunks: ['index'],
		 }),

		new CleanWebpackPlugin(),

		new SpriteLoaderPlugin({ plainSprite: true }),

		new VueLoaderPlugin(),

		new CopyWebpackPlugin({
			patterns: [
				{ 	
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist') 
				},
				{ 	
					from: path.resolve(__dirname, 'src/fonts/'),
					to: path.resolve(__dirname, 'dist/fonts/') 
				},
			],
		}),


		new MiniCssExtractPlugin({
			filename: 'style/[name].[contenthash].css',
		}),
	],

	module: {
		rules: [
		{
			test: /\.(p|post|)css$/,
			use: [
				isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 
				'css-loader',
				'postcss-loader'
			]
		},

		{
			test: /\.vue$/,
			loader: 'vue-loader'
		},

		{
			test: /\.(png|jpg|gif|svg)$/,
			exclude: [
				path.resolve(__dirname, 'src/fonts/'),
			],

			loader: 'file-loader',
			options: {
				name: 'img/[name].[ext]',
			},
		},

		{
			test: /\.(ttf|eot|svg|woff|woff2)$/,
			include: [
				path.resolve(__dirname, 'src/fonts/'),
			],
			loader: 'file-loader',
			options: {

				name: '../fonts/[name]/[name].[ext]',
				// name: isProd ? '../fonts/[name]/[name].[ext]' : '../../../fonts/[name]/[name].[ext]',

			},
		},

		]
	}
}