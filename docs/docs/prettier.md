---
outline: deep
prev: false
next: false
---

<h1>Prettier</h1><p>v3.0.0（2023-07）</p>

[中文官网](https://www.prettier.cn/) | [英文官网](https://prettier.io/) | [github](https://github.com/prettier/prettier) | [完整注释](https://github.com/yun8711/fe-configuration/tree/master/examples/prettier)

## 介绍

Prettier 是一款代码格式化工具，可以帮助开发者自动化的将代码进行排版和格式化，从而使代码更加易读、易维护，并减少因为格式不一致引起的代码冲突。<br/>
它可以支持多种编程语言，如 JavaScript、TypeScript、Flow、JSX、JSON、CSS、SCSS、Less、HTML 、Vue、Angular、GraphQL、Markdown、YAML

## 配置文件

在项目根目录下创建以下文件：

- `.prettierrc.js`：用来声明配置（或者其他类型的配置文件，本文使用 .js 文件为例）
- `.prettierignore`：文件用来声明要被忽略检查的目录和文件

### 共享配置

只需要发布一个导出配置对象的模块，比如`@company/prettier-config`，然后在package.json中引用它：

```json
{
  "name": "my-cool-library",
  "version": "9000.0.1",
  "prettier": "@company/prettier-config"
}
```

如果不使用 package.json，也可以在项目中的 `.prettierrc.js` 中导入配置

```js
module.exports = {
  ...require("@company/prettier-config"),
  // 可以自定义规则对已有规则进行覆盖
  semi: false,
};
```

### .editorconfig 配置的影响

如果 prettier 的配置项中的`editorconfig`设置为 true，并且项目中存在`.editorconfig`配置文件，Prettier 会解析它，将其属性转换为相应的Prettier配置。**但是`.prettierrc`的优先级更高**。

下面是不同属性如何映射到Prettier行为的注释描述：

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

## 插件

prettier 插件的名称一般为`prettier-plugin-xxx`

**prettier-plugin-packagejson**

用于格式化 package.json 文件，对配置项进行排序，同时也可以用于格式化 json 文件

```
pnpm add -D prettier-plugin-packagejson
```

配置方式，在 `.prettierrc.js`文件中添加以下配置

```json
module.export={
  // ...省略其他配置

  // 指定插件
	plugins: ['prettier-plugin-packagejson'],

  // 针对 rc 文件，使用 json 方式进行格式化
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json',
        // 指定规则
        "singleQuote": false,
        "quoteProps": "preserve"
      },
    },
  ],
}
```

## 示例

[ant-design-pro](https://github.com/ant-design/ant-design-pro/blob/master/.prettierrc.js)

[ant-design](https://github.com/ant-design/ant-design/blob/master/.prettierrc)

[ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/.prettierrc)
