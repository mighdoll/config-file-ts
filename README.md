## config-file-ts
*Just use Typescript for configuration files*
####

Typescript is more syntactically **flexible** than JSON. Comments are allowed. Keys needn't be quoted. 
Arrays can have trailing commas.

Typescript allows **light programming** in config files. Share variables, use utility functions, etc.

Typescript **Types** provide free error checking, and free IDE support for getting config files right.

### Fast
Parsing typescript config files is plenty quick. config-file-ts caches the typescript output. 

### How to use
```bash
$ yarn add config-file-ts
```

In the config file, export default. ```my.config.ts```:
```ts
export default {
  entry: "my stuff" // comments are welcome!
};
````


Feel free to add types and scripting. ```my.config.ts```:
```ts
import os from "os";
import { MyConfig } from "./MyProgram";

export default {
  entry: `${os.userInfo().username}'s stuff`  // use scripting in the config file
} as MyConfig;                                // typecheck the config file
````

Read the config file from your program. ```MyProgram.ts```:
```ts
export interface MyConfig {
  entry?: string;
}

const config = loadTsConfig<MyConfig>("my.config.ts");
```
