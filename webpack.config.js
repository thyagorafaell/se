var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', path.normalize(__dirname + '/src/js/main')],
    devtool: 'nosources-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'js')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'css')]
            }
        ]
    },
  	plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
  	]
};
