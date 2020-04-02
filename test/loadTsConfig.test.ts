/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import { loadTsConfig, defaultOutDir } from "../src/loadTsConfig";
import { SomeConfig, someConfigUtil } from "./SomeConfig";
import rimraf from "rimraf";
import { jsOutFile } from "../src/compileUtil";
import path from "path";

const configFile = "test/example.config.ts";

test("loading a config file", () => {
  const outDir = defaultOutDir(configFile);
  rimraf.sync(outDir);
  const conf = loadTsConfig<SomeConfig>(configFile)!;
  conf.foo!.should.eq(someConfigUtil());
  conf.bar!.should.deep.eq([1, 2, 3]);
});


test("jsOutFile", () => {
  const cwd = path.resolve(process.cwd());
  jsOutFile(configFile, "out").should.equal(path.join("out", cwd, "test", "example.config.js"));
});