---
outline: deep
---

<h1>.npmrc 配置</h1><p>v8.14.0（2024-02）</p>

[pnpm - npmrc](https://pnpm.io/zh/npmrc) | [npm - npmrc](https://docs.npmjs.com/cli/v9/using-npm/config)

<br/>

虽然 `.npmrc ` 是 npm 的配置文件，但 pnpm 兼容 npm 的绝大多数功能，也会从`.npmrc` 文件中读取参数，所以它对 pnpm 也有影响。

<br/>

下面所列配置并不包含全部配置项，只列出使用较多、比较关键的项目，完整配置查看文档



## 依赖提升设置

### hoist

默认值： `true`，类型： `boolean`

当 hoist 为 `true` 时，所有依赖项都会被提升到 `node_modules/.pnpm/node_modules`。 这使得 `node_modules`所有包都可以访问 未列出的依赖项。

<br/>

### hoist-workspace-packages（v8.14.0）

默认值： `true`，类型： `boolean` ，是否提升 workspace 中的依赖

当为 true 时，工作空间中的包被符号链接到`<workspace_root>/node_modules/.pnpm/node_modules`或`<workspace_root>/node_modules`，取决于其他提升设置 `hoist-pattern` 和 `public-hoist-pattern` 。

也就是说，在 pnpm 管理的 monorepo 项目中，默认情况下每个 workspace 下的依赖，都会全部被提升到项目根目录下。

<br/>

### hoist-pattern

默认值： `['*']`，类型： `string[]`

指定哪些包应该被提升到 `node_modules/.pnpm/node_modules` 

>  node_modules 下的 `.pnpm`是 pnpm 的内部数据目录，对外不可见，也就不能在项目中引用这里的包。

默认情况下，所有包都被提升，但是，如果您知道只有某些有缺陷的包具有幻影依赖，您可以使用此选项专门提升幻影依赖（推荐做法）。

*示例*

```ini
hoist-pattern[]=*eslint*
hoist-pattern[]=*babel*
hoist-pattern[]=*types*
hoist-pattern[]=!@types/react
```

<br/>

### public-hoist-pattern

默认值： `['*eslint*','*prettier*']`，类型： `string[]`

指定哪些包应该被提升到 `node_modules/`目录下，也就是提升到了项目中 node_modules 的根目录下，它们可以在项目中正常导入

*示例*

```ini
public-hoist-pattern[]=*plugin*
public-hoist-pattern[]=*types*
public-hoist-pattern[]=!@types/react
```

**注意**：如果 `shamefully-hoist=true` ，就相当于设置 `public-hoist-pattern=*` 

<br/>

### shamefully-hoist

默认值： `false`，类型： `boolean`

控制是否将所有的依赖都提升到项目的 `node_modules` 目录下

默认情况下，pnpm 创建一个半严格的 `node_modules`，只有 `node_modules`中的依赖项可以访问未声明的依赖项，但 `node_modules` 之外的模块不行，比如不允许直接在项目中访问未在 package.json 中声明的依赖。这种结构下，大多数的包都可以正常工作。 但是，如果某些工具仅在提升的依赖项位于根目录的 `node_modules` 时才有效，您可以将其设置为 `true` 来为您提升它们。

**注意**：pnpm 并不推荐这么做，像 npm 一样，扁平化的目录结构会造成一些问题。



## Node 模块设置

### modules-cache-max-age

默认值： `10080`（以分钟为单位，7 天），类型： `number`

孤立包应该从模块目录中被删除的时间（以分钟为单位）。 pnpm 在模块目录中保存了一个包的缓存。 切换分支或降级依赖项时，这会提高安装速度。



## 锁文件设置 

### lockfile

默认值： `true`，类型： `boolean`

是否读取或生成`pnpm-lock.yaml`文件

<br/>

### lockfile-frozen-lockfile

默认值： `true`，类型： `boolean`

当设置为 `true` 并且存在 `pnpm-lock.yaml` 并满足 `package.json` 中的依赖关系时，执行无头安装。 无头安装会跳过所有依赖项解析，因为它不需要修改lockfile。

<br/>

### git-branch-lockfile

默认值： `false`，类型： `boolean`

作用是在使用 git 切换分支时，自动更新或恢复对应分支的 pnpm-lock.yaml 文件。这样可以确保每个分支的依赖项版本都是一致的，避免因为依赖项版本不一致导致的问题。

开启该配置后，使用 git checkout 切换分支时，git-branch-lockfile 会自动执行以下操作：

- 在当前分支，如果 pnpm-lock.yaml 文件有修改，它会自动提交这些修改。
- 切换到新的分支后，如果新分支的 pnpm-lock.yaml 文件与当前的文件不一致，它会自动执行 pnpm install 来更新依赖项。

这样，每个分支都会有自己独立的 pnpm-lock.yaml 文件，确保了依赖项版本的一致性。

<br/>

### merge-git-branch-lockfiles-branch-pattern

默认值： `null`，类型： `Array`或`null`

当 `git-branch-lockfile=true`时，会在每个分支创建一个锁文件，当需要把多个锁文件合并时，可以通过该配置自动完成，

```yaml
merge-git-branch-lockfiles-branch-pattern[]=main
merge-git-branch-lockfiles-branch-pattern[]=release*
```

上面配置的意思是，当分支名为 main 或者 release 开头时，会自动合并各个分支的锁文件。

一般情况下，都是通过 `--merge-git-branch-lockfiles` 参数手动完成



## 注册源&身份验证设置

### registry

默认值： `https://registry.npmjs.org/`，类型： `url`

指定 npm 包注册源的基础 url，需要包括末尾的斜杠。使用 **`<scope>:registry`** 格式，可以指定作用域包的基础 url，比如：`@babel:registry=https://example.com/packages/npm/`，



## PeerDependency 设置

### auto-install-peers

默认值： `true`，类型： `boolean`

是否自动安装缺少的非可选 PeerDependency

**版本冲突**

如果不同包所依赖的 `peerDependencies` 存在版本冲突，pnpm 不会自动安装任何版本，而是打印一个警告。例如，如果一个依赖项需要 `react@^16.0.0`，而另一个依赖项需要 `react@^17.0.0`，pnpm 不会自动安装。

**解决冲突**

如果出现版本冲突，需要评估自己要安装哪个版本，或者更新依赖以调整它们的 `peerDependencies`

<br/>

### strict-peer-dependencies

默认值： `false`，类型： `boolean`

如果启用了此选项，那么在依赖树中存在缺失或无效的 peer 依赖关系时，命令将执行失败

<br/>

### resolve-peers-from-workspace-root

默认值： `true`，类型： `boolean`

启用后，将会使用根工作区项目的 dependencies 解析其他工作区项目的 peer dependencies 。 这是一个有用的功能，因为你可以只在工作区的根目录中安装 peer dependencies，并且确保工作区中的所有项目都使用相同版本的 peer dependencies 



## 命令行设置

### [no-]color

默认值： `auto`，类型： `auto,always,never`

设置控制台输出的颜色

- **auto**：当标准输出是终端或 TTY 时，输出会带有颜色
- **always**：忽略终端和 pipe 之间的区别。 一般不需要这个选项；在大多数情况下，如果您想在重定向的输出中使用颜色代码，您可以将 `--color` 标志传递给 pnpm 命令以强制它输出颜色
- **never**：关闭颜色，作用与 `--no-color` 相同

<br/>

### recursive-install

默认值： `true`，类型： `boolean`

是否在所有工作区或子包上执行安装操作，如果为 true，执行 `pnpm install` 时的行为将变为 `pnpm install -r`

<br/>

### engine-strict

默认值： `false`，类型： `boolean`

用于控制 pnpm 是否应严格遵守 package.json 的 engines 字段指定的版本要求

设置为 true 时，如果当前环境的 node.js 版本、包管理器版本不符合 engines 字段的要求，会停止执行命令，比如`install`或者 `add <pkg>`。

设置为 false 时，pnpm 会显示一个警告，但是仍然会继续执行

<br/>

### npm-path

类型：`path`

Pnpm 用于某些操作（例如发布）的 npm 的二进制文件的位置。



## 构建设置

### ignore-scripts

默认值： `false`，类型： `boolean`，是否忽略 `package.json `及其依赖中定义的 scripts 脚本

也就不会执行这些脚本，一般会在 CI/CD 场景下通过命令行指定

**注意**：不会阻止 `pnpmfile.cjs` 的执行

<br/>

### ignore-dep-scripts

默认值： `false`，类型： `boolean`

不执行已安装的包中定义的任何 scripts 脚本，只执行当前项目的 scipts



## Node.js 设置

### use-node-version

默认值： `undefined`，类型： `semver`

指定项目运行时的确切 Node.js 版本。 pnpm 将自动安装指定版本的 Node.js 并将其用于执行 `pnpm run` 命令或 `pnpm node` 命令

可以代替 `.nvmrc` 和 `nvm`

<br/>

### node-version

默认值： `node -v`的返回值，不还 v 前缀，类型： `semver`

检查 package 的 `engines` 设置的 Node.js 版本，并阻止在项目中安装与指定的 nodejs 版本不兼容的依赖。

例如有如下配置：

```ini
node-version=12.22.0
engine-strict=true
```

这样，就无法安装不支持 Node.js v12.22.0 的新依赖项

<br/>

### `node-mirror:<releaseDir>`

默认值： `https://nodejs.org/download/<releaseDir>/`，类型： `url`

设置用于下载 Node.js 的基本 URL，示例如下：

```
node-mirror:release=https://npmmirror.com/mirrors/node/
node-mirror:rc=https://npmmirror.com/mirrors/node-rc/
node-mirror:nightly=https://npmmirror.com/mirrors/node-nightly/
```



## 工作空间设置

与 monorepo 工作空间相关的设置

### link-workspace-packages

默认值： `true`，类型：`true,false,deep`

是否允许创建工作空间符号链接

当设置为 true 时，它会在同一工作空间的包之间创建符号链接。这意味着如果你在同一工作空间中有多个包，并且它们互相依赖，那么 pnpm 将会创建符号链接，使得这些包可以直接引用彼此的源代码，而不是从 node_modules 中引用已发布的版本。  这对于在开发过程中需要在多个包之间进行快速迭代和测试的场景非常有用。

例如，如果你正在开发一个库，并且同时也在开发使用该库的应用，那么你可能希望在库的代码发生变化时，应用能够立即看到这些变化，而不需要先发布库，然后再在应用中更新依赖

这个配置项就是在 monorepo 项目中，可以使用`workspace:*`的形式引用子包

<br/>

### prefer-workspace-packages

默认值： `false`，类型： `boolean`，用于控制 pnpm 在安装依赖时的行为。 

设置为 true 时，如果工作空间中的其他包已经安装了一个依赖包的版本，那么 pnpm 会优先使用这个已安装的版本，而不是去下载一个新的版本。这可以帮助保持工作空间中的包使用相同版本的依赖，从而避免版本冲突。

如果为 false，那么 pnpm 在安装依赖时将不会考虑工作空间中的其他包已经安装了哪些版本，而是根据 package.json 中的版本范围去下载最新的符合条件的版本。

<br/>

### shared-workspace-lockfile

默认值： `true`，类型： `boolean`，控制在 monorepo 项目中是否共享 pnpm-lock.yaml 文件

设置为 true 时，pnpm 会在工作空间的根目录下创建一个共享的 pnpm-lock.yaml 文件，所有的子包都会使用这个共享的锁定文件。这意味着所有的包都会使用相同版本的依赖，这有助于保持整个工作空间的依赖版本一致。

如果为 false，那么 pnpm 将会为每个子包创建一个独立的 pnpm-lock.yaml 文件。这意味着每个包可以有自己的依赖版本，这可能会导致工作空间中的包使用不同版本的依赖。

**注意**：尽管所有依赖项都硬链接到根目录node_modules中，但子包中也只能访问在其包中声明的依赖项。因此pnpm的严格性得以保留。这是前面提到的符号链接的结果。

<br/>

### save-workspace-protocol

默认值： `rolling`，类型： `true,false,rolling`，控制在 monorepo 项目中如何保存子包之间的依赖关系

不同取值对应的 spec 创建方式如下：

| save-workspace-protocol | save-prefix | spec               |
| ----------------------- | ----------- | ------------------ |
| false                   | `''`        | `1.0.0`            |
| false                   | `'~'`       | `~1.0.0`           |
| false                   | `'^'`       | `^1.0.0`           |
| true                    | `''`        | `workspace:1.0.0`  |
| true                    | `'~'`       | `workspace:~1.0.0` |
| true                    | `'^'`       | `workspace:^1.0.0` |
| rolling                 | `''`        | `workspace:*`      |
| rolling                 | `'~'`       | `workspace:~`      |
| rolling                 | `'^'`       | `workspace:^`      |

<br/>

### include-workspace-root

默认值： `false`，类型： `boolean`，是否在安装工作空间的依赖时包含工作空间的根目录。

在工作区中递归执行命令时，也在根工作区项目上执行它们。

设置为 true 时，pnpm 在安装工作空间包的依赖时，会同时安装工作空间根目录下的 package.json 文件中声明的依赖。这意味着如果你在工作空间的根目录下声明了一些依赖，那么这些依赖也会被安装到每个工作空间包的 node_modules 目录中。

<br/>

### ignore-workspace-cycles（v8.1.0）

默认值： `false`，类型： `boolean`，是否忽略工作空间中的循环依赖

在 monorepo 项目中，可能会出现包 A 依赖包 B，包 B 又依赖包 A 的情况，形成了一个循环依赖。默认情况下，pnpm 会检测到这种循环依赖，并抛出一个错误。

如果设置为 true，pnpm 会忽略这种循环依赖，不抛出错误，可能对于某些特殊的项目结构有用，但是应该避免这种情况

<br/>

### disallow-workspace-cycles（v8.9.0）

默认值： `false`，类型： `boolean`，是否禁止工作空间中的循环依赖

如果设置为 true，pnpm 会禁止循环依赖，抛出错误，并停止安装过程

