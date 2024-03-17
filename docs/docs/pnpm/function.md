---
outline: deep
---

<h1>pnpm重要功能</h1><p>v8.14.0（2024-02）</p>



## 工作空间

monorepo 也称为多包存储库、多项目存储库或单体存储库，是现在很多基础类库主流的代码仓库管理模式，可以将多个项目合并到一个仓库中，**这样的作用是能在我们开发调试多包时，彼此间的依赖引用更加简单。**

pnpm 内置了对 monorepo 的支持，可以创建一个 workspace 以将多个项目合并到一个仓库中。

工作空间是一种管理多个包的方式，它可以让你在一个父目录下统一管理多个子包的依赖和版本号等信息。

<br/>

### Workspace 协议（workspace:）

pnpm 的 workspace 协议是一种特殊的依赖关系声明方式，用于在同一工作区的不同包之间建立依赖关系

```json
{
  "dependencies": {
    "packageA": "workspace:*"
  }
}
```

上述配置中，这将使 packageB 依赖于工作区中的 packageA。当你在 packageB 中运行 pnpm install 时，pnpm 将会链接到工作区中的 packageA，而不是从 npm 仓库中下载 packageA。

这种方式的好处是，当你在开发多个相互依赖的包时，你可以立即看到对其他包的更改，而无需发布和重新安装这些包。这对于大型项目和 monorepo 非常有用。

