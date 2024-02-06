---
outline: deep
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

```ini
*.txt    text
*.png    binary
*.md     text eol=lf
```

上面的例子表示：

- 所有的 `.txt` 文件都被视为文本文件（默认值是二进制）；
- 所有的 `.png` 文件都被视为二进制文件（不需要任何转换）；
- 所有的 `.md` 文件都被视为文本文件，并采用 LF 换行符（而不是默认的 CRLF）。

`.gitattributes` 文件的使用可以提高 Git 仓库中文本文件的可移植性和可维护性，因为它可以确保在不同操作系统和环境中，文件属性的一致性和预期行为。



## 配置

### 语法规则

主要由以下几部分组成：

- 路径模式：这是 .gitattributes 文件中的每一行的开始部分，用于匹配仓库中的文件或目录。例如：`*.js` 匹配所有的 JavaScript 文件，`/docs` 匹配根目录下的 `docs` 目录
- 属性：路径模式后面跟着一个或多个属性，属性之间用空格分隔。每个属性都由一个名称和一个可选的等号后的值组成。例如：`text` 是一个属性名称，`text=auto `是一个带有值的属性
- 注释：以 # 开头的行是注释，将被 Git 忽略

示例：

```ini
# 设置所有文件的行尾风格为 LF
* text=auto eol=lf

# 设置 .md 和 .txt 文件的 diff 算法为 diff=markdown 和 diff=plaintext
*.md diff=markdown
*.txt diff=plaintext

# 设置 .lock 文件的合并策略为 merge=ours
*.lock merge=ours
```

<br/>

### Git 标准属性

1、text

将文件标记为文本文件，这决定了 GIt 是否将行尾（换行符）标准化：将匹配的文件添加到 git 时，文件的行尾会被规范化为 LF，从 git 仓库复制到工作目录时，行尾可能从 LF 转换为 CRLF。还与`eol`属性，Git 配置和平台有关

当设置为`"auto"`时，Git 会自行决定文件是文本文件还是二进制文件。如果是文本，并且文件尚未在 Git 中使用 CRLF 结尾，则行结尾将在签入和签出时转换。否则，在签入或签出时不会进行任何转换。

2、eol

设置文件的行尾风格，仅在 `text=auto` 时有效。

可以设置为：

- `lf`：推荐，使用 LF（Unix/Linux 风格）行尾格式
- `crlf`：使用 CRLF（Windows 风格）行尾格式。
- `cr`：使用 CR（旧版 Mac 风格）行尾格式。

3、binary

表示文件是二进制文件，不应尝试进行行尾标准化或进行 diff

4、diff

指定用于文件的 diff 算法

5、merge

指定用于文件的合并策略

6、filter

指定用于文件的过滤器

7、export-ignore

指定在创建归档文件（如 tar 或 zip 文件）时应忽略的路径

8、export-subst

在导出操作期间，Git 将在文件中的 $Format: 字符串后面填充各种 SHA-1 值

9、ident

Git 将在 $Id: 字符串后面填充 SHA-1 值

10、working-tree-encoding

指定文件的工作树编码。

<br/>

### GitHub 专有属性

1、`linguist-vendored`

标记文件或目录为第三方代码。这些文件在语言统计中将被忽略，并在 diff 视图中折叠

2、`linguist-generated`

标记文件为自动生成的。这些文件在 diff 视图中将被折叠，并在语言统计中被忽略

3、`linguist-documentation`

标记文件为文档。这些文件在语言统计中将被忽略

4、`linguist-language`

覆盖 Linguist 的语言检测结果。例如，你可以将一个 .js 文件标记为 TypeScript：`*.js linguist-language=TypeScript`

上述这些 GitHub 特有属性，主要是给 GitHub 的语言检测工具 Linguist 使用的。

<br/>

### Linguist

**[Linguist](https://github.com/github-linguist/linguist)** 是 GitHub 开发的一个开源工具，主要用于在 GitHub 仓库中执行语言检测和语法高亮。它的主要功能包括：  

- 语言检测：Linguist 可以检测仓库中的文件类型，并根据文件类型进行语言统计。这些统计结果会显示在仓库的语言栏中
- 语法高亮：Linguist 使用语言语法文件（通常是 .tmLanguage 文件）来为 GitHub 上的代码提供语法高亮
- 文件属性识别：Linguist 可以识别文件的一些属性，例如是否是文档、是否是生成的代码、是否是第三方代码等。这些属性可以在 .gitattributes 文件中设置，并会影响到语言统计和 diff 视图
- Linguist 支持大量的编程语言，包括但不限于 JavaScript、TypeScript、Python、Java、C++、Ruby 等。它的语言支持是通过语言语法文件和一组 heuristics（启发式规则）来实现的。 

