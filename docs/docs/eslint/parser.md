---
outline: deep
prev: true
next: true
---

<h1>eslint parser</h1>

[官网](https://zh-hans.eslint.org/) | [github](https://github.com/eslint/eslint)



## 前言

从使用 eslint 开始，对它的了解一直不算深入，主要的疑问就是在 parser、parserOptions、plugins 这几个配置上，没有弄明白到底他们是什么样的关系，有什么样的作用。

解析器是 eslint 工作的核心，只有先把源码解析为 AST，更严谨的说应该是 [ESTree](https://github.com/estree/estree)，然后在此基础上，才能进行后续处理。

说到 AST/ESTree，必须说一说它的发展史，以便能更好的理解解析器。



## 早期

JavaScript 发布于 1995 年，最初是在 Netscape Navigator 2.0 浏览器中首次发布并使用的。由 Brendan Eich 领导的开发团队为 Netscape Navigator 浏览器设计了一种全新的脚本语言，被命名为 Mocha（后来又改名为 LiveScript）。

<br/>

### SpiderMonkey 引擎

随着 Netscape Navigator 2.0 一起发布的，还有 SpiderMonkey，一个由 Mozilla 开发的高性能 JavaScript 引擎，用 C/C++ 编写的开源软件。

实现了许多扩展功能和特性。该引擎可以将 JavaScript 代码解析成抽象语法树（Abstract Syntax Tree, AST），并且通过 JIT（Just-In-Time）编译技术将其转换为本地机器码执行，从而提高了 JavaScript 代码的执行速度。

除此之外，SpiderMonkey 还提供了一些其他的功能，如垃圾回收、线程安全等。它还可以与其他编程语言进行集成，例如使用 SpiderMonkey 可以在 C++ 应用程序中嵌入 JavaScript 代码。

SpiderMonkey 的开源性和高可定制性使得它被广泛应用于各种 JavaScript 工具和框架中，如 Firefox 浏览器、Node.js 等。

**SpiderMonkey 提供了 js 解析的格式，成为操作 js 源码的工具的通用格式**

<br/>

### esprima 解析器

由 Ariya Hidayat 在 2012 年发起，也是一个用于解析 JavaScript 代码的工具，完全由 js 编写，可以将 JavaScript 代码解析成抽象语法树（Abstract Syntax Tree, AST）。

Esprima 实现了完整的 ECMAScript 5.1 规范，并且支持一些 ECMAScript 6（ES6）的语言特性，

<br/>

### [acorn 解析器](https://github.com/acornjs/acorn)

2012 年首次发布，纯 js 实现的，使用了解析器生成器工具 Jison 来创建 Acorn。

一个轻量、快速、可扩展的 js 解析器，完全用 js 编写。也是 estree 标准的实现，但更新速度快，重要的是模块化架构，支持插件功能，可以通过插件扩展核心功能和语法支持，所以很多工具都转而使用 acorn。

2017 年 11 月，Ingvar Stepanyan（主要维护者和重要贡献者之一）在他的博客文章中宣布放弃对 ECMAScript 2016+ 特性的支持，原因是他不再有时间和能力来继续维护，并且他认为这一决定也符合 Acorn 最初的设计目标：一个尽量小、快速、可扩展的解析器。

这一决定的影响较大，因为 Acorn 是许多 JavaScript 工具的基础，如 ESLint、Babel 等。



## [ESTree](https://github.com/estree/estree)标准

在计算机科学中，AST （抽象语法树）是一种数据结构，是源代码结构的一种抽象表示，它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构，可以方便程序在静态分析和转换时进行操作。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。

ESTree 是一个由 JavaScript 工具开发者们共同制定的通用 AST 规范，它定义了一组通用的 AST 节点类型和属性，以及节点之间的关系和遍历方式。

因此，ESTree 可以被看作是 AST 的一个特定规范，在 JavaScript 领域的实现标准，旨在解决不同的 JavaScript 工具之间 AST 格式不兼容的问题，以便于这些工具可以更加容易地协同工作。

ESTree 标准委员会成员：[Nicholas C. Zakas（Eslint 作者）](https://github.com/nzakas)、[Ingvar Stepanyan（acorn 作者）](https://github.com/rreverser)、[Junliang Huang（Babel 成员）](https://github.com/JLHwung)



## 现在



### [Espree](https://github.com/eslint/espree)

在 2015 年之后，ECMAScript 标准每年更新，esprima 更新速度跟不上，导致一系列工具都跟不上，所以 eslint 团队就基于 Esprima v 1.2.2（ES6 前的最后一个稳定发布版本，2014-05-19） fork 了一个分支（v1.3.0，2014-12-22），做了一些扩展，来实现新语法的 parse，也就是后来的 Espree。

它依然是 estree 标准，更加注重安全性和稳定性，并可以更好的支持最新的语法和标准。

在 v3.0.0-alpha-1（2015-12-10），Espree 将底层 js 解析器切换到了 acorn。

<br/>

### Babylon -> [@babel/parser](https://babeljs.io/docs/babel-parser.html)

Babylon 是由 Babel 团队2016 年创建，很大程度上是基于 acorn 和 acorn-jsx。

Babylon早期直接依赖 acorn，后来因为 acorn 的开发者宣布将不再支持 ECMAScript 2015+ 特性的解析，这使得 Babel 团队不得不直接 fork 了 acorn 的代码来修改，而不是引入 acorn 包再通过插件扩展的方式。

2018 年 5 月 19日 Babylon 归档。由于采用 monorepo 模式，Babylon 仓库迁移到 @babel/parser

特点：

- 默认启用最新的 ECMAScript 版本
- 支持 JSX、Flow、TS
- 支持实验性语言提案（至少接受 stage-0）

这也是现在大部分 ESLint 的 parser 都使用 @babel/eslint-parser 的重要原因。

<br/>

### babel-eslint -> [@babel/eslint-parser](https://github.com/babel/babel/blob/main/eslint/babel-eslint-parser/README.md)

它俩是一样的，@babel/eslint-parser 是采用 monorepo 模式后的名称，用来代替 babel-eslint（ 最后发行版本是2020年 2 月 26 日的 v 10.1.0）

2015 年 11 月 27 日，在 babel-eslint [v5.0.0-beta1](https://github.com/babel/babel-eslint/releases/tag/v5.0.0-beta1) 时，使用 babylon 作为解析器，也就是后来的 @babel/parser

特点：

- 支持最新的 ECMAScript 标准：@babel/eslint-parser 支持最新的 ECMAScript 标准，包括 ES2021 和 ESNext，无需等待其他解析器的更新（babel fork 了依赖的解析器，并通过插件方式扩展新语法）
- 支持 Babel 插件：可以与 Babel 插件结合使用，可以使用诸如转换 JSX、将新语法转换为标准 ES5 语法等功能
- 高度可配置性：@babel/eslint-parser 提供了许多配置选项，可以根据您的需要进行自定义设置，并且支持大多数 espree 的配置选项

使用 @babel/eslint-parser 时，源码将由 babel 的解析器（@babel/parser）解析，并将生成的 AST 转换为 ESLint可以识别的 ESTree 兼容结构。

@babel/eslint-parser 需要 @babel/core >= 7.2.0 版本

由于 ESLint 的核心规则不支持实验性语法，因此在使用 @babel/eslint-parser 时，还要配套使用 @babel/eslint-plugin 插件，来处理那些 eslint 不支持的语法规则

**注意**：虽然@babel/eslint-parser可以解析 ts，但不建议这么用，因为 ts 相关解析已经集中在了 @typescript-eslint，另外 bable 没有类型检测的能力

<br/>

### [@typescript-eslint/parser](https://typescript-eslint.io/)

由于 ts 的 AST 针对类型检查的需求进行了优化，它本身解析出来的 AST 与标准 ESTree 格式有所不同，所以不能被 ESLint 直接解析，因此需要一个 ESLint 解析器，也就是@typescript-eslint/parser，将 ts 代码解析为 ESLint 兼容的 AST 格式。

同时，为了能够校验 ts 语法规则，还需要配合 @typescript-eslint/eslint-plugin 插件一起使用

这里顺带说一下 TSLint，它是用来规范 ts 代码的，功能差不多，由于性能等问题，ts 官方决定全面采用 eslint，而 tslint 的 ts解析器也成为了独立项目，成了`@typescript-eslint/parser`，专注解决双方兼容性问题，而它的规则也合并到了 eslint 中。

详情参阅 [TSLint 和 ESLint 是怎么融合在一起的](https://juejin.cn/post/7009657813890760741)

<br/>

### [vue-eslint-parser](https://github.com/vuejs/vue-eslint-parser)

因为 Vue 单文件组件（SFC）不是纯 js ，而是自定义文件格式，所以必须使用专门的解析器，即 vue-eslint-parser ,可以生成增强的 AST，其中的节点表示模板语法的特定部分以及`<script>`标签的内容。

支持 Vue 2 和 Vue 3，同时还支持 TypeScript，可以处理 Vue SFC 文件中的 HTML 模板、JavaScript 代码和样式等部分，并且提供了一系列规则和插件。

vue-eslint-parser 基于 @vue/compiler-sfc 开发，而 @vue/compiler-sfc 又是基于 @vue/compiler-core 和 @babel/parser 等库开发。

参阅：[vuejs/core](https://github.com/vuejs/core/tree/main) | [ESTree 项目页面](https://github.com/estree/estree) | [vue-eslint-parser AST 文档](https://github.com/vuejs/vue-eslint-parser/blob/master/docs/ast.md)

在vue 项目中配置 eslint 时，也可以通过`parserOptions.parser`属性来指定解析`<script>`标签的解析器。

vue-eslint-parser 本身是个解析器，包含的规则较少，所以一般会配合 [eslint-plugin-vue](https://eslint.vuejs.org/) 一起使用，以提供更多的规则和功能。
