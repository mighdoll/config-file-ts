/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { rimrafSync } from "rimraf";
import { expect, test } from "vitest";
import { _withCompileCount } from "../src/compileUtil.ts";
import { defaultOutDir, loadTsConfig } from "../src/loadTsConfig";
import { SomeConfig, someConfigUtil } from "./SomeConfig";

export const exampleConfigFile = "test/example.config.ts";

test("loading a config file", () => {
  const outDir = defaultOutDir(exampleConfigFile);
  rimrafSync(outDir);
  const conf = loadTsConfig<SomeConfig>(exampleConfigFile)!;
  expect(conf.foo).eq(someConfigUtil());
  expect(conf.bar).deep.eq([1, 2, 3]);
});

test("loading a config file twice does not recompile", () => {
  const outDir = defaultOutDir(exampleConfigFile);
  rimrafSync(outDir);
  const compiles = _withCompileCount(() => {
    loadTsConfig(exampleConfigFile);
    loadTsConfig(exampleConfigFile);
  });
  expect(compiles).eq(1);
});
