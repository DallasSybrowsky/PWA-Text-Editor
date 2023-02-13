const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        short_name: "Manifest",
        name: "JATE Manifest",
        start_url: "/",
        icons: [
          {
            src: path.resolve("/assets/images/logo.png"),
            sizes: [96, 128, 192, 512],
            destination: path.join("assets", "icons"),
          },
        ],
        orientation: "portrait",
        display: "standalone",
        description: "Just Another Text Editor: one more way to edit text.",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
