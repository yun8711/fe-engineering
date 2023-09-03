---
outline: deep
prev: false
next: false
---

### 遇到个问题

当我打开 github 想要学习一下 element-plus 的源码时，我首先看到了这样的目录结构：（隐藏了部分子目录和深层次的目录，实在太多了）

```bash
├── .circleci
      └── config.yml
├── .github
      ├── ISSUE_TEMPLATE
      ├── workflows
      └── // ....很多
├── .husky
      ├── commit-msg
      └── pre-commit
├── .vscode
      ├── extensions.json
      └── settings.json
├── breakings
      ├── 2.2.0
      ├── 2.2.1
      ├── 2.2.3
      └── breaking.yml.example
├── docs
├── internal
├── packages
├── play
├── scripts
├── ssr-testing
├── typings
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .gitpod.yml
├── .markdownlint.json
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── CHANGELOG.en-US.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── codecov.yml
├── commitlint.config.js
├── commitlint.config.ts
├── global.d.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
├── tsconfig.play.json
├── tsconfig.vite-config.json
├── tsconfig.vitest.json
├── tsconfig.web.json
├── vitest.config.ts
└── vitest.setup.ts
```

不得不承认，虽然平时也比较关注前端工程化，但是看到这些我还是有点懵逼的，有些是经常用的，比如 prettier 的配置 ，还有一些是我知道，但是用的不熟的，比如 `tsconfig.xxx.json` ，但是为什么会分好几个配置文件，还这么多？还有一些是我完全不知道的，比如 `.gitattributes` ，应该是跟 git 相关的，但是完全不知道是干吗的。
<br/>

工程化配置是整个项目的基石，它决定了项目的开发效率、代码质量、可维护性等等，但是配置文件的数量和复杂性也在不断增长，如果项目周期较长，还会遇到版本升级、迁移等问题。我相信很多人跟我一样，看到这么多配置文件，都会有一种想要逃跑的冲动，但是又不得不面对，因为这就是前端 😂。

<br/>

### 想做个网站

一直以来面对前端项目的工程配置，我都有一些疑惑，比如：为什么有的配置可以写在 package.json 中，也可以单独写一个配置文件？每次写 xxxlint 的匹配路径时，使用的是什么语法？eslint 的 parser 配置到底怎么配置？

直到我看到这份源码的工程配置，我的疑问达到了顶峰，所以我做了这个网站，主要目的是：

- 记录自己曾经和以后遇到的工程化方面的问题及经验
- 更好的理解各种配置文件，提高开发效率，减少配置困惑
- 分享工程化配置方面的经验和心得

<br/>
我希望以通过通俗易懂的文字，为每个配置项提供准确的解释，包括其作用、可接受的值范围、默认值以及相关注意事项，为其他开发者提供关于各种插件和库配置文件的使用指南和配置项解释，让前端项目更加高效和稳定。

对于刚入门的开发者，这里可以为你提供一些关于库/框架的基本说明，让你更好的理解它们的作用和使用方法。对于有一定经验的开发者，欢迎多多反馈。

<br/>

### 如何使用本站？

本站的内容目前都是个人在实际开发中的一些经验的归纳总结，所以可能会有一些不准确的地方，如果你发现了错误或者有更好的建议，欢迎提出 [issue](https://github.com/yun8711/fe-configuration/issues)

在 [文档目录](../docs/catalogue) 下，列出了已经收集整理好的配置说明的列表。

在每篇文档中，首先会列出该库/框架的官网、github、npm 地址，方便你查看官方文档，同时还提供一些优秀项目的链接来学习研究；内容部分会基于个人理解及实际使用情况做一些说明和分享（心虚）。

在文档中会出现一些标志符号，用它们来标识一些信息：

- ⬇️：表示该内容不常用，或者很少见到
- ❓：表示该内容有待确认，或者有疑问
- 🚫：表示该内容被废弃，不建议使用
