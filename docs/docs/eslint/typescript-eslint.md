---
outline: deep

---

<h1>插件：typescript-eslint</h1><p>v6.20.0</p>

[官网](https://typescript-eslint.io/) | [github](https://github.com/typescript-eslint/typescript-eslint)

ESLint 默认只能识别 js 代码，而不能识别 ts 代码，它们所使用的解析器不同，并且 js 解析器无法读取特定于 ts 的语法和类型信息

而 typescript-eslint 就是让 ts 代码在ESLint 中运行的插件，它提供了以下功能：

- 允许 ESLint 解析 TypeScript 语法
- 为 ESLint 规则创建一组工具，以便能够使用 TypeScript 的类型信息
- 提供了一大批特定于 TypeScript 的 lint规则，或者使用了类型信息的 lint 规则



## 基本用法 

1、安装：

`pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`

另外还必须安装 eslint 和 typescript

2、配置

（1）在 `.eslintrc.js` 文件中

```js
/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

上述的配置详解：

`parser: '@typescript-eslint/parser'`：必需，表示使用`@typescript-eslint/parser` 包来解析源文件，`@typescript-eslint/parser`是 ts 的解析器，用来解析 ts 源码并转换为 estree，以便 eslint 可以进行检查

`plugins: ['@typescript-eslint']`：表示将 `@typescript-eslint/eslint-plugin` 包加载为 eslint 的插件，然后在代码中就可以使用 typescript-eslint 的规则。

`extends:[...]`：表示扩展配置，`eslint:recommended`是 eslint 的内置推荐规则，`plugin:@typescript-eslint/recommended`是 typescript-eslint 提供的一套推荐配置。



（2）在 `eslint.config.js` 文件中

```js
import * as parserTypeScript from "@typescript-eslint/parser";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";

export default [
    {
      files: ["**/*.?([cm])ts", "**/*.?([cm])tsx"],
      languageOptions: {
        parser: parserTypeScript,
        parserOptions: {
          sourceType: "module"
        }
      },
      plugins: {
        "@typescript-eslint": pluginTypeScript
      },
      rules:[
        ...pluginTypeScript.configs.strict.rules,
        "@typescript-eslint/ban-types": "off",
      ]
    }
]
```



## 推荐配置

插件内置了以下配置：

- `all`：启用 typescript-eslint 的所有规则。一般不建议使用该配置
- `base`：一个最小的规则集，仅设置运行 typescript-eslint 所需的解析器和插件选项。一般不建议直接使用它。使用其他 recommended 的配置时，会自动包含它
- `disable-type-checked`：禁用项目中所有类型感知规则 linting ，一般用于文件子集进行有条件的覆盖规则
- `eslint-recommended`：用来扩展`eslint:recommended`规则，禁用了已经可以被 ts 编辑器检查的 eslint 规则
- `recommended`：推荐的代码正确性规则，无需额外配置
- `recommended-type-checked` ：包含 `recommended` + 需要类型信息的其他推荐规则
- `strict` ：包含 `recommended` + 额外的严格规则，这些规则也可以捕获错误，但比推荐的规则更具有主观性。
- `strict-type-checked` ：包含 `strict` + 需要类型信息的其他严格规则
- `stylistic` ：无需额外配置即可使用的样式规则
- `stylistic-type-checked` ：包含 `stylistic` + 需要类型信息的其他样式规则

说明：

- 除 `all` 、 `strict` 和 `strict-type-checked` 之外，其他配置都是稳定的，只在主版本升级中进行规则的变
- 以 checked 结尾的配置，都是用于开启类型检查的情况
- `stylistic` 配置的规则主要关注代码的格式和风格
- typescript-eslint 提供的预设配置均不支持格式化的规则，关于格式化，应该使用 prettier



## 使用类型进行 Linting

一些 typescript-eslint 规则需要利用 ts 强大的类型系统 API 来进行检查，配置如下：

```js
/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
};
```

`plugin:@typescript-eslint/recommended-type-checked`：typescript-eslint 提供的一种推荐配置。此规则包含建议的规则，这些规则还需要类型信息。

`parserOptions.project`：告诉解析器 tsconfig.json 文件的位置，

- 可以设置为 true ，表示在源文件最接近的位置寻找
- 也可以设置为 glob 路径字符串或字符串数组，用来指定特定的 tsconfig.json 配置文件

`parserOptions.tsconfigRootDir`：指定项目根目录的绝对路径

**禁用文件子集的类型 linting**

可以将 ESLint 的覆盖配置与我们的 `disable-type-checked` 配置结合使用，以关闭特定文件子集上的类型感知 linting。

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
};
```

