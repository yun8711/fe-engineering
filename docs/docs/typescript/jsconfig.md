---
outline: deep
---

<h1>jsconfig.json</h1><p>2023-09-21</p>

[官网](jsconfig.json) | [js语言服务](https://github.com/microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio)



## 介绍

### 什么是 jsonfig.json

jsconfig.json 是从 Visual Studio 2017 年开始提供支持的，用于表示该目录是 js 项目的根目录，同时编辑器可以根据提供的选项提供语言服务，提升 js 编辑体验。

由于 vscode 是基于 ts 编写，所以它可以识别 tsconfig.json，并基于该配置提供 ts 语言相关支持。

同时，ts对 js 是完全支持的，所以在不使用 ts 的情况下，使用 jsconfig.json 提供某些配置，也可以让编辑器进行优化，提升编码体验。可以把 jsconfig.json 理解为 tsconfig.json 的 allowJs为 true 的配置文件。

### 为什么需要 jsconfig.json

没有 jsconfig.json的情况下，vscode 将 js 文件视为独立的单元，在没有显示的引用文件时，两个文件之间就没有公共的项目上下文，编辑器无法提供相应的代码提示。

使用 jsconfig.json 的情况下，通过该文件的配置定义，编辑器可以确定项目的根目录，并基于 TypeScript 的语言服务提供更丰富的 IntelliSense（智能感知），支持现代 JavaScript 功能，以及改进的生产力功能，如转到定义、重构等

详情查看：[IntelliSense in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/using-intellisense?view=vs-2022)





## 常见配置

jsconfig.json 配置项与 tsconfig.json 一致

### exclude 

glob 模式，用于排除某些文件，比如 node_modules、dist，应该尽可能排除包含 js 代码但又不属于源码的文件

> 如果没有 jsconfig.json，vscode 默认排除 node_modules

可以告诉语言服务哪些文件不属于源代码，这样可以保持较好的性能



### include

默认包含目录和子目录中的所有文件，在项目中显式设置包含哪些文件



### compilerOptions

可以参考 tsconfig.json 的配置，以下是常用的配置项

| 选项                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| noLib                        | 不要包含默认库文件（lib.d.ts）                               |
| target                       | 指定要使用的默认库，可选值：es3、es5、es6、es2015～2020、esnext |
| module                       | 指定模块系统，可选：amd、commonJs、es2015、es6、esnext、none、system、umd |
| moduleResolution             | 指定模块解析方式，可选：node（推荐）、classic                |
| chedkJs                      | 是否对 js文件启用类型检查                                    |
| experimentalDecorators       | 为建议的 ES 修饰器启用实验性支持                             |
| allowSyntheticDefaultImports | 允许从没有默认导出的模块进行默认导入。这不会影响代码发出，只需进行类型检查。 |
| baseUrl                      | 用于解析非相对模块名称的基目录                               |
| paths                        | 指定相对于 baseUrl 选项的路径映射，即路径别名                |

