import glob from "glob";
import path from "path";
import { tsCompile } from "./tsCompile";
import ts from "typescript";
import fs from "fs";

/** return true if any files need compiling */
export function needsCompile(srcGlobs: string[], outDir: string): boolean {
  const files = srcGlobs.flatMap(src => glob.sync(src));
  const srcDestPairs = compilationPairs(files, outDir);
  return anyOutDated(srcDestPairs);
}

/** Return true if all files exist on the filesystem */
export function expectFilesExist(files: string[]): boolean {
  const missing = files.find(file => !fs.existsSync(file));
  if (missing) {
    console.error(`file ${missing} not found`);
    return false;
  }
  return true;
}

export function jsOutFile(tsFile: string, outDir: string): string {
  const outFile = changeSuffix(tsFile, ".js");
  return path.join(outDir, outFile);
}

export function compileIfNecessary(sources: string[], outDir: string): boolean {
  if (needsCompile(sources, outDir)) {
    return tsCompile(sources, {
      outDir,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      skipLibCheck: true,
      strict: true,
      target: ts.ScriptTarget.ES2019,
      noEmitOnError: true
    });
  }
  return true;
}

/**
 * Compile a typescript config file to js if necessary (if the js
 * file doesn't exist or is older than the typescript file).
 *
 * @param tsFile path to ts config file
 * @param outDir directory to place the compiled js file
 * @returns the path to the compiled javascript config file,
 *   or undefined if the compilation fails.
 */
export function compileConfigIfNecessary(tsFile: string, outDir: string): string | undefined {
  if (!fs.existsSync(tsFile)) {
    console.error("config file:", tsFile, " not found");
    return undefined;
  }

  const success = compileIfNecessary([tsFile], outDir);
  if (!success) {
    return undefined;
  }

  const jsFile = changeSuffix(tsFile, ".js");
  const jsFilePath = path.join(outDir, jsFile);
  return jsFilePath;
}

function compilationPairs(srcFiles: string[], outDir: string): [string, string][] {
  return srcFiles.map(tsFile => {
    return [tsFile, jsOutFile(tsFile, outDir)];
  });
}

function anyOutDated(filePairs: [string, string][]): boolean {
  const found = filePairs.find(([srcPath, outPath]) => {
    if (!fs.existsSync(outPath)) {
      return true;
    }
    const srcTime = fs.statSync(srcPath).mtime;
    const outTime = fs.statSync(outPath).mtime;
    return srcTime > outTime;
  });

  return found !== undefined;
}

function changeSuffix(filePath: string, suffix: string): string {
  const dir = path.dirname(filePath);
  const curSuffix = path.extname(filePath);
  const base = path.basename(filePath, curSuffix);
  return path.join(dir, base + suffix);
}
