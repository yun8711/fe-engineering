---
outline: deep
prev: false
next: false


---

<h1>release-it</h1><p>v16.1.3</p>

[github](https://github.com/release-it/release-it) | [文档](https://github.com/release-it/release-it/tree/main/docs)

示例：[axios](https://github.com/axios/axios/blob/v1.x/package.json)

参阅：[自动产出 changelog-第二节](https://segmentfault.com/a/1190000039813329#item-4) [第三节](https://segmentfault.com/a/1190000040567141)



## 介绍

release-it 用于简化发布流程并管理软件版本号，提供了一种易于使用的方法来自动升级版本号、生成变更日志、创建 git tag、上传文件到 npm 等操作，并且可以轻松地扩展和配置。

支持集成多种发布渠道和工具，例如 git、npm、GitHub、Slack 等，适合用于各种项目的版本控制和发布管理。

基于插件机制，将不同功能模块的配置通过不同的插件来处理，

<br/>

使用过程中发现它有几个特点：

- release-it 会把 package.json 中的 version 当作上一个版本号，然后根据 commit 信息自动计算应该升级的版本号
- 通过插件的方式控制各个功能的开启/停用，配置简单，易于控制，扩展性好
- release-it 提供的交互式的过程，通过命令行参数 --ci，可以进入静默模式
- 在 release-it 升级版本的最后一步，会把当前项目中所有未提交的文件全部 comiit



## 用法

使用 `npx release-it` 可以直接在项目中运行，但是默认情况下，它会要求你进行 npm log 等一系列操作，以便进行自动化发布，所以还是推荐在项目中安装，添加配置文件进行定制，在 npm scripts 中添加执行脚本。

官方推荐的初始化命令 `npm init release-it`，会让你选择把配置放在`.release-it.json`中，还是放在 package.json 中。注意：如果当前项目使用 pnpm 安装了依赖，再执行该命令时会失败。

**推荐以下方式使用**

全局或项目中安装均可：`pnpm add release-it -D`

在 package.js 中添加 script：

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "release": "release-it"
  },
  "devDependencies": {
    "release-it": "^15.10.0"
  }
}
```

在项目下添加 `.release-it.js`（其他类型也可以）配置文件，并按需求添加配置



## 插件

release-it 内置了以下几个[插件](https://github.com/release-it/release-it/tree/main/lib/plugin)，不需要额外安装，在配置文件中也可以直接配置：

- git：当前项目下有 `.git` 目录时，会启用该插件，也可以通过配置自定义
- github：当配置项中的 github.release 为 true 时启用，控制与 github 相关的行为
- gitlab：当配置项中的 gitlab.release 为true 时启用，控制与 gitlab 相关的行为
- npm：查找当前项目下的 package.json，控制与 npm 相关的行为
- version：始终启用，用来在版本升级时进行提示

其他一些插件需要单独安装，配置时需要在配置文件的 plugins 中单独配置，常见的有：

- [@release-it/bumper](https://github.com/release-it/bumper)：从任意文件中读写版本号
- [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog)：用于遵循 angular 规范的项目，生成与conventional-changelog-cli相同的 changelog 文件，配置方式也相同
- [@release-it/keep-a-changelog](https://github.com/release-it/keep-a-changelog)：使用 keep-a-changelog 标准的 commits 生成 changelog
- [@release-it-plugins/lerna-changelog](https://github.com/release-it-plugins/lerna-changelog)：将 lerna-changelog 集成到 release-it 中
- [@release-it-plugins/workspaces](https://github.com/release-it-plugins/workspaces)：按工作区进行配置和发布
- [release-it-calver-plugin](https://github.com/casmith/release-it-calver-plugin)：使用release-it启用日历版本控制（calver）
- [@grupoboticario/news-fragments](https://github.com/grupoboticario/news-fragments)：生成变更日志文件的简单方法
- [@j-ulrich/release-it-regex-bumper](https://github.com/j-ulrich/release-it-regex-bumper)：基于正则表达式的版本读/写插件

可以在 npm 上查看[所有release-it 插件](https://www.npmjs.com/search?q=keywords:release-it-plugin)



## 配置文件

[默认配置](./release-it-example)

支持的配置文件名列表：

- `.release-it.json`
- `.release-it.js`（或者`.cjs`；导出配置对象`module.exports = {}`：）
- `.release-it.yaml`（或`.yml`）
- `.release-it.toml`
- `package.json`（属性名为`release-it`）

### [git配置](https://github.com/release-it/release-it/blob/HEAD/docs/git.md)

release-it 内置的 git 插件，默认会执行以下操作：

1. 先决条件检查：git.requireBranch、git.requireCleanWorkingDir、git.requireUpstream、git.requireCommits
2. 项目文件可能通过其他插件或用度命令或 hook 进行更新
3. 执行：`git add . --update`，所以每次都会提交所有文件，没发现怎么跳过
4. 执行：`git commit -m "[git.commitMessage]"`
5. 执行：`git tag --annotate --message="[git.tagAnnotation]" [git.tagName]`
6. 执行：`git push [git.pushArgs] [git.pushRepo]`



### [@release-it/conventional-changelog](https://www.npmjs.com/package/@release-it/conventional-changelog)

让 release-it 生成符合 conventional-changelog 格式的 changelog 文件，配置项会传递给 [conventional-recommended-bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump#readme) and [conventional-changelog-core](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core#api)，有：

**`preset`**：指定预设，如 conventional-changelog 内置的 angular，也可以自定义，可用配置项见 [conventional-changelog-config-spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.1.0/README.md)

```
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {"type": "feat", "section": "✨ Features | 新功能"},
          {"type": "fix", "section": "🐛 Bug Fixes | Bug 修复"},
          {"type": "perf", "section":"⚡ Performance Improvements | 性能优化"},
          {"type": "revert", "section":"⏪ Reverts | 回退"},
          {"type": "chore", "section":"📦 Chores | 其他更新"},
          {"type": "docs", "section":"📝 Documentation | 文档"},
          {"type": "style", "section":"💄 Styles | 风格", "hidden": true},
          {"type": "refactor", "section":"♻ Code Refactoring | 代码重构"},
          {"type": "test", "section":"✅ Tests | 测试"},
          {"type": "build", "section":"👷‍ Build System | 构建"},
          {"type": "ci", "section":"🔧 Continuous Integration | CI 配置"}
        ],
      }
