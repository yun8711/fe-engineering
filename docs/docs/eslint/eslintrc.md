---
outline: deep
prev: true
next: true
---

<h1>.eslintrc</h1>

## 配置项

### parser - 解析器

指定要用作解析器的 npm 模块

阅读完 [parser](./parser) 的内容后，可以总结出这样几个规律：

1、默认不配置时使用 **[Espree](https://github.com/eslint/espree)** 解析器，但它对新语法特性的支持度不高，在一些特定场景下并不适合

2、只检验 js 代码，一般使用 **@babel/eslint-parser**（也就是 babel-eslint），能够支持最新的语法和实验性语法，兼容性好，配合 babel 的插件，功能更丰富

3、如果对 ts 代码进行 lint，一般使用 **@typescript-eslint/parser**，它专门解析 ts 语法

4、如果是 react 代码，使用 @babel/eslint-parser，因为它本身支持 jsx ，但不代表完全支持 react 特定的语法。所以仍然需要在 parserOptions中传递一些配置参数

5、如果是 vue 项目，比较特殊的是sfc 的 template不是正常的 html 标签，所以使用专门的 **vue-eslint-parser** 解析器

### parserOptions - 解析器配置

parserOptions的配置将会传递到解析器中，被解析器获取，进行一定的处理。

该选项的定义：

```typescript
interface ParserOptions {
    ecmaVersion?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | "latest" | undefined;
    sourceType?: "script" | "module" | undefined;
    allowReserved:
    ecmaFeatures?: {
        globalReturn?: boolean | undefined;
        impliedStrict?: boolean | undefined;
        jsx?: boolean | undefined;
        experimentalObjectRestSpread?: boolean | undefined;
        [key: string]: any;
    } | undefined;
    [key: string]: any;
}
```

- ecmaVersion：指定在源码中使用的 ECMAScript 版本，默认为 5。这里只是说语法，不包括 ES 的全局变量，全局变量需要在 env 中定义
- sourecType：指定要解析的代码类型，可选项：
  - script：默认，会把源码解析为一个传统意义上的脚本文件，script标签引入
  - module： ESM模式，会把源码解析为 es 模块文件，用 import / export 的语法必须用 module
- ecmaFeatures：object，用于启用一些实验性或非标准的语法特性
  - experimentalObjectRestSpread：指定是否启用实验性的对象 rest/spread 属性
  - jsx：boolean，是否启用 jsx 语法
  - globalReturn：boolean，是否允许在全局作用域中使用 return 语句
  - impliedStrict：boolean，是否启用隐式严格模式，开启全局 script 模式

上面是 eslint 标准的配置项，不同的解析器可能对 `parserOptions` 中的某些选项有所差异，需要根据具体的解析器和代码需求来进行配置，比如下面的

- project：用于指定 TypeScript 项目的目录路径
- tsconfigRootDir：用于指定 TypeScript 的根目录路径
- extraFileExtensions：用于指定自定义文件扩展名，以便解析器能够正确地解析这些文件
- babelOptions：用于指定 Babel 转换器的选项

`eslint-plugin-vue` 插件使用`vue-eslint-parser`作为解析器，它只能解析vue 文件中的html 部分，不会检测 script 中的 js 内容。由于解析器只有一个，用了`vue-eslint-parser`就不能用`babel-eslint`。所以`vue-eslint-parser`的做法是，在解析器选项中，再传入一个解析器选项parser，从而在内部处理`babel-eslint`，检测`<script>`中的js代码

_@babel/eslint-parser_

```js
module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      // your babel options
      presets: ["@babel/preset-env"],
    },
  },
};
```

requireConfigFile：是否需要读取 Babel 配置文件。默认情况下为 true，@babel/eslint-parser 会尝试读取项目中的 `.babelrc` 或 `.babelrc.js` 文件，并根据其中的配置信息来解析代码；如果设置为 `false`，则只使用默认的解析器选项进行解析。推荐设置为 true，以确保代码的正确解析和检查效果。

babelOptions：一个包含 babel 配置项的对象，在运行时传递给 babel 解析器，

### env - 运行环境

用于定义代码的运行环境，定义为 true 的环境，代码会获得特定环境的全局定义，会跳过对其的检测，否则会被认为变量未定义。

默认情况下，所有环境变量都为false，配置时可以自由选择搭配，可以选择多个。 常见的环境有：

- browser：浏览器全局变量
- node：Node.js 全局变量和作用域
- es6： 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
- amd：将 `require()` 和 `define()` 定义为像 amd 一样的全局变量
- commonjs：CommonJS 全局变量和作用域，用于 Browserify/Webpack 打包只在浏览器中运行的代码
- jquery：jQuery 全局变量
- worker：Web Workers 全局变量

### globals - 全局变量

用于定义代码中使用的全局变量（注意与 env 的区别），key 值就是要添加的全局变量，value 值可以是：

- true：表示允许在代码中使用该全局变量，Eslint 检查时不会报未定义的错误
- false：表示禁止使用该全局变量
- 字符串：
  - readonly只读，不可修改；
  - writable可写；
  - off 禁止使用

### plugins - 插件

eslint本身只是一个代码检测工具，默认有解析器 Espree 也只能检测纯 js 代码，如果需要对其他类型的源码（如`.vue`、`.jsx`等）进行检测和提供校验规则，就需要引入一些插件来扩展 ESLint 的检查功能和规则。

插件的作用类似于解析器，用以扩展解析器的功能，检测非常规的js代码，也可能会新增一些特定的规则。

eslint相关插件命名格式：前缀必须为 `eslint-plugin- `，在引入项目使用时可以省略，以`@`开头的表示带命名空间的，正常引入即可

```js
{  
  plugins: [        
    'jquery',// 是指 eslint-plugin-jquery        
    '@jquery/jquery',  // 是指 @jquery/eslint-plugin-jquery        
    '@foobar', // 是指 @foobar/eslint-plugin    ]
}
```

当需要基于插件进行 extends 和 rules 的配置时，需要加上插件的引用，如：

```js
{
    plugins: [
        'jquery',   // eslint-plugin-jquery
        '@foo/foo', // @foo/eslint-plugin-foo
        '@bar,      // @bar/eslint-plugin
    ],
    extends: [
        'plugin:jquery/recommended',
        'plugin:@foo/foo/recommended',
        'plugin:@bar/recommended'
    ],
    rules: {
        'jquery/a-rule': 'error',
        '@foo/foo/some-rule': 'error',
        '@bar/another-rule': 'error'
    },
}
```

**优先级**

- 如果extends配置的是一个数组，那么最终会将所有规则项进行合并，后出现的优先级高
- 通过rults单独配置的规则优先级比extends高

### extends - 继承

用于继承其他配置文件的规则，可以避免手动配置大量的规则，提高代码检查效率。选项值可以是一个字符串或者一个字符串数组，每个字符串表示一个配置文件或插件。

ESLint 会按照指定顺序读取指定的配置文件，并将其中的规则和选项深度合并到当前的配置中。

**注意**：后面的配置会覆盖前面的配置。

继承的书写方式：

- 预设配置：ESLint 内置的配置，"eslint:recommended"、"eslint:all"
- 插件配置：eslint-plugin-xxx，可简写为 xxx，插件本身导出的就是个 eslint 配置
- 从插件中获取的规则，`plugin:插件包名/配置名`，其中插件包名也可以省略前缀 `eslint-config-`，如`plugin:vue/essential`
- 从其他文件中继承，即继承另外的一个配置文件，如`./node_modules/coding-standard/eslintDefaults.js`

可继承的规则一般有这几种来源：

- eslint 内置推荐规则，不需要额外安装依赖，如：`eslint:recommended`、`eslint:all`
- 其他开发者共享的配置，以 npm 包的形式共享，使用前需要先安装

```json 
{
    "extends": [
        'eslint:recommended', // 是 ESLint 官方的扩展,内置推荐规则
        'plugin:vue/essential', // 是插件类型扩展
        'eslint-config-standard', // eslint-config 开头的都可以省略掉前面 直接使用standard即可
        '@vue/prettier', // @开头扩展和 eslint-config 一样，只是在 npm 包上面加了一层作用域 scope；
        './node_modules/coding-standard/.eslintrc-es6' // 一个执行配置文件的路径
    ]
}
```

### settings - 自定义规则

主要用于指定一些自定义的配置和参数，在具体应用中可能有不同的用法

用于指定一些自定义的配置信息和参数。选项值是一个对象，可以包含多个属性，下面是几个示例：

（1）`settings.react`：用于指定 React 相关的配置信息。它可以是一个对象，包含以下几个属性：

- `version`：表示使用的 React 版本号，可以是一个字符串或数字
- `pragma`：表示在源代码中使用哪种函数作为 JSX 的编译入口，默认为 `"React.createElement"`
- `fragment`：表示在源代码中使用哪种语法来表示组件 fragment，默认为 `"React.Fragment"`

```json
"settings": {
  "react": {
    "version": "detect",
    "pragma": "h"
  }
}
```

（2）`settings.vue` 属性用于指定 Vue.js 相关的配置信息。它可以是一个对象，包含以下几个属性：

- `compiler`：表示使用的 Vue.js 编译器版本号。
- `preprocessStyles`：表示自定义预处理 CSS 样式的函数或函数数组。
- `preprocessCustomBlocks`：表示自定义预处理 Vue 单文件组件中的自定义块（如 `<i18n>`、`<docs>` 等）

```json
"settings": {
  "vue": {
    "compiler": "^2.0.0",
    "preprocessStyles": true,
    "preprocessCustomBlocks": function (content, id) {
        // 自定义预处理函数
    }
  }
}
```

（3）在 element-plus 的源码中

```js
  settings: {
    // 用来解决模块导入路径的问题
    // 指定 eslint-import-resolver-node 插件提供的 Node.js 解析器，将文件扩展名限制为 .js, .mjs, .ts, .d.ts, 和 .tsx
    "import/resolver": {
      node: { extensions: [".js", ".mjs", ".ts", ".d.ts", ".tsx"] },
    },
  },
```

### root - 根目录标识

用于指定配置文件的根目录。

当使用 ESLint 检查代码时，ESLint 会从代码所在的目录开始向上查找配置文件，直到找到配置文件为止。如果没有找到配置文件，则会使用默认的配置。

当配置了 `root` 选项时，ESLint 将只会在指定的根目录下查找配置文件，而不会继续向上查找。这个选项通常用于在多个项目中共享一个通用的配置文件

### rules - 规则集

用于配置具体的检查规则和错误级别。当代码中存在某种规则违反了预设的检查规则时，ESLint 会提供相应的提示或报错，并根据错误级别进行分类。

配置项是一个对象，其中的属性名表示要启用的规则名称，属性值表示该规则的错误级别和其他选项。

规则错误等级

- `"off"`或0：关闭规则
- `"warn"`或1：打开规则，并作为一个警告，不影响exit code
- `"error"`或2：打开规则，并作为一个错误，exit code将会是1

在 rules 中，默认可以配置的规则就是 ESLint内置的规则，当使用了其他类型的解析器及对应的插件后，就可以配置对应的规则。

以下是几个常用解析器对应的规则集，使用前请安装和配置对应的解析器：

- [ESLint 内置规则](https://eslint.org/docs/latest/rules/)
- [typescript-eslint 规则](https://typescript-eslint.io/rules/)
- [eslint-plugin-vue 规则](https://eslint.vuejs.org/rules/)

## 常用插件及规则集

本节提到的规则集，都整理到了[仓库](https://github.com/yun8711/fe-configuration/tree/master/examples/eslint)中

### [eslint](https://eslint.org/docs/latest/rules/)

eslint 官方内置的规则集，无需安装额外依赖，文件位于 `node_modules/@eslint/js/src/configs`

- `eslint:recommended`：开启ESLint内置的推荐规则（官方规则文档中打勾的）
- `eslint:all`：开启ESLint 内置的所有规则

<br/>

### [eslint-plugin-prettier](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fprettier%2Feslint-plugin-prettier)

辅助Eslint可以平滑地与Prettier一起协作，并将Prettier的解析作为Eslint的一部分，在最后的输出可以给出修改意见，当Prettier格式化代码的时候，依然能够遵循我们的Eslint规则，所以一般会使用下面的 eslint-config-prettier 禁用掉所有的格式化相关的规则。

### [eslint-config-prettier](https://github.com/prettier/eslint-plugin-prettier)

该插件会把 prettier 的规则集成到 eslint，避免 prettier 和其他 lint 工具对样式格式化时冲突，常规的使用，先安装依赖，然后在 eslintrc 中配置

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

也可以使用推荐配置

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

它的内部配置如下

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```

<br/>

### [@typescript-eslint/eslint-plugin](https://typescript-eslint.io/rules/)

typescript-eslint 为 eslint 提供的关于 typescript 代码的规则集，可以在 `node_modules/@typescript-eslint/eslint-plugin/dist/configs`中看到，其中有两个比较基础的配置：

- base.js：一个最小规则集，仅包含最基础配置，是所有配置的基础，保证 typescript-eslint可以正常运行

  ```js
  module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: { sourceType: "module" },
    plugins: ["@typescript-eslint"],
  };
  ```

- `eslint-recommended`：主要作用是关闭部分与 ts 冲突的 eslint 规则

base.js + eslint-recommended 组件了 typescript-eslint 配置的基础，官方推荐的配置中，基本都继承了这两个基础配置。

官方推荐的配置有：

- `recommended`：保证代码正确性的推荐规则，避免不良实践和可能的逻辑错误，同时禁用了与 typescript-eslint 规则和 ts 语法冲突的规则
- `recommended-type-checked`：包含 recommended ，增加了推荐的类型检查相关规则
- `strict`：包含 recommended ，增加了更加严格的规则检查
- `strict-type-checked`：recommended + recommenden-type-checked + strict，并增加了更严格的类型检查规则
- `stylistic`：包含 recommended，ts 代码的最佳实践，不影响逻辑，通常用于执行更简单的代码模式。
- `stylistic-type-checked`：包含 stylistic，增加了类型检查规则，和样式规则，

其他配置：

- `all`：启用所有规则，不建议使用
- `disable-type-checked`：禁用类型检查

<br/>

### [eslint-plugin-vue](https://eslint.vuejs.org/rules/)

用于 vue 文件的解析和检查，它的 base 中提供了如下配置，指定的 parser

- `plugin:vue/base`：是下面所有配置的基础，指定了 parser、plugins，让vue文件可以正确的被eslint解析

```js
module.exports = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["vue"],
  rules: {
    "vue/comment-directive": "error",
    "vue/jsx-uses-vars": "error",
  },
};
```

- 以下适用于vue3：
  - `plugin:vue/vue3-essential`：增加防止错误或意外行为的规则
  - `plugin:vue/vue3-strongly-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则
  - `plugin:vue/vue3-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则
- 以下适用于vue2：
  - `plugin:vue/essential`：在base基础上，增加防止错误或意外行为的规则
  - `plugin:vue/strongly-recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则
  - `plugin:vue/recommended`：在上面的规则基础上，增加提高代码可读性和最佳实践的规则

<br/>

### [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)

react 为 eslint 制定的规则集（从配置的角度讲，react 比 vue 简单很多）

```js
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    // ？？ react 17+，新的 jsx 转换
    "plugin:react/jsx-runtim"
  ]
```

### 其他增强插件

在 npm上可以找到约 6487 个`eslint-plugin` 开头的[插件](https://www.npmjs.com/search?q=eslint-plugin)，生态相当丰富，比如

- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)：检查 es6+的 import/export 语法，防止文件路径和导入名称错误
- [eslint-plugin-jsx-a11y](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fevcohen%2Feslint-plugin-jsx-a11y)：专注于检查JSX元素的可访问性
- [eslint-plugin-jest](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjest-community%2Feslint-plugin-jest)：Jest专用的Eslint规则校验插件
- [eslint-plugin-promise](https://link.juejin.cn/?target=)：promise规范写法检查插件，附带了一些校验规则
- [eslint-plugin-jsonc](https://ota-meshi.github.io/eslint-plugin-jsonc/#features)：用于检查 JSON、JSONC、JSON5文件
- [eslint-plugin-vue-scoped-css](https://future-architect.github.io/eslint-plugin-vue-scoped-css/)：检查 vue 中使用 scoped css
- [eslint-config-standard](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fstandard%2Feslint-config-standard)：js 标准代码规范
- [eslint-config-airbnb-base](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript%2Ftree%2Fmaster%2Fpackages%2Feslint-config-airbnb-base)：airbab 的 JS 代码规范；

## 示例项目

vue2：[ant-design-vue v1.x](https://github.com/vueComponent/ant-design-vue/blob/1.x/.eslintrc)

vue3+ts：[element-plus](https://github.com/element-plus/element-plus/blob/dev/internal/eslint-config/index.js) [ant-design-vue v4](https://github.com/vueComponent/ant-design-vue/blob/main/.eslintrc.js) [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin/tree/main/internal/eslint-config)

react：[ant-design v5](https://github.com/ant-design/ant-design/blob/master/.eslintrc.js)

eslint 综合：[腾讯 - eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)
