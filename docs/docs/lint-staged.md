---
outline: deep
---

<h1>lint-staged</h1><p>v15.5.5</p>

[github](https://github.com/okonet/lint-staged)



## 介绍

lint-staged 是一个 Git 钩子工具，利用它可以针对暂存区的文件运行 linters。

默认情况下，在项目中运行 linter 时会对整个项目去做 lint，速度较慢，因为我们只需要在代码提交前，对修改的代码进行 linting 更有意义，而且 linting 的结果可能也不关注。

lint-staged 包含一个脚本，该脚本将运行任意 shell 任务，并以暂存文件列表作为参数，并按指定的 glob 模式进行过滤。

<br/>

## 用法

1、安装

`pnpm add -D lint-staged`

2、设置`pre-commit` 钩子

```shell
// .husky/pre-commit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node_modules/lint-staged/bin/lint-staged.js
```

3、安装一些 linter 工具，如 ESLint 或 Prettier

4、增加 lint-staged 配置，用来运行 linter 和一些其他的任务



## 配置

Lint-staged 可以通过多种方式进行配置：

- 在 package.json 中添加 lint-staged 属性
- 在项目根目录添加单独的配置文件：
  - `.lintstagedrc`或 `.lintstagedrc.json/yaml/yml`
  - 支持 ESM 规范的文件：`.lintstagedrc.js`或`.lintstagedrc.mjs`或`lint-staged.config.mjs`
  - 支持 CJS 规范的文件：`.lint-staged.js`或`.lint-staged.cjs`或`lint-staged.config.cjs`
  

配置应该是一个对象，其中每个值都是要运行的命令，其键是应用该命令的 glob （micromatch）。

**示例**

（1）element-plus

_package.json_

``` json
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx,md,json}": "eslint --fix"
  }
```

_.husky/pre-commit_

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec lint-staged
```

上述配置的意思是：在提交代码时，会触发 husky 的 pre-commit 钩子，调用 lint-staged 这个全局命令，lint-staged 会根据 package.json 中的配置，对指定的代码进行 eslint 检查

（2）[Geeker-Admin](https://github.com/HalseySpicy/Geeker-Admin)

_lint-staged.config.cjs_

```js
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"],
};
```
