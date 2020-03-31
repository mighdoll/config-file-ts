export interface SomeConfig {
  foo?: string;
  bar?: number[];
  driver?: string;
}

export function someConfigUtil(): string {
  return "util";
}
