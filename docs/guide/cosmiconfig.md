---
outline: deep
prev: false
next: false

---

<h1>Cosmiconfig</h1>

[github](https://github.com/cosmiconfig/cosmiconfig)

### 介绍

cosmiconfig 是一个 JavaScript 库，用于在应用程序中**搜索并加载**配置文件。它可以自动搜索应用程序目录及其祖先目录中的各种常见配置文件格式（如 JSON、YAML、INI 等），并返回包含解析后配置信息的 JavaScript 对象。

cosmiconfig 最初由 James Kyle 在 2016 年创建，并在当时发布了第一个版本。

它是基于早期的 Nconf 库开发的，旨在提供一种更加简单和灵活的配置文件加载方案。自从发布以来，受到越来越多的关注和使用，特别是在 Node.js 和 JavaScript 生态系统中，它已经成为一个广泛使用的工具之一。

<br/>

### 优势

它流行的原因有以下几点：

1. 基于约定大于配置的原则，大幅简化了应用程序的配置文件查找和读取过程，避免了手动处理路径等细节。
2. 支持多种格式的配置文件，如 JSON、YAML、INI 等，满足不同项目和场景的需求。
3. 可以通过插件机制进行扩展，支持自定义的配置文件格式和解析方式。
4. 可以根据应用程序运行时的环境变量或命令行参数来指定特定的配置文件，实现灵活的配置管理。

<br/>

一些非常流行的库都使用了 Cosmiconfig 的插件：

- Prettier
- ESLint
- Jest
- TypeScript
- Stylelint
- PostCSS

**注意**：每个插件仍然有自己独特的配置选项和语法规则

<br/>

### 如何工作

默认情况下，Cosmiconfig 将从指定的起始位置开始搜索，并向上遍历目录树，搜索以下内容（顺序即优先级）：

- package.json 文件中指定的 `myapp` 属性
- JSON 或 YAML 格式编写的，无扩展名的 ".rc" 文件，如：`.myapprc`
- 扩展名为 `.json`、`.yaml`、`.yml`、`.js`、`.mjs` 或 `.cjs` 的 ".rc" 文件，如：`.myapprc.json`
- 位于 `.config` 子目录内的，符合上面两项格式的配置文件
- `.config.js`、`.config.mjs` 或 `.config.cjs` 文件

Cosmiconfig 会继续向上遍历目录树，在每个目录中检查这些位置，直到找到可接受的配置（或命中主目录）。

<br/>

需要注意的是，cosmiconfig 已经被标记为不推荐使用，因为它存在一些缺陷，比如性能较低，无法识别复杂的 JSON 文件等。取而代之，建议使用更加强大和高效的配置库和工具，例如 dotenv、rc 或者 yargs 等。
