---
outline: deep

---

<h1>escape-html</h1><p>v1.0.3</p>

[npm](https://www.npmjs.com/package/escape-html) | [github](https://github.com/component/escape-html) 



## 介绍

将文本转义为字符串，可以插入到 html 中



## 用法

安装

```
pnpm add escape-html
```

示例

```js
import escapeHtml from 'escape-html';

// example values
const desc = 'I <b>think</b> this is good.'
const fullName = 'John "Johnny" Smith'

console.dir('<input name="full_name" value="' + escapeHtml(fullName) + '">')
// -> '<input name="full_name" value="John &quot;Johnny&quot; Smith">'

console.dir('<textarea name="desc">' + escapeHtml(desc) + '</textarea>')
// -> '<textarea name="desc">I &lt;b&gt;think&lt;/b&gt; this is good.</textarea>'
```



## API

### escapeHtml(string)

此模块导出单个函数： `escapeHtml` ，该函数用于把给定的文本字符串中的特殊字符（ `"` 、 `&` 、 `<` 、 `'` 、 `>` ）进行转义，以便可以在 HTML 内容中插值。

**注意：**

1、转义值只适合作为元素的文本内容插入到 HTML 中，其中的标签不能有不同的转义机制

例如，它不能放在`<style>` 或 `<script>` 中，因为这些内容正文不是 HTML，而是 CSS 和 JavaScript，这些在 HTML 标准中被称为 "raw text elements"（原始文本元素）。

> 在HTML标准中，"raw text elements" 意指元素内容应当被视为原始文本，而不会被解释为HTML标签或其他元素。因此它们适用于显示如代码示例、文本文件内容等不需要HTML解释的文本。这些元素通常包括 `<script>`、`<style>` 和 `<textarea>`。
>
> <br/>
>
> 需要注意的是，`<script>`和`<style>`元素中的内容通常是被解释的，但它们有一些特殊规则和上下文，使得它们被视为"raw text"，而不会触发HTML解释器。这允许在这些元素中包含JavaScript代码和CSS样式表，而不会被视为普通的HTML元素。

2、在标签中使用转义值时，仅适用于属性的值，该值被双引号 或单引号包裹
