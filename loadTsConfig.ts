import { compileConfigIfNecessary } from "./compileUtil";
import Module from "module";
import fs from "fs";

/** Load a typescript configuration file.
 * For speed, the typescript file is transpiled to javascript and cached.
 *
 * @param T type of default export value in the configuration file
 * @param outDir location to store the compiled javascript.
 * @returns the default exported value from the configuration file or undefined
 */
export function loadTsConfig<T>(tsFile: string, outDir: string): T | undefined {
  const jsConfig = compileConfigIfNecessary(tsFile, outDir);
  if (!jsConfig) {
    return undefined;
  }

  // const pathToConfig = ("./"+ jsConfig);
  // const config = require(pathToConfig); // this fails, not sure why.
  // return config.default;

  const configText = fs.readFileSync(jsConfig, { encoding: "utf8" });
  const config = loadJsModule(configText);
  return config.default;
}

function loadJsModule(code: string): any {
  const module = new Module("");
  (module as any)._compile(code, "");
  return module.exports;
}
