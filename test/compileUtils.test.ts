
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import path from "path";
import { jsOutFile, nearestNodeModules } from "../src/compileUtil";
import { exampleConfigFile } from "./loadTsConfig.test";

test("jsOutFile", () => {
  const cwd = path.resolve(process.cwd());
  jsOutFile(exampleConfigFile, "out").should.equal(path.join("out", cwd, "test", "example.config.js"));
});

test("nearestNodeModules", () => {
  const nodeModules = nearestNodeModules("test")!;
  const expectedPath = path.join(path.resolve(process.cwd()), "node_modules");
  nodeModules.should.equal(expectedPath);
});