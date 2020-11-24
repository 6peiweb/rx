const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js',
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3001,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
							],
						},
					},
				],
				exclude: [
					path.resolve(__dirname, './node_modules'),
				],
			},
			{
					test: /\.css$/,
					use: ['style-loader','css-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
				loader: 'file-loader',
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './index.html'),
		}),
		new CleanWebpackPlugin(),
	],
}
