---
outline: deep

---

<h1>eslint.config.js 配置详解</h1><p>v8.45.0</p>

[官网](https://zh-hans.eslint.org/) | [github](https://github.com/eslint/eslint)

## 概述

ESLint的 Flat 配置是v8.35.0的一个实验性功能，默认没有开启。为了启用这个功能，你需要在你的项目根目录下创建一个名为 `eslint.config.js` 的文件，或者将`ESLINT_USE_FLAT_CONFIG` 环境变量设置为 `true` ，哪怕在有 `eslint.config.js` 文件的情况下，也可以将环境变量设置为 `false` 来禁用它。

<br/>

> ESLint 仅自动查找名为 `eslint.config.js` 的配置文件，不会查找 `eslint.config.cjs` 或 `eslint.config.mjs`。

<br/>

eslint.config.js 应该放在项目根目录，导出一个**包含配置对象的数组**。

*示例：*

```js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];
```

<br/>

eslint 作出这一改变的[原因](https://eslint.org/blog/2022/08/new-config-system-part-1/)，主要是为了解决一些在旧版本中存在的问题，并提供更好的用户体验。

首先，扁平化的配置对象使得配置更加直观和易于理解。在旧版本中，配置对象的嵌套结构可能会导致一些混淆，特别是在处理继承和覆盖规则时。扁平化的配置对象使得这些规则更加明确。 

其次，新的配置文件格式也更加灵活。它允许用户使用 JavaScript 代码来生成配置，这意味着用户可以使用条件语句、循环、导入其他文件等 JavaScript 功能来创建更复杂的配置。



## 配置对象

每个配置对象都包括了 eslint 检查一组文件所需的所有信息

<br/>

> 也就是说，配置对象是以文件为颗粒度进行检查的，可以按路径或者按类型为这些文件配置相应的规则

<br/>

配置对象由以下属性组成：

- files：glob 数组，表示配置适用的文件，未指定时适用于所有与其他配置对象匹配的文件。
- ignores：glob 数组，表示忽略检查的文件，未指定时适用于所有由 files 匹配的文件
- languageOptions：配置如何检查 js 代码
  - ecmaVersion：strIng，表示支持的 ES 语法版本（只是语法，不包括 ES 的全局变量，全局变量要在 globals 中指定），可以是年份（如 2022）或者版本号（如 5），默认为 latest，表示最新版本
  - sourceType：string，表示js 源码类型，"script"表示传统 script 标签引入，"module"表示 esm，"commonjs"表示CommonJS 文件。默认情况下，`.js` 和 `.mjs` 文件使用 `"module"`；`.cjs` 文件使用 `"commonjs"`
  - globals：对象，指定添加到全局作用域中的其他对象，避免从第三方库中引入的全局变量不能被识别
  - parser：默认为 espree，指定解析器（包含 `parse()` 方法或 `parseForESLint()` 方法的对象）
  - parserOptions：对象，指定 parser 所需的额外配置选项，
- linterOptions：对象，包含与 linting 过程相关的设置
  - `noInlineConfig` ：boolean，表示是否允许内联配置
  - `reportUnusedDisableDirectives`：boolean，表示是否应该跟踪和报告未用的禁用指令
- processor：包含 `preprocess()` 和 `postprocess()` 方法的对象，或者指示插件中处理器的名称的字符串（例如 `"pluginName/processorName"`）。
- plugins：包含插件名称与对应的插件对象的名值对对象。如果指定了 `files`，则只适用于与之匹配的文件。
- rules：包含具体的规则配置，当指定了 `files` 或 `ignores` 时，这些规则配置仅对匹配的文件可用。
- settings：包含名称值对的对象，用于所有规则都可以访问的信息

<br/>

### 级联配置对象

当多个配置对象同时匹配一个给定的 glob 时，配置对象会被合并，如果有冲突时，后面的对象会覆盖前面的对象。例如：

```js
export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                MY_CUSTOM_GLOBAL: "readonly"
            }
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly"
            }
        }
    }
];
```

上述配置中，对于所有的 js 文件，都只有一个自定义全局对象 `MY_CUSTOM_GLOBAL`，而对于 tests 目录下的 js 文件，还会有 it` 和 `describe 全局对象

<br/>

### 预定义配置和共享配置

在 eslint.config.js 中，使用 eslint 的预定义配置需要使用单独的包 `@eslint/js`。同时，写法也有所变化

*示例如下：*

```js
import js from "@eslint/js";
import customConfig from "./custom-config.js"; // 自定义配置
import myConfig from "eslint-config-my-config";

export default [
    js.configs.recommended,
    customConfig,
    myConfig,
    {
        rules: {
            semi: ["warn", "always"]
        },
        // ...other config
    }
];

// 或者
export default [
    {
      	// 使用 @eslint/js 提供的推荐规则，只有rules
    		...js.configs.recommended,
        rules: {
          	// 使用 eslint-plugin-prettier 中的推荐规则
      		  ...pluginPrettier.configs.recommended.rules,
        },
        // ...other config
    }
];
```

**注意**，因为只是导入 JavaScript 模块，所以在 ESLint 使用它们之前修改配置对象。

*例如，设置某个配置对象仅适用于测试文件：*

```js
// eslint.config.js

import js from "@eslint/js";
import customTestConfig from "./custom-test-config.js";

export default [
    js.configs.recommended,
    {
        ...customTestConfig,
        files: ["**/*.test.js"],
    },
];
```

<br/>

### 在 eslint.config.js 中使用 eslintrc 配置

如果需要使用的共享配置尚未适配扁平风格配置，可以使用`FlatCompat` 工具将 eslintrc 格式转换为平面配置格式。

首先，安装 [`@eslint/eslintrc`](https://www.npmjs.com/package/@eslint/eslintrc) 包，然后导入 `FlatCompat` 并创建一个新实例来转换现有的 eslintrc 配置，例如，如果 `eslint-config-my-config` 是 eslintrc 格式的，你可以这样写：

```js
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname
});

export default [
    // mimic ESLintRC-style extends
    ...compat.extends("eslint-config-my-config"),
];
```

这样就把 eslintrc 风格配置插入到了扁平风格的配置中。

<br/>

### 忽略文件

在扁平风格的配置中，不再从`.eslintignore`文件加加载 ignore glob，需要在配置对象中的 ignores 中配置。

<br/>

### ts 类型

配置数组中对象的接口称为 `FlatConfig`。



## files

> 使用的是 [`minimatch`](https://www.npmjs.com/package/minimatch) 语法，并使用基于 `eslint.config.js` 文件位置的相对路径。

使用 `files` 和 `ignores` 的组合来决定配置对象的文件适用范围。



## ignores

默认匹配 `["**/node_modules/**", ".git/**"]`

**全局忽略配置**

如果 `ignores` 在配置对象中没有其他配置项，那么这些模式将被全局忽略

```js
export default [
    {
        ignores: [".config/*"]
    }
];
```

上述配置表明将忽略 `.config` 目录下的所有文件，它会被添加在默认匹配模式之后

**非全局忽略配置**

1、非全局的 `ignores` 模式只能匹配文件名，像 `"dir-to-exclude/"` 这样的配置不会生效，如果要忽略特定目录中的所有内容，应该使用类似 `"dir-to-exclude/**"` 的模式。

2、如果使用了 `ignores` 而没有使用 `files`，但有任何其他配置项（如 rules），那么该配置对象适用于除了 ignores 指定的文件外的所有文件

```js
export default [
    {
        ignores: ["**/*.config.js"],
        rules: {
            semi: "error"
        }
    }
];
```

上述配置适用于除了以 `.config.js` 结尾的其他所有文件。实际上这相当于把 files 配置为`**/*`，所以一般来说，如果指定了 `"ignore"`，最好也要指定 `files`



## linterOptions

专门用来配置检查过程的选项，对文件源码的解析方式没有影响。它有两个选项：

**noInlineConfig**

表示是否禁用内联配置，内联配置是通过 `/*eslint*/` 注释实现的，例如 `/*eslint semi: error*/`。

如果设置为 true，则会忽略所有内联配置

**reportUnusedDisableDirectives**

像 `/*eslint-disable*/` 和 `/*eslint-disable-next-line*/` 这样的禁用指令是用来禁用 ESLint 规则的，围绕代码的某些部分。随着代码的变化，这些指令有可能不再需要，因为代码的变化使规则不再被触发。

通过设置 `reportUnusedDisableDirectives` 选项为 `true` ，可以未用的禁用指令被报告为警告



## languageOptions

### ecmaVersion

指定源码中 js 语法的版本，决定了哪些全局变量和语法在代码中是有效的，建议保持 latest ，除非使用了一些只在旧的运行时才能使用的语法

### sourceType

指定源码所采用的模块化标准，ESLint 也会执行不同的检查规则：

1. module：ECMAScript 模块（ESM），代码有模块作用域，并以严格模式运行。
2. commonjs：代码有顶层函数作用域，并在非严格模式下运行。
3. script： 代码有共享的全局作用域，并在非严格模式下运行。

默认情况下，`.js` 和 `.mjs` 文件的 `sourceType` 是 `"module"`，而 `.cjs` 文件则是 `"commonjs"`。

### parser

关于解析器，查看[eslint 解析器](./parser.md)。解析器的作用就是将源码转换为 AST，以便 ESLint 可以识别和处理。

ESLint 默认解析器为 espree。可以通过设置 parser 来指定解析器，解析器必须是包含 `parse()` 方法或 `parseForESLint()` 方法的对象

选择哪种解析器，需要根据源码类型来决定：

- 一般情况下，如果源码中只需要解析 js 代码，可以不配置该选项，默认解析器（espree）来解析即可，
- 如果在 js 代码中使用了比较新的语法和特性，应该使用 `@babel/eslint-parser`
- 如果使用了 typescript，那么可能需要  `@typescript-eslint/parser` 作为解析器
- 如果使用了 vue，那么就需要 ` vue-eslint-parser`解析器

*例如，可以使用 `@babel/eslint-parser` 来解析实验性语法：*

```js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser
        }
    }
];
```

上述配置表示使用 Babel 解析器，而不是使用默认解析器，来解析所有以 `.js` 和 `.mjs` 结尾的文件。

### parserOptions

一个键值对组成的对象，用来向 parser 指定的解析器传递选项，每种解析器都有自己特定的 parserOptions，对于 ESLint 的默认解析器 espree，parserOptions 的配置项见[官方文档](https://github.com/eslint/espree?tab=readme-ov-file#options)



对于 Babel 解析器，可以这样传入选项：

```js
import babelParser from "@babel/eslint-parser";

export default [
    {
        files: ["**/*.js", "**/*.mjs"],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    // your babel options
                    presets: ["@babel/preset-env"],
                }
            }
        }
    }
];
```

### globals

一个对象，键是全局变量名，值可配置为：

- `"writable"`：允许被覆盖
- `"readonly"`：不允许覆盖
- `"off"`：禁用

由于历史原因，false 和 readonly 等同于 readonly，true 和 writeable 等同于 writable，注意，旧值已经被废弃。

*例如：*

```js
import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
              ...globals.browser,
              Promise: "off"
            }
        }
    }
];
```

**代替原 env 配置项**

在 eslint.config.js 配置文件中，移除了 env 配置项，而针对运行时的全局变量配置由 globals 代替，特定运行时的全局变量组需要从 [globals](https://www.npmjs.com/package/globals) npm 包导入，并包含在 `globals` 属性中，可以使用扩展运算符一次性导入多个

```js
// eslint.config.js

import globals from "globals";

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                myCustomGlobal: "readonly"
            },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module"
            }
        }
        // ...other config
    }
];
```

**注意**：

在 eslintrc 配置系统中，可以使用 `eslint-env` 配置注释为单个文件定义全局变量

```
// tests/my-file.js
/* eslint-env mocha */
```

在 ESLint 的未来版本中，`eslint-env` 注释将被报告为错误，所以不要再使用这种方式指定环境变量。



## plugins

插件是 eslint 最重要的配置，用于在 ESLint 项目中共享规则、处理器、配置、解析器等等

plugins 的配置是一个对象，键表示插件名，值为对象，表示该插件本身。如果键和值同名时可以缩写；也可以使用自定义的插件名，后面表示该插件的前缀也需要相应改变。

```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
          jsdoc: jsdoc,
          // 或者
					jsdoc,
          // 或者自定义一个名称
          jsd: jsdoc
        },
    }
];
```

上述配置中，JSDoc 插件被定义为 `jsdoc`



### 使用插件规则

接着上面的配置示例，在 plugins 中配置了插件后，在 rules 中，可以使用`jsdoc/`表示该规则来自该名称的插件。

```js
import jsdoc from "eslint-plugin-jsdoc";

export default [
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];
```



### 使用插件中的配置

在使用一些插件的推荐配置时，可以直接在 `eslint.config.js` 配置数组中添加配置来使用包含在插件中的配置。

示例：

```js
import jsdoc from "eslint-plugin-jsdoc";
export default [
    // 包含在插件中的配置
    jsdoc.configs.recommended,
    // 其他配置对象……
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "warn",
        }
    }
];
```



## processor

用于将非 js 文件转化为 eslint 可以检查的代码片段，通过定义一个 processor 属性来指定某个文件类型所使用的处理器，该属性的值的格式为：`"pluginName/processorName"`，以引用插件中的处理器，或者是使用一个包含 `preprocess()` 和 `postprocess()` 方法的对象。

比较常见的场景是对 markdown 中的 js 代码进行校验。如果想让 eslint 对 Markdown 文件中的 JavaScript 代码块进行校验，可以参考如下配置：

```js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    }
];
```

上述配置中，plugins 指定了一个 markdown 插件，processor 指定使用该插件中的 markdown 处理器

processor 还可以将命名代码块当作配置对象中的文件名，eslint 将这样的命名代码块作为原始文件的一个子文件来处理，可以为命名代码块指定额外的配置对象。

> 在Markdown中，命名代码块是指使用三个反引号（`）包围的代码块，并在开头的三个反引号后面指定语言名称。这种方式可以使得代码块具有语法高亮

```js
import markdown from "eslint-plugin-markdown";

export default [
    {
        files: ["**/*.md"],
        plugins: {
            markdown
        },
        processor: "markdown/markdown",
        settings: {
            sharedData: "Hello"
        }
    },

    // 对 markdown 文件中以 .js 结尾的命名代码块禁用 strict 规则
    {
        files: ["**/*.md/*.js"],
        rules: {
            strict: "off"
        }
    }
];
```



## rules

一个对象，用来配置具体的校验规则，键为规则的名称，值为该规则的配置。

规则的严重程序可以为：

- error 或 2：将问题视作错误，会导致 CLI 以非零代码退出
- warn 或 1：将问题视作警告，退出代码为 0
- off 或 0：关闭规则校验

当多个配置对象中指定相同的规则时，规则配置全被合并，后面的会覆盖前面的配置



## settings

ESLint 支持在配置文件中添加共享设置。

在配置对象中添加 settings 对象，它将提供给所有规则。

插件可以使用 `settings` 来指定应该在其所有规则中共享的信息。如果你正在添加自定义规则，并希望它们能够访问相同的信息，这可能是有用的。下面是示例：

```js
export default [
    {
        settings: {
            sharedData: "Hello"
        }
    }
];
```

