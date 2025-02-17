import type { Config } from "jest";

const config: Config = {
  rootDir: __dirname,
  testEnvironment: "jest-fixed-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@widgets/(.*)$": "<rootDir>/src/widgets/$1",
    "^@configs/(.*)$": "<rootDir>/src/configs/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@router/(.*)$": "<rootDir>/src/router/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@layouts/(.*)$": "<rootDir>/src/layouts/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@providers/(.*)$": "<rootDir>/src/providers/$1",
    "^@mytypes/(.*)$": "<rootDir>/src/mytypes/$1",
    "^@mocks/(.*)$": "<rootDir>/mocks/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default config;
