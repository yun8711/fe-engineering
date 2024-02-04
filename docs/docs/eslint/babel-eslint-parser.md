---
outline: deep

---

<h1>插件：@babel/eslint-parser</h1><p>v7.23.10</p>

[官网](https://babeljs.io/docs/babel-parser) | [github](https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser)

`@babel/eslint-parser`（以前称为 Babylon） 是一个解析器，它允许 ESLint 在由 Babel 转换的源代码上运行。

ESLint 的默认解析器和核心规则只支持最新的最终 ECMAScript 标准，不支持 Babel 提供的实验性（如新功能）和非标准（如 Flow 或 TypeScript 类型）语法。

该解析器的特点：

- 默认启用的最新 ECMAScript 版本 （ES2020）
- 支持 JSX、Flow、Typescript
- 支持实验性语言提案（接受至少 stage-0 的任何 PR）

注意：虽然 `@babel/eslint-parser` 可以解析 TypeScript，但是不支持在 ESLint 中使用`@babel/eslint-parser`对 ts 代码进行 linting。一方面是避免与`@typescript-eslint`做重复的工作，另一方面是无法识别类型。



## 基本用法 

1、安装：

`pnpm add -D @babel/eslint-parser`

2、配置

在 `.eslintrc.js` 文件中

```js
module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-env"],
    },
  },
  // 其他 ESLint 配置...
};
```



## 解析器配置

```typescript
module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion?: 2020,
    sourceType?: "module", // 或者 "script"
    requireConfigFile: false,
    allowImportExportEverywhere: false,
    ecmaFeatures:{
    	globalReturn?: boolean | undefined;
  	},
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ["@babel/preset-env"],
    },
  },
  // 其他 ESLint 配置...
};
```



### `ecmaVersion`

默认：2020，指定要使用的 ECMAScript 语法版本，解析器会根据它来确定如何分析代码。

指定为`latest`时，表示使用最新版本

<br/>

### `sourceType`

默认：`"module"`，如果未使用 esm 模块标准，可设置为`"script"`

### `requireConfigFile`

默认：true，是否关联 bable 配置文件

如果设置为 false，@babel/eslint-parser 仍然尝试从根目录加载配置文件，如果没有找到配置文件，将不会解析任何实验性语法。

<br/>

### `allowImportExportEverywhere`

默认：false，设置导入、导出声明允许出现的位置，如果为 true，表示可以出现在任何位置（如果构建环境支持），否则，只能显示的声明在顶层。

### `ecmaFeatures`

可选，用于指定你的代码使用了哪些 ECMAScript 的特性，决定了 ts 如何分析源码中的语法，它有以下属性：

- globalReturn：是否允许全局 return 语句，默认 false，当与 `sourceType: "script"` 一起使用时，允许全局范围内的 return 语句

> "全局 return 语句"通常指的是在全局作用域中使用的return语句。在JavaScript和TypeScript中，return语句通常用于函数内部，用于返回函数的结果。如果你在全局作用域（即不在任何函数内部）使用return语句，你将会收到一个错误，因为return语句只能在函数体内使用。

<br/>

### `babelOptions`

默认：`{}`，一个包含 Babel 配置选项的对象，这些选项在运行时传递给 Babel 的解析器

此选项告诉解析器像 中 `tsconfig.json` 设置 `emitDecoratorMetadata: true` 一样运行，但不进行类型识别 linting。换句话说，在这种情况下，不必指定 `parserOptions.project` ，从而加快了 linting 过程。

