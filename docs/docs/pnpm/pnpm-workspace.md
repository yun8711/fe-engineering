---
outline: deep
prev: false
next: false

---

<h1>pnpm-workspace.yaml</h1><p>v8.x</p>

[官方文档](https://pnpm.io/zh/workspaces)



## 介绍

monorepo 也称为多包存储库、多项目存储库或单体存储库，是现在很多基础类库主流的代码仓库管理模式，可以将多个项目合并到一个仓库中，**这样的作用是能在我们开发调试多包时，彼此间的依赖引用更加简单。**

pnpm 内置了对 monorepo 的支持。

`pnpm-workspace.yaml` 文件是用来定义 pnpm 工作空间（workspace）的配置文件。工作空间是一种管理多个包的方式，它可以让你在一个父目录下统一管理多个子包的依赖和版本号等信息。



## 配置

pnpm-workspace.yaml 的书写格式遵循 [YAML](../../guide/text-format) 格式规范，配置项包括以下以种（未全部验证）

（1）packages：数组，列出所有子包名称，格式可以为：

- `packages/*`：表示匹配所有位于 packages 目录下的直接子目录
- `conponents/**`：表示匹配所有位于 `components` 目录下的子目录，无论层次结构有多少级
- `!**/test/**`：排除测试目录中的包

（2）dir：字符串，指定工作空间目录的名称，默认值为`"."`

（3）noHoist：数组，用来列出不能被 hoisted 的依赖项

（4）packagesToHoist：数组，用来列出需要 hoist 的依赖项

（5）virtualStoreDir：字符串，指定虚拟存储目录的名称，默认值为 `"node_modules/.pnpm"`

（6）sharedWorkspaceLockfile：布尔值，指定是否启用共享工作空间锁定文件，默认值为 `false`

（7）store：字符串，指定包存储目录的名称，默认值为 `"~/.pnpm-store"`

（8）packageImportMethod：字符串，指定在工作空间中如何导入子包的依赖项，默认值为 `"auto"`，意味着自动决定最佳导入方式

**关于 hoist**

在 pnpm 工作空间中，`hoisted` 是一个特殊的概念，表示将依赖项安装到工作空间根目录下的 `node_modules` 目录中，而不是将其安装在每个子包的 `node_modules` 目录下

有助于减少重复的依赖项，从而提高整个工作空间的性能和稳定性。当多个子包共享同一个依赖项时，该依赖项只需要被安装一次，并且可以被所有子包共享



## 实战

有如下的项目结构

```
my-project/
├── package.json
└── packages/
    └── eslint-config/
        ├── package.json
        └── index.ts
```

 my-project 是项目根目录，packages 是子项目的目录，eslint-config 是其中一个子项目

从结构上看，eslint-config 有 package.json、index.ts，本质上也是一个完整的项目。

使用 monorope 管理这样的仓库，让每个项目相互独立（安装依赖、构建），

（1）在项目根目录下创建配置文件：`pnpm-workspace.yaml`

（2）在配置文件中声明工作空间，把 eslint-config 当作一个子包

```
packages:
  - packages/*
```

（3）修改根目录下的 package.json 中的 workspaces 配置，与pnpm-workspace.yaml 保持一致。原因：

- 不利于维护和管理：`pnpm-workspace.yaml` 文件是一种特定于 `pnpm` 的配置文件，不同的包管理器或者开发环境可能无法识别和处理它
- 可能导致依赖安装问题：如果在 `pnpm-workspace.yaml` 中声明了工作区，但是没有在 `package.json` 中同步进行声明，那么 `pnpm` 可能会错误地解析工作区信息，导致依赖安装失败或者缺失。
- 可能导致其他问题：除了上述可能性外，如果在项目中只声明了 `pnpm-workspace.yaml` 而没有遵循规范同时在 `package.json` 中进行声明，还可能产生其他未知的问题，例如构建、测试、打包等方面出现异常等。

（4）修改子项目的 package.json 中的 name，最好以`@scope/xxx`的形式命名，这样会方便子包管理，也可以是其他合法的 npm 包名。



## 相关操作

通过 pnpm 管理 monorepo 项目时，经常涉及到以下操作

### 安装依赖

（1）在根目录下，给子包安装依赖时，需要通过 `-F` 指定具体的子包名称，安装的依赖会存放在子包的 node_modules 中

```
pnpm add -D -F "@kd/eslint-config" 
```

如果想让主包和子包使用相同的依赖，需要在 `.npmrc`中配置`link-workspace-packages = true`，pnpm 就会使用工作区链接来安装和管理依赖项，也就是在子包中安装依赖时，pnpm 会检查根目录的 node_modules 中是否已存在该依赖，并将其链接到子包中，而不是在子包中再安装一次。

（2）把子包安装到根目录中，需要这样操作。

```
pnpm add -w <pkg>
```

但是这么做没意义，子包是某类功能的集合，正常情况下应该是被另一个子包使用。

（3）在子包 pa 中安装另一个子包 pb ，让 pb 成为 pa 的依赖：

进入该子项目的根目录：`cd packages/pa`

执行安装命令：`pnpm add pb`

然后在 pa 的 package.json 中会出现 `"pc": "workspace:^"`，这里的 `workspace: `是workspace 协议，pnpm 只会在本地的 workspace 包含的子项目中解析此包

（4）只安装根目录下的依赖

```
pnpm install --ignore-workspace 
```

（5）