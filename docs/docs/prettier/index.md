---
outline: deep
prev: false
next: false
---

<h1>Prettier 概述</h1><p>v3.2.4（2024-02）</p>

## 介绍

Prettier 在 2017 年由 James Long 在 Facebook 内部开发并开源。

Prettier 是一款代码格式化工具，可以帮助开发者自动化的将代码进行排版和格式化，从而使代码更加易读、易维护，并减少因为格式不一致引起的代码冲突。<br/>
它可以支持多种编程语言，如 js、ts、Flow、JSX、JSON、CSS、SCSS、Less、HTML 、Vue、Angular、GraphQL、Markdown、YAML，还可以通过官方或社区维护的插件来支持其他语言



## 配置文件

Prettier 会从要格式化的文件的同级目录开始查找配置文件，并在文件树中向上搜索，直到找到配置文件。

Prettier 不支持任何类型的全局配置，这是为了确保格式的行为保持一致。

Prettier 支持以下格式的配置文件（按优先级）：

- 在 package.json 中设置`perttier`字段
- 用 JSON 或 YAML 编写的 `.prettierrc` 文件
- `.prettierrc.yml` 、 `.prettierrc.json` `.prettierrc.yaml` 或 `.prettierrc.json5` 文件
- `.prettierrc.js` 或 `prettier.config.js`文件，使用`export default` 或 `module.exports` 导出一个配置对象
- `.prettierrc.mjs` 或 `prettier.config.mjs`文件，使用`export default` 导出一个配置对象
- `.prettierrc.cjs` 或 `prettier.config.cjs`文件，使用`module.exports` 导出一个配置对象
- `.prettierrc.toml` 文件

可以在 https://json.schemastore.org/prettierrc 使用 JSON schema 来验证配置。



### 配置覆盖

Prettier 借用了 ESLint 的 overrides 的写法，允许对某些文件、目录进行不同的配置。

```json
{
  "semi": false,
  "overrides": [
    {
      "files": "*.test.js",
      "options": {
        "semi": true
      }
    },
    {
      "files": ["*.html", "legacy/**/*.js"],
      "options": {
        "tabWidth": 4
      }
    }
  ]
}
```

- `files` ：必需， glob 格式的字符串或字符串数组
- `excludeFiles`：可选，glob 格式的字符串或字符串数组，用于排除某些规则的文件



### 共享配置

可以把 prettier 的配置文件（导入一个配置对象）发布成一个 npm 包，把配置共享给其他项目。

在 package.json 中直接使用它，把包名配置在 prettier 字段：

```json
{
  "name": "my-cool-library",
  "version": "9000.0.1",
  "prettier": "@company/prettier-config"
}
```

如果不使用 package.json，也可以在项目中的 `.prettierrc.js` 中导入配置，这种方式可以对共享配置进行修改

```js
module.exports = {
  ...require("@company/prettier-config"),
  // 可以自定义规则对已有规则进行覆盖
  semi: false,
};
```



### 解析器

默认情况下，Prettier 会根据输入文件扩展名自动推断要使用的解析器。通过 parser 字段可以指定解析器，但是一般不要这么做，否则对所有文件都会使用同一种解析器。

如果想对某些规则的文件指定解析器，需要结合 `overrides` 来告诉 Prettier 如何解析这些文件。



### .editorconfig 配置的影响

Prettier 默认会读取项目中 .editorConfig 中的部分配置，并合并到 Prettier 的配置中。