**性能问题**

类型化规则会带来一定的性能问题，因为 ts 会在 eslint 进行检查前对项目进行构建。对于小型项目，这种性能问题可以忽略不计，对于大型项目，可能需要更长的时间。

但是，大多数用户不介意这种开发成本，因为类型感知和静态分析规则带来的收益是值得的。此外，大多数用户主要通过 IDE 插件来 lint 错误，这些插件通过缓存功能可以避免过多的性能损耗。



## 在 monorepo 中使用

方式一：在根目录创建配置文件

可以只在根目录创建一份配置文件，它的 include 字段包含所有需要被检查的文件的路径。

如果 include 字段不能包含所有要 linted 的文件，建议创建一个名为`tsconfig.eslint.json` 的新配置，然后修改`.eslintrc.js`指定此配置文件。

<br/>

方式二：每个子包一个配置文件，根目录可选

`parserOptions.project` 选项接受相对路径数组，所以可以把根目录下的配置文件放在第一个位置，用作后备。



## 解析器配置

在使用 ts 时，会指定使用 `@typescript-eslint/parser` 解析器，这个解析器专门用来解析 ts 代码。

由于TypeScript 生成的 AST 格式与 ESLint 能识别的 AST 格式不同，TS 的 AST 针对解析不完整代码和类型检查的用例进行了优化，ESTree 未经优化，适用于遍历 AST 的“通用”用例。

如果选择了该解析器，则 `parserOptions` 的可配置内容如下：

```typescript
interface ParserOptions {
  allowAutomaticSingleRunInference?: boolean;
  cacheLifetime?: {
    glob?: number | 'Infinity';
  };
  ecmaFeatures?: {
    jsx?: boolean;
    globalReturn?: boolean;
  };
  ecmaVersion?: number | 'latest';
  emitDecoratorMetadata?: boolean;
  extraFileExtensions?: string[];
  jsDocParsingMode?: 'all' | 'none' | 'type-info';
  jsxFragmentName?: string | null;
  jsxPragma?: string | null;
  lib?: string[];
  programs?: import('typescript').Program;
  project?: string | string[] | true;
  projectFolderIgnoreList?: string[];
  tsconfigRootDir?: string;
  warnOnUnsupportedTypeScriptVersion?: boolean;
  EXPERIMENTAL_useProjectService?: boolean;
}
```



### `allowAutomaticSingleRunInference`

默认：false，只在 @typescript-eslint/parser 的 5.x 版本及以上可用

当设置为 true 时，解析器会自动检查你的项目配置，并根据这些配置来决定如何解析你的代码，例如，它可能会检查项目是否使用了某些特定的语法特性，或者你是否启用了某些特定的编译选项，然后根据这些信息来调整它的解析策略。

当 typescript-eslint 在后台管理 TypeScript 程序使用类型信息进行 linting 时，这种区别对于性能很重要。管理长时间运行的用例所需的TypeScript“监视”程序有很大的开销。能够推断出单次运行情况可以让 typescript-eslint 更快地执行不可变程序。

> 在未来的主要版本中，会默认启用该属性

<br/>

### `cacheLifetime`

用于精细地控制内部缓存时间，默认情况下，缓存时间为 30 秒，可以指定为整数，如果不希望缓存过期，则可以指定为“Infinity”。

<br/>

### `ecmaFeatures`

可选，用于指定你的代码使用了哪些 ECMAScript 的特性，决定了 ts 如何分析源码中的语法，它有以下属性：

- jsx：默认 false，是否启用 jsx 解析，不会影响已知的文件类型，.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.mts`, `.cts`, `.tsx`, `.json
- globalReturn：默认 false，是否允许全局 return 语句

> "全局 return 语句"通常指的是在全局作用域中使用的return语句。在JavaScript和TypeScript中，return语句通常用于函数内部，用于返回函数的结果。如果你在全局作用域（即不在任何函数内部）使用return语句，你将会收到一个错误，因为return语句只能在函数体内使用。

