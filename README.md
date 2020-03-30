## config-ts
*Why use Typescript for configuration files?*
####

Typescript is more syntactically **flexible** than JSON. Comments are allowed. Keys needn't be quoted. 
Arrays can have trailing commas.

Typescript allows **light programming** in config files. Share variables, use utility functions, etc.

**Types** provide free error checking, and free IDE support for getting config files right.

### Fast
Parsing typescript config files is plenty quick, especially because config-ts caches the typescript compile. 

### how to use
```bash
$ yarn add config-ts
```

A config file can be just static, like json, ```myConfig.ts```:
```ts
export default {
  foo: "whoo" // nice!
};
````

And then read in the config file like so:
```ts
export interface MyConfig {
  foo?: string;
}

const config = loadTsConfig<MyConfig>("myConfig.ts");
```

