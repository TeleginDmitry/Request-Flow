import webpack from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  return [
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
    {
      test: /\.(ts|tsx)?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.((c|sa|sc)ss)$/i,
      use: [
        isDev
          ? "style-loader"
          : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
              },
            },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            esModule: true,
            modules: {
              localIdentName: isDev
                ? "[path][name]__[local]--[hash:base64:5]"
                : "[hash:base64:8]",
            },
          },
        },
        {
          loader: "postcss-loader",
        },
      ],
    },

    {
      test: /\.(png|jpg|jpeg|gif|webp)$/,
      type: "asset/resource",
      generator: {
        filename: "images/[name][hash][ext]",
      },
    },
    {
      test: /\.svg$/,
      type: "asset/resource",
      generator: {
        filename: "icons/[name][hash][ext]",
      },
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
      generator: {
        filename: "fonts/[name][hash][ext]",
      },
    },
  ];
}
