---
outline: deep
prev: false
next: false

---

<h1>Changelog</h1>



## 介绍

`changelog`（变更日志）是一种记录项目版本更新内容的文档，它通常包括新特性、修复的问题、已知问题等信息。研发团队在每次发布新版本时都应该更新 changelog，以便用户了解项目的版本历史和更新内容，也可以方便开发者进行版本管理和协作。

它的起源可以追溯到开源社区的早期。在开源软件的发展过程中，随着越来越多的人参与进来，管理变得越来越复杂，需要一种统一的方式来记录代码修改和更新内容，这就是 `changelog` 的产生背景之一。

随着软件行业的不断发展和成熟，越来越多的团队开始采用 `changelog` 来记录版本历史和更新内容。为了进一步规范化 `changelog` 的使用，也出现了一些标准和约定，如 `Keep a Changelog`、`Conventional Commits` 等，从而方便协作和交流。

**为什么要规范化 commit 提交**

- 有利于自动化工具生成 CHANGELOG
- 基于提交的类型，自动决定语义化的版本变更
- 提供清晰的、结构化的提交历史，使项目易于阅读，便于他人参与贡献
- 与其他工具链配合，如：触发构建和部署流程

<br/>



## Keep a Changelog

最初由 `Ruby on Rails` 社区推出，旨在为开源项目提供一个规范、标准的 changelog 格式。

在 `Keep a Changelog` 规范出现之前，`changelog` 的格式和内容通常是基于团队习惯或个人偏好来制定的。这导致不同项目之间的 `changelog` 可能存在较大差异，对于团队协作和用户使用造成了很大的困扰。

最初，`Keep a Changelog` 的规范比较简单明了，只包括了一个标准的格式和一些基本的建议。随着时间的推移，它不断得到完善和扩展，逐渐形成了更加详细、全面、严格的规范。例如，后来还增加了 `Conventional Commits` 等约定，进一步提高了 changelog 的可读性和可维护性。

`Keep a Changelog` 已经广泛应用于各个领域的开源项目中，并且得到了越来越多的关注和认可。越来越多的工具和服务（如 `standard-version`、`release-please` 等）也开始支持 `Keep a Changelog` 格式，进一步推动了其发展和普及。

<br/>

### 思想

1. 记录所有版本的变更：每个版本的 changelog 都应该包含所有的变更，而不仅仅是表面上的特性或修复问题；
2. 维护一致的格式和风格：需要定义一致的格式和风格，并遵循统一的命名约定；
3. 区分重要性和影响：对于每个变更，都需要明确其重要性和影响范围，并相应地进行分类和标记。

<br/>

### 规范

一个标准的 changelog 应该包括以下几部分：

1. 【未发布】：记录即将发布的版本。
2. 【版本号】（发布日期）：记录已经发布的版本号和发布日期。
3. Added：新增特性、功能等。
4. Changed：修改了现有的特性、功能等。
5. Deprecated：弃用某些特性、功能等。
6. Removed：删除某些特性、功能等。
7. Fixed：修复了某些问题、Bug 等。
8. Security：修复了某些与安全相关的问题。



## [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

约定式提交（conventional commits）规范是一种代码提交消息规范，旨在标准化代码提交消息格式，使其易于阅读、理解和自动化处理。 

它定义了一种简单的命名约定，由三个部分组成：类型、作用域、主题，例如：`“feat: 添加用户登录功能”` 或 `“fix: 修复注销按钮无法点击的问题”` 。通过保持这种统一的提交消息格式来创建清晰的提交历史，开发者可以更好地跟踪和理解代码变更，为后续的版本发布提供更好的支持。

