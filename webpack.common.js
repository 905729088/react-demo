const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: [path.join(__dirname, './src/main.js')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    module: {
        rules: [{
                test: /.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|jpg|gif|webm|mp4)$/,
                use: 'url-loader?limit=8000000',
            },

        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendors: {
                    filename: 'vendor.[chunkhash:8].js',
                    chunks: 'initial',
                    test: /(react|react-dom|styled-components|react-router|react-router-dom|react-codemirror|react-redux|redux)/,
                }
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html'
        }),
    ],
}