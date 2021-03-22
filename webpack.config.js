const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: { contentBase: path.join(__dirname, "src") },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|woff(2)?|ttf|eot)$/,
                use: ["file-loader"]
            },
            // {
            //     test: /\.html$/,
            //     use: 'html-loader',
            // },
        ],
    },
    optimization: {
        splitChunks: { chunks: "all" }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
        patterns: [
            {
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'build/assets'),
            },
        ],
        }),
        new MiniCssExtractPlugin({
        filename: '[name].css',
        }),
        new ESLintPlugin(),
    ],
    output: { path: path.join(__dirname, "build"), filename: "[name].js" },
};
