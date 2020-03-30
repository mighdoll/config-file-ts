import * as ts from "typescript";
import { Program, EmitResult } from "typescript";

export function tsCompile(fileNames: string[], options: ts.CompilerOptions): boolean {
  console.log("compiling:", fileNames);
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();
  logDiagnostics(program, emitResult);

  return !emitResult.emitSkipped;
}

function logDiagnostics(program: Program, emitResult: EmitResult): void {
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
}
