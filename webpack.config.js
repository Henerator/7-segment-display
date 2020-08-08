const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/script.ts',
    output: {
        filename: 'script-[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/index.html',
                    to: './index.html'
                },
                {
                    from: 'src/style.css',
                    to: './style.css'
                },
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        })
    ],
    devServer: {
        contentBase: 'dist',
        compress: true,
        port: 3000,
        open: true
    },
};