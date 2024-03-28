/* eslint-disable @typescript-eslint/explicit-function-return-type */
import fs from "fs";
import os from "os";
import path from "path";
import { expect, test } from "vitest";
import {
  jsOutFile,
  nearestNodeModules,
  symLinkForce,
} from "../src/compileUtil";

test("jsOutFile (windows)", () => {
  if (os.platform() !== "win32") return;

  const cacheDir = "C:\\Users\\lee\\.cache\\";
  const outFile = jsOutFile("test\\example.config.ts", cacheDir);
  const expected = `C:\\Users\\lee\\.cache\\Users\\lee\\config-file-ts\\test\\example.config.js`;
  expect(outFile).toEqual(expected);
});

test("jsOutFile (non-windows)", () => {
  if (os.platform() === "win32") return;

  const cwd = path.resolve(process.cwd());
  const outFile = jsOutFile("test/example.config.ts", "out");
  expect(outFile).equal(
    path.join("out", cwd, "test", "example.config.js")
  );
});

test("nearestNodeModules", () => {
  const nodeModules = nearestNodeModules("test")!;
  const expectedPath = path.join(path.resolve(process.cwd()), "node_modules");
  expect(nodeModules).eq(expectedPath);
});

test("symLinkForce deletes if necessary", () => {
  const tempDir = fs.mkdtempSync("symLinkTest");
  const link = path.join(tempDir, "link");
  try {
    expect(fs.existsSync(link)).false;
    symLinkForce("/", link);
    symLinkForce("/", link);
    expect(fs.existsSync(link)).true;
    expect(fs.lstatSync(link).isSymbolicLink()).true;
  } finally {
    fs.rmSync(tempDir, { recursive: true });
  }
});
