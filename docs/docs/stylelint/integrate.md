---
outline: deep
---

<h1>集成配置</h1><p>v16.2.1</p>

[Stylelint 官方插件和共享配置](https://github.com/stylelint/awesome-stylelint)

由于 Stylelint 默认未开启任何规则，所以在实际使用时，需要很多共享配置来开启相应的规则，或者使用插件来支持非 CSS 的样式文件。



## PoscCSS

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。它本身是一个系统，可以通过插件来扩展功能。 

如果要支持 SCSS/SASS/LESS/SugarSS 语法，则需要安装相应的模块：

- SCSS: [postcss-scss](https://github.com/postcss/postcss-scss)
- SASS: [postcss-sass](https://github.com/aleshaoleg/postcss-sass)
- LESS: [postcss-less](https://github.com/shellscape/postcss-less)
- Stylus: [postcss-styl](https://github.com/ota-meshi/postcss-styl)



## 基础规则集

下面两个插件就只是规则集，也就是只有 rules 配置，在只使用 CSS 的情况下，可以直接与 Stylelint 集成，不需要其他依赖。

<br/>

[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended) ：Stylelint 的推荐规则集，开启了大多数规则，可以将它作为基础配置来扩展

[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)：Stylelint 的标准规则集，扩展了 `stylelint-config-recommended` ，并开启了其他规则，来强制执行[现代 CSS 规范中的约定](https://www.w3.org/Style/CSS/current-work)。



## 扩展配置

[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss)：Stylelint 用于 SCSS 的推荐配置，该配置更适合大多数用户。使用时还要安装：postcss、postcss-scss、 stylelint-scss

其配置如下：

```js
const postcssScss = require('postcss-scss');

module.exports = {
	extends: ['stylelint-config-recommended'],
	customSyntax: postcssScss,
	plugins: ['stylelint-scss'],
  rules:[
    // ...
  ]
}
```

**stylelint-scss**：一个针对 SCSS 语法的 Stylelint 插件，引入了特定于 SCSS 语法的支持，并开启了相应的规则。一般用于 stylelint-config-standard-scss ，而不是直接使用。

**postcss-scss**：基于PostCSS 的 SCSS 解析器，它不编译 SCSS，只是将mixins解析为自定义规则，将变量解析为属性，以便PostCSS插件可以将SCSS源代码与CSS一起转换。

<br/>

[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)：继承了 `stylelint-config-standard` 并配置了 scss 规则，继承了 `stylelint-config-recommended-scss` 

其配置如下：

```js
module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
	rules: {
    // ...
  }
}
```

<br/>

其他类似的还有针对 less 等场景的。



## 在 Vue 中使用

[stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue)： Stylelint 用于 Vue 的推荐共享配置，使用时需要安装 postcss、postcss-html、stylelint-config-html

其内部配置如下：

```js
module.exports = {
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      extends: ["stylelint-config-recommended", "stylelint-config-html"],
      rules: require("./vue-specific-rules"),
    },
  ],
};
```

**stylelint-config-html**：解析器，使用 postcss-html 自定义语法，用于解析 HTML、XML、Vue、Svelte、Astro 和 PHP 文件

**postcss-html**： 是 PostCSS 的一个插件，它的作用是让 PostCSS 能够解析 HTML 和类似 HTML 文件（比如 Vue 单文件组件）中的 CSS 代码。

**用法**：

参照插件的内部配置可知，下面的写法只对.vue 文件生效

```js

{
    "extends": "stylelint-config-recommended-vue"
}
```

可以只使用它的解析器

```js
{
    "extends": "stylelint-config-html/vue"
}
```

<br/>

[stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)：Stylelint 用于 Vue 的标准共享配置

其配置如下：

```js
module.exports = {
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      extends: [
        "stylelint-config-standard",
        "stylelint-config-recommended-vue",
      ],
      rules: require("./vue-specific-rules"),
    },
  ],
};
```



## 配合 Prettier

下面两个插件适用于 Stylelint v15 以下版本，因为从 v15 开始，Stylelint 弃用了所有与 Prettier 冲突的样式规则，并在 v16 中删除了这些规则。

<br/>

[stylelint-prettier](https://github.com/prettier/stylelint-prettier)：使 Prettier 作为 Stylelint 的规则运行，代码不符合 Prettier 的标准时，会报一个 stylelint错误，同时也可以通过 `--fix `来进行格式化

```js
{
  "plugins": ["stylelint-prettier"],
  "rules": {
    "prettier/prettier": true
  }
}
```

<br/>

[stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)：作用是关闭 stylelint 所有不必要或可能与 Prettier 冲突的规则



## 扩展功能

### 属性排序

[stylelint-order](https://github.com/hudochenkov/stylelint-order)：属性排序功能的基础依赖

[stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)：**推荐**，按 Recess 和 Bootstrap 的方式对 css 属性排序

[stylelint-config-rational-order](https://github.com/constverum/stylelint-config-rational-order)：按合理的顺序对 css 属性排序

[stylelint-config-property-sort-order-smacss](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)：基于[SMACSS方法的属性排序排序的](http://smacss.com/)[Stylelint](https://github.com/stylelint/stylelint)配置



## 配置示例

[vue-pure-admin](https://github.com/pure-admin/vue-pure-admin/blob/cb0d757191780acdd127ef74bd3c737f137848de/stylelint.config.js)

[ant-design-vue](https://github.com/vueComponent/ant-design-vue/blob/main/.stylelintrc.json)

[ant-design](https://github.com/ant-design/ant-design/blob/master/.stylelintrc.js)

[vue-vben-admin](https://github.com/vbenjs/vue-vben-admin/blob/main/internal/stylelint-config/src/index.ts)

[Geeker-Admi](https://github.com/HalseySpicy/Geeker-Admin/blob/master/.stylelintrc.cjs)
