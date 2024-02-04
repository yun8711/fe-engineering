---
outline: deep

---

<h1>插件：eslint-plugin-vue</h1><p>v9.4.2</p>

[官网](https://eslint.vuejs.org/) | [github](https://github.com/vuejs/eslint-plugin-vue)

Vue.js 的官方 ESLint 插件，允许 ESLint 检查`.vue`文件中的 `<template>` 和 `<script>` ，以及 `.js` 文件中的 Vue 代码。

- 查找语法错误
- 使用vue指令的错误用法
- 发现与[vue风格指南](https://vuejs.org/style-guide/) 不一致的问题



## 基本用法 

1、安装：

`pnpm add -D eslint-plugin-vue`

2、配置

对于`.vue`文件， parser 必须指定为 `vue-eslint-parser `解析器，要指定其他解析器时，只能放在 parserOptions 中

（1）在 `.eslintrc.js` 文件中

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  parser: "vue-eslint-parser",
  parserOptions:{
    parser: "@typescript-eslint/parser",
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
```



（2）在 `eslint.config.js` 文件中

```js
import pluginVue from "eslint-plugin-vue";
import * as parserVue from "vue-eslint-parser";

export default [
    {
      files: ["**/*.vue"],
      languageOptions: {
        // ...
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      },
      plugins: {
        vue: pluginVue
      },
      processor: pluginVue.processors[".vue"],
      rules:[
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs["vue3-essential"].rules,
        ...pluginVue.configs["vue3-recommended"].rules,
        // ...
      ]
    }
]
```



## 预设配置

eslint-plugin-vue 可以适配vue2、vue3，同时预设了一些规则集，所以需要根据需求选择，添加到`extend`中即可，它的预设配置包含以下内容：

1、`plugin:vue/base`：eslint 解析 vue 的基础配置，让vue文件可以正确的被eslint解析，其内容如下：

```js
module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue'],
  rules: {
    'vue/comment-directive': 'error',
    'vue/jsx-uses-vars': 'error'
  }
}
```

2、以下预设适用于vue3 项目，依次增加更多规则：

- `plugin:vue/vue3-essential`：在base基础上，rules 增加防止错误或意外行为的规则
- `plugin:vue/vue3-strongly-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则
- `plugin:vue/vue3-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则

3、以下适用于vue2 项目，依次增加更多规则：

- `plugin:vue/essential`：在base基础上，增加防止错误或意外行为的规则
- `plugin:vue/strongly-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则
- `plugin:vue/recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则

该插件支持 Vue.js 3.2 的基本语法、 `<script setup>` 、CSS 变量注入，但尚不支持 Vue.js 3.2 的实验性功能 ref sugar。



## 解析器配置

与 eslint 的默认配置相似，示例如下：

```typescript
module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser:'',
    ecmaVersion?: 2018,
    sourceType?: "module", // 或者 "script"
    ecmaFeatures:{
    	globalReturn?: false,
      impliedStrict: false,
      jsx: false
  	},
  },
  // 其他 ESLint 配置...
};
```



### `parser`

指定自定义解析器来解析 `<script>` 标签，除解析器之外的其他属性将提供给指定的解析器

```js
{
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "@babel/eslint-parser",
        // 或者
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    }
}
```

还可以指定一个对象并单独更改 `<script lang="...">` 的解析器

```js
{
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": {
             // Script parser for `<script>`
            "js": "espree",

             // Script parser for `<script lang="ts">`
            "ts": "@typescript-eslint/parser",

             // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
             // and vue interpolations (e.g. `{{variable}}`).
             // If not specified, the parser determined by `<script lang ="...">` is used.
            "<template>": "espree",
        }
    }
}
```

使用 `.eslintrc.js`配置文件时，也可以直接设置为解析器对象

```js
const tsParser = require("@typescript-eslint/parser")
const espree = require("espree")

module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        // Single parser
        parser: tsParser,
        // Multiple parser
        parser: {
            js: espree,
            ts: tsParser,
        }
    },
}
```

如果不设置，则 `vue-eslint-parser` 完全跳过解析 `<script>`

<br/>

### `vueFeatures`

指定如何解析与 Vue 功能相关的内容

```json
{
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "vueFeatures": {
            "filter": true,
            "interpolationAsNonHTML": true,
            "styleCSSVariableInjection": true,
            "customMacros": []
        }
    }
}
```

1、`filter`：是否解析 Vue2 过滤器，如果为 false，模板中的  `|`在 Vue2 中无法解析，在 Vue3 中被解析为按位操作。

2、`interpolationAsNonHTML`：默认 true，指定是否将插值解析为 HTML。如果为 true，解析器会将插值作为非 HTML 处理（但是，可以在插值中使用 HTML 转义）

3、`styleCSSVariableInjection`：默认 true，如果设置为 `true` ，则解析 `<style>`中的 `v-bind` 表达式。

4、`customMacros`：仅适用于 `<script setup> `，指定除 Vue 标准宏之外的自定义宏名称数组

5、`templateTokenizer`：**实验性功能**，指定自定义分词器来解析 `<template lang="...">` 标签
