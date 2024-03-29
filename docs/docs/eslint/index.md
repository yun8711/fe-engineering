---
outline: deep

---

<h1>ESLint 概述</h1><p>v8.45.0</p>

[官网](https://zh-hans.eslint.org/) | [github](https://github.com/eslint/eslint)



> lint 工具最早可追溯到1979年，它的作用是用于扫描C源文件并对程序中不可移植的代码发出警告。因为在C语言发展初期，由于程序员的风格问题，导致在移植代码时会出现一些不严谨的代码片段导致无法被编译器执行的问题。1979年贝尔实验室开发了一个静态代码分析的工具，并将其命名为lint，所以后续的类似的代码检测工具都延续该命名风格，比如ESLint、JSLint等。



## 简介

ESLint 最初是由[Nicholas C. Zakas](https://github.com/nzakas)（红宝书作者、ESLint 创始人） 于2013年6月创建的开源项目，目标是提供一个插件化的 javascript 代码静态检查分析工具，帮助开发人员在编写代码时遵循一致的规范和最佳实践

代码检查是一种静态的分析，一般用于寻找有问题的模式或代码，并且不依赖于具体的编码风格，对大多数编程语言来说都会有代码检查，一般编译程序会内置检查工具。但js是动态弱类型语言，开发中如果不加约束很容易出错，ESLint 就是为了让开发过程中就能发现错误而非在执行过程中。

ESLint保持其插件的特性，让开发人员自定义属于自己的规则，也可以遵循一些大的社区或团队的规范直接继承下来，所有规则都是可插入的，同时为了方便使用也内置了一些规则。

**特点**

1. 默认使用 Espree 对 js 进行解析
2. 本身只能对 js 代码和符合 es 正式规范（至少 stage 4 阶段）的代码进行检查
3. 不支持最新的语法和实验性的语法，可以使用 `@babel/eslint-parser`、`@babel/eslint-plugin`
4. 原生支持jsx，但不等于支持 react 的特定语法，还需要 `eslint-plugin-react`
5. eslint 的相关插件的命名格式为：`eslint-plugin-xxx`

[安装与使用](https://zh-hans.eslint.org/docs/latest/use/getting-started)



## 原理简述

整体过程分为：

1. 使用**解析器**将源码转为 AST，严格说是 ESTree
2. 获取所有插件或用户定义的规则，遍历 AST 并执行规则
3. 在遍历完成后，将收集到的错误抛出，及自动 fix

在它的底层，还是对 AST 的操作，就是对代码的词法分析和语法分析

解析器是 eslint 工作的核心，只有先把源码解析为 AST，更严谨的说应该是 ESTree，然后在此基础上，才能进行后续处理。阅读 [parser](./parser) 的内容，然后会对解析器有个更完整的理解。



## 配置文件

通过`eslint --init`，可以启动 eslint 的配置初始化向导，按照提示可以快速创建配置文件。

eslint 在 v8.35.0 之前，使用的是 eslintrc 配置系统，在之后，推荐使用 flat config 配置系统。关于这 eslint 的新配置系统，可能查看官方 blog。

在 eslintrc 配置系统中支持以下类型的配置文件，优先级由上到下：

1. `.eslintrc.js`
2. `.eslintrc.cjs`
3. `.eslintrc.yaml`
4. `.eslintrc.yml`
5. `.eslintrc.json`
6. `package.json`

eslint 还支持内联配置，例如：` /*eslint-disable*/ `和 `/*eslint-enable*/ ``/*global*/ /*eslint*/ /*eslint-env*/ `，这种是与源码写在一起的，优先级最高。

在 flat config 配置系统中，只支持`eslint.config.js`配置文件



## 预定义配置

ESLint 有两个针对 JavaScript 的预定义配置：

- `js.configs.recommended` - 启用 ESLint 推荐的规则，以避免潜在错误
- `js.configs.all` - 启用所有 ESLint 提供的规则

要使用这些预定义配置，要先安装 **`@eslint/js`** 包，然后在配置对象的其他属性中加入：

```js
import js from "@eslint/js";

export default [
    "js.configs.recommended",
    {
        rules: {
            semi: ["warn", "always"]
        }
    }
];
```

