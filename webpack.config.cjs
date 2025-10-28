const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.frontend.json',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // limpa dist a cada build
  },
  plugins: [
    // Copia e injeta o index.html na pasta dist
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // Gera o CSS final
    new MiniCssExtractPlugin({
      filename: 'output.css',
    }),
    // Copia suas imagens
    new CopyWebpackPlugin({
      patterns: [
        { from: 'frontend/assets/img', to: 'img' },
      ],
    }),
  ],
};
