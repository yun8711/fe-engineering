---
outline: deep
---

<h1>markdownlint</h1><p>v0.39.0（2024-02）</p>

[github](https://github.com/DavidAnson/markdownlint/tree/main)

## 介绍

markdownlint 是用于 Markdown/CommonMark 文件的语法和样式 lint 工具。用于保持一致的 Markdown 格式，并避免一些常见的错误。Markdownlint提供了一系列的规则，每个规则都对应一个特定的Markdown语法或样式问题。

它的灵感来自 Mark Harrison 为 Ruby 设计的 markdownlint，最初的规则、文档、测试用例都来自于该项目。

<br/>

mrkdownlint 本身只是一个 lint 检查器，提供了一系统规则，使用时还需要相关的 cli 工具来调用它。

- [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)：markdownlint 的命令行界面
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)：一个稍微非常规的命令行界面，基本配置，优先考虑速度和简单性，支持所有 markdownlint-cli 功能，旨在与 vscode-markdownlint（VS Code 的 `markdownlint` 扩展） 能很好的结合使用



## 用法

这里使用 markdownlint-cli

### 安装

```shell
pnpm add -D markdownlint

pnpm install -g markdownlint-cli
# 在 macos上，还可以通过 Homebrew 安装
brew install markdownlint-cli
```

<br/>

### 配置文件

在项目根目录下创建配置文件 `.markdownlint`，支持的格式有：

- `.markdownlintrc`：只支持 INI 和 JSON 语法，且不能有扩展名
- `.markdownlint.jsonc`、`.markdownlint.json`、`.markdownlint.yaml`、 `.markdownlint.yml`
- `.markdownlint.js`、`.markdownlint.cjs`，只支持 commonjs 规范导出配置

*示例*

```json
{
  "default": true,
  "MD003": { "style": "atx_closed" },
  "MD007": { "indent": 4 },
  "no-hard-tabs": false,
  "whitespace": false
}
```

<br/>

### 忽略配置

可以使用`.markdownlintignore` 文件来指定要忽略的文件和目录，如果不存在将根据 `.gitignore` 的规则来忽略文件 和目录。

cli 命令中可以使用 `-p/--ignore-path` 选项指定忽略配置文件



### 调用

在实际项目中，一般全局安装 `markdownlint-cli` 即可，然后增加一个调用命令，比如：

```json
"scripts": {
  "lint:markdown": "markdownlint \"**/*.md\""
}
```

或者也可以配合 lint-staged 一起使用

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.md": "markdownlint"
  }
}
```





## CLI 选项

查看[文档](https://github.com/igorshubovych/markdownlint-cli?tab=readme-ov-file#usage)
