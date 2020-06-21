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
		login: './src/login.js',
		index: './src/index.js',
		album: './src/album.js',
		search: './src/search.js',
	},

	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
		// publicPath: isProd ? '/Photobooks/' : '',
	},

	devServer: {
		port: 4200,
		stats: 'errors-only',
		index: 'login.html',
		// openPage: '',
		historyApiFallback: true,
		noInfo: false,
		overlay: true,
		// hot: isDev,
	},

	plugins: [

	    // ...PAGES.map((page) => new HtmlWebpackPlugin({
	    //   template: `${PAGES_DIR}/${page}`,
	    //   filename: `./${page}`,
	    //   inject: true,
	    // })),

		new HTMLWebpackPlugin({ 
			template: 'src/markup/index.html',
			filename: 'index.html',
			chunks: ['index'],
		 }),
		new HTMLWebpackPlugin({ 
			template: 'src/markup/login.html',
			filename: 'login.html',
			chunks: ['login'],
		}),
		new HTMLWebpackPlugin({ 
			template: 'src/markup/album.html',			
			filename: 'album.html',
			chunks: ['album'],
		}),
		new HTMLWebpackPlugin({ 
			template: 'src/markup/search.html',			
			filename: 'search.html',
			chunks: ['search'],
		}),


		new CleanWebpackPlugin(),


		new CopyWebpackPlugin({
			patterns: [
				{ 	
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist') 
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
			test: /\.s[ac]ss$/,
			use: [
				// isDev ? 'vue-style-loader' :
				{
					loader: MiniCssExtractPlugin.loader, 
					options: {
						// hmr: isDev,
						// reloadAll: true
					},
				},

				{loader: 'css-loader'},
				{loader: 'resolve-url-loader'},
				{loader: 'sass-loader'},

			]
		},

		{
			test: /\.(png|jpg|svg|gif)$/,
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
				name: 'fonts/[name].[ext]',
			},				
		},

		{	
			// test: /\.vue$/,
			// loader: "vue-loader"
		},

		]
	}
}