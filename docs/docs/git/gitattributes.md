---
outline: deep
prev: false
next: false
---

<h1>.gitattributes</h1><p>npm v9.8.0 node v20</p>

[官方文档](https://git-scm.com/docs/gitattributes)

参阅：[element-plus](https://github.com/element-plus/element-plus/blob/dev/.gitattributes) | [vite](https://github.com/vitejs/vite/blob/main/.gitattributes)



## 介绍

`.gitattributes` 是 Git 版本控制系统中的一个配置文件，用于管理在版本控制下的文本文件的属性和行为。通常存储在 Git 仓库的根目录或者特定子目录中。它可以定义以下内容：

- 文本文件的属性：比如换行符类型、编码等。
- Git 忽略规则：比如忽略某些文件或文件夹、对文件名进行匹配等。
- Git diff 和 merge 行为：比如合并冲突时选用哪个版本的文件等。

语法类似于 `.gitignore` 文件，由一系列模式组成，每个模式占据一行，用于描述要应用的属性或规则。例如：

```
*.txt    text
*.png    binary
*.md     text eol=lf
```

上面的例子表示：

- 所有的 `.txt` 文件都被视为文本文件（默认值是二进制）；
- 所有的 `.png` 文件都被视为二进制文件（不需要任何转换）；
- 所有的 `.md` 文件都被视为文本文件，并采用 LF 换行符（而不是默认的 CRLF）。

`.gitattributes` 文件的使用可以提高 Git 仓库中文本文件的可移植性和可维护性，因为它可以确保在不同操作系统和环境中，文件属性的一致性和预期行为。

## 常用配置

```
* text=auto
```

表示 Git 将根据内容自动检测文件是否为文本文件，告诉 Git 在执行差异比较或合并操作时以文本模式处理文件。

```
* eol=lf
```

表示使用 LF（Unix/Linux 风格）行尾格式。这个属性告诉 Git 在检出文件时将行尾格式设置为 LF，可选项有：

- `lf`：推荐，使用 LF（Unix/Linux 风格）行尾格式
- `crlf`：使用 CRLF（Windows 风格）行尾格式。
- `cr`：使用 CR（旧版 Mac 风格）行尾格式。



## 示例

[element-ui](https://github.com/ElemeFE/element/blob/dev/.gitattributes)

```
test/**/*.js linguist-language=Vue
```

指定了所有test文件夹下的.js文件的语言类型为Vue。其中，`**`表示匹配任意子目录，`*`表示匹配任意文件名

这个规则可以让Linguist正确地识别Vue.js测试文件，并将其标记为Vue语言类型，从而在GitHub上为代码库提供更好的语言统计信息和高亮显示。

[element-plus](https://github.com/element-plus/element-plus/blob/dev/.gitattributes)

```
* text=auto eol=lf
*.ts linguist-detectable=false
*.css linguist-detectable=false
*.scss linguist-detectable=false
*.js linguist-detectable=true
*.vue linguist-detectable=true
```

- `* text=auto eol=lf`: 这个规则设置了所有文件都使用自动文本模式，并将换行符统一转换为LF（Unix风格）格式。
- `*.ts linguist-detectable=false`: 这个规则指定了所有.ts类型的文件不可被Linguist识别，即如果该文件包含在代码库中，GitHub将不会将其计入语言统计信息或进行高亮显示。
- `*.css linguist-detectable=false` 和 `*.scss linguist-detectable=false`: 这两个规则指定了所有.css和.scss类型的文件也不可被Linguist识别。
- `*.js linguist-detectable=true` 和 `*.vue linguist-detectable=true`: 这两个规则指定了所有.js和.vue类型的文件可以被Linguist识别。这意味着如果该文件包含在代码库中，GitHub将能够正确地将其分类为JavaScript或Vue.js，并计入相应的语言统计信息和高亮显示。
