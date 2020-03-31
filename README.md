## config-ts
*Why use Typescript for configuration files?*
####

Typescript is more syntactically **flexible** than JSON. Comments are allowed. Keys needn't be quoted. 
Arrays can have trailing commas.

Typescript allows **light programming** in config files. Share variables, use utility functions, etc.

Typescript **Types** provide free error checking, and free IDE support for getting config files right.

### Fast
Parsing typescript config files is plenty quick, especially because config-ts caches the typescript compile. 

### how to use
```bash
$ yarn add config-ts
```

In the config file, export the config as default. ```myConfig.ts```:
```ts
export default {
  entry: "my stuff" // comments are welcome!
};
````


Or add some types and scripting. ```myConfig.ts```:
```ts
import os from "os";

export default {
  entry: `${os.userInfo().username}'s stuff`  // use code in the config
} as MyConfig;  // typecheck the config
````


And then read in the config file like so:
```ts
export interface MyConfig {
  entry?: string;
}

const config = loadTsConfig<MyConfig>("myConfig.ts");
```

