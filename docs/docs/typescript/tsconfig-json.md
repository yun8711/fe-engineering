---
outline: deep

---

<h1>tsconfig.json</h1><p>v5.2（2023.08.26）</p>

[官网](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html) | [中文网](https://www.tslang.cn/docs/handbook/tsconfig-json.html) | [配置项列表](https://www.typescriptlang.org/tsconfig) | [官方推荐配置](https://github.com/tsconfig/bases/) | [json scheme](http://json.schemastore.org/tsconfig)

## 概述

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是TypeScript项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项

官方推出了一些基本配置示例 [github.com/tsconfig/bases](https://github.com/tsconfig/bases/) ，可以通过扩展这些已经处理过不同的 JavaScript 运行时环境的 `tsconfig.json` 文件来简化你项目中的 `tsconfig.json`。

如果你的项目是基于 Node.js 12.x 写的，那么你可以使用 npm 模块：[`@tsconfig/node12`](https://www.npmjs.com/package/@tsconfig/node12)：

```json
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "preserveConstEnums": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```



## extends

一个字符串，其中包含要继承的另一个配置文件的路径，路径可以使用Node.js风格的解析。

首先加载被继承的配置，然后当前配置会覆盖继承的配置。

除 references 外均可以被继承，但是不允许配置文件之间的循环。



## compilerOptions

### Projects - 项目配置

### Language and Environment - 语言和环境

#### target - 编译目标

设置编译后要兼容的 JavaScript 版本，可选值包括 es3、es5、es6/es2015、es2016~es2022、esnext（表示当前 TypeScript 支持的最高版本）等。

现代浏览器支持全部 ES6 的功能，如果没有特殊需要，推荐设置为 `"es2018"`，一个对常用语法支持较为全面的版本

target 配置会影响 js 特性是否被降级，例如，如果 `target` 是 ES5 或更低版本，箭头函数 `() => this` 会被转换为等价的 `函数` 表达式。

如果只使用 Nodejs，应该基于 node 版本设置 target，可以通过 [node.green](https://node.green/) 的支持数据库查询相应的版本，推荐：

| 名称    | 支持的编译目标 |
| :------ | :------------- |
| Node 8  | `ES2017`       |
| Node 10 | `ES2018`       |
| Node 12 | `ES2019`       |

target 的配置会改变 lib 选项的默认值



### Modules - 模块

#### module - 模块标准

*参考 [模块](https://www.typescriptlang.org/docs/handbook/modules.html)*

指定构建产物使用的模块标准，可选值有：none、commonjs、amd、umd、system、es6/es2015、es2020、es2022、esnext、node16、nodenext

target 为 es3/es5 时，默认值为 commonjs，

TypeScript 会随着版本更新新增可用的 module 选项，如：

- 在 4.5 版本新增了 `es2022` 配置，支持了 Top-Level Await 语法。
- 在 4.7 版本新增了 `node16` 和 `nodenext` 两个 module 配置，使用这两个配置意味着你构建的 npm 包或者代码仅在 node 环境下运行，因此 TypeScript 会对应地启用对 Node ESM 的支持



相关配置项：moduleResolution、esModuleInterop、allowImportingTsExter、allowArbitraryExtensi、resolveJsonModule



#### moduleResolution - 模块解析

*参考 [模块解析](https://www.typescriptlang.org/docs/handbook/module-resolution.html)*

指定 TypeScript 模块解析策略：

- 在 ts 1.6 之前，使用 classic
- 如果 module 为 amd、umd、system、es6/es2015，默认为 classic
- 一般情况下，使用 node



### JavaScript Support - js支持



### Emit

#### outDir - 输出目录

构建产物的输出目录，会按照原来的目录结构输出。

如果没有指定，则编译后的 js 文件与 ts 文件在相同目录中；如果指定了，则编译后的 js（以及 `.d.ts`, `.js.map` 等）将会被生成到这个目录下，源文件的目录将会被保留。



### Interop Constraints 互操作约束

#### allowSyntheticDefaultImports - 允许合成默认导入

当设置为 true， 并且模块**没有**显式指定默认导出时

如果不为 true：

```js
// 这是一个文件 utilFunctions.js
const getStringLength = (str) => str.length;
 
module.exports = {
  getStringLength,
};
```

当上面的文件被导入时，

```js
import utils from "./utilFunctions";
 
const count = utils.getStringLength("Check JS");
```

编辑器会报错：`Module '"/home/runner/work/TypeScript-Website/TypeScript-Website/utilFunctions"' has no default export.`，因为没有“default”对象可以导入

本选项不会影响 TypeScript 生成的 JavaScript，它仅对类型检查起作用



#### esModuleInterop - es 模块互操作性

默认情况下（未设置 `esModuleInterop` 或值为 false），TypeScript 像 ES6 模块一样对待 CommonJS/AMD/UMD。

**一般设置为 true**，同时会启用 allowSyntheticDefaultImports



#### forceConsistentCasingInFileNames - 文件系统大小写

是否区分文件系统大小写规则，默认 false，即不区分大小写



### Type Checking 类型检查



### Completeness 完整性



## ts-node



## vueCompilerOptions

