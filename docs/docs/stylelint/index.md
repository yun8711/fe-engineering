---
outline: deep
prev: false
next: false





---

<h1>Stylelint</h1><p>v15.10.2</p>

[官网](https://stylelint.io/) | [github](https://github.com/stylelint/stylelint)



## 简介

Stylelint是一个强大的，现代的代码检查工具，与ESLint类似，Stylelint能够通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。

关于CSS Lint的解决方案主要包括了csslint、SCSS-Lint和Stylelint等几种。而由于Stylelint在技术架构上基于AST 的方式扩展CSS，除原生CSS 语法，其也支持 SCSS、Less 这类预处理器，并且也有非常多的第三方插件。

在 Stylelint v14 及更高版本默认不解析非css文件，需要使用插件来支持其他类型文件



**注意** ：Stylelint v15 以后，stylelint不再对 css 格式做检查和自动修复，比如括号、缩进、空格等样式类的控制；所以还需要使用 Prettier 对样式进行美化。



## 配置

### 配置文件

- package.json
- .stylelintrc | .json | .yaml | js
- stylelint.config.js
- stylelint.config.cjs（"type":"module"时需使用.cjs）

### 行内配置（不推荐）

- `/* stylelint-disable */`，关闭当前文件内所有规则
- `/* stylelint-disable selector-max-id, declaration-no-important */`，关闭指定规则
- `/* stylelint-disable-line */`，关闭当前行的选择器的所有规则
- `/* stylelint-disable-line declaration-no-important */`，关闭当前行的css属性的指定规则
- `/* stylelint-disable-next-line declaration-no-important */`，关闭下一行的所有或指定规则

### .stylelintignore

忽略特定的文件和目录，纯文本文件，每一行都是一个 glob 模式的文件或目录路径

默认忽略node_modules



## 安装

核心依赖

stylelint