```

**`infile`**：默认：undefined，指定 changelog 输出的文件名，如果为 false，则不输出内容

**`header`**：changelog 文件的标题

**`ignoreRecommendedBump`** ?：默认：false，如果为 true，则忽略推荐的 bump，使用 release-it 提供的版本

**`strictSemVer`**：默认：false，是否严格遵守 semver 语义化版本规范

**`context`**：默认：undefined，该选项将作为第二个参数 ( `context`) 传递给  [convention-changelog-core](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-core#context)，

**`gitRawCommitsOpts`**：默认：undefined，传递给 [`git-raw-commits`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/git-raw-commits#api)的选项。

**`parserOpts`**：默认：undefined，传递给 [`conventional-commits-parser`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser#api)的选项。

**`writerOpts`**：默认：undefined，传递给 [`conventional-changelog-writer`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-writer#api)的选项。



### hooks

通过 hook 配置，可以在发布过程中的任何时候，通过 hook 来执行 shell 命令，格式：

```js
{
  hooks:{
     [prefix]:[hook]:""
 		 [prefix]:[plugin]:[hook]:""
  }
}
```

可用参数有：

| part   | value                                       |
| ------ | ------------------------------------------- |
| prefix | `before` or `after`                         |
| plugin | `version`, `git`, `npm`, `github`, `gitlab` |
| hook   | `init`, `bump`, `release`                   |

prefix：表示 Hook 执行时机，之前或之后

plugin：可选，表示hook 作用于某个插件，内置插件可以使用用它的名称；其他插件，使用插件的完整名称

hook：表示具体的钩子，



以下是一个配置示例，场景是：不发布到 npm，生成 conventional-changelog 风格的 changelog 文件。

```js
module.exports ={
  // npm 相关配置
  "npm":{
    publish:false,
    ignoreVersion: false,
  },
  // git相关配置
  git:{
    push: false,
    // 设置自定义标签
    tagName:'v${version}',
    // 是否使用使用分支的标签来确定最新标签，默认 false，即只考虑主分支
    getLatestTagFromAllRefs: true,
    // 指定release-it 运行时当前分支，可以用数组指定多个
    requireBranch:'master', // 只有在master 才可以运行release-it
    // 是否在运行release-it之前，保持工作区干净，也就是所有文件已提交
    requireCleanWorkingDir: false,
    // 是否需要上游分支，如果没有上游分支，git push 不知道如何推送。一般在git 未推送到远程前设置为false
    requireUpstream: false,
    // 是否允许空提交，也就是在发新版本前，到上个版本之间，必须有commit，默认为false，即允许空提交
    requireCommits: true, // 不允许空提交发版
    // 完成升级后，提交的消息
    commitMessage: "chore(release): 升级版本 ${version}",
  },
  hooks: {
    // 'before:init': 'git fetch --tags', // 在发布之前获取最新的 git tag
    // 'after:bump': 'git commit -am "chore: 升级版本 ${version}" && git tag v${version}', // 在升级版本后创建新的 git tag
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      // chnagelog 文件的标题
      "header": "# Changelog | 变更历史",
      // changelog 输出的文件
      "infile": "CHANGELOG.md",
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {"type": "feat", "section": "✨ Features | 新功能"},
          {"type": "fix", "section": "🐛 Bug Fixes | Bug 修复"},
          {"type": "perf", "section":"⚡ Performance Improvements | 性能优化"},
          {"type": "revert", "section":"⏪ Reverts | 回退"},
          {"type": "chore", "section":"📦 Chores | 其他更新"},
          {"type": "docs", "section":"📝 Documentation | 文档"},
          {"type": "style", "section":"💄 Styles | 风格", "hidden": true},
          {"type": "refactor", "section":"♻ Code Refactoring | 代码重构"},
          {"type": "test", "section":"✅ Tests | 测试"},
          {"type": "build", "section":"👷‍ Build System | 构建"},
          {"type": "ci", "section":"🔧 Continuous Integration | CI 配置"}
        ],
      }
    }
  }
}

```





## 命令行参数

`-c --config`：指定配置文件路径，默认`".release-it.json"`

`-d --dry-run`：试运行，不创建或写入任何命令，只显示指令的执行

`-i --increment`：增加 "major"、"minor"、"patch" 或 "pre*"版本，也可以指定版本；默认为"patch"

`--ci`：静默默式，没有提示，没有用户交互。一般在 CI/CD 环境中自动激活，或者每次提交时不想回答问题

`--only-version`：只提示版本，没有更多的交互

`--release-version`：打印要发布的版本号

`--changelog`：打印要发布的 changelog

`-V --verbose`：打印每个用户定义的 hooks 输出

`-VV`：额外的详细输出，会打印每个内部命令的输出

？？--no-npm：跳过 npm publish

其他大部分命令行参数与配置文件中的配置相对应，比如 git.requireBranch 配置项，在命令行中可写为：`--git.requireBranch=main`，`--no-xxx.xxx`，用来表示取反

<br/>



