const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: isProd ? "js/[name].[contenthash].js" : "js/[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    devtool: isProd ? "source-map" : "eval-source-map",
    devServer: {
      port: 3000,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, "src"),
      },
    },
    optimization: {
      minimize: isProd,
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: isProd
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: !isProd,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProd,
                implementation: require("sass"),
                sassOptions: {
                  fiber: false,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: !isProd,
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][ext]",
          },
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
