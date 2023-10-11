---
outline: deep
prev: false
next: false

---

<h1>prismjs</h1><p>v1.29.0</p>

[官网](https://prismjs.com/) | [npm](https://www.npmjs.com/package/prismjs) | [github](https://github.com/PrismJS/prism) 



## 介绍

一个轻量级、强大且优雅的语法高亮库，是Dabblet的一个衍生项目。

<br/>

### 优点

- 轻量：核心代码压缩后只有 1.5KB，每种语言支持增加约 0.3～0.5KB，主题大约 1KB
- 扩展性好：支持通过插件机制来添加新语言支持，或者扩展现有语言
- 兼容性好：所有样式都是通过 CSS 完成的，使用[合理的类名](https://prismjs.com/faq.html#how-do-i-know-which-tokens-i-can-style-for)，支持：Edge、IE11、Firefox、Chrome、Safari、[Opera](https://prismjs.com/faq.html#this-page-doesnt-work-in-opera)、大多数移动浏览器
- 语言定义可继承：多个具有相同语言的代码片段，只需定义一次即可
- 使用简单：导入 prism.css 和 prism.js，然后使用标签`code.language-xxx`即可
- 速度快：支持Web Workers 特性
- 当前支持 297 种语言

<br/>

### 限制

- 基于正则表达式进行语法高亮显示，会在某些边缘情况下失败，[查看已知故障](https://prismjs.com/known-failures.html)
- 不支持 IE 6-10
- 代码中任何预先存在的 HTML 都将被删除，[查看解决方案](https://prismjs.com/faq.html#if-pre-existing-html-is-stripped-off-how-can-i-highlight)
- 一些主题在某些布局下存在问题，[此处](https://prismjs.com/known-failures.html#themes)记录了已知案例



## 用法

### 基本用法

引入 Prism 的 CSS 和 JS 文件

```html
<!DOCTYPE html>
<html>
<head>
    <link href="themes/prism.css" rel="stylesheet" />
</head>
<body>
    <script src="prism.js"></script>
</body>
</html>
```

将要高亮的代码按照如下的格式组织（ `<pre>` 标签内嵌套 `<code>` 标签）：

```html
<pre>
  <code class="language-css">
    p { color: red }
  </code>
</pre>
```

这样代码就会被自动高亮

如果不想自动高亮，如下，给引用代码的 `script` 标签加上 `data-manual` 属性

```html
<script src="prism.js" data-manual></script>
```

然后手动调用 api，这种用法应用的场景：页面上手动书写代码让其及时高亮预览



### 与 webpack 一起使用

安装依赖：`pnpm add prismjs`

为了便于仅使用所需的语言和插件配置 Prism 实例，推荐使用 babel 插件 [babel-plugin-prismjs](https://www.npmjs.com/package/babel-plugin-prismjs)，实现按需加载语言和插件



### 在 nodejs 中使用

1、先导入依赖和语言加载器

``` js
import prism from 'prismjs';
// 导入语言加载器，可选
import loadLanguages from 'prismjs/components';
```

2、声明要加载的语言支持

```js
loadLanguages(['markup', 'css', 'javascript'])
```

loadLanguages将自动处理任何所需的依赖语言包

prismjs 默认会加载： `markup`、`css`、`clike` 、`javascript`，可以按需加载其他语言，[支持的语言列表](https://prismjs.com/#supported-languages)

3、调用 API 处理源码

```js
const code = `= ['hi', 'there', 'reader!'].join " "`;

const html = prism.highlight(code, prism.languages.haml, 'haml');
```



## [API](https://prismjs.com/docs/index.html)

### highlight

接受文本字符串作为输入和要使用的语言定义，并返回一个生成的 HTML 字符串

```js
highlight(text, grammar, language)=>string

// 示例
Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
```

- text：代码字符串
- grammar：语法，通常为语言定义，如 `Prism.languages.markup` 
- language：string，传递给 grammar 的语言定义的名称



### highlightElement

高亮显示单个元素中的代码

```js
highlightElement（element， async， callback）
```

- element：包含代码的元素，必须有一个要处理的合法的 `language-xxxx` 类
- async： 默认 false，是否使用 Web Worker来提升性能，可以避免大量代码时阻塞 UI
- callback：可选，回调函数，当 async 为 true 时最有用



### highlightAllUnder

获取具有 `.language-xxxx` 类的 `container` 的所有后代，然后调用 `Prism.highlightElement` 处理每个后代

```
highlightAllUnder(container, async, callback)
```

- container：根节点元素，具有 `.language-xxxx` 类
- async：默认 false，是否使用 Web Worker来提升性能，可以避免大量代码时阻塞 UI
- callback：可选，每个元素处理完成后的回调函数



### tokenize

核心功能，也是最底层的功能。它接受文本字符串作为输入和要使用的语言定义，返回一个包含标记化代码的数组。

当语言定义包含嵌套标记时，将递归调用每个标记的函数，此方法在其他上下文中作为一个解析器也很有用

```
tokenize（text， grammar） → { TokenStream}
```

- text：包含要高亮显示的代码的字符串
- grammar：包含要使用的令牌的对象，通常是一个语言定义，如 `Prism.languages.markup` 

示例

```js
let code = `var foo = 0;`;
let tokens = Prism.tokenize(code, Prism.languages.javascript);
tokens.forEach(token => {
    if (token instanceof Prism.Token && token.type === 'number') {
        console.log(`Found numeric literal: ${token.content}`);
    }
});
```



### highlightAll

最高级的功能，获取 `.language-xxxx` 类的所有元素，然后调用 `Prism.highlightElement` 作用于每个元素，相当于 `Prism.highlightAllUnder(document, async, callback)`

```
highlightAll(async, callback)
```

- async：默认 false，与 `Prism.highlightAllUnder`  中的相同，表示是否使用 Web Worker来提升性能
- callback：可选，每个元素处理完成后的回调函数
