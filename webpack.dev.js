const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, './'),
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})