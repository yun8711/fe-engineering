---
outline: deep
prev: false
next: true

---

<h1>插件：eslint-plugin-prettier</h1><p>v5.1.3</p>

[github](https://github.com/prettier/eslint-plugin-prettier)

一个 eslint 插件，作用是：**将 Prettier 应用到 ESLint 中，把 Prettier 作为单个 ESLint 规则运行，并将检查结果作为单个 ESLint 问题**。

可以在使用 ESLint 进行代码检查的同时，自动格式化代码，使其符合 Prettier 的规则



## 用法 

1、安装：

`pnpm add -D eslint-plugin-prettier eslint-config-prettie`，还需要手动安装eslint、prettier

一般在使用 eslint-plugin-prettier 时都会同时安装eslint-config-prettie，用来关闭 eslint 中与 prettier 有冲突的规则。

2、配置

（1）在 `.eslintrc*` 文件中

该插件附带一个 `plugin:prettier/recommended` 配置，可以一次性设置 `eslint-plugin-prettier` `eslint-config-prettier`两者

```js
{
  "extends": ["plugin:prettier/recommended"]
}
```

上述的配置，会完成以下工作：

- 启用`prettier/prettier` 规则
- 启用`eslint-config-prettier`配置
- 禁用有问题的 `arrow-body-style` 和 `prefer-arrow-callback` 规则，原因：使用 prettier 时，eslint --fix 无法正常修复 pre-fer-arrow-callback，两者有冲突

（2）在 `eslint.config.js` 文件中

此插件附带了一个 `eslint-plugin-prettier/recommended` 配置，可以一次性设置 `eslint-plugin-prettier` `eslint-config-prettier`两者，

导入 `eslint-plugin-prettier/recommended` 并将其添加为 `eslint.config.js` 文件中配置数组中的最后一项

```js
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
];
```

两种配置方式实现的效果是一样的。



## 配置选项

> 虽然可以通过 ESLint 配置文件将选项传递给 Prettier，但是不建议这样做，因为编辑器的扩展会读取`.prettierrc`，但是不会从 eslint 读取配置。

可以在 eslint 配置中直接给插件传递配置项，例如：

```json
{
  "prettier/prettier": [
    "error",
    {
      "singleQuote": true,
      "parser": "flow"
    },
    {
      "usePrettierrc": false,
      "fileInfoOptions": {
        "withNodeModules": true
      }
    }
  ]
}
```

第一个对象参数，用来传递给 prettier，就一些 prettier 的具体规则

第二个对象参数：

- usePrettierrc：表示是否加载 prettier 配置文件，默认为 true
- fileInfoOptions：传递给 prettier.getFileInfo（prettier 进行格式化时的 api），用来决定是否需要格式化某些特定的文件，例如 `"withNodeModules": true`表示不忽略 node_modules 目录中的文件。更多规则查看 [prettier 文档](https://prettier.io/docs/en/api.html#prettiergetfileinfofileurlorpath--options)

