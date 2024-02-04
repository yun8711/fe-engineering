---
outline: deep
prev: false
next: true

---

<h1>插件：eslint-config-prettier</h1><p>v9.1.0</p>

[github](https://github.com/prettier/eslint-config-prettier/)

一个 eslint 规则包，作用是：**关闭所有不必要或可能与 Prettier 冲突的规则**。这样可以避免在使用Prettier进行代码格式化时，出现由于ESLint规则冲突导致的格式化问题

**注意**：此配置只是关闭规则，因此只有将其与其他配置一起使用才有意义



## 用法 

1、安装：`pnpm add -D eslint-config-prettier`

2、配置

（1）在 `.eslintrc*` 文件中

在 extends 数组的最后添加"prettier"，这样它就能覆盖其他配置。

```js
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

> eslint 插件的命名格式：前缀必须为`eslint-plugin-`，使用时可以省略，以`@`开头的表示带命名空间的，正常引入即可。
>
> 所以这里只添加 prettier，但是表示是 eslint-config-prettier

（2）在 eslint.config.js 文件中

导入` eslint-config-prettier`，并将其加入配置数组中，放在要覆盖的其他配置之后。

```js
import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  someConfig,
  eslintConfigPrettier,
];
```

3、（可选）运行 CLI 帮助程序， 查找`rules`配置中的问题



## 配合其他插件

eslint-config-prettier 不仅会关闭核心规则，还会自动关闭这些插件中的一些规则：

- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [@babel/eslint-plugin](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
- [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

所以从 v8.0.0 之后开始，上述的插件与 eslint-config-prettier 一起使用时，不需要再引入其他插件来处理规则冲突。

在 eslint.config.js 文件中，允许在 plugins 中自定义插件名称，但是 eslint-config-prettier 只能识别官方的名称

*示例：*

```js
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    plugins: {
      // 自定义插件名称
      ts: typescriptEslint, // 🚨 Don’t do this!
    },
    rules: {
      // With eslintrc, this is _always_ called:
      // @typescript-eslint/indent
      // But in eslint.config.js (flat config), the name chosen above in `plugins` is used.
      "ts/indent": "error", // 🚨 Don’t do this!
    },
  },
  eslintConfigPrettier,
];
```

上述配置中，eslint-config-prettier 不会关闭 `ts/indent`规则，因为它只会关闭`@typescript-eslint/indent`，所在必须使用官方名称



## CLI 帮助工具

eslint-config-prettier 还附带了一个小型 CLI 工具，可帮助您检查配置是否包含任何不必要的规则或与 Prettier 冲突的规则。运行方法如下：

```shell
npx eslint-config-prettier <待检查文件路径>
# 或
pnpm dlx eslint-config-prettier <待检查文件路径>

# 输出示例
Progress: resolved 100, reused 99, downloaded 1, added 100, done
The following rules are unnecessary or might conflict with Prettier:

- indent
```

v7.0.0 之前的 CLI 工具略有不同，用法如下：

```shell
npx eslint --print-config index.js | npx eslint-config-prettier-check
```

