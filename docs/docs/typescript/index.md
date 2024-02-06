---
outline: deep
---

<h1>TypeScript</h1><p>v5.2（2023.08.26）</p>

[官网](https://www.typescriptlang.org/) | [github](https://github.com/microsoft/TypeScript) | [中文网](https://typescript.bootcss.com/) | [《TypeScript 入门与实战》](http://www.patrickzhong.com/TypeScript/)



## 简介

由Microsoft公司开发的编程语言，在 JavaScript 的基础上添加了静态类型检查。

 TypeScript 是 JavaScript 类型的超集，可以编译成纯 js。



### 特点

- 始于 js，归于 js：使用现有的 js 代码的语法和语义；可以编译出纯净、简洁的 js 代码，并可以运行在任何浏览器上、Nodejs 环境、任何支持ECMAScript 3（或更高版本）的JavaScript引擎中

- 强大的工具构建大型应用程序：类型系统提升了代码的静态验证，为开发者提供了高效的开发工具和常用操作，比如静态检查、代码重构

- 先进的 js：ts 提供最新的和不断发展的 js 特性，包括提案中的特性，这些特性在开发时可用，但会被编译成简洁的 ECMAScript3（或更新版本）的JavaScript

  

### 发展历程

- 2012 年 10 月：首个版本 0.8 推出，引入了 TypeScript 的基本概念，如静态类型检查和类型注解
- 2013 年 10 月：0.9 发布，带来了模块系统、泛型和枚举等新特性，增强了语言的功能
- 2014 年 4 月：1.0 正式发布，正式进入稳定版本，引入了类、接口，以及一些改进的工具和编译器性能
- 2015 年 10 月：1.6 发布，引入了异步生成器、装饰器等功能
- 2016 年 8 月：2.0 发布，带来了非空类型、标识联合类型、null 和 undefined 类型的改进支持等特性，使类型检查更加精确
- 2017 年 7 月：2.4 发布，引入了条件类型、全面的对象类型等，增强了类型系统的能力
- 2018 年 7 月：3.0 发布，引入了项目引用、只读属性、元组和类型扩展等功能，提高了代码组织和可维护性
- 2019 年 8 月：3.6 发布，添加了增强的枚举类型、生成器、更好的类型推断等功能
- 2020 年 8 月：4.0 发布，带来了变体元组类型、精确的联合类型检查、可选的短路条件类型等新特性
- 2021 年 8 月：4.4 发布，引入了特性如标签模板字符串类型、可选的静态 this 类型、类型安全的字符串操作等，提供更多工具来编写高质量的 TypeScript 代码
- 2023 年 3 月16日：5.0 发布，新增 const 类型参数；正式支持装饰器（注解）；支持 export type



## 使用

安装

```shell
npm install -g typescript
```

全局安装后，就可以调用全局命令 `tsc` 对.ts 文件进行编译，比如

```shell
tsc helloworld.ts
```

也可使用 [ts-node](https://www.npmjs.com/package/ts-node) 这种工具，可以不用编译直接运行 .ts 文件



## 配置

在工程项目中使用 ts 时，需要创建一个 tsconfig.json 配置文件，可以手动复制一个，也可以使用 `tsc --init` 来自动初始化一个配置文件。

如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是TypeScript项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项等配置。

官方推出了一些基本配置示例 [github.com/tsconfig/bases](https://github.com/tsconfig/bases/) ，可以通过扩展这些已经处理过不同的 JavaScript 运行时环境的 `tsconfig.json` 文件来简化配置过程

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

