---
outline: deep
prev: false
next: false
---

<h1>ls-lint</h1><p>v2.0.0（2023-05-23）</p>

[官网](https://ls-lint.org/) | [github](https://github.com/loeffel-io/ls-lint) | [官方示例](https://github.com/loeffel-io/ls-lint/blob/master/examples/nuxt_nuxt_js/.ls-lint.yml)

## 介绍

一个非常快的文件和目录名称校验工具（linter），有以下特点：

- 配置简单：只有一个 `.ls-lint.yml` 配置文件，规则简单
- 多平台支持：Windows, MacOS 和 Linux + NPM & Docker环境
- 速度快，可以在毫秒内检查数千个文件和目录
- 支持所有扩展名，完整的 unicode 支持
- 第三方依赖只有 go-yaml 和 doublestar

_Vue3 项目配置示例_

```yaml
ls:
  packages/*/{src,__tests__}:
    .js: kebab-case
    .ts: camelCase | PascalCase
    .d.ts: camelCase
    .spec.ts: camelCase | PascalCase
    .mock.ts: camelCase

ignore:
  - node_modules
```

## 依赖

```
pnpm add @ls-lint/ls-lint -D
```

## 用法

### 配置文件

在项目根目录下创建配置文件 `.ls-lint.yml`，有两个选项：

- `ls`：用来定义项目目录的结构及其扩展、子扩展和目录的所有规则
- `ignore`：文件用来声明要被忽略检查的目录和文件

```
ls:
    ...

ignore:
    ...
```

<br/>

### 全局配置

所有 `.js`,`.ts`和`.d.ts`项目文件必须以样式命名`kebab-case`，但忽略`.git`和`node_modules` 目录：

```json
ls:
    .js: kebab-case
    .ts: kebab-case
    .d.ts: kebab-case

ignore:
    - .git
    - node_modules
```

<br/>

### 校验目录名称

通过`.dir` 表示对目录的规则

```yaml
ls:
    packages/src:
    		# 当前目录及其子目录
        .dir: kebab-case
        .js: kebab-case
```

<br/>

### 应用多个规则

使用`|`操作符

```yaml
ls:
  .js: kebab-case | camelCase | PascalCase
```

<br/>

### 使用 glob 语法

支持 ls，不支持 ignore。glob 模式`*`or`**`可用于所有**ls**目录配置：

```yaml
ls:
  packages/*/src: # matches any sequence of non-path-separators
    .js: kebab-case

  packages/**/templates: # matches any sequence of characters, including path separators
    .html: kebab-case
```

<br/>

### 校验规则

ls-lint 提供了多个开箱即用的规则：

- lowercase：每个字母必须小写，忽略非字母
- camelcase / camelCase：小驼峰命名法，只允许字母和数字，如：`firstName`, `myFavoriteColor`
- pascalcase / PascalCase：大驼峰命名法，只允许字母和数字，如：`FirstName`, `MyFavoriteColor`.
- snakecase / snake_case：单词间使用下划线分隔，只允许小写字母、数字、下划线，如：`first_name`, `my_favorite_color`.
- screamingsnakecase / SCREAMING_SNAKE_CASE：与 `snake_case` 类似，但只允许小写字母、数字、下划线。例如：`FIRST_NAME`, `MY_FAVORITE_COLOR`
- kebabcase / kebab-case：单词之间使用短横线分隔，只允许小写字母、数字、短横线，例如：`first-name`, `my-favorite-color`.
- pointcase / point.case：单词之间使用点号 ` .`分隔，只允许小写字母、数字、点符号，例如：`first.name`, `my.favorite.color`.

还可以使用 正则表达式：

```yaml
ls:
  .js: regex:[a-z0-9]+ # the final regex pattern will be ^[a-z0-9]+$
  # 多个正则
  .js: regex:Schema(\.test)? | regex:Resolver(\.test)?

  .js: regex:(Schema|Resolver)(\.test)?
```

## CLI 选项

| 选项      | 描述                                             |
| --------- | ------------------------------------------------ |
| --config  | ls-lint 配置文件路径                             |
| --workdir | 指定工作目录，否则会从项目根目录开始扫描所有文件 |
| --debug   | 在控制台输出调试信息                             |
| --warn    | 当发生错误时输出错误，退出进程，默认不输出错误   |
| --version | 打印版本信息                                     |

一般都会结合 husky 一起使用，在 pre-commit 中添加执行（不好用）

```
npx --no-install ls-lint && ls-lint（或者一个scripts脚本）
```

