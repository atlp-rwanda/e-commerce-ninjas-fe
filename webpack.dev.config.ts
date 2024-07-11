/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'public',
              outputPath: 'assets/images/',
              publicPath: '/assets/images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '', globOptions: { ignore: ['**/index.html'] } },
      ],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 5000,
    open: true,
    hot: true,
  },
};

export default config;