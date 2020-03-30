// import typescript from "@rollup/plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
// import { terser as rollupTerser } from "rollup-plugin-terser";

export default {
  input: "index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    typescript2(),
    // rollupTerser() // minify step. Comment this out to review bundle contents
  ],
  external: ["fs", "path", "events", "util", "assert", "typescript", "glob", "module"]
};
