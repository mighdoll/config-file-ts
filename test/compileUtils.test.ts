/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import path from "path";
import fs from "fs";
import {
  jsOutFile,
  nearestNodeModules,
  symLinkForce
} from "../src/compileUtil";
import { exampleConfigFile } from "./loadTsConfig.test";

test("jsOutFile", () => {
  const cwd = path.resolve(process.cwd());
  jsOutFile(exampleConfigFile, "out").should.equal(
    path.join("out", cwd, "test", "example.config.js")
  );
});

test("nearestNodeModules", () => {
  const nodeModules = nearestNodeModules("test")!;
  const expectedPath = path.join(path.resolve(process.cwd()), "node_modules");
  nodeModules.should.equal(expectedPath);
});

test("symLinkForce deletes if necessary", () => {
  const link = "/tmp/symLinkTest";
  safeDelete();
  try {
    fs.existsSync(link).should.be.false;
    symLinkForce("/", link);
    symLinkForce("/", link);
    fs.existsSync(link).should.be.true;
    fs.lstatSync(link).isSymbolicLink().should.be.true;
  } finally {
    safeDelete();
  }

  function safeDelete() {
    if (fs.existsSync(link)) {
      fs.unlinkSync(link);
    }
  }
});
