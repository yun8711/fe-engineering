---
outline: deep
prev: false
next: false

---

<h1>.editorconfig</h1>

[官网](https://editorconfig.org/) | [规范文档](https://spec.editorconfig.org/)



## 介绍

EditorConfig 有助于跨不同编辑器和 IDE 处理同一项目的多个开发人员保持一致的编码风格。

它可以定义和配置项目中各个文件的缩进、空白符、换行符等格式，并将这些格式规则写入到 `.editorconfig` 文件中，以便其他开发者可以轻松地设置他们的编辑器来遵循相同的规则。

支持大部分主流的编辑器和 IDE，包括但不限于：VS Code、Sublime Text、IntelliJ IDEA、Eclipse、Notepad++ 等

使用 INI 格式，但是允许使用`[`和`]`、glob 文件路径（区分大小写），类似`.gitignore`的格式

## 文件格式规范

### 通配符

| 特殊字符       | 匹配                                                         |
| :------------- | :----------------------------------------------------------- |
| `*`            | 任何字符串，路径分隔符 `/` 除外                              |
| `**`           | 任意字符串                                                   |
| `?`            | 任何单个字符，路径分隔符  `/` 除外                           |
| `[seq]`        | seq 中的任何单个字符                                         |
| `[!seq]`       | 不在 seq 中的任何单个字符                                    |
| `{s1,s2,s3}`   | 任何给定的字符串（用逗号分隔，可以嵌套）                     |
| `{num1..num2}` | `num1`和之间的任何整数`num2`，其中`num1`和`num2` 可以是正数或负数 |

反斜杠字符 ( `\\`) 可用于转义字符

<br/>

### 配置项

| 钥匙                       | 支持的值                                                     |
| :------------------------- | :----------------------------------------------------------- |
| `indent_style`             | 缩进格式，可选：`tab`和`space`，不区分大小写。               |
| `indent_size`              | 缩进宽度，一个整数                                           |
| `tab_width`                | 制表符宽度，一个整数，定义制表符的宽度，默认为`indent_size`，通常不需要指定 |
| `end_of_line`              | 换行符，可选为`lf`、`cr`、 或`crlf`，不区分大小写            |
| `charset`                  | 编码格式：可选 `latin1`、`utf-8`、`utf-8-bom`、`utf-16be`或`utf-16le`，不鼓励`utf-8-bom` |
| `trim_trailing_whitespace` | 设置为`true`可删除文件中换行符之前的所有空白字符并`false`确保不会删除。 |
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



其他的看文档
