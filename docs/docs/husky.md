---
outline: deep
prev: false
next: false

---

<h1>Husky</h1><p>v8.0.3</p>

[官网](https://typicode.github.io/husky/) | [github](https://github.com/typicode/husky) 



## 介绍

Husky是一个非常流行的 Git hook 管理器，它可以让你在代码提交或推送到远程仓库之前运行命令。比如：当我们本地进行git commit或git push等操作前，能够执行 ESLint 检查，如果不通过，就不允许commit 或 push。

使用Husky，你可以轻松地处理诸如代码格式化、静态分析、单元测试等任务。Husky还支持多种Git钩子，包括pre-commit、commit-msg、pre-push等，使得它可以适应不同的开发场景。

<br/>

### husky解决了什么问题

原生 git hooks 主要的问题是 git 无法跟踪 .git/hooks 下的文件，但是这个问题已经被 git core.hooksPath 解决了，那么新的问题就是，开发者仍然需要手动设置 git core.hooksPath

husky 在 install 命令中帮助我们设置了 git core.hooksPath，然后在 package.json 的 scripts 中添加 `"prepare": "husky install"`，这样每次安装husky的时候就会执行 `husky install`，来保证设置的 git hooks 可以被触发了。

> `prepare`是npm的一个脚本命令，它是在安装和发布npm包时自动执行的一个钩子函数
>
> <br/>
>
> 使用`npm install`命令安装某个包时，`prepare`脚本会在包下载之后、安装之前自动执行；而当我们使用`npm publish`命令发布某个包时，`prepare`脚本会在打包之前自动执行

## 用法

自动安装、初始化、添加 pre-commit 示例 hook：`pnpm dlx husky-init && pnpm install`

手动添加 hook：`npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`

卸载：`npm uninstall husky && git config --unset core.hooksPath`

**注意**：必须使用 `pnpm dlx husky-init` 这种方式进行初始化，创建项目中的 .husky 目录，不要从其他项目进行复制，否则会出现意外情况，比如在 webstrom 中，编辑器无法识别 git hook，没有 git hook 选项

更多内容参考[官网](https://typicode.github.io/husky/getting-started.html)

<br/>

### husky install

它是解决 git hooks 问题的关键

1. 第一步：`husky install` 会在项目根目录下创建`.husky`以及`.husky/_`目录（也可以自定义），然后在`.husky/_`目录下创建`husky.sh`脚本文件。这个文件的作用就是保证通过husky 创建的脚本能正常运行。
2. 第二步：`husky install` 会运行`git config core.hooksPath ${path/to/hooks_dir}`，这个命令指定git hooks的路径，此时项目下`.git/config`文件，`[core]`下会多出一条配置：`hooksPath=xxx`，当git hooks被某些命令触发时，git会运行`core.hooksPath`指定的目录下的 git hook。

<br/>

### husky add

当运行如下命令：`npx husky add .husky/pre-commit vue-cli-service lint --fix`

.hushky 目录下会新增一个 pre-commit 文件，文件内容为：

```sh 
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

vue-cli-service lint --fix
```

此时成功添加了一个pre-commit的git hook，这个脚本会在运行git commit命令时执行。在脚本第二行，引用了上面所说的`.husky.sh`文件，也就是说通过husky创建的git hook在被触发时，都会执行这个脚本



## 配置

husky 一般都会配置其他工具一起使用，比如：commitlint、lint-staged，常见的场景有：

（1）在提交代码前，对修改的代码进行 lint

*.husky/pre-commit*

```ini
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:lint-staged
```

*packages.json*

```json
{
	"scripts":{
    "lint:lint-staged": "lint-staged"
  }
}
```

*lint-staged.config.js*

```js
module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};
```

（2）在 push 代码前，借助 commitlint 检查提交信息格式

*.husky/commit-msg*

```ini
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```



## 其他 

其他类似的 git hook 工具：

- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)：轻量（0 依赖）、体积小（10.1kB）、配置少的 git hook 工具
- [pre-commit](https://github.com/observing/pre-commit)：预提交 hook
