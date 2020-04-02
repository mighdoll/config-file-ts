/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import rimraf from "rimraf";
import { defaultOutDir, loadTsConfig } from "../src/loadTsConfig";
import { SomeConfig, someConfigUtil } from "./SomeConfig";

export const exampleConfigFile = "test/example.config.ts";

test("loading a config file", () => {
  const outDir = defaultOutDir(exampleConfigFile);
  rimraf.sync(outDir);
  const conf = loadTsConfig<SomeConfig>(exampleConfigFile)!;
  conf.foo!.should.eq(someConfigUtil());
  conf.bar!.should.deep.eq([1, 2, 3]);
});