在 Prettier 的[源码](https://github.com/prettier/prettier/blob/bc0be70cf957edfd77ee2ee0587f49457b86b9ad/src/config/editorconfig/editorconfig-to-prettier.js)中做了以下处理（增加了注释）：

```js
  // 首先判断出 useTabs 的值
  if (editorConfig.indent_style) {
    result.useTabs = editorConfig.indent_style === "tab";
  }

  if (editorConfig.indent_size === "tab") {
    result.useTabs = true;
  }

  // 判断出 tabWidth
  if (result.useTabs && editorConfig.tab_width) {
    result.tabWidth = editorConfig.tab_width;
  } else if (
    editorConfig.indent_style === "space" &&
    editorConfig.indent_size &&
    editorConfig.indent_size !== "tab"
  ) {
    result.tabWidth = editorConfig.indent_size;
  } else if (editorConfig.tab_width !== undefined) {
    result.tabWidth = editorConfig.tab_width;
  }

  // 判断出 printWidth
  if (editorConfig.max_line_length) {
    if (editorConfig.max_line_length === "off") {
      result.printWidth = Number.POSITIVE_INFINITY;
    } else {
      result.printWidth = editorConfig.max_line_length;
    }
  }
	
	// 判断出 singleQuote
  if (editorConfig.quote_type === "single") {
    result.singleQuote = true;
  } else if (editorConfig.quote_type === "double") {
    result.singleQuote = false;
  }

	// 判断出 endOfLine
  if (["cr", "crlf", "lf"].includes(editorConfig.end_of_line)) {
    result.endOfLine = editorConfig.end_of_line;
  }
```

总结一下：下面是不同属性如何映射到Prettier行为的注释描述：

```yaml
[*]
# 不可配置的Prettier行为
charset = utf-8
insert_final_newline = true

# Caveat: Prettier won’t trim trailing whitespace inside template strings, but your editor might.
# 警告:Prettier不会修剪模板字符串中的末尾空白，但你的编辑器可能会
# trim_trailing_whitespace = true

# 可配置的Prettier行为
# (change these if your Prettier config differs)
end_of_line = lf
indent_style = space
indent_size = 2
max_line_length = 80
```

所以，在 Prettier 中，上述的几个配置项是可选的，如果在 `.editorConfig`中配置了，可以在 Prettier 中省略



## 忽略代码

默认情况下，prettier 会忽略版本控制系统目录，如`.git`、`.sl`、`.svn`、`.hg` 中的文件，和`node_modules`目录（除非指定`--with-node-modules` CLI 选项）。如果同级目录下存在 `.gitignore` 文件，Prettier 也会遵循该文件指定的规则。

所以，默认情况下，被忽略的文件为：

```ini
**/.git
**/.svn
**/.hg
**/node_modules
```

### prettierignore 配置

另外，还可以使用`.prettierignore`文件来声明不需要被检查的目录和文件，它使用  [gitignore syntax](https://git-scm.com/docs/gitignore#_pattern_format) 语法：

*示例：*

```ini
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
**/*.html
```

### 注释

Prettier 提供了一些注释可以让 Prettier 忽略某些代码的格式化：

-  `// prettier-ignore`：忽略 AST 中下一节点的格式化
- `<!-- prettier-ignore-start -->`和`<!-- prettier-ignore-end -->`：用来指定忽略部分

*示例*

*js 文件中使用*

```js
// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

*jsx 文件中*

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

*html 文件中*

```html
<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
  (mousedown)="       onStart    (    )         "
  (mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
  (mousedown)="onStart()"
  (mouseup)="         onEnd      (    )         "
></div>
```

*css 文件中*

```css
/* prettier-ignore */
.my    ugly rule
{

}
```

*markdown 文件中*

```markdown
<!-- prettier-ignore -->
Do   not    format   this
```





## 插件

插件系统是 Prettier 实现对新语言或自定义格式化规则支持的方法，Prettier 自身的语言格式化也是通过插件的 API 来实现的。

prettier 插件的名称一般为`prettier-plugin-xxx`

**用法**

以 prettier-plugin-sql 为例

首先安装插件：

```
pnpm add -D prettier-plugin-sql
```

然后将它添加到 plugins 配置中即可：

```json
module.export={
  // ...省略其他配置

  // 指定插件
	plugins: ['prettier-plugin-packagejson'],
}
```



插件开发查看[官方文档](https://prettier.io/docs/en/plugins#developing-plugins)



## 示例

[ant-design-pro](https://github.com/ant-design/ant-design-pro/blob/master/.prettierrc.js)

[ant-design](https://github.com/ant-design/ant-design/blob/master/.prettierrc)

[ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/.prettierrc)
