import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";

const webpackConfig = (env: BuildEnv) => {
  const mode = env.mode || "development";

  const isDev = mode === "development";

  const port = env.port || 3000;

  const paths: BuildPaths = {
    dist: path.resolve(__dirname, "dist"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config = buildWebpackConfig({
    isDev,
    mode,
    paths,
    port,
  });

  return config;
};

export default webpackConfig;
