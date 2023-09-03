---
outline: deep
prev: false
next: false


---

<h1>conventional-changelog</h1><p>v3.0.0</p>

[github](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#readme) 



## 快速使用 

全局安装命令行工具：

```
pnpm install -g conventional-changelog-cli
```

可以直接在命令行使用，也可以添加 npm script

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  },
  ...
}
```

由于该工具不负责管理版本号，所以一般需要配合 npm version 让这个过程更加自动化

```json
"scripts": {
  "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
}
```

这样，在执行 npm version 进行版本号变更后，就会触发 script version，自动执行命令并生成 changelog



## 推荐的工作流

1. 编辑代码，添加新功能或者修复 bug；
2. 完成某个功能后进行 commit，使用 czg 来提交规范化的 commit 信息
3. 继续完成其他的功能，并每完成一个功能后及时提交标准化的 commit，直到你想要发版为止；
4. 执行 `npm version xxx` 生成新的版本号，这时 CHANGELOG 和版本号都会自动进行迭代；
5. 执行 `npm publish --access public` 进行版本发布

使用 conventional-changelog-cli 的体验是：够用，生成 changelog 基本没问题，但是是版本号升级，打标签，最后的 push 等还是需要自己手动处理，整个过程不够自动化。



## 命令行参数

通过 `conventional-changelog --help`查看所有支持的命令行参数：

`-i, --infile`：指定要读取的模板文件，应该是一个.hbs 文件，默认不指定，则使用工具内置的模板

`-o, --outfile`：指定写入的生成的changelog文件

`-s, --same-file`：生成的 changelog 输出到与 infile 指定的相同的文件，这样就可以不用写 outfile 参数

`-p, --preset`：要使用的预设项的名称。必须是下列之一：angular、atom、codemirror、conventionalcommits、ember、eslint、express、jquery、jshint，一般使用 angular 即可

`-k, --pkg`：指定 package.josn 的路径，默认使用 path.cwd()，也就是当前所在目录

`-a, --append`：新版本是否应该添加到旧版本中，默认 false，意思就是新生成的 changelog 是附加到现有文件中，还是覆盖原来的内容

`-r, --release-count`：从最新版本生成多少版本的 changelog，默认值为 1，如果为0，则整个更改日志将重新生成，outfile将被覆盖。**注意**：必须启用Git提交历史记录的排序，以便能够正确地按照日期顺序选择最近的版本，可以通过传递`--commit-path`参数来指定要生成changelog的Git存储库路径，从而确保对提交进行正确排序

`--skip-unstable`：默认为 false，设置为 true 时，会跳过不稳定版本（如beta、alpha、rc 等），在生成的changelog中不显示这些非正式版本。

`-v, --verbose`：默认 false，一般在调试时使用，用于在控制台上输出更详细的信息，包括正在处理哪些提交、解析哪个模板等

`-n, --config`：配置文件路径，例如：`https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-cli/test/fixtures/config.js`

`-c, --context`：用于设置changelog模板所需的上下文变量。可以使用此参数将自定义数据传递给模板，以便在生成changelog时使用。应该是一个有效的JSON文件，其中包含要传递给模板的属性和值。您可以从模板中访问这些值，并根据需要进行呈现。通过启用此选项并传递自定义上下文文件，可以自定义生成的changelog的样式

`-l, --lerna-package`：一般用于在 lerna 管理的 monorepo 项目中，指定为某个特定的包生成日志

`-t, --tag-prefix`：用于指定 git 中的 tag 的前缀，默认情况下，假定没有前缀

`--commit-path`：指定要生成changelog的Git存储库路径，默认情况下不需要指定，工具可以直接访问存储库

<br/>



## 配置文件

通过 `-n` 参数来指定配置文件，配置项是在 [conventional-changelog-core](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-core/README.md) 中规定的，配置项如下：

```js
// changelog-options.js

const compareFunc = require('compare-func')
module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })
      if (commit.type === 'feat') {
        commit.type = '✨ Features | 新功能'
      } else if (commit.type === 'fix') {
        commit.type = '🐛 Bug Fixes | Bug 修复'
      } else if (commit.type === 'perf') {
        commit.type = '⚡ Performance Improvements | 性能优化'
      } else if (commit.type === 'revert' || commit.revert) {
        commit.type = '⏪ Reverts | 回退'
      } else if (discard) {
        return
      } else if (commit.type === 'docs') {
        commit.type = '📝 Documentation | 文档'
      } else if (commit.type === 'style') {
        commit.type = '💄 Styles | 风格'
      } else if (commit.type === 'refactor') {
        commit.type = '♻ Code Refactoring | 代码重构'
      } else if (commit.type === 'test') {
        commit.type = '✅ Tests | 测试'
      } else if (commit.type === 'build') {
        commit.type = '👷‍ Build System | 构建'
      } else if (commit.type === 'ci') {
        commit.type = '🔧 Continuous Integration | CI 配置'
      } else if (commit.type === 'chore') {
        commit.type = '🎫 Chores | 其他更新'
      }


      if (commit.scope === '*') {
        commit.scope = ''
      }
      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)

      }
      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }

            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })
      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
```





## [standard-version](https://github.com/conventional-changelog/standard-version/blob/master/README.md)

standard-version 是 conventional-changelog 推荐使用的标准化 npm 版本生成工具，可以取代 `npm version` 指令，自动执行升级版本号、打标签等操作，并提供更简便、语义化的调用方式。

集成了 conventional-chagelog，在生成版本号时会自动创建 CHANGELOG，可以省去我们自己配置 conventional-chagelog-cli 的过程；

此外它还提供了配置文件，你可以很方便的自定义 CHANGELOG 的输出。

但是，`standard-version` 在某些情况下可能会存在一些问题，例如无法自动识别 merge commit等，因此官方弃用了。同时也推荐了另外的工具：release-please 和 semantic-release。

它们都解决了 standard-version 的一个痛点，**那就是 standard-version 的工作流基于本地**，开发人员需要本地进行版本迭代、npm 发布的行为。但是由于 CICD 的流行，似乎在 CI 上进行 npm 包的版本迭代与发布更为合适，这样就不会造成多个开发人员并行开发时版本冲突的问题了，**目的都是将人为干预的版本迭代和发包行为，转移到标准化的、可持续的 CI 平台上完成**。

*standard-version 调用示例*

```
pnpm dlx standard-version --dry-run 

// 执行过程
✔ bumping version in package.json from 1.0.0 to 2.0.0
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md

// 输出

---
## 2.0.0 (2023-07-28)


### ⚠ BREAKING CHANGES

* 🧨 true

### Features

* 功能二 cd80eda
* 完成功能一 1cc8641


### Bug Fixes

* 🐛 修改功能一1 caacce6
* 修改功能一 46e46f1


* 💡 重构1 485ef7c
---
```

关于 standard-version 使用、配置的更多经验，参阅：[自动产出 changelog](https://segmentfault.com/a/1190000039813329)
