---
outline: deep

---

<h1>tsconfig.json配置详解</h1><p>v5.2（2023.08.26）</p>

[官网](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html) | [中文网](https://www.tslang.cn/docs/handbook/tsconfig-json.html) | [配置项列表](https://www.typescriptlang.org/tsconfig) | [官方推荐配置](https://github.com/tsconfig/bases/) | [json scheme](http://json.schemastore.org/tsconfig)



## files

字符串数组，由文件路径组成，指定要包含在编译中的文件列表

- 如果没有配置 files 或 include，ts 会默认编译当前目录及其子目录中的所有 .ts 或 .tsx 文件
- 如果 files 中的文件引入不包含在 files 中的文件，ts 也会尝试编译
- 但是，如果文件明确被 exclude 排除了，或者不满足 include 的条件，那么 ts 不会编译这些文件

<br/>

## extends

字符串，表示要继承的另一个可以被 nodejs 解析的配置文件的路径。

**注意**：除 references 配置外，均可以被继承，但是不允许配置文件之间的循环引用。

<br/>

## include

文件路径或glob 字符串数组，相对于 tsconfig.json 所有目录的相对路径，指定 ts 要编译的文件列表

```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

<br/>

## exclude

文件路径或glob 字符串数组，指定解析 include 时需要跳过的文件或目录，只要是被 exclude 指定的，无论 files 和 include 如何指定，都不会包含在编译列表中。

**注意**：它只是在 include 的文件范围内进行排除

<br/>

### 说明

**通配符**

- `*`：匹配 0 或多个字符，不包括目录分隔符
- `?`：匹配 1 个字符，不包括目录分隔符
- `**/`：匹配嵌套到任何级别的任何目录

如果 glob 字符串最后不包含文件扩展名或其他通配符，则视为目录，并且包含该目录中所支持扩展名的文件（默认支持 .ts、.tsx、.d.ts，如果 allowJs 为 true，则也支持 .js、.jsx）

<br/>

**files、include和exclude**

优先级从高到低依次是：exclude > files > include

在实际使用中，应该根据项目的需要来决定如何配合使用这三个配置项。

例如，如果你的项目中只有少数几个文件需要被编译，你可以使用 files 来明确指定这些文件。如果你的项目中有大量文件需要被编译，你可以使用 include 来指定一个匹配这些文件的模式。如果你的项目中有一些文件不应该被编译，你可以使用 exclude 来排除这些文件。



## references

v3.0 引入的一个新特性，用于设置项目引用。基于该配置可以将整个工程拆分成多个部分，比如 UI 部分、Hooks 部分以及主应用等等，为它们使用独立的 ts 配置，这样可以让 TypeScript 项目更好地组织代码，提高构建性能，以及改善编辑器的体验。

*示例*

有如下项目结构

```json
PROJECT
├── app
│   ├── index.ts
│   ├── tsconfig.json
├── core
│   ├── index.ts
│   ├── tsconfig.json
├── ui
│   ├── index.ts
│   ├── tsconfig.json
├── utils
│   ├── index.ts
│   ├── tsconfig.json
├── tsconfig.base.json
```

这四个项目的引用关系是这样的：

```
app -> core, ui, utils
core -> utils
```

这四个项目可以使用完全独立的 tsconfig 配置，如 utils 的 target 为 ES5，而 app 的 target 则可以是 ESNext ，那么检查配置、功能配置等自然也可以不同。

最终在 `app/tsconfig.json` 中定义引用关系：

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "baseUrl": ".",
    "outDir": "../dist/app"
  },
  "include": ["./**/*.ts"],
  "references": [
    {
      "path": "../utils"
    },
    {
      "path": "../core"
    },
    {
      "path": "../ui"
    }
  ]
}
```

这里的 outDir 被配置为父级目录，因为我们仍然希望这四个项目的构建产物被放置在同一个文件夹下，你也可以根据自己的实际需要定制。

<br/>

## compilerOptions

### Language and Environment

#### target - 编译目标

默认：`ES3`，类型：`string`，设置编译后要兼容的 js 版本

可选值：es3/5/6/2015~2022/next，esnext 表示当前 ts 支持的最高版本，如无特殊需求，推荐设置为 `"es2018"`，对常用语法支持较为全面的版本。如果只使用 Nodejs，应该基于 node 版本设置 target，可以通过 [node.green](https://node.green/) 的支持数据库查询相应的版本

target 的配置会改变 lib 选项的默认值，而 lib 决定了能否使用某个版本的语法特性，以 replaceAll 为例，如果在项目中直接使用，会给出一个错误提示：***属性“replaceAll”在类型“"linbudu"”上不存在。是否需要更改目标库? 请尝试将 “lib” 编译器选项更改为“es2021”或更高版本***。解决此问题，可以在配置 lib 中包含 `"es2021"` 或者 `"es2021.String"`



#### lib - 库文件

类型：`string[]`，指定编译环境需要包含的库文件，

ts 在编译时会自动加载内置的 `lib.d.ts` 等声明文件，这些库文件包含了代码在运行时可能会用到的全局变量、类型、函数等，而 lib 配置就决定了加载哪些库文件。

这个配置需要根据项目的实际运行的环境来设定，比如：项目需要运行在浏览器中，那么就需要添加 `DOM` ，它包含了 window、document 等全局变量，但是如果项目仅在 node 环境下运行，那么就不需要 `DOM` 库

可以在源码中查看支持的库文件：`node_modules/typescript/lib`

**注意**：

- lib 配置项只影响 ts 编译的行为，添加相应的库文件，主要是为了在编译时可以识别预设环境中所包含的全局变量、类型、函数等，不会影响你的代码在运行时的行为，如果代码在运行时的环境中实际上并没有这些全局变量和函数，那么你的代码在运行时仍然会报错。
- target 会影响 lib 的默认值，一般情况下，lib 会自动获取与 target 指定的版本对应的库文件。比如 target 为 `"es2021"` 时，不需要专门添加 `"es2021"` 到 lib 中也能使用 ES2021 的 replaceAll 方法，因为既然你的编译产物都到这个版本了，当然可以直接使用这个方法



### Modules 模块

#### baseUrl - 基准路径

默认：`.`，类型：`string`，设置一个基准路径，用作解析非绝对模块名的基准目录，例如：

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



#### module - 模块系统

默认：`CommonJS`，指定编辑器使用哪种模块系统编译代码

target 为 es3/es5 时，默认值为 commonjs，可选值参考 [模块](https://www.typescriptlang.org/docs/handbook/modules.html) 查看更多信息，

一般在前端项目指定 `ESNext`，也就是可以使用 import 和 export 语句来导入和导出模块，而 TypeScript 编译器会将这些语句编译为相应的 ECMAScript 语句。



#### moduleResolution - 模块解析策略

参考 [官网-模块解析](https://www.typescriptlang.org/docs/handbook/module-resolution.html) [ts使用手册-模块解析](https://www.patrickzhong.com/TypeScript/zh/reference/module-resolution.html) [知乎- moduleResolution 总结](https://zhuanlan.zhihu.com/p/621795173?utm_id=0)

指定 TypeScript 模块解析策略，简单的说就是使用 node 哪个版本来解析模块，可选值有：

- classic：v1.6 之前使用，当前可以完全弃用
- node/node10：早期 ts 只支持 classic 和 node，所以 node 是 node10 的早期名称，仅支持 commonjs，模仿 nodejs运行时的解析策略在编译阶段定位模块文件
- node16：支持 `exports` ，同时增加了 esm 限制，例如文件必须带扩展名，所以此时必须设置 package.json 中的 type:module 来明确开启 esm
- nodenext：最新的 nodejs 模块解析策略，所以是兼容 `node16` 的
- budler：与 node16、nodenext 相似，但是不需要文件后缀名的声明



#### paths - 路径设置

类似于 Webpack 中的 alias，用来声明如何解析 require、imports 中的导入，允许通过 `@/utils` 或类似的方式来简化导入路径

默认情况下，paths 的解析是基于 baseUrl 作为相对路径的，因此需要确保指定了 baseUrl 。在填写别名路径时，我们可以传入一个数组，TypeScript 会依次解析这些路径，直到找到一个确实存在的路径。



#### resolveJsonModule

默认：类型：`boolean`，指定编译器是否允许导入 json 模块。

启用了这一配置后，就可以直接导入 Json 文件，并获得基于实际 Json 内容的类型推导。





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



#### types - 类型

默认情况下，TypeScript 会加载 `node_modules/@types/` 下的所有声明文件，包括嵌套的 `../../node_modules/@types` 路径，这么做可以让你更方便地使用第三方库的类型。

当指定 types 时，则只有列出的包才会被包含在全局范围内

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

类型：`boolean`，默认：

允许在项目中使用 js 代码，而不仅仅只能使用.ts、.tsx 文件



### Emit

#### outDir - 输出目录

构建产物的输出目录，会按照原来的目录结构输出。

如果没有指定，则编译后的 js 文件将与源 ts 文件在相同目录中；如果指定了，则编译后的 js（以及 `.d.ts`, `.js.map` 等）将会被生成到这个目录下，源文件的目录仍将会被保留。



#### sourceMap

类型：`boolean`，默认：

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

默认：`false`，

是否区分文件系统大小写规则，默认不区分大小写



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

