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



## references - 项目引用

ts 在 3.0 时推出了 references 功能，用来将一个较大的项目切分成若干个较小的项目，强制实施组件之间的逻辑分离，每个项目有不同的 ts 配置。可以大大缩短构建时间、和IDE的交互时间，并以新的和改进的方式组织代码。

<br />

以 [element-plus](https://github.com/element-plus/element-plus) 项目为例，整体采用了 monorepo 方式管理仓库，其中包含若干个子项目：

- internal/eslint-config：用来配置主项目的 eslint，采用 js 编写，一个配置文件
- internal/*：组件库构建相关子项目，只在开发阶段的 nodejs 环境下运行
- play：一个在开发阶段运行的示例项目
- ssr-testing：一个ssr 测试项目
- 还有其他不同功能的目录和文件模块

如果只能在项目中编写一份 tsconfig.json 文件，那么很难满足整个项目在不同运行环境下的配置需求。所以 element-plus 使用了 references 来对不同的子项目、目录、文件分别提供相应的配置，通过 extends 和 include 指定了作用的目录和文件，最后通过 references 整体引入，这样就很好的划分了项目，减化的配置难度。

- tsconfig.base.json：基础配置

- tsconfig.node.json：继承 tsconfig.base.json，配置了针对 node 环境下的 compilerOptions，

- tsconfig.web.json：继承 tsconfig.base.json，配置了针对 web 项目的 compilerOptions

- tsconfig.play.json：继承 tsconfig.web.json，

- tsconfig.vite-config.json：继承 tsconfig.node.json，只作用于组件文档子项目

- tsconfig.vitest.json：继承tsconfig.web.json，主要针对 vitest 测试

- tsconfig.json：通过 references 将其他几个配置全部引入

  ```json
  {
    "references": [
      { "path": "./tsconfig.web.json" },
      { "path": "./tsconfig.play.json" },
      { "path": "./tsconfig.node.json" },
      { "path": "./tsconfig.vite-config.json" },
      { "path": "./tsconfig.vitest.json" }
    ]
  }
  ```

  

可以看出，extents 可以减化配置，减少配置文件的体积，include 和 exclude 两个属性指定了不同的配置作用的目录和文件，相当于指定了当前配置文件的作用域



## extends

一个字符串，其中包含要继承的另一个配置文件的路径，路径可以使用Node.js风格的解析。

首先加载被继承的配置，然后当前配置会覆盖继承来的相同配置。

除 references 外均可以被继承，但是不允许配置文件之间的循环引用。



## compilerOptions

### Projects 项目配置

#### composite

属于 compilerOptions 内部的配置，在 Project References 的被引用子项目 `tsconfig.json` 中必须为启用状态，它通过一系列额外的配置项，确保你的子项目能被 Project References 引用，而在子项目中必须启用 declaration ，必须通过 files 或 includes 声明子项目内需要包含的文件等。



### Language and Environment 语言和环境

#### target - 编译目标

设置编译后要兼容的 JavaScript 版本，可选值包括 es3、es5、es6/es2015、es2016~es2022、esnext（表示当前 TypeScript 支持的最高版本）等。

target 配置会影响 js 特性是否被降级，例如，如果 `target` 是 ES5 或更低版本，箭头函数 `() => this` 会被转换为等价的 `函数` 表达式。

现代浏览器已支持全部 ES6 的功能，没有特殊需要，推荐设置为 `"es2018"`，这个版本对常用语法支持较为全面

如果只使用 Nodejs，应该基于 node 版本设置 target，可以通过 [node.green](https://node.green/) 的支持数据库查询相应的版本，推荐：

| 名称    | 支持的编译目标 |
| :------ | :------------- |
| Node 8  | `ES2017`       |
| Node 10 | `ES2018`       |
| Node 12 | `ES2019`       |

ES各版本特性：

![f7523d1038d1436d4755591f411dbb68.png](../../images/f7523d1038d1436d4755591f411dbb68.png)

target 的配置会改变 lib 选项的默认值，而 lib 决定了能否使用某个版本的语法特性，以 replaceAll 为例，如果在项目中直接使用，会给出一个错误提示：***属性“replaceAll”在类型“"linbudu"”上不存在。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2021”或更高版本***。解决此问题，可以在配置 lib 中包含 `"es2021"` 或者 `"es2021.String"`



#### lib

TypeScript 会自动加载内置的 `lib.d.ts` 等声明文件，而加载哪些文件则和 lib 配置有关。当我们配置了 `"es2021"` 或者 `"es2021.String"`，replaceAll 方法对应的声明文件 `lib.es2021.string.d.ts` 就会被加载，然后我们的 String 类型上才有了 replaceAll 方法。

lib 和实际运行环境也有关系。比如，当你的代码仅在 Node 环境下运行时，你的 lib 中不应当包含 `"DOM"` 这个值。对应的，代码中无法使用 window 、document 等全局变量。

而 target 对 lib 的影响在于，当你的 target 为更高的版本时，它会自动地将这个版本新语法对应的 lib 声明加载进来，以上面的代码为例， target 为 `"es2021"` 时，不需要专门添加 `"es2021"` 到 lib 中也能使用 ES2021 的 replaceAll 方法 。这是因为既然你的编译产物都到这个版本了，当然可以直接使用这个方法。



### Modules 模块

#### baseUrl - 基础路径

设置一个基础路径，用作解析非绝对对模块名的基本目录，例如：

```
project
├── ex.ts
├── hello
│   └── world.ts
└── tsconfig.json
```

在 ex.ts 中

```
import { helloWorld } from "hello/world";
```

使用 `"baseUrl": "./"` ，TypeScript 将查找与  `tsconfig.json`同级目录



#### module - 模块化规范

*参考 [模块](https://www.typescriptlang.org/docs/handbook/modules.html)*

指定构建产物使用的模块化规范，可选值有：

- none
- [commonjs](https://zh.wikipedia.org/wiki/CommonJS)：nodejs 早期实现的模块化规范，应用于服务端，`require` 导入，`exports` 导出
- [amd](https://en.wikipedia.org/wiki/Asynchronous_module_definition)：早期在 web 端实现的模块化规范，仅能在浏览器工作
- [umd](https://github.com/umdjs/umd)：兼容 amd 和 commonjs
- [system](https://github.com/systemjs/systemjs)：通用的模块加载器，支持 cjs、amd、esm，被 es 模块规范替代
- es6/es2015：es 规范，`import` 导入， `export` 导出
- es2020
- es2022：v4.5，，支持了 Top-Level Await 语法
- esnext
- node16：v4.7，代码仅在 node 环境下运行，ts 会开启对 node esm 的支持
- nodenext

target 为 es3/es5 时，默认值为 commonjs



相关配置项：moduleResolution、esModuleInterop、allowImportingTsExter、allowArbitraryExtensi、resolveJsonModule



#### moduleResolution - 模块解析策略

参考 [官网-模块解析](https://www.typescriptlang.org/docs/handbook/module-resolution.html) [ts使用手册-模块解析](https://www.patrickzhong.com/TypeScript/zh/reference/module-resolution.html) [知乎- moduleResolution 总结](https://zhuanlan.zhihu.com/p/621795173?utm_id=0)

指定 TypeScript 模块解析策略，可选值有：

- classic：v1.6 之前使用
- node/node10：早期 ts 只支持 classic 和 node，所以 node 是 node10 的早期名称，仅支持 commonjs，模仿 nodejs运行时的解析策略在编译阶段定位模块文件
- node16：支持 `exports` ，同时增加了 esm 限制，例如文件必须带扩展名，所以此时必须设置 package.json 中的 type:module 来明确开启 esm
- nodenext：最新的 nodejs 模块解析策略，所以是兼容 `node16` 的
- budler：与 node16、nodenext 一样，支持在 package.json 中配置 imports、exports



#### paths - 路径

类似于 Webpack 中的 alias，用来声明如何解析 require、imports 中的导入，允许通过 `@/utils` 或类似的方式来简化导入路径

默认情况下，paths 的解析是基于 baseUrl 作为相对路径的，因此需要确保指定了 baseUrl 。在填写别名路径时，我们可以传入一个数组，TypeScript 会依次解析这些路径，直到找到一个确实存在的路径。





#### resolveJsonModule

启用了这一配置后，你就可以直接导入 Json 文件，并对导入内容获得完整的基于实际 Json 内容的类型推导。

```json
{
    "repo": "TypeScript",
    "dry": false,
    "debug": false
}
import settings from "./settings.json";
 
settings.debug === true;
// 对应的类型报错
settings.dry === 2;
```



#### rootDir 

默认值为：项目内**包括**的所有 .ts 文件，非声明文件（.d.ts）的最长公共路径，这里要注意：

- **包括**指的是 include 或 files 中包括的 `.ts` 文件，这些文件一般来说不会和 tsconfig.json 位于同一目录层级；
- 不包括 `.d.ts` 文件，因为声明文件可能会和 tsconfig.json 位于同一层级

最长公共路径，就是某一个包含了所有.ts 文件的目录，ts 会找到这个目录，并作为默认的 rootDir。

示例：下面的目录，rootDir 会被推断为 src。

```
PROJECT
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
├── declare.d.ts
├── tsconfig.json
```

示例：rootDir 会被推断为 `.`，即 `tsconfig.json` 所在的目录

```
PROJECT
├── env
│   ├── env.dev.ts
│   ├── env.prod.ts
├── app
│   ├── index.ts
├── declare.d.ts
├── tsconfig.json
```

**注意**：构建产物的目录结构会受到这一配置的影响，假设 outDir 被配置为 `dist`，在上面的第一种情况下，最终的产物会被全部放置在 dist 目录下，保持它们在 `src`（也就是 rootDir） 内的目录结构：

```
PROJECT
├── dist
│   ├── index.js
│   ├── index.d.ts
│   ├── app.js
│   ├── app.d.ts
│   ├── utils
│   │   ├── helpers.js
│   │   ├── helpers.d.ts
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
```

如果将 rootDir 更改为推导得到的 rootDir 的父级目录，比如在这里把它更改到了项目根目录 `.`。此时 `src` 会被视为 rootDir 的一部分，因此最终构建目录结构中会多出 `src` 这一级：

```
PROJECT
├── dist
│    ├─src
│      ├── index.js
│      ├── index.d.ts
│      ├── app.js
│      ├── app.d.ts
│      ├── utils
│      │   ├── helpers.js
│      │   ├── helpers.d.ts
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
```

需要注意的是，如果显式指定 rootDir ，需要确保其包含了所有 **“被包括”** 的文件，因为 TypeScript 需要确保这所有的文件都被生成在 outDir 内。比如：

```
PROJECT
├── src
│   ├── index.ts
│   ├── app.ts
│   ├── utils
│   │   ├── helpers.ts
├── env.ts
├── tsconfig.json
```

在这个例子中，如果你指定 rootDir 为 `src` ，会导致 `env.ts` 被生成到 `<project>/env.js` 而非 `<project>/dist/env.js` 。



#### types

默认情况下，TypeScript 会加载 `node_modules/@types/` 下的所有声明文件，包括嵌套的 `../../node_modules/@types` 路径，这么做可以让你更方便地使用第三方库的类型。

但如果希望只加载实际使用的类型定义包，就可以通过 types 配置来指定：

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

这种情况下，只有 `@types/node`、`@types/jest` 以及 `@types/react` 会被加载到全局。



#### typeRoots

希望改变加载 `@types/` 下文件的行为，可以使用 typeRoots 选项，其默认为 `@types`，即指定 `node_modules/@types` 下的所有文件（仍然包括嵌套的）。

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./node_modules/@team-types", "./typings"],
    "types": ["react"],
    "skipLibCheck": true
  }
}
```

以上配置会尝试加载 `node_modules/@types/react` 以及 `./node_modules/@team-types/react` 、`./typings/react` 中的声明文件，注意我们需要使用**相对于 baseUrl 的相对路径**。

加载多个声明文件可能会导致内部的声明冲突，所以你可能会需要 skipLibCheck 配置来禁用掉对加载的类型声明的检查。





### JavaScript Support - js支持

#### allowJs - 允许 js

允许在项目中使用 js 代码，而不仅仅只能使用.ts、.tsx 文件





### Emit

#### outDir - 输出目录

构建产物的输出目录，会按照原来的目录结构输出。

如果没有指定，则编译后的 js 文件将与源 ts 文件在相同目录中；如果指定了，则编译后的 js（以及 `.d.ts`, `.js.map` 等）将会被生成到这个目录下，源文件的目录仍将会被保留。



#### sourceMap

是否生成源码映射文件，如果设置为 true，则在输出.js 文件的同时输出.js.map（或.jsx.map）



#### removeComments - 移除注释

默认为 false，是否在转换为 js 时从 ts 中删除所有注释，



### Interop Constraints 互操作约束

#### allowSyntheticDefaultImports - 允许合成默认导入

是否允许从没有默认导出的模块中默认导入，默认：false

#### esModuleInterop - es 模块互操作

这两个配置主要还是为了解决 ES Module 和 CommonJS 之间的兼容性问题。

**简单的说**：CJS中没有默认导出的概念，所以在 ESM 中使用默认导入方式导入 CJS 模块时会发生错误或者一些异常。esModuleInterop 配置为 true 时，ts 会更改编译器中的行为，避免错误。所以当项目中 ESM 和 CJS 模块混合使用，或者在 ESM 项目中引用一些旧的不兼容 ESM 标准的 CJS 模块时，需要开启 esModuleInterop，同时也会默认开启 allowSyntheticDefaultImports。





通常情况下，ESM 调用 ESM，CJS 调用 CJS，都不会有问题。但如果是 ESM 调用 CJS ，就可能遇到奇怪的问题。比如 React 中的源码中是这样导出的：

```js
// react/cjs/react.development.js
exports.Children = Children;
exports.useState = useState;
exports.memo = memo;
exports.useEffect = useEffect;
```

假设我们分别使用具名导入、默认导入和命名空间导入来导入 React：

```typescript
import { useRef } from "react"; // 具名导入（named import）
import React from "react"; // 默认导入（default import）
import * as ReactCopy from "react"; // 命名空间导入（namespace import）

console.log(useRef);
console.log(React.useState)
console.log(ReactCopy.useEffect)
```

这样的代码在默认情况下（即没有启用 esModuleInterop）会被编译为：

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("react");
const ReactCopy = require("react");
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
```

可以看到，默认导入的调用被转换为了 `react_2.default`，而具名导入和命名空间则不变，三种导入语句都被转换为了 CJS。

这是因为 TypeScript 默认将 CommonJs 也视为 ES Module 一样，对于具名导入，可以直接将 `module.exports.useRef = useRef` 和 `export const useRef = useRef `等价。

但是 CommonJs 中并没有这个“默认导出”这个概念， 只能将 ES Module 中的默认导出 `export default` 强行等价于 `module.exports.default`，如上面的编译结果中的 `react_2.default`。这里的 default 就是一个属性名，和 `module.exports.foo` 是一个概念。

但 CommonJs 下存在着类似“命名空间导出”的概念，即 `const react = require("react") `可以等价于 `import * as React from "react"`。

很明显，对于默认导出的情况，由于 React 中并没有使用 `module.exports.default` 提供（模拟）一个默认导出，因此 `react_2.default` 只可能是 undefined。

为了解决这种情况，TypeScript 中支持通过 esModuleInterop 配置来在 ESM 导入 CJS 这种情况时引入额外的辅助函数，进一步对兼容性进行支持，如上面的代码在开启配置后的构建产物会是这样的：

```js
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) { //... }));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) { //... });
var __importStar = (this && this.__importStar) || function (mod) { //... };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
  
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ReactCopy = __importStar(require("react"));
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
```

这些辅助函数会确保 ESM 的默认导入（`__importDefault`） 与命名空间导入 （`__importStar`）能正确地对应到 CJS 中的导出，如` __importDefault` 会检查目标模块的使用规范，对 ESM 模块直接返回，否则将其挂载在一个对象的 default 属性上：

```js
const react_2 = __importDefault(require("react"));

// 转换结果等价于以下
const react_2 = { default: { useState: {} } }
```

而 `__importStar` （即命名空间导入的辅助函数）的实现则要复杂一些：

```js
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
```

它会在目标模块不是 ESM 规范时，将模块中除了 default 属性以外的导出都挂载到返回对象上（`__createBinding`），然后将这个对象的 default 属性设置为原本的模块信息（`__setModuleDefault`）。这样你既可以 `ReactCopy.useEffect` 访问某个值，也可以 `ReactCopy.default` 访问原本的模块。

这些辅助方法也属于 `importHelpers` 中的 helper，因此你也可以通过启用 `importHelpers` 配置来从 tslib 导入这些辅助方法。

实际上，由于 React 本身是通过 CommonJs 导出的，在你使用默认导入时， TS 也会提醒你此模块只能在启用了 `esModuleInterop` 的情况下使用默认导入。

启用 `esModuleInterop` 配置的同时，也会启用 `allowSyntheticDefaultImports` 配置，这一配置会为没有默认导出的 CJS 模块“模拟”出默认的导出，以提供更好的类型提示。如以下代码：

```js
// handlers.js
module.exports = {
  errorHandler: () => {}
}

// index.js
import handlers from "./handlers";

window.onerror = handlers.errorHandler;
```

虽然这段代码转换后的实际逻辑没有问题，但由于这里并不存在 `module.exports.default` 导出，会导致在类型上出现一个错误。

启用 `allowSyntheticDefaultImports` 配置会在这种情况下将 handlers 中的代码模拟为以下的形式：

```js
const allHandlers = {
  errorHandler: () => {}
}

module.exports = allHandlers;
module.exports.default = allHandlers;
```

然后在导入方就能够获得正确的类型提示了，实际上这也是 Babel 实际的构建效果，但需要注意的是在 TypeScript 中 `allowSyntheticDefaultImports` 配置并不会影响最终的代码生成（不像 `esModuleInterop` 那样），只会对类型检查有帮助。





#### esModuleInterop - es 模块互操作性

默认情况下（未设置 `esModuleInterop` 或值为 false），TypeScript 像 ES6 模块一样对待 CommonJS/AMD/UMD。

**一般设置为 true**，同时会启用 allowSyntheticDefaultImports



#### forceConsistentCasingInFileNames - 文件系统大小写

是否区分文件系统大小写规则，默认 false，即不区分大小写



### Type Checking 类型检查

#### strict - 严格模式

是否启用严格模式，它是一组规则的总开关，开启 strict 会默认将这些规则全部启用，这些规则包括：

- `alwaysStrict`、`useUnknownInCatchVariables`
- `noFallthroughCasesInSwitch`、`noImplicitAny`、`noImplicitThis`
- `strictNullChecks`、`strictBindCallApply`、`strictFunctionTypes`、`strictPropertyInitialization`



#### noUnusedLocals - 未使用的局部变量

默认为 true，设置是否报告未使用的局部变量的错误，设置为false 不报错，



### Completeness 完整性

#### skipLibCheck 与 skipDefaultLibCheck

默认情况下，TypeScript 会对加载的类型声明文件也进行检查，包括内置的 `lib.d.ts` 系列与 `@types/` 下的声明文件。在某些时候，这些声明文件可能存在冲突，比如两个不同来源的声明文件使用不同的类型声明了一个全局变量。此时，你就可以使用 skipLibCheck 跳过对这些类型声明文件的检查，这也能进一步加快编译速度。

TypeScript 不会对所有 `d.ts` 文件进行全面检查，而是只检查在代码中特别引用的代码。

`skipDefaultLibCheck` 类似于 `skipLibCheck` ，但它只会跳过那些使用了 `/// <reference no-default-lib="true"/>` 指令的声明文件（如内置的 `lib.d.ts`），这一三斜线指令的作用即是**将此文件标记为默认库声明**，因此开启这一配置后，编译器在处理其文件时不会再尝试引入默认库声明。



### Backwards Compatibility 向后兼容性

#### suppressImplicitAnyIndexErrors

启用时，可以禁止在索引到对象时报告有关隐式 anys 的错误



## ts-node



## vueCompilerOptions

