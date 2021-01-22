const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV === "development";
const outputDir = process.env.OUTPUT_DIR || "dist";

const MAIN_ENTRY_NAME = "main";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    [MAIN_ENTRY_NAME]: "./src/index.tsx",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    hot: false,
    hotOnly: false,
    liveReload: false,
    historyApiFallback: true,
    https: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: [MAIN_ENTRY_NAME],
      template: "src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new Dotenv({
      defaults: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, outputDir),
    publicPath: "/",
  },
};
