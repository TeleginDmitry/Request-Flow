import type { Configuration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

export function buildDevServer({ port, paths }: BuildOptions): Configuration {
  return {
    static: paths.dist,
    compress: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    host: "localhost",
    devMiddleware: {
      writeToDisk: true,
    },
    port,
  };
}
