/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import { loadTsConfig, defaultOutDir } from "../src/loadTsConfig";
import { SomeConfig, someConfigUtil } from "./SomeConfig";
import rimraf from "rimraf";

test("loading a config file", () => {
  const configFile = "test/example.config.ts";
  const outDir = defaultOutDir(configFile);
  rimraf.sync(outDir);
  const conf = loadTsConfig<SomeConfig>(configFile)!;
  conf.foo!.should.eq(someConfigUtil());
  conf.bar!.should.deep.eq([1, 2, 3]);
});
