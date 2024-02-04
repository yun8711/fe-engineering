---
outline: deep

---

<h1>插件：eslint-define-config</h1><p>v2.1.0</p>

[github](https://github.com/eslint-types/eslint-define-config/tree/main)

这个插件为 `.eslintrc.js` 和 `eslint.config.js` 文件提供了一个`defineFlatConfig` 函数，用来改善使用 ESLint 时的配置体验：

- 自动建议
- 使用`// @ts-check`注释可以对配置文件进行检查类型
- 提供配置文档
- 对弃用的配置进行警告



## 基本用法 

1、安装：

`pnpm add -D eslint-define-config`

2、使用

（1）在 `.eslintrc.js` 文件中

```js
// @ts-check
const { defineConfig } = require('eslint-define-config');

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineConfig({
  root: true,
  rules: {
    // rules...
  },
});
```

（2）在 `eslint.config.js` 文件中

```js
// @ts-check
const { defineFlatConfig } = require('eslint-define-config');

/// <reference types="@eslint-types/typescript-eslint" />

module.exports = defineFlatConfig([
  'eslint:recommended',
  {
    plugins: {
      // plugins...
    },
    rules: {
      // rules...
    },
  },
]);
```

默认情况下，仅支持 eslint 内置的规则，想要激活其他插件规则的自动建议，需要安装该插件的类型文件。

类型文件可以是插件官方自己提供的，也可以是由社区维护的 `@eslint-types` 存储库提供的。



## `eslint-types/*`

一个用于为 `eslint-define-config` 提供类型标注的 monorepo 仓库，地址：https://github.com/eslint-types/define-config-plugin-types

### 用法

*以`eslint-plugin-import`插件为例*

例如，要在 eslint 中使用`eslint-plugin-import`插件，为了在配置过程中获得自动建议、配置类型校验等帮助，先安装：

- `eslint-define-config`
- `@eslint-types/import`：eslint-plugin-import 插件对应的类型文件

然后再配置文件中，导入这个类型定义文件

```js
// @ts-check
const { defineConfig } = require('eslint-define-config');

/// <reference types="@eslint-types/import" />

module.exports = defineConfig({
  // ...
});
```



### 支持的插件（2024-02）

[@eslint-types/deprecation](https://www.npmjs.com/package/@eslint-types/deprecation)：eslint-define-config 插件的类型定义

[@eslint-types/import](https://www.npmjs.com/package/@eslint-types/import)：eslint-plugin-import 插件

[@eslint-types/jsdoc](https://www.npmjs.com/package/@eslint-types/jsdoc)：eslint-plugin-jsdoc 插件

[@eslint-types/prettier](https://www.npmjs.com/package/@eslint-types/prettier)：eslint-plugin-prettier 插件

[@eslint-types/typescript-eslint](https://www.npmjs.com/package/@eslint-types/typescript-eslint)：@typescript-eslint/eslint-plugin 插件

[@eslint-types/unicorn](https://www.npmjs.com/package/@eslint-types/unicorn)：eslint-plugin-unicorn 插件



## `@antfu/eslint-define-config`

是 `@anfu` 在 `eslint-define-config`基础上创建的一个 fork，用于更好的支持 ESLint 的 Flat Config。进行了以下改变：

1、插件内置了以下插件的配置类型定义和规则集：

- [eslint-plugin-eslint-comments](https://mysticatea.github.io/eslint-plugin-eslint-comments/)：ESLint 指令注释的规则
- [@graphql-eslint](https://the-guild.dev/graphql/eslint/docs)：专用于GraphQL 的 ESLint 解析器、插件、规则集
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import#installation)：
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc#configuration)
- [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc#configuration)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [eslint-plugin-mdx](https://github.com/mdx-js/eslint-mdx/tree/master/packages/eslint-plugin-mdx)
- [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n#-configs)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node#-configs)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)
- [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise#usage)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
- [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs#available-configurations)
- [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-vitest](https://www.npmjs.com/package/eslint-plugin-vitest)：
- [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#usage)
- [eslint-plugin-vue-pug](https://github.com/rashfael/eslint-plugin-vue-pug#usage)
- [eslint-plugin-vue-i18n](https://eslint-plugin-vue-i18n.intlify.dev/started.html)
- [typescript-eslint](https://typescript-eslint.io/linting/configs#recommended-configurations)

使用时可以直接导入

```
import {
  VitestRules,
  VueRules,
  // ...
} from '@antfu/eslint-define-config'
```

2、允许覆盖规则

```js
import pluginVitest from 'eslint-plugin-vitest'
import {
  defineFlatConfig,
  VitestRules
} from '@antfu/eslint-define-config'

export default defineFlatConfig<VitestRules, /* Strict */ true>({
  plugins: {
    vitest: pluginVitest,
  },
  rules: {
    // only `vitest/` rules are allowed and will be auto-completed
    'vitest/no-async': 'error',

    // @ts-expect-error not allowed
    'indent': 'error'
  },
})
```

3、支持重命名规则前缀

```js
import {
  RenamePrefix,
  TypeScriptRules // { '@typescript-eslint/indent': 'error', ... }
} from '@antfu/eslint-define-config'

type RenamedRules = RenamePrefix<TypeScriptRules, '@typescript-eslint/', 'ts/'>
// { 'ts/indent': 'error', ... }
```



