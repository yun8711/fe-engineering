---
outline: deep
prev: false
next: false

---

<h1>Prettier 配置详解</h1><p>v3.2.4（2024-02）</p>

根据 prettier 类型定义及官方文档整理

```js
// @ts-check

/** @type {import("prettier").Config} */
export default {
  /**
   * 打印宽度
   * @default 80
   */
  printWidth: 100,
  /**
   * 缩进大小
   * @default 2
   */
  tabWidth: 2,
  /**
   * 是否使用制表符进行缩进
   * @default false
   */
  useTabs: false,
  /**
   * 是否在语句末尾添加分号
   * @default true
   */
  semi: true,
  /**
   * 是否使用单引号
   * @default false 使用双引号
   */
  singleQuote: false,
  /**
   * 在 JSX 中使用单引号
   * @default false
   */
  jsxSingleQuote: false,
  /**
   * 尽可能添加尾随逗号
   * @default "all"
   * @values
   * "none" - 不添加尾随逗号，意味着在多行的对象、数组、函数参数等的最后一个元素后面，不会添加逗号
   * "es5" - 在符合ES5规范的地方添加尾随逗号，在多行的对象、数组的最后一个元素后会添加逗号，但在函数参数后面不会添加
   * "all" - 在可能的地方添加尾随逗号，包括函数参数。这需要ES2017规范支持。
   */
  trailingComma: "es5",
  /**
   * 在对象大括号与文本之间是否添加空格
   * @default true
   */
  bracketSpacing: true,
  /**
   * 多行HTML元素的结尾>，放在最后一行的末尾，还是单独放在下一行（不适用于自闭合元素）。
   * 如果设置为true，则>会放在最后一行的末尾
   * @default false
   */
  bracketSameLine: false,
  /**
   * 格式化文件时的起始位置
   * @default 0
   */
  rangeStart: 0,
  /**
   * 格式化文件时的结束位置
   * @default Number.POSITIVE_INFINITY，即正无穷大
   */
  rangeEnd: Number.POSITIVE_INFINITY,
  /**
   * 指定要使用的解析器
   * @desc 会根据文件类型自动推断，支持常见的多种语言，prettier内部已经集成了对应的解析器
   * @link https://prettier.io/docs/en/options.html#parser
   */
  parser: "",
  /**
   * 指定输入文件路径，Prettier会使用这个路径来推断应该使用哪个解析器来解析你的代码
   */
  filepath: "";
  /**
   * 是否只格式化包含特定注释（称为pragma，把@prettier或@format放在文件顶部的多行注释中）的文件，默认为false，即格式化所有文件
   * @default false
   */
  requirePragma: false,
  /**
   * 是否在Prettier格式化文件后的文件顶部插入一个特殊的注释标记，标记为@format。
   * 与requirePragma选项一起使用，可以在提交代码时检查是否格式化了文件
   * @default false
   */
  insertPragma: false,
  /**
   * 如何处理Markdown文本的换行
   * @default "preserve"
   * @values
   * "always" - 在文本超过打印宽度时换行
   * "never" - 不会文本换行
   * "preserve" - （推荐）保留原始文件中的换行，因为某些服务对换行敏感
   */
  proseWrap: "preserve",
  /**
   * 箭头函数只有一个参数时，是否添加括号
   * @default "always"
   * @values
   * "always" - 总是添加括号
   * "avoid" - 只有一个参数时不添加括号
   */
  arrowParens: "avoid",
  /**
   * 添加额外的语言插件。
   * 接受一个数组，数组中的每个元素都是一个插件，可以是一个字符串（插件的名称或路径），也可以是一个插件对象
   * @example ["prettier-plugin-graphql"]
   */
  // plugins: Array<string | Plugin>;
  /**
   * 如何处理 HTML 中的空格
   * @default "css"
   * @values
   * "css" - 保留CSS显示属性的空格，尊重HTML中的默认行为，其中某些标签（如<pre>、<textarea>）会保留空格，而其他标签则不会
   * "strict" - 保留所有空格，无论HTML标签是什么，所有的空格都会被保留
   * "ignore" - 忽略所有空格，无论HTML标签是什么，所有的空格都会被删除
   */
  htmlWhitespaceSensitivity: "css",
  /**
   * 要应用哪个行尾字符
   * @default "lf"
   * @values
   * "auto" - （推荐，保持兼容性）保持现有的行尾字符（通过查看文件的第一行来决定）
   * "lf" - 行层添加LF（Line Feed，换行）字符，即\n，这是Unix系统（包括Linux和macOS）的标准行尾字符
   * "crlf" - 行尾添加CRLF（Carriage Return Line Feed，回车换行）字符，即\r\n，这是Windows系统的标准行尾字符
   * "cr" - 行尾添加CR（Carriage Return，回车）字符，旧的Mac系统的标准行尾字符
   */
  endOfLine: "auto",
  /**
   * 更改引用对象中的属性的时间
   * @default "as-needed"
   * @values
   * "as-needed" - 仅在需要时添加引号
   * "consistent" - 如果文件中的任一属性需要引号，则所有属性都需要引号
   * "preserve" - 保留原始文件中的引号
   */
  quoteProps: "as-needed",
  /**
   * 是否缩进Vue 文件中的 <script> 和<style>标签
   * @default false
   */
  vueIndentScriptAndStyle: false,
  /**
   * 是否格式化嵌入在文件中的带引号的代码
   * @default "auto"
   * @values
   * "auto" - 根据文件内容自动检测
   * "off" - 不格式化嵌入的代码
   */
  embeddedLanguageFormatting: "auto",
  /**
   * 是否强制在 HTML、Vue 和 JSX 中每行只能有一个属性
   * @default false
   */
  singleAttributePerLine: false,
  /**
   * 三元运算符的格式
   * @default false
   * @values
   * true - 在多行三元运算符的问号和冒号之间添加换行符
   * false - 保留三元的默认行为;将问号与结果放在同一行上
   */
  experimentalTernaries: false,
};
```

