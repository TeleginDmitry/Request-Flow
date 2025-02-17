import path from "path";
import webpack from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers({
  paths,
}: BuildOptions): webpack.ResolveOptions {
  return {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".css"],
    alias: {
      "@assets": path.join(paths.src, "assets"),
      "@components": path.join(paths.src, "components"),
      "@contexts": path.join(paths.src, "contexts"),
      "@pages": path.join(paths.src, "pages"),
      "@services": path.join(paths.src, "services"),
      "@widgets": path.join(paths.src, "widgets"),
      "@utils": path.join(paths.src, "utils"),
      "@layouts": path.join(paths.src, "layouts"),
      "@configs": path.join(paths.src, "configs"),
      "@router": path.join(paths.src, "router"),
      "@hooks": path.join(paths.src, "hooks"),
      "@store": path.join(paths.src, "store"),
      "@providers": path.join(paths.src, "providers"),
      "@mytypes": path.join(paths.src, "mytypes"),
    },
  };
}