在[`.npmrc`](./npmrc.md#工作空间设置)中，通过一些配置，可以改变 pnpm 管理工作空间的一些行为

<br/>

**通过别名引用 workspace 包**

假设你在 workspace 中有一个名为 `foo` 的包，默认情况下会像这样引用：`"foo": "workspace:*"`

也可以使用别名：`"bar": "workspace:foo@*"`

在发布之前，别名会被转换为常规名称，上面的示例将变为：`"bar": "npm:foo@1.0.0"`

<br/>

**通过相对路径引用 workspace 包**

例如 workspace 中有 foo、bar两个包，`bar` 中依赖 `foo` 时可以写为： `"foo": "workspace:../foo"`， 在发布之前，这些将转换为所有包管理器支持的常规版本规范。

<br/>

**发布 workspace 包**

当 workspace 包被发布或者归档（无论它是通过 `pnpm pack` ，还是 `pnpm publish` 之类的发布命令）时，将动态替换这些 `workspace:` 依赖。

这个功能让开发者可以发布转化之后的包到远端，并且在本地开发时还可以正常使用 workspace 中的 packages，而不需要其它中间步骤。包的使用者也可以像常规的包那样正常使用。

比如，workspace 中有 `foo`、 `bar`、 `qar`、 `zoo` 并且它们的版本都是 `1.5.0`，如下：

```json
{
    "dependencies": {
        "foo": "workspace:*",
        "bar": "workspace:~",
        "qar": "workspace:^",
        "zoo": "workspace:^1.5.0"
    }
}
```

将被转化为：

```json
{
    "dependencies": {
        "foo": "1.5.0",
        "bar": "~1.5.0",
        "qar": "^1.5.0",
        "zoo": "^1.5.0"
    }
}
```

<br/>

### pnpm-workspace.yaml 配置

一个 workspace 的根目录下必须有 [`pnpm-workspace.yaml`](https://pnpm.io/zh/pnpm-workspace_yaml) 文件，它是用来定义 pnpm 工作空间（workspace）的配置文件，书写格式遵循 [YAML](/general/text-format) 格式规范，配置项有：

1、packages：（最主要配置）数组，用来列出所有子包名称，格式可以为：

- `packages/*`：表示所有位于 `packages `目录下的直接子目录都是一个子包
- `conponents/**`：表示匹配所有位于 `components` 目录下的子目录，包括嵌套
- `!**/test/**`：排除测试目录中的包

*以下回答来自 github copilot*

2、link-workspace-packages：布尔值，默认 true。用于控制是否在工作区的包之间创建符号链接。如果设置为 true，则 pnpm install 会在工作区的包之间创建符号链接，以便它们可以相互访问。

3、shared-workspace-lockfile：布尔值，默认 true。用于控制是否使用一个共享的 pnpm-lock.yaml 文件来锁定工作区中所有包的依赖版本。如果设置为 true，则所有包将共享一个锁定文件，这可以确保在整个工作区中使用相同的依赖版本。

<br/>

### 实战案例

在 my-project 这个 monorepo 项目中，有如下的目录结构，

```shell
├── package.json
├── pnpm-workspace.yaml
├── packages
│    ├── eslint-config
│    │    ├── package.json
│    │    └── index.ts
│    ├── components
│    │    ├── package.json
│    │    └── index.ts
```

在项目根目录下，packages 是子项目的目录，eslint-config、components 是两个子项目。

对于每个子项目，它们都有 package.json、index 等文件，本质上也是一个完整的项目

<br/>

**项目配置**

在根目录下的 pnpm-workspace.yaml 文件中，需要声明工作空间中的子包：

```yaml
packages:
  - packages/*
```

一般也需要在 package.json 文件的 workspaces 字段中增加相应的配置

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

<br/>

**子包配置**

修改子项目的 package.json 中的 name 配置，最好以`@<scope>/xxx`的形式命名，这样会方便子包管理，也可以是其他合法的 npm 包名。

在 components 这个子包，需要使用 eslint-config 这个子包时，进入 components 目录，运行 `pnpm add -D @ly/eslint`，就会在把 eslint-config 这个子项目安装到 components 这个项目中。

<br/>

### 常用操作

在 pnpm 管理的 monorepo 项目中，有些操作与平常用法不太一样，需要注意。

<br/>

1、根目录项目安装依赖

需要使用 `-w`或`--workspace-root`参数，表示仅在根目录项目执行命令。

```shell
pnpm add -w <pkg>
```

如果项目开启了 monorepo 模式，直接在根目录安装依赖，是会报错的：

```
ERR_PNPM_ADDING_TO_ROOT  Running this command will add the dependency to the workspace root, which might not be what you want - if you really meant it, make it explicit by running this command again with the -w flag (or --workspace-root). If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
```

大意是：如果想在根目录安装依赖，需要使用 `-w`或`--workspace-root`参数，如果不想看到这个警告，可以使用 `--ignore-workspace-root-check` 参数

<br/>

2、安装 workspace 中的子包

默认情况下，.npmrc 中的 `link-workspace-packages` 值为 true，也就是工作空间中的包可以互相依赖，无需额外的参数就可以安装其他子包。另外，也可以使用 `--workspace`参数

```
pnpm add --workspace <pkg>
```

<br/>

3、给子项目安装依赖

当控制台位于项目根目录时，要为某个子项目安装依赖，可以使用 `-F`或`--filter`参数来指定要操作的子项目

```
pnpm add lodash-es -F pa 
```

上面的命令，会把 lodash-es 这个包安装到项目的 pa 子项目中

这里使用了 pnpm 过滤参数，它有很丰富的用法，详情查看[官方文档](https://pnpm.io/zh/filtering)





## 环境管理

pnpm 自带的环境管理功能，可以管理本机的 nodejs 版本，并且配合 `use-node-version` 配置，可以自动下载并切换当前项目所需要的 nodejs 版本，算是非常不错的功能，让我告别了 nvm

**注意：**

如果要使用 pnpm 来管理 nodejs 版本，则需要**全局安装 pnpm**，也就是不通过 `npm -g pnpm` 命令安装，这种安装方式 下 pnpm 还是 npm 的一个包，无法实现管理 nodejs 版本。

非全局安装情况下，曾经遇到的一个问题是：当使用 pnpm 切换到低版本的 nodejs v10 时，由于此版本的 nodejs 与 pnpm 不兼容，导致 pnpm 命令无法正常执行，也就无法再切换到其他版本的 nodejs。

通过 `pnpm env` 命令来实现 nodejs 版本管理

<br/>

### 安装并激活

安装并立即切换为某个版本

```shell
# 安装 LTS 版本
pnpm env use --global lts
# 安装指定版本
pnpm env use --global 16
# 安装最新版本
pnpm env use --global latest
# 安装预发布版本
pnpm env use --global nightly
pnpm env use --global rc
pnpm env use --global 16.0.0-rc.0
pnpm env use --global rc/14
# 使用版本名称安装
pnpm env use --global argon
```

> 其他版本的代号：Jod（22.x 2024）、Iron（20.x 2023）、Hydrogen（18.x 2022）、Gallium（16.x 2021）、Fermium（14.x 2020）、Dubnium（10.x 2018）、Carbon（8.x 2017）、Boron（6.x 2016）、Argon（4.x 2015）

<br/>

### 添加（v8.9.0）

只是安装，并不激活为当前版本

```shell
pnpm env add --global lts 18 20.0.1
```

<br/>

### 移除

移除指定版本的 Node.JS

*示例*

```shell
pnpm env remove --global 14.0.0
pnpm env remove --global 14.0.0 16.2.3
```

<br/>

### 列出可用版本

列出本地或远程可用的 Node.js 版本。

```shell
# 本地安装的版本
pnpm env list
# 列出远程可用的版本
pnpm env list --remote
# 列出远程可用的指定版本
pnpm env list --remote 16
```



## 分支锁文件

简单的说，就是保持每个分支有一个单独的锁文件，并且可以在适当时候再合并。

> 这个功能在多分支开发场景时非常有用，比如客户 A 对应分支 a，客户 B 对应分支 b，因为历史原因或者环境问题，每个分支使用了不同的依赖，开发过程切换分支时，必须手动执行一次 install 命令，才能保证当前环境下依赖正常。

<br/>

### 使用

在 `.npmrc` 文件中，通过以下配置开启此功能

```
git-branch-lockfile=true
```

然后，lockfile 的文件名将会变为：`pnpm-lock.<分支名>.yaml`，当切换分支，并且每个分支上的依赖各自不同时，它会根据当前所使用的分支自行处理依赖：

- 在当前分支，如果 pnpm-lock.yaml 文件有修改，它会自动提交这些修改
- 切换到新的分支后，如果新分支的 pnpm-lock.yaml 文件与当前的不一致，会自动执行 pnpm install 来更新依赖项

<br/>

### 合并锁文件

要合并所有分支上的锁文件，运行下面的命令即可：

```shell
pnpm install --merge-git-branch-lockfiles
```

运行后，所有的分支锁文件会合并成一个 `pnpm-lock.yaml`

也可以通过 `.npmrc`文件中的 `merge-git-branch-lockfiles-branch-pattern`配置来让 pnpm 自动完成该操作：

```yaml
merge-git-branch-lockfiles-branch-pattern[]=main
merge-git-branch-lockfiles-branch-pattern[]=release*
```

当 在 `main` 分支中或者分支名称以 `release`开头时， `pnpm install` 将合并所有分支锁文件

