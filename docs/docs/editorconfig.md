---
outline: deep
prev: false
next: false

---

<h1>.editorconfig</h1>

[官网](https://editorconfig.org/) | [规范文档](https://spec.editorconfig.org/) | [github](https://github.com/editorconfig)



## 介绍

EditorConfig 用于在跨编辑器和 IDE 开发时，保持编码风格的一致性，使得开发者可以更专注于编写代码，而不是调整代码风格，

它可以定义和配置项目中各个文件的缩进、空白符、换行符等格式，并将这些格式规则写入到 `.editorconfig` 文件中，以便其他开发者可以轻松地设置他们的编辑器来遵循相同的规则。

EditorConfig 是作用于编辑器的，与语言没有直接的关系。

> EditorConfig 的历史可以追溯到 2011 年，在那个时候，开发者们在使用不同的编辑器和 IDE 时，经常会遇到代码风格不一致的问题。例如，一些编辑器可能默认使用空格进行缩进，而另一些编辑器则可能默认使用制表符。这种差异会导致在团队协作时出现问题，因为每个人的代码风格可能会有所不同。
>
> <br/>
>
> 为了解决这个问题，一群开发者创建了 EditorConfig。通过在项目中创建一个简单的 .editorconfig 文件，开发者可以配置一系列的编码风格规则，这些规则会被所有支持 EditorConfig 的编辑器和 IDE 遵循。

在它的 github 仓库中，可以看到像 editorconfig-vscode、editorconfig-vim、editorconfig-jetbrains 等仓库，它们都是特定于某个编辑器的实现。



## 配置文件

打开一个项目时，EditorConfig 插件会在打开文件的目录和每个父目录中查找命名 `.editorconfig` 的文件，直到到达根目录或找到该配置文件且 `root=true` 

配置文件会被 EditorConfig 从上到下按顺序读取，所以写在后面的配置优先级更高。

对于 Windows 系统：若要在资源管理器中创建 `.editorconfig` 文件，需要创建一个名为 `.editorconfig.` （注意尾随点）的文件，Windows 资源管理器将自动把该文件重命名为 `.editorconfig` 



## 配置说明

`.editorconfig`文件使用 INI 格式，但是允许使用`[`和`]`、glob 文件路径（区分大小写），类似`.gitignore`的格式

下面是一个示例 `.editorconfig` 文件，用于设置 Python 和 JavaScript 文件的行尾和缩进样式。

```ini
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# 对所有文件生效，使用unix风格的换行符
[*]
end_of_line = lf
insert_final_newline = true

# 用大括号展开符号匹配多个文件
[*.{js,py}]
# 设置默认的字符集
charset = utf-8

# 使用 4 个空格缩进
[*.py]
indent_style = space
indent_size = 4

# 使用制表符缩进
[Makefile]
indent_style = tab

# 覆盖lib目录下所有js文件
[lib/**.js]
indent_style = space
indent_size = 2

# 精确匹配指定文件
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```



### 文件格式

1、EditorConfig 文件应采用 utf-8 编码，并使用 LF 或 CRLF 换行符

2、除行首以外，任何位置不能插入注释，否则都被视为该行文本的一部分

3、每行必须符合下列规则之一：

- 空行
- 注释：以`;`或`#`开头
- 节标题：以`[`开头，以`]`结尾
  - 长度<= 1024 个字符
  - 不得在括号外使用任何非空格字符
  - 方括号之间可以包含任何字符，包括空格和制表符
  - `/`作为路径分隔符
  - 不允许使用反斜杠作为路径分隔符，包括在 windows 上
- 用`=`分隔的键值对
  - 键：第一个 `=` 之前的部分，忽略首尾空格，但包括中间的任何空格
  - 值：第一个 `=` 之后的部分，忽略首尾空格，但包括中间的任何空格



### 通配符

EditorConfig 文件中的节标题是文件路径通配符， 接受类似于 `.gitignore` 的格式。支持通过 Unix shell 样式通配符进行模式匹配。

以下内容识别为通配符匹配的特殊字符：

| 通配符         | 匹配                                                         |
| :------------- | :----------------------------------------------------------- |
| `*`            | 任何字符串，路径分隔符 `/` 除外                              |
| `**`           | 任意字符串                                                   |
| `?`            | 任何单个字符，路径分隔符  `/` 除外                           |
| `[seq]`        | seq 中的任何单个字符                                         |
| `[!seq]`       | 不在 seq 中的任何单个字符                                    |
| `{s1,s2,s3}`   | 任何给定的字符串（用逗号分隔，可以嵌套）                     |
| `{num1..num2}` | `num1`和之间的任何整数`num2`，其中`num1`和`num2` 可以是正数或负数 |

反斜杠字符 ( `\\`) 可用于转义字符，不会被解释为特殊字符

<br/>

### 配置项

| key                        | 说明                                                         |
| :------------------------- | :----------------------------------------------------------- |
| `indent_style`             | tab/space，指定缩进格式，不区分大小写                        |
| `indent_size`              | 整数，指定缩进宽度                                           |
| `tab_width`                | 整数，指定制表符宽度，默认为`indent_size`，通常不需要指定    |
| `end_of_line`              | 可选值：`lf`、`cr`、 或`crlf`，指定换行符，不区分大小写      |
| `charset`                  | 可选值： `latin1`、`utf-8`、`utf-8-bom`、`utf-16be`或`utf-16le`，不建议`utf-8-bom`，用来指定编码格式 |
| `trim_trailing_whitespace` | true/false，是否删除文件中换行符之前的所有空白字符           |
| `insert_final_newline`     | true/false，文件是否以换行符结尾                             |
| `root`                     | true/false，是否为根配置文件                                 |

示例

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
quote_type = single
```



##  与其他规范的关联

在查阅 Prettier 的文档时，看到 Prettier 默认会读取 EditorConfig 中的配置，然后合并到 `.prettierrc*`配置中，因此，如果在 EditorConfig 已经设置了一些配置项，在 Prettier 中可以不再设置。