它提供了一组简单规则来创建清晰的提交历史； 这更有利于编写自动化工具。 通过在提交信息中描述功能、修复和破坏性变更， 使这种惯例与 [SemVer](http://semver.org/lang/zh-CN) 相互对应。

`Keep a Changelog` 主要关注于 changelog 的格式和内容，而 `Conventional Commits` 则主要关注于 Git 提交信息的规范化

<br/>

### 发展历程

1. 2014 年 5 月，开发者 `Igor Ognichenko` 在 GitHub 上发布了一个名为 `angular-commit-style` 的项目，提出了一种新的提交信息格式：包括了变更类型（feat、fix、docs 等）、作用域、变更描述和相关问题编号等信息，旨在提高提交信息的可读性、可维护性和可追溯性。
2. 后来，Angular 团队也采用了类似的提交信息格式，并将其集成到了 `AngularJS` 项目中。该格式得到了越来越多的关注和认可，被称为 `Angular Commit Message Conventions`。
3. 2016 年 8 月，开发者 `Joshua Wise` 发布了一个名为 `conventional-changelog` 的工具，它可以根据提交信息自动生成 changelog。这个工具使用了 `Angular Commit Message Conventions` 格式，并逐渐得到了更广泛的应用和推广。
4. 2017 年 11 月，`Conventional Commits` 规范正式发布，它是由 `Joshua Wise` 和 `Tim Pope` 等人联合制定的。该规范继承了 `Angular Commit Message Conventions` 的核心思想，并对其进行了进一步的完善和扩展。该规范主要包括了变更类型、作用域、描述、脚注等几个部分，并提供了一些常见的变更类型和建议。
5. 目前，`Conventional Commits` 规范已经成为了一个广泛接受的标准，被许多开源项目和工具所采用。例如，`Angular`、`React`、`Vue.js` 等框架都采用了 `Conventional Commits` 规范，相应的构建工具和服务（如 `semantic-release`、`commitizen` 等）也得到了广泛的应用和支持。

<br/>

### 规范

提交说明的结构如下：

```
<type>[scope]: <description>

[body]

[footer(s)]
```

- type： 类型，指定提交的类型，如 feat、fix、docs 等；
- scope：可选，表示范围，指定提交涉及到的模块或功能区域；
- description：描述，简短描述提交的内容；也有文章把它定义为 subject，即主题
- body：可选，正文，详细描述提交的修改内容；
- footer： 尾部，包含一些元数据，如关联的 Issue 编号、变更日志等

<br/>

提交说明应该包含以下的结构化元素，以向类库使用者表明其意图：

type：

- `fix`类型的提交，表示在代码库中修复了一个 bug，对应语义化版本中的 `PATCH`
- `feat`类型的提交表示在代码库中新增一个功能，对应语义化版本中的 `MINOR`
- 除 fix 和 feat 之外，也可以使用其他提交类型，`@commitlint/config-conventional`（基于 Angular）推荐： `build:`、`chore:`、 `ci:`、`docs:`、`style:`、`refactor:`、`perf:`、`test:`等等

footer：

- BREAKING CHANGE：在脚注中包含 `BREAKING CHANGE:` 或 <类型>(范围) 后面有一个 `!` 的提交，表示引入了破坏性 API 变更，对应语义化版本中的 `MAJOR`。破坏性变更可以是任意类型提交的一部分
- 脚注中除了 `BREAKING CHANGE: <description>` ，其它条目应该采用类似 [git trailer format](https://git-scm.com/docs/git-interpret-trailers) 这样的惯例

其他提交类型在规范中没有强制限制，并且在主义化版本中没有隐式影响（除非包含 BREAKING CHANGE）



## 工具链

在一套完整的 changelog 管理体系中，要从工具方面对各个阶段进行规范化管理，减少人为因素导致的意外行为，所以就诞生了很多工具来完成这些工作。

**git commit 提示工具**

一般是通过命令行交互方式或是编辑器中插件的形式，让开发者提交符合规范要求的信息，以便为后续的版本管理和 changelog 管理创建基础条件。

比较常用的有：commitizen、czg（推荐），webstrom 中的 create commit message 插件（推荐）

**commit 校验工具**

用来对开发者提交的 commit 消息进行检查，确保提交到仓库的 commit message 都是符合标准的，

常用的就是：commitlint

**版本管理和 changelog 生成**

版本管理底层是依赖 npm version 命令封装，手动或自动进行版本号升级

自动化 changelog 生成，就是从 git log 中提取规范化的 commit 信息，自动生成 changelog 文件

常见的工具有：standard-version（官方已废弃），conventional-changelog-cli，release-it，release-please，semantic-release，下面是这几种工作的对比

1. ~~standard-version~~（也有叫 standard-release）
   - 配置简单，易于使用，可定制化程度较高，可以通过配置多个选项来控制其行为，内置多个插件，如版本号管理、Git 操作、发布流程、生成 changelog 等
   - 缺点是功能相对较少，不能自动发布到 npm 或 Git 仓库。
   - **官方已经放弃维护**，最后版本是2022 年 5 月 15 日发布的 v9.5，原因是：
     - 功能重叠：与`semantic-release`、`release-it` 等存在很大重叠，而这些工具更加成熟和完善
     - 代码质量问题：存在一些潜在的安全漏洞和质量问题，包括缺少测试、不规范的代码风格等
     - 无法满足需求：局限于约定式提交规范和语义化版本规范，无法满足某些特定场景下的需求
   - star：7.2 k  
2. [release-it](https://github.com/release-it/release-it)
   - 配置简单，易于使用，本身功能较少，可以通过添加插件来扩展功能，支持大量常用的插件，如版本号管理、Git 操作、发布流程等
   - 周下载量：224,576，体积：234 kB，应用项目：[axios](https://github.com/axios/axios/blob/v1.x/package.json)、[js-cookie](https://github.com/js-cookie/js-cookie/blob/main/.release-it.json)
3. [@release-it/conventional-changelog](https://github.com/release-it/conventional-changelog)
   - 配置简单，可以与 release-it 插件无缝集成，支持自定义配置，生成的 changelog 可以包含多个 commit 类型。
   - 需要手动添加版本号和日期。
   - 周下载量： 75,270，体积：26.3 kB
4. [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
   - 灵活，可定制化程度较高，可根据不同的约定式提交规范生成 changelog。
   - 需要手动添加版本号和日期，并且不能自动发布到 npm 或 Git 仓库
   - 周下载量：conventional-changelog 881,788，conventional-changelog-cli 154,328，体积：14.2 kB，应用项目：[vue2](https://github.com/vuejs/vue/blob/main/package.json) [vue3](https://github.com/vuejs/core/blob/main/package.json) [vitepress](https://github.com/vuejs/vitepress/blob/main/package.json)
5. [~~release-please~~](https://github.com/googleapis/release-please)：
   - 由 Google 开发维护，基于 Conventional Commit messages，被 Google 的一些开源项目使用，如 Google Cloud、Kubernetes 等
   - 可以自动检测项目类型，支持多种开源项目，支持自动发布到 npm 和 Git 仓库。
   - 配置难度较高，支持的定制选项较少，主要是版本号管理、文件版本处理等；只适用于某些类型的开源项目
   - 周下载量：5,557，体积：908 kB
6. semantic-release：
   - 功能强大，可定制化程度较高，可以通过配置多个选项来控制其行为可生成标准化的 changelog，支持自动发布到 npm 和 Git 仓库，自动化程度高。
   - 配置复杂，需要配置多个选项才能正常工作。
   - 内置多个插件，如版本号管理、Git 操作、发布流程、生成 changelog 等，同时支持自定义插件。
   - 受欢迎度很高，拥有广泛的用户群体和社区支持，如 Babel、Webpack 等。
   - 周下载量：951,983，





## [Conventional Changelog](https://github.com/conventional-changelog)

参阅：[Conventional Changelog 生态探索](https://zhuanlan.zhihu.com/p/392303778/#h_392303778_19)

<br/>

`Conventional Changelog` 基于 `Conventional Commits`，是一个生成标准化的版本更新日志的工具，也使用最广泛的工具。

它自动从提交消息中提取信息，并根据一定的规则生成标准化的更新日志，以便开发者和用户可以轻松地了解每个版本中的变化。这种标准化的更新日志包含了关于每个版本中所有变更内容的详细信息，包括了新特性、修复、改进和删除等。这样做使得开发者和用户可以更好地理解和评估不同版本之间的差异，更加清晰地知道软件的演变历程。

[conventional-changelog](https://github.com/conventional-changelog) 不只是一个单独的工具，它包含一系列工具：

- [conventional-changelog-config-spec](https://github.com/conventional-changelog/conventional-changelog-config-spec)：描述 conventional-config 配置项规范，为上层工具提供支持，明确了哪些 commit 类型会被写入 changelog。
- [commitlint](https://github.com/conventional-changelog/commitlint)：用于检测 commit 提交信息是否符合 conventional commits 规范
- [~~standard-version~~](https://github.com/conventional-changelog/standard-version)：遵循语义化版本号，根据 Conventional Commits 规范生成 CHANGELOG。目前已被官方弃用
- [conventional-commits-detector](https://github.com/conventional-changelog/conventional-commits-detector)：提交信息检测器，可以作为 CLI 工具使用，也可能通过编程方式使用。
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/blob/master/README.md)：同名 monorepo 仓库，包含了 Conventional Changelog 核心代码、工具链、相关预设的 monorepo 仓库，它的核心子库：
  - conventional-changelog-cli：功能齐全的 CLI，可以生成 changelog 文件
  - conventional-github-releaser：从 git 元数据创建新的 github release
  - [conventional-recommended-bump](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump#readme)：根据提交规范推荐一个版本

