---
outline: deep
prev: true
next: true
---

<h1>package-lock.json</h1><p>npm v9.8.0 nodejs v20</p>

[官网](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)



## 介绍

`package-lock.json` 文件是npm v 5.0 版本引入的，用于锁定项目依赖项的版本，并记录安装它们时的确切版本号、依赖关系和下载地址等信息。这有助于确保在不同环境中始终安装相同的依赖版本和依赖关系，从而避免可能由于版本差异导致的问题。

推荐把 `package-lock.json` 文件也保存到 git 仓库中，有以下优点：

- 确保项目稳定：`package-lock.json` 文件记录了每个依赖项的确切版本和依赖关系，这样不同的成员、不同的环境、部署和持续集成就能保证安装完全相同的依赖和版本
- 提高构建和部署的复用性：可以确保在不同的部署环境中构建的应用程序具有相同的依赖项版本，从而提高构建和部署的可重复性。
- 更好的追踪依赖变化：无须提交 node_modules 本身就可以追踪依赖的变化；
- 优化依赖安装过程：让 npm 跳过对已安装的包的元数据重复解析的过程



## 文件内容

**name**

项目名称，与 package.json 中的 name 一致

<br/>

**version**

包版本号，与依赖包中的 package.json 中的  version 一致

<br/>

**lockfileVersion** ❓

一个整数版本，从1开始，是生成 package-lock.json 时使用的文档语义的版本号。每种版本的特点和区别：

- 无版本号：npm 5 以前的 `package-lock.json` 文件，该版本的锁定文件是平面的，没有嵌套结构，每个依赖项的子依赖项都会直接列出
- 1：npm 5 引入的，应用用于 npm 5～6，该版本的锁定文件具有嵌套结构，会将子依赖项嵌套在它们的父级依赖项中，能更好地管理依赖项之间的关系
- 2：应用用于 npm 7～8， 向下兼容 v1 版，
- 3：应用于 npm 9，向下兼容 npm 7

<br/>

**requires**

使用 requires 来跟踪模块的依赖关系，lockfileVersion 3 版本

<br/>

**packages**

这是一个将包位置映射到包含有关该包的信息的对象的对象。根项目通常以""键列出，而列出的所有其他包都是根项目文件夹中的相对路径。字段包括：

- version：package.json 中注册的版本号
- resolved：实际解析包的位置。在从注册表获取包的情况下，这将是到tar压缩包的url。对于git依赖，这将是带有commit sha的完整git url。在链接依赖的情况下，这将是链接目标的位置。Registry.npmjs.org是一个神奇的值，意思是“当前配置的注册表”。
- integrity：一个 `sha512` 或 `sha1` 标准子资源完整性字符串
- link：一个标志，表示这是一个符号链接。如果存在，则不指定其他字段，因为链接目标也会包含在锁文件中。
- dev、optional、devOptional：如果包严格属于devDependencies树，那么dev将为true。如果它严格属于optionalDependencies树，那么会设置optional。如果它既是开发依赖，又是非开发依赖的可选依赖，则devOptional会被设置。(dev依赖的optional依赖会同时设置dev和optional。)
- inBundle：一个标志，表示该包是一个已打包的依赖项。
- hasInstallScript：一个标志，表示该包有preinstall、install或postinstall脚本。
- hasShrinkwrap：标志，表示该包具有 npm-shrinkwrap.json 文件。
- bin, license, engines, dependencies, optionalDependencies：package.json中的字段

<br/>

**dependencies**

用于支持使用`lockfileVersion: 1`。支持使用lockfileVersion的npm版本的遗留数据：这是包名到依赖对象的映射。由于对象结构是严格的分层结构，在某些情况下表示符号链接依赖关系有些挑战性。 

如果存在packages部分，NPM v7会完全忽略此部分，但为了支持NPM v6和NPM v7之间的切换，它会保持更新。



