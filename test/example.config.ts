import os from "os";
import { SomeConfig, someConfigUtil } from "./SomeConfig";

export default {
  foo: someConfigUtil(),
  bar: [1, 2, 3],
  driver: os.userInfo().username
} as SomeConfig;
