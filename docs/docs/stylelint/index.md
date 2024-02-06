---
outline: deep
---

<h1>Stylelint</h1><p>v16.2.1</p>

[官网](https://stylelint.io/) | [github](https://github.com/stylelint/stylelint)



## 简介

Stylelint是一个强大的，现代的代码检查工具，与ESLint类似，Stylelint能够通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。

关于CSS Lint的解决方案主要包括了csslint、SCSS-Lint和Stylelint等几种。而由于Stylelint在技术架构上基于AST 的方式扩展CSS，除原生CSS 语法，其也支持 SCSS、Less 这类预处理器，并且也有非常多的第三方插件。

在 Stylelint v14 及更高版本默认不解析非css文件，需要使用插件来支持其他类型文件



## 版本变化

### [v16](https://stylelint.io/migration-guide/to-16)

- 添加对 ESM 的支持，支持ESM 插件、ESM 自定义语法、ESM 自定义格式化程序
- 弃用了 CommonJS Node.js API
- 内部重构为使用 `.mjs` 和 `.cjs` 扩展
- 删除了已弃用的样式规则
- 要求 Node.js >= 18.12.0

### [v15](https://stylelint.io/migration-guide/to-15)

- 弃用了 76 条样式相关的规则，专注于编写和维护 Stylelint 独有的 [avoid errors](https://stylelint.io/user-guide/rules#avoid-errors) 和 [enforce (non-stylistic) conventions](https://stylelint.io/user-guide/rules#enforce-conventions)，这些弃用的规则在当前版本仍有效，在 v16 中会完全删除。
- 添加``declaration-property-value-no-unknown` 规则，标记 css 规范中未知的属性值。
- 不再支持 Node.js 12
- 删除 `processors` 的配置属性

### [v14](https://stylelint.io/migration-guide/to-14)

- 删除了 `syntax` 语法的选项和自动推断
- 不再支持Node.js 10 
- 删除了 13.7.0 中弃用的规则
- 删除`configOverrides` 选项



## 配置

### 配置文件

Stylelint 需要一个配置对象，并从以下位置查找：

- `stylelint.config.js` 或 `.stylelintrc.js` 文件
- `stylelint.config.mjs` 或 `.stylelintrc.mjs` 文件，使用 ESM 导出
- `stylelint.config.cjs` 或使用 `.stylelintrc.cjs` `module.exports` ，使用CommonJS 导出
- `.stylelintrc.json` 、 `.stylelintrc.yml` 或 `.stylelintrc.yaml` 文件
- `.stylelintrc` JSON或YAML格式的文件，推荐 JSON 格式
- `package.json`的 stylelint 属性

推荐使用`stylelint.config.js` 

### 行内配置

Stylelint 也提供了行内注释，但是不推荐使用

- `/* stylelint-disable */`，关闭当前文件内所有规则
- `/* stylelint-disable selector-max-id, declaration-no-important */`，关闭指定规则
- `/* stylelint-disable-line */`，关闭当前行的选择器的所有规则
- `/* stylelint-disable-line declaration-no-important */`，关闭当前行的css属性的指定规则
- `/* stylelint-disable-next-line declaration-no-important */`，关闭下一行的所有或指定规则

### .stylelintignore

忽略特定的文件和目录，纯文本文件，每一行都是一个 glob 模式的文件或目录路径

默认忽略node_modules



