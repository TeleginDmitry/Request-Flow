export type BuildMode = "production" | "development";

export interface BuildPaths {
  dist: string;
  src: string;
  public: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
}
