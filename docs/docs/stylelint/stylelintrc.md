---
outline: deep
prev: false
next: false
---

<h1>stylelintrc</h1><p>v15.10.2</p>

[官网](https://stylelint.io/) | [中文翻译](https://cloud.tencent.com/developer/doc/1267) | [github](https://github.com/stylelint/stylelint) | [stylelint插件](https://github.com/stylelint/awesome-stylelint#plugins) | [stylelint共享配置](https://github.com/stylelint/awesome-stylelint#configs)



## 配置项

### rules

stylelint 内置了约 100个多个规则，**默认不启用任何规则**

rules 的值是一个对象，键名为规则名称，值为规则配置。

规则配置的格式有三种：

- null：表示关闭规则
- 单个值：表示主要选项，主要选项有值就表示启用规则
- `[primary option, secondary options]`：表示主要选项和扩展选项，主要选项有值就表示启用规则，辅助选项表示对该规则的进一步配置

扩展选项除了规则本身的扩展属性外，还有几个辅助选项：

- disableFix：禁用自动修复
- message：自定义违反规则时的提示消息
- reportDisables：是否在控制台报告被禁用的规则
- severity：设置规则的错误等级，默认为 error，可选 warning，会以不同的方式退出进程

示例：

```json
{
  "rules": {
    // 允许空的样式集
    "block-no-empty": null,
    // 指定允许的单位列表
    "unit-allowed-list": ["em", "rem", "%", "s"],
    // 为alpha值指定百分比或数字表示法
    "alpha-value-notation": ["percentage", { "exceptProperties": ["opacity"] }]
  }
}
```

<br/>

### extends

使用已存在的配置文件（自定义配置或是第三方的配置）用来扩展现有的配置。可以扩展 plugins、rules、customSyntax等配置项。

字符串，表示继承单个配置，数组表示继承多个配置。当继承多个配置时，后面的配置优先级更高

可扩展的配置：

- 位于 node_modules 的依赖，比如`stylelint-config-standard`，它导出一个 json 格式的配置
- js 或 json 格式配置文件的绝对路径
- js 或 json 格式配置文件的，相对于当前配置文件的相对路径

<br/>

### plugins

数组。插件是为支持方法、工具集、非标准 CSS 功能或非常具体的用例而创建的自定义规则或自定义规则集

插件可以是：

- npm 模块名称
- 插件的绝对路径
- 相对于当前配置文件的相对路径

插件通常包含在extends 中，比如 stylelint-config-standard-scss 配置就包含了 stylelint-scss 插件

声明插件后，需要在 rules 中添加插件规则，例如：

```json
{
  "plugins": ["../special-rule.js"],
  "rules": {
    "plugin-namespace/special-rule": "everything"
  }
}
```

<br/>

### customSyntax

指定自定义语法

<br/>

### overrides

指定要应用配置的子集，就是针对不同文件指定不同的规则

属性值是对象数组，每个对象：

- 必须包含一个 files 属性，它是 glob 模式数组，指定配置应用于哪些文件
- 至少包含一个其他常规配置属性，例如`customSyntax`、`rules`、`extends`等，`customSyntax`属性将被替换，而`plugins`、`extends`、`rules`等将被附加

示例：

```json
{
  "rules": {
    "alpha-value-notation": "number"
  },
  "overrides": [
    {
      "files": ["*.scss", "**/*.scss"],
      "customSyntax": "postcss-scss"
    },
    {
      "files": ["components/**/*.css", "pages/**/*.css"],
      "rules": {
        "alpha-value-notation": "percentage"
      }
    },
     // .vue/html 文件中的 <style> 标签内的样式
    {
      files: ["**/*.{html,vue}"],
      customSyntax: "postcss-html",
    },
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ]
}
```

<br/>

### defaultSeverity

指定默认的错误级别，优先级低于在 rules 中的配置

### <br/>

### report*

是指 stylelint 的一系列配置选项，用于控制 Stylelint 的输出报告方式。

以下是几个常用的 `report*` 配置选项：

- `reportNeedlessDisables`：当某个规则已经被禁用时，是否在控制台中输出信息。默认为 `false`
- `reportInvalidScopeDisables`：当在错误的位置禁用规则时，是否在控制台中输出信息。例如，在块内部禁用全局规则。 默认为 `true`。
- `reportDescriptionlessDisables`：当禁用规则时没有提供描述信息时，是否在控制台中输出信息。默认为 `true`
- `reportNeedlessDisables`：当某个规则已经被禁用时，是否在控制台中输出信息。默认为 `false`
- `reportOutputEmptyFiles`: 是否在控制台中输出当指定要 lint 的文件为空时的信息。默认为 `true`

配置规则也是有 3 种值：

- null：表示关闭规则
-  true/false：表示主要选项，主要选项有值就表示启用规则
- `[true/false, secondary options]`：表示主要选项和辅助选项，主要选项有值就表示启用规则，辅助选项表示对该规则的进一步配置

扩展选项除了规则本身的扩展属性外，还有几个辅助选项：

- except：数组，设置与主要选项相反的规则名称
- severity：设置规则的错误等级，默认为 error，可选 warning，会以不同的方式退出进程

示例：

```json
{
	// 除 selector-max-type 以后的规则被禁用时，会输出错误信息
  "reportNeedlessDisables": [true, { "except": ["selector-max-type"] }],
  // 针对unit-allowed-list没有描述的禁用发出警告
  "reportDescriptionlessDisables": [
    false,
    {
      "except": ["unit-allowed-list"],
      "severity": "warning"
    }
  ]
}
```



### <br/>

### configurationComment❓⬇️

创建禁用规则的实例

styleint 的 `/* stylelint-disable */` 注释，可以在代码中禁用所有规则或部分规则。

可以通过设置 configurationComment 来自定义这种注释，当有多个 stylelint 实例时，或者多个团队合作时，会非常有用。

比如，有如下配置：

```json
{
  "configurationComment": "stylelint-foo-instance"
}
```

则当文件中添加下面注释后

``` js
/* stylelint-foo-instance-disable */
```

stylelint 不会进行检查

### <br/>

### ignoreDisables❓⬇️

控制 Stylelint 是否忽略被禁用的规则

默认情况下，当在代码中使用注释禁用某个规则时，Stylelint会检查所有被禁用的规则，并输出警告或错误消息。但是，当`ignoreDisables`设置为`true`时，Stylelint会忽略所有被禁用的规则，并不会报告任何警告或错误消息。这可用于在特定情况下暂时禁用某些规则，而不会对整个项目产生不良影响。

### <br/>

### ignoreFiles ⬇️

指定要忽略的文件，值是 glob 语法的单文件或数组，默认忽略 node_modules 目录。

如果要忽略大量文件，推荐在`.stylelintignore`中设置，并且它的优先级更高。

### <br/>

### allowEmptyInput

当 glob 模式不匹配任何文件时，也就是没有没有输入文件时，Stylelint 不会抛出错误。默认情况下，没有任何输入文件时，Stylelint会输出一条错误消息并停止运行。

### <br/>

### cache

是否缓存处理结果，方便 stylelint 只对更改的文件进行检查。

默认情况下，缓存文件会存放在

<br/>

### fix

是否自动修复，也可以在命令行调用时传入参数



## 常用插件

stylelint-config-html：Stylelint v14 及更高版本默认不支持非 css 文件，需要该插件用来解析 html、xml、vue、Svelte、Astro、php 这些非 css 文件，需要 postcss-html

```js
/* 支持所有 */
{
  "extends": "stylelint-config-html"
}

/* 单个指定 */
{
  "extends": [
    "stylelint-config-html/html",
    "stylelint-config-html/xml",
    "stylelint-config-html/vue",
    "stylelint-config-html/svelte",
    "stylelint-config-html/astro",
    "stylelint-config-html/php"
  ]
}
```

[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended/blob/main/index.js)：包含所有 Stylelint 官方规则，启用大多数规则

[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)：**推荐**，stylelint-config-recommended 的增强版

[stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue/blob/HEAD/lib/index.js)：扩展stylelint-config-recommended，并提供 Vue 的相关规则 ，需要V14+，需要 postcss-html，使用SCSS需要：stylelint-config-recommended-scss

[stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)：扩展stylelint-config-standard，并提供 Vue 的相关规则 ，需要V14+。使用SCSS需要额外安装：stylelint-config-standard-scss

[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss/blob/HEAD/index.js)：Stylelint 的 SCSS 配置，需要 stylelint-scss、postcss-scss 两个包

[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss/blob/HEAD/index.js)：style-config-recommended-scss增强版

[stylelint-prettier](https://github.com/prettier/stylelint-prettier)：使 prettier 作为 stylelint 的规则运行，代码不符合 Prettier 的标准时，会报一个 stylelint错误，同时也可以通过 stylelint --fix 来进行格式化

[stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)：在 Stylelint v15 以前有用，关闭 stylelint 所有不必要或可能与 Prettier 冲突的规则；在 Stylelint v15 以后，Stylelint关闭了所有与样式相关的规则，所以项目中就不需要该依赖了

[stylelint-order](https://github.com/hudochenkov/stylelint-order)：属性排序功能的基础依赖

[stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)：**推荐**，按 Recess 和 Bootstrap 的方式对 css 属性排序

[stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order)：按合理的顺序对 css 属性排序

[stylelint-config-property-sort-order-smacss](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)：基于[SMACSS方法的属性排序排序的](http://smacss.com/)[Stylelint](https://github.com/stylelint/stylelint)配置

[postcss-html](https://www.npmjs.com/package/postcss-html)：用于解析 html（类 html，如 sfc、svelte、php 等），使用非 css 时，还需要 postcss-scss、postcss-less 等依赖



## 配置示例

[ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/.stylelintrc.json)

[ant-design](https://github.com/ant-design/ant-design/blob/master/.stylelintrc.js)

[vue-vben-admin](https://github.com/vbenjs/vue-vben-admin/blob/main/internal/stylelint-config/src/index.ts)

[Geeker-Admi](https://github.com/HalseySpicy/Geeker-Admin/blob/master/.stylelintrc.cjs)