<br/>

### `ecmaVersion`

默认：2018，指定要使用的 ECMAScript 语法版本，解析器会根据它来确定如何分析代码。

如果是版本或年份，必须为数字，也可以指定为`latest`，表示使用最新版本

<br/>

### `emitDecoratorMetadata`

默认：undefined

此选项告诉解析器像 中 `tsconfig.json` 设置 `emitDecoratorMetadata: true` 一样运行，但不进行类型识别 linting。换句话说，在这种情况下，不必指定 `parserOptions.project` ，从而加快了 linting 过程。

<br/>

### `extraFileExtensions`

默认：undefined

此选项允许提供一个或多个其他文件扩展名，这些文件扩展名应在 TypeScript 程序编译中考虑。默认扩展名为 `['.js', '.mjs', '.cjs', '.jsx', '.ts', '.mts', '.cts', '.tsx']` 。添加以 `.` 开头的扩展名，后跟文件扩展名。例如，对于 `.vue` 文件使用 `"extraFileExtensions": [".vue"]` 。

<br/>

### `jsDocParsingMode`

默认值： 如果 `parserOptions.project` 已设置，则为 `'all'` ，否则为 `'none'`，如果设置了 `project` ，则无需设置此项，解析器会从编译器中检测到

可选值有：

- `'all'` ：始终解析所有 JSDoc 注释
- `'none'` ：永远不解析任何 JSDoc 注释
- `'type-info'` ：仅解析提供正确类型信息所需的 JSDoc 注释。TS 将始终解析非 TS 文件中的 JSDoc，但不会解析 TS 文件中的 JSDoc

当 TS 解析文件时，它还会将 JSDoc 注释解析到 AST 中，然后 lint 规则可以使用这些注释。如果 TypeScript >=5.3，则此选项可以用作性能优化。

<br/>

### `jsxFragmentName`

默认：null，用于指定在 TypeScript 文件中使用的 JSX 片段的名称

在 JSX 中，片段是一种特殊的语法，用于返回多个元素。在 React 中，通常使用 <>...</> 作为片段的语法。然而，有些库可能使用不同的片段组件，例如 Preact 使用 Fragment。

如果在 TypeScript 项目中使用了这样的库，你可以通过 jsxFragmentName 选项来指定你的片段组件的名称。例如，使用 Preact 时，可以指定为`Fragment`

<br/>

### `jsxPragma`

默认：`'React'`，用于指定在 TypeScript 文件中使用的 JSX 工厂函数的名称

如果提供 `parserOptions.project` ，则无需设置此项，解析器会从编译器中检测到

在 JSX 中，工厂函数是用于创建元素的函数。在 React 中，通常使用 `React.createElement` 作为工厂函数。然而，有些库可能使用不同的工厂函数，例如 Preact 使用 h。 

如果在 TypeScript 项目中使用了这样的库，你可以通过 jsxPragma 选项来指定你的工厂函数的名称。例如，如果你使用 Preact，可以指定为`h`

<br/>

### `lib`

默认：`['es2018']`，与 tsconfig.json 的编译器选项相同，用于指定 TypeScript 编译器应该包含哪些库文件

<br/>

### `programs`

默认：undefined，

<br/>

### `project`

默认：undefined，用于指定 TypeScript 项目的配置文件，即 tsconfig.json 文件的路径

它可以设置为：

- `true`：会从每个源文件最近的位置查找 tsconfig.json 文件
- 具体的文件路径，如`./tsonfig.json`，表示一个相对于项目根目录的相对路径
- glob pattern，如`'./packages/**/tsconfig.json'`，
- 一个由具体文件路径和glob pattern 组成的数组

<br/>

### `projectFolderIgnoreList`

默认： `["**/node_modules/**"]` ，表示要忽略的文件

<br/>

### `tsconfigRootDir`

默认： `undefined` ，为 project 选项指定根目录

<br/>

### `warnOnUnsupportedTypeScriptVersion`

默认： `true` ，当使用解析器未明确支持的 ts 版本时，会发出警告

<br/>

### `EXPERIMENTAL_useProjectService`

默认： `false` ，`project`配置项的实验性替代方案
