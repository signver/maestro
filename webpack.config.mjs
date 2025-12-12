import path from "node:path";
import { cwd } from "node:process";

const projectPath = cwd();

/** @type {import("webpack").Configuration} */
const baseConfig = {
  experiments: { outputModule: true },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.[cm]?[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-typescript"],
              ["@babel/preset-react"],
            ],
          },
        },
      },
    ],
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

const distOutputs = [
  {
    ...baseConfig,
    entry: "./src/index.ts",
    output: {
      ...baseConfig.output,
      filename: "index.mjs",
      library: {
        type: "module",
      },
      path: path.resolve(projectPath, "dist/maestro/mjs"),
    },
  },
  {
    ...baseConfig,
    entry: "./src/index.ts",
    output: {
      ...baseConfig.output,
      filename: "index.cjs",
      library: {
        name: "maestro",
        type: "commonjs",
      },
      path: path.resolve(projectPath, "dist/maestro/cjs"),
    },
  },
];

/** @type {Array<import("webpack").Configuration>} */
export default [...distOutputs];
