/* eslint-disable @typescript-eslint/explicit-function-return-type */
import "chai/register-should";
import { loadTsConfig } from "../src/loadTsConfig";
import { SomeConfig, someConfigUtil } from "./SomeConfig";

test("test load", () => {
  const conf = loadTsConfig<SomeConfig>("test/example.config.ts")!;
  conf.foo!.should.eq(someConfigUtil());
  conf.bar!.should.deep.eq([1, 2, 3]);
});
