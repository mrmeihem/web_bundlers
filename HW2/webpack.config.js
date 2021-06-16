const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 1

module.exports = {
    watch: true,
    devServer: {
        port: 8000,
        historyApiFallback: true,
        hot: true,
    },
    entry: './src/main.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'main.[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "index.html")
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css' // 3
        }),
    ],
    module: {
        rules: [
            {
                test: /\.mp3$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
};