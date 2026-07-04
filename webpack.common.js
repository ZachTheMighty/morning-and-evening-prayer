import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    main: "./src/index.js",
    script: "./src/modules/morning_evening/script.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/modules/morning_evening/morning.html",
      filename: "morning.html",
      chunks: ["script"],
    }),

    new HtmlWebpackPlugin({
      template: "./src/modules/morning_evening/evening.html",
      filename: "evening.html",
      chunks: ["script"],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
