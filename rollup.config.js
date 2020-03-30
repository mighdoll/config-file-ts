import typescript2 from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    typescript2()
  ],
  external: ["fs", "path", "events", "util", "assert", "typescript", "glob", "module"]
};
