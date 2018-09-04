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
            use: 'url-loader?limit=8000',
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, {
                loader: 'less-loader',
                options: {
                    modifyVars: {
                    },
                    javascriptEnabled: true,
                },
            }],
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    filename: 'vendor.[chunkhash:8].js',
                    chunks: 'initial',
                    test: /(react|react-dom|styled-components|react-router-dom|react-codemirror|react-redux|redux)/,
                },
                codemirror: {
                    test: /codemirror/
                }
            }
        },
        runtimeChunk: {
            name: `manifest.min`,
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: 'index.html'
        }),
    ],
}