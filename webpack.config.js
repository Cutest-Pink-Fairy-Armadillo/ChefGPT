const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// var PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/client/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    proxy: {
      "/api/**": "http://localhost:3000",
      "/build/**": "http://localhost:3000",
    },
    port: 8080,
    static: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    // new PrettierPlugin({
    //   printWidth: 80,               // Specify the length of line that the printer will wrap on.
    //   tabWidth: 2,                  // Specify the number of spaces per indentation-level.
    //   useTabs: false,               // Indent lines with tabs instead of spaces.
    //   semi: true,                   // Print semicolons at the ends of statements.
    //   encoding: 'utf-8',            // Which encoding scheme to use on files
    //   extensions: [ ".js", ".ts" ]  // Which file extensions to process
    // })
  ],
};
