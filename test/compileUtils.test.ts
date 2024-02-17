/* eslint-disable @typescript-eslint/explicit-function-return-type */
import path from "path";
import fs from "fs";
import {
  jsOutFile,
  nearestNodeModules,
  symLinkForce,
} from "../src/compileUtil";
import { exampleConfigFile } from "./loadTsConfig.test";
import { test, expect } from "vitest";

test("jsOutFile", () => {
  const cwd = path.resolve(process.cwd());
  const outFile = jsOutFile(exampleConfigFile, "out");
  const expected = path.join("out", cwd, "test", "example.config.js");
  expect(outFile).toEqual(expected);
});

test("nearestNodeModules", () => {
  const nodeModules = nearestNodeModules("test")!;
  const expectedPath = path.join(path.resolve(process.cwd()), "node_modules");
  expect(nodeModules).eq(expectedPath);
});

test("symLinkForce deletes if necessary", () => {
  const link = "/tmp/symLinkTest";
  safeDelete();
  try {
    expect(fs.existsSync(link)).false;
    symLinkForce("/", link);
    symLinkForce("/", link);
    expect(fs.existsSync(link)).true;
    expect(fs.lstatSync(link).isSymbolicLink()).true;
  } finally {
    safeDelete();
  }

  function safeDelete() {
    if (fs.existsSync(link)) {
      fs.unlinkSync(link);
    }
  }
});
