import webpack from "webpack";
import { BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import path from "path";

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { isDev, mode, paths } = options;

  return {
    mode,
    cache: {
      type: "filesystem",
    },
    stats: "minimal",
    devtool: "eval-cheap-module-source-map",
    entry: path.join(paths.src, "index.tsx"),
    watch: isDev,
    output: {
      filename: "bundle.js",
      path: paths.dist,
      clean: true,
      publicPath: "./",
      assetModuleFilename: "assets/",
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
