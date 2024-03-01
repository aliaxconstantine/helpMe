const { VueLoaderPlugin } = require("vue-loader");

const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "main.ts",
  },

  devServer: {
    inline: false,
    port: 4001,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 匹配以 .ts 或 .tsx 结尾的文件
        use: 'ts-loader', // 使用 ts-loader 加载器处理这些文件
      },
      {
        test: /\.vue$/, // 匹配以 .vue 结尾的文件
        use: 'vue-loader', // 使用 vue-loader 加载器处理这些文件
      },
      // 添加其他加载器规则...
    ],
  },
  resolve: {  //文件扩展名需要添加ts
    extensions: ['.ts', '.js'],
  },
  plugins: [new VueLoaderPlugin()],
};
