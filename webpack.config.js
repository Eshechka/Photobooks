const path = require('path');
const webpack = require("webpack");

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
			new OptimizeCSSAssetsPlugin(),
			new TerserPlugin()
		]
	}

	return config;
}

module.exports = {

	entry: {
		login: './src/login.js',
		index: './src/index.js',
		album: './src/album.js',
		search: './src/search.js',
	},

	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: isProd ? '/Photobooks/' : '',
	},

	devServer: {
		port: 4200,
		stats: 'errors-only',
		index: 'UIKit.html',
		openPage: '',
		historyApiFallback: true,
		noInfo: false,
		overlay: true,
		hot: isDev,
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
		}),


		new CleanWebpackPlugin(),


		new CopyWebpackPlugin({
			patterns: [
				{ 	from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist') },
		      ],
		    }),


		new MiniCssExtractPlugin({
			filename: 'style.[hash].css',
		}),
	],

	module: {
		rules: [
		{
			test: /\.(s)css$/,
			use: [
			// isDev ? 'vue-style-loader' :
			{
				loader: MiniCssExtractPlugin.loader, 
				options: {
					hmr: isDev,
					reloadAll: true,
				},
			},

			'css-loader', 
			'sass-loader'
			]
		},

		{
			test: /\.(png|jpg|svg|gif)$/,
			use: ['file-loader']	
		},

		{
			test: /\.(ttf|eot|svg|woff|woff2)$/,
			include: [
				path.resolve(__dirname, 'src/fonts/'),
			],
			use: ['file-loader']	
		},

		{	
			// test: /\.vue$/,
			// loader: "vue-loader"
		},

		]
	}
}