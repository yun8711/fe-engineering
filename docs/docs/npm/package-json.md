---
outline: deep
prev: false
next:
  text: "package-lock.json"
  link: "/docs/npm/package-lock"
---

<h1>package.json</h1><p>npm v9.8.0 nodejs v20</p>

[官网](https://docs.npmjs.com/cli/v9/configuring-npm/package-json?v=true#keywords)

示例：[react](https://github.com/facebook/react/blob/main/package.json) | [vue](https://github.com/vuejs/vue/blob/main/package.json) | [element-plus](https://github.com/element-plus/element-plus/blob/dev/package.json) | [ant-design](https://github.com/ant-design/ant-design/blob/master/package.json)

参考文章：[字节跳动技术团队 - package.json 配置完全解读](https://juejin.cn/post/7145001740696289317)



## 描述配置

主要是描述项目的基本信息，部分会展示在 npm 官网上。

name 和 version 是最重要的字符，它们也是必须的，npm 规定 package.json 文件由 name和version 一起组成唯一标识符，如果没有就无法执行`npm install`。

<br/>

### name

项目名称，其他人可以通过该名称找到你的包，并进行安装。

命名规则：

- 长度<=214个字符，不能以`.`和`_`开头，不能包含大写字母，这是因为当软件包在 npm 上发布时，会基于此属性获得自己的 URL，所以不能包含非 URL 安全字符（non-url-safe）

  不安全的URL字符：空格、大小于号、方括号、花括号、竖线、反斜杠`\`、插入号`^`、百分号

- 这个名字会作为参数被传入`require()` 或者 `import`，所以它应该简短、语义化

- 名称不能和其他包重复，可以使用`npm view <包名>`命令查询模块是否重复（不重复会提示404），或去npm registry查看一下这个名字是否已经被使用了

- 不要使用与 node 模块相同的名称

- 可以使用 npm-scope （私源）作为前缀，格式是：`@[scope]/[name]`， 比如：`@vue/cli`

<br/>

### version

项目的版本号，开源项目的版本号必须可由[node-semver](https://github.com/isaacs/node-semver) 解析，它是 npm 的依赖项，所以 version 需要遵循 semver 语义化规范，简单的规则如下所示：

![图片](./semver.png)

Major：主版本号，通常在涉及重大功能更新，产生了破坏性变更时会更新此版本号

Minor：次版本号，在引入了新功能，但未产生破坏性变更，依然向下兼容时会更新此版本号

Patch：修订号，在修复了一些问题，也未产生破坏性变更时会更新此版本号

Pre-release：先行版本，如果某个版本的改动较大，并且不稳定，可能如法满足预期的兼容性需求，就需要发布先行版本，先行版本通过会加在版本号的后面，通过 “-” 号连接以点分隔的标识符和版本编译信息：内部版本（alpha）、公测版本（beta）和候选版本（rc，即 release candiate）

Metadata：构建元数据，在补丁或预发布版本后立即添加加号和一系列点分隔的标识符来表示，例如:`1.0.0-alpha+001, 1.0.0+20130313144700, 1.0.0-beta+exp.sha.5114f85, 1.0.0+21AF26D3----117B344092BD`。标识符必须只包含ASCII字母数字和连字符`[0-9A-Za-z-]`。标识符不能为空。在确定版本优先级时，必须忽略构建元数据。

<br/>

### description

项目的描述，会展示在npm官网，方便在npm search中搜索结果中让别人直接了解包的功能。

<br/>

### keywords

字符串数组，一组项目的技术关键词，方便在npm search中搜索。

好的关键词可以帮助别人在npm官网上更好的检索到此项目，增加曝光率。

<br/>

### author

表示项目的作者

一种是字符串格式，npm会自动解析：

```json
"author": "CUGGZ <xxxxx@xx.com> (https://juejin.cn/user/3544481220801815)"
```

一种是对象形式：

```json 
"author": {
  "name" : "CUGGZ",
  "email" : "xxxxx@xx.com",
  "url" : "https://juejin.cn/user/3544481220801815"
}
```

email 和 url 在两种形式中都是可选的。也可以在你的npm用户信息中设置一个顶级的 maintainers 字段。

<br/>

### contributors ⬇️

数组，表示该项目包的贡献者、协作者，数组中每个元素表示一位开发者，书写格式与 author 字段相同

**`AUTHORS`文件**

有的的根目录中有一个`AUTHORS`文件（可以是 md、html、yaml 等格式），用于列出参与该项目开发的成员，它是一份开发者名单，用来表彰和感谢所有为项目作出贡献的人。它的内容与 contributors 字段一致。

AUTHORS 文件通常没有固定的文件扩展名，具体名称取决于项目开发者的喜好和约定。一般来说，AUTHORS文件的文件名可能是AUTHORS、CONTRIBUTORS、MAINTAINERS等，其中最常见的是AUTHORS。

参考：[react - AUTHORS ](https://github.com/facebook/react/blob/main/AUTHORS)

<br/>

### homepage

url 字符串，项目主页的链接，通常是项目 github 链接，项目官网或文档首页。

```
"homepage": "https://github.com/vuejs/create-vue#readme"
```

通过 `npm docs` 或 `npm home`命令能快速打开项目文档

<br/>

### repository

项目的仓库地址以及版本控制信息。

一种是对象的形式：

```json
"repository" : {
    "type" : "git",  // 显示的设置版本控制系统，
    "url" : "http://github.com/facebook/react.git"
    // 如果包不在根目录，可以指定它所在的目录
    "directory": "packages/react-dom"
}

"repository" : {
    "type" : "svn",
    "url" : "http://v8.googlecode.com/svn/trunk/"
}
```

一种是字符串形式：

```json
"repository": "https://github.com/facebook/react.git"
```

该 url 地址应该是一个公开可用的（可能是只读）url，可以直接传递给 VCS 程序而无需任何处理，不应该是html 页面的 url。

通过 `npm repo` 命令可以快速打开 github 源码页面。

<br/>

### bugs

项目 bug 反馈地址，通常是 github issue 页面的链接

```
"bugs": "https://github.com/vuejs/core/issues"
```

或者是项目的提交问题的地址（url）和邮件地址（email）

```
{
  "url" :"http://github.com/owner/project/issues",
  "email" : "project@hostname.com"
}
```

如果提供了url，它会被`npm bugs`命令使用



## 脚本配置

### scripts

指定项目的一些内置的脚本命令，是key-value键值对配置，key为可运行的命令，可以通过`npm run`来执行命令。通常包含项目开发，构建 等 CI 命令。

除了基本的scripts命令，结合pre和post完成前置和后续操作，脚本命令可以在包不同的生命周期中被执行。

```
"scripts": {
  "dev": "node index.ts",
  "predev": "node beforeIndex.js",
  "postdev": "node afterIndex.js"
}
```

当执行 `npm run dev` 命令时，会按照 predev -> dev -> postdev 的顺序依次执行上方的命令。

（待确认）但是这样的隐式逻辑很可能会造成执行工作流的混乱，所以 pnpm 和 yarn2 都已经废弃掉了这种 pre/post 自动执行的逻辑

[详细文档](https://docs.npmjs.com/cli/v9/using-npm/scripts)

<br/>

### config ❓⬇️

用来配置scripts里的脚本在运行时的参数，使用较少。在实例中，如果一个包有下面的配置：

```
{
  "name" : "foo",
  "config" : { "port" : "8080" }
}
```

如果运行 npm run start，则 port 字段会映射到`npm_package_config_port`环境变量中：

```js
console.log(process.env.npm_package_config_port); // 8080
```

用户可以通过`npm config set foo:port 3001` 命令来重写 port 的值。

## 依赖配置

### dependencies

运行依赖，也叫生产依赖。声明项目在生产环境中所必须的依赖包，使用 `npm install xxx` 或则 `npm install xxx --save` 时，会被自动插入到该字段中。

dependencies里的第三方包是我们的项目正常运行必须的包，因此npm会去检查并确保这些第三方包必须存在。

**注意**：不要将测试或过渡性的依赖放在dependencies中

**依赖的版本号**

（1）一般情况下，使用符合 semver 规范的版本号

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x"
  }
}
```

（2）**URL 代替版本范围**

tarball URL是一种可以替代依赖版本范围的安装方式，它是一个指向NPM包安装文件的URL地址，npm install 时会根据地址下载相应的 npm 包，并直接使用该版本进行安装。

通常被用于以下情况：

- 当某个NPM包的版本号没有遵循语义化版本控制（SemVer）规则时，无法使用正常的版本号进行安装时。
- 当需要使用已经发布过的某个特定版本的NPM包时，但该版本已经被从NPM仓库删除了，或者出现其他问题导致无法正常安装时。
- 当需要对某个私有模块进行安装时，而该模块未被上传到NPM仓库中。

格式如下：

```
https://registry.npmjs.org/<package-name>/-/<package-name>-<version>.tgz
```

`<package-name>`表示要安装的NPM包名称，`<version>`表示要安装的NPM包版本。

例如：

```
https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz
```

（3）**Git URL 作为依赖项**

格式：

```
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
```

- `<protocol>` ：git 仓库使用的传输协议，可以是：`git`, `git+ssh`, `git+http`, `git+https`, `git+file`
- `<user>[:<password>]`：可选项，用于指定连接到Git仓库所需的用户名和密码
- `<hostname>`：Git服务器的主机名或IP地址
- `<port>`：可选项，Git服务器的端口号，默认为80（http）或443（https）
- `[/]<path>`：Git仓库的路径，如果是根路径，则可以省略斜杠。例如，`github.com/user/repo`
- `[#<commit-ish> | #semver:<semver>]`：可选项，用于指定要安装的代码版本。其中，`#<commit-ish>`表示Git提交号或分支名，`#semver:<semver>`表示符合语义化版本控制规范的版本号。

例如：

```
git+ssh://git@github.com:npm/cli.git#v1.0.27
git+ssh://git@github.com:npm/cli#semver:^5.0
git+https://isaacs@github.com/npm/cli.git
git://github.com/npm/cli.git#v1.0.27
```

（4）**GitHub 网址（1.1.65+）**

不同于使用Git URL或Tarball URL，而是直接使用GitHub项目的URL地址

```json
"dependencies": {
  "<name>": "github:<username>/<repository>"
}
```

`<name>`是依赖包的名称，可以自定义；`<username>`和`<repository>`则是对应的GitHub用户名和仓库名

注意：使用 github 地址时有一些限制，比如：不能使用特定版本号、不能锁定依赖项版本、不能自动处理依赖关系等。因此，如果需要更精细的控制依赖项的版本和关系，建议还是使用其他方式，如Git URL或Tarball URL

（5）**本地路径（2.0.0+）**

一般用在本地离线开发和测试，在不想访问外部服务器的地方安装npm。

可以使用`npm instal -S`方式安装本地依赖包，路径可以是以下几种：

```
../foo/bar
~/foo/bar
./foo/bar
/foo/bar
```

然后它们将被规范化为一个相对路径并添加到package.json中

```json
"dependencies": {
  "bar": "file:../foo/bar"
}
```

<br/>

### devDependencies

开发依赖，项目在开发环境需要的而运行时不需要的依赖，用于辅助开发，通常包括项目工程化工具，如webpack、eslint、babel等。

它们只需安装在开发设备上，而无需在生产环境中运行代码。当打包上线时并不需要这些包，所以可以把这些依赖添加到 devDependencies 中，这些依赖依然会在本地指定 npm install 时被安装和管理，但是不会被安装到生产环境中。

<br/>

### peerDependencies

可以翻译作：对等依赖、前置依赖、同伴依赖，一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者，用来指定本包所需要的主工具的版本。

比如使用 element-plus 时，必须保证已经安装 vue3 才能正常使用，因为它是依赖 vue3 的，如果尝试直接安装它，它会发出警告，只有安装了 vue3 后，它才能正常运行。

不同的包管理器对 peerDependencies 的处理逻辑有所不同：

- npm：
  - v 1~2，自动安装
  - v 3~6，不会自动安装，并且如果发现依赖项的无效版本，则会发出警告
  - v 7+，默认自动安装
- yarn：自动安装，如果 peerDependencies指定的依赖未安装，会视为错误，并抛出错误信息
- pnpm：自动安装，如果 peerDependencies指定的依赖未安装，会输出警告

<br/>

### optionalDependencies

可选依赖，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。

optionalDependencies 对象中的包会覆盖 dependencies 中同名的包，所以只需在一个地方进行设置即可。

比如我们使用 colors 这个包来对 console.log 打印的信息进行着色来增强和区分提示，但它并不是必需的，所以可以将其加入到 optionalDependencies，并且在运行时处理引入失败的逻辑。比如像这样：

```js
try {
  var foo = require("foo");
  var fooVersion = require("foo/package.json").version;
} catch (er) {
  foo = null;
}
if (notGoodFooVersion(fooVersion)) {
  foo = null;
}

// .. then later in your program ..

if (foo) {
  foo.doFooThings();
}
```

<br/>

### peerDependenciesMeta

可以将 peerDependencies 指定为可选的。

```json
"peerDependencies": {
  "colors": "^1.4.0"
},
"peerDependenciesMeta": {
  "colors": {
    "optional": true
   }
 }
```

<br/>

### bundleDependencies ⬇️

打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。

比如：指定 react 和 react-dom 为打包依赖：

```json
"bundleDependencies": [
  "react",
  "react-dom"
]
```

在执行 `npm pack` 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。

> 注意：这个字段中的值必须是在dependencies、devDependencies里声明过的包才行。

普通依赖通常从 npm registry 安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用。

<br/>

### overrides

可以重写项目中的**任意深度的依赖**的版本号，进行包的替换。

比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：

```json
"overrides": {
  "foo": "1.1.0-patch"
}
```

当然这样会更改整个依赖树里的 foo，我们可以只对 A 下的 foo 进行版本号重写：

```json
"overrides": {
  "A": {
    "foo": "1.1.0-patch",
  }
}
```

overrides 支持任意深度的嵌套。

## 文件和目录

包含项目所包含的文件，以及入口等信息。

当一个项目同时定义了main、browser、module，像webpack、rollup等构建工具会感知这些字段，并根据环境以及不同的模块规范来进行不同的入口文件查找。

```
"main": "./index.ts", 
"browser": "./browser/index.ts",
"module": "./index.mjs"
```

比如 webpack 构建项目时默认的 target 为 `'web'`，也就是 Web 构建。它的 resolve.mainFeilds 字段默认为 `['browser', 'module', 'main']`，就会按照 browser -> module -> main 的顺序来查找入口文件

<br/>

### files

一个包含项目中的文件的数组，指定哪些文件需要跟随一起发布（npm pulish），用来控制 npm 包的大小。

默认情况下，发布包时只包含：package.json、license、readme，和 main 字段里指定的文件。在此基础上，可以通过 files 字段指定更多需要一起发布的内容

```js
"files": [
  "filename.js",  // 单独的文件
  "directory/",   // 整个文件夹
  "glob/*.{js,json}"  // glob 匹配的文件
 ]
```

一般情况下，files 里会指定构建出来的产物以及类型文件，而 src，test 等目录下的文件不需要跟随发布。

<br/>

### type❓⬇️

_在官方文档上未找到相关内容_

早期 esm 出现之前，大部分模块都是以 commonjs 规范来实现的，nodejs默认会按照该规范来解析模块。而在 es6 提出 esm 规范后，为了兼容不同地模块规范，避免构建时模块系统的冲突，提供了该选项来指示解析模块的方式。

用于定义 package.json 文件和该文件所在项目的根目录中，对`.js`文件和无扩展名文件的处理方式。可选值：

- module：js 被当作 ES 模块处理，文件书写必须是 `export default {}`这种格式
- commonjs：默认值，当作 CommonJS 模块处理，书写格式必须是 `module.exports={}`这种格式

除了上面的方式，还可以通过文件扩展名来指示模块解析方式。ES 模块采用`.mjs` 扩展名，Commonjs 模块采用`.cjs`扩展名，nodejs 会自动按照相应的格式处理。

无论该字段为何值，`.mjs` 的文件都按照es模块来处理，`.cjs` 的文件都按照 CommonJS 模块来处理。

<br/>

### main

> cjs 格式的入口文件

一个相对于根目录的文件路径，指向模块的入口文件，在browser和node环境中都可以使用。如果未设置，那么入口文件默认为根目录下的`index.ts`。

```json
"main": "./index.ts"
```

像上面这样，当引入对应的 packageA 时，实际上引入的就是 `node_modules/packageA/index.ts`。

这是早期只有 CommonJS 模块规范时，指定项目入口的唯一属性。

<br/>

### browser

> 浏览器端使用，配置成 umd 格式，webpack<5 会优先使用 browser

main 字段里指定的入口文件在 browser 和 Node 环境中都可以使用。如果只想在 web 端使用，并且不允许在 server 端使用，可以使用 browser 来定义入口文件。

```json 
"browser": "./src/index.ts"
```

<br/>

### module

> esm 格式的入口文件

用于指定 ES 模块的入口文件，只要支持ES6，会优先使用module入口。这样代码也可以启用tree shaking机制。

```json
"module":"./src/index.mjs"
```

需要注意，.js 文件是使用 commonJS 规范的语法 (require('xxx'))，.mjs 是用 ESM 规范的语法 (import 'xxx')。

上面三个的入口文件相关的配置是有差别的，特别是在不同的使用场景下。在 Web 环境中，如果使用 loader 加载 ESM（ES module），那么这三个配置的加载顺序是 browser→module→main，如果使用 require 加载 CommonJS 模块，则加载的顺序为 main→module→browser。

Webpack 在进行项目构建时，有一个 target 选项，默认为 Web，即构建 Web 应用。如果需要编译一些同构项目，如 node 项目，则只需将 webpack.config.js 的 target 选项设置为 node 进行构建即可。如果在 Node 环境中加载 CommonJS 模块，或者 ESM，则只有 main 字段有效。

<br/>

### exports

_npm 6.9 +，对应 nodejs 12 +_

> 注意：只能在支持 ESM 的 nodejs 版本中使用，并且工作方式与 CommonJS 不同，不能混用，即无法从使用CommonJS的模块中导入ESM导出的内容，反之亦然。

示例：[vitepress](https://github.com/vuejs/vitepress/blob/main/package.json)

用于指定模块（或库）的导入和导出规则，该字段提供了一种新的方式来定义JavaScript模块的行为，并使代码在不同环境下的使用更加灵活。

exports字段可以包含以下属性：

- `require`：用于指定当用户使用`require()`导入模块时，将导入哪个文件或路径。
- `import`：用于指定当用户使用 ES6 import 语句导入模块时，将导入哪个文件或路径。
- `node`：用于指定在Node.js环境下，模块的导入/导出行为。它是require和import的组合，可根据环境自动选择适当的导入方式。
- `default`：用于指定默认导出内容的路径或文件。
- 其他自定义属性：开发者可以根据需要自定义其他属性，以满足特定的需求

示例：

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "exports": {
    "./lib/math": "./src/math.js",
    "./lib/formulae": "./src/formulae.js",
    "utils": {
      "require": "./src/utils.js",
      "import": "./esm/utils.js"
    },
    "default": "./lib/main.js"
  }
}
```

在这个示例中，exports 字段有4个属性。其中，`./lib/math` 和 `./lib/formulae` 分别指向一个CommonJS模块，而utils 则使用了require和import两种不同的导入方式。default属性则指定了默认导出的内容路径。

还可以配置子包路径

```json
"exports": {
  "./style": "./dist/css/index.css'
},

// 引入时可以写为
import "packageA/style";

// 不用写成
import "packageA/dist/css/index.css";
```

这在第三方 UI 库需要引入对应的样式文件时比较常见

这让 npm包有了条件导出的功能，可以配置不同环境对应的模块入口文件，并且当它存在时，它的优先级最高。

<br/>

### workspaces

一个文件模式数组，描述了本地文件系统中的位置，告诉 npm 可以通过查找这些位置来找到项目中需要的 npm 包，并把它们链接到 node_modules 中。

该字段的值可以是文件夹名称或通配符

```json
"workspaces": [
  "workspace-a"
]
```

该配置常见于 monorepo 类型的项目中，通常子项目中会平铺在 packages 目录下，所以通常配置为：

```json
"workspaces": [
  "packages/*"
]
```

参考链接 - [element-plus - package.json](https://github.com/element-plus/element-plus/blob/dev/package.json) | [vue-cli package.json](https://github.com/vuejs/vue-cli/blob/dev/package.json)

<br/>

### bin

用来指定各个内部命令对应的可执行文件的位置，在各种脚手架项目中比较常见。

很多包（比如脚手架）都有一个或多个可执行的文件希望被放到PATH中。实际上，就是这个功能让npm可执行的，npm会将它链接到 prefix/bin（全局初始化）或者 ./node_modules/.bin/（本地初始化）

如果只有一个可执行文件，并且名字和包名一样，可以只用一个字符串，比如：

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program"
}
```

相当于

```json
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": { "my-program": "./path/to/program" }
}
```

参考链接 - [vue-cli/@vue/cli - package.json](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/package.json)

<br/>

### man ⬇️

man 命令是 Linux 中的帮助指令，通过该指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息。当用户在终端中执行`man <module>`命令时，Node.js会查找指定模块的man文件，并将其显示在终端中。

> **注意**：
>
> - man属性仅适用于全局安装的模块，对于本地安装的模块，通常无效。
> - man属性只在类Unix系统中有效，在Windows系统中可能无法正常工作。

man属性可以包含以下类型的值：

1. 字符串：表示单个man文件的路径。当值为字符串时，Node.js假定该路径是相对于模块根目录的。
2. 数组：表示多个man文件的路径。当值为数组时，每个元素都应该是一个字符串，表示单个man文件的路径。
3. 对象：表示自定义的man文件配置对象。该对象应该包含以下属性：
   - path：必需，表示man文件的路径。与字符串和数组类型的值不同，path属性应该是绝对路径。
   - section：可选，表示man文件的编号。默认值为1

```json
{
  "name": "my-module",
  "version": "1.0.0",
  "description": "My awesome module",
  "man": [
    "./docs/man/1/my-module.1",
    {
      "path": "/usr/local/share/man/man1/my-module.1",
      "section": "7"
    }
  ],
  "dependencies": {
    "other-module": "^2.0.0"
  }
}
```

在这个示例中，man属性是一个数组，其中包含两个元素。第一个元素是一个字符串，表示相对于模块根目录下的man文件路径。第二个元素是一个对象，指定了man文件的绝对路径和编号。同时，该示例还定义了其他模块依赖项，例如other-module。

<br/>

### directories ⬇️

> 注意：这个配置很少使用。在npm v7中，directories属性已被弃用，使用workspace来代替

一个对象，用于定义模块中的不同目录路径。它可以包含以下属性：

1. `bin`：用于指定可执行文件放置的目录，默认值是`./bin`。
2. `doc`：用于指定模块文档的目录，默认值是`./doc`或`./docs`。
3. `example`：用于指定示例代码的目录，默认值是`./example`、`./examples`或`./demo`。
4. `lib`：用于指定库代码的目录，默认值是`./lib`。
5. `man`：用于指定man手册文件的目录，默认值是`./man`。
6. `test`：用于指定测试代码的目录，默认值是`./test`或`./tests`。

示例：

```json
{
  "name": "my-module",
  "version": "1.0.0",
  "description": "My module description",
  "directories": {
    "lib": "src",
    "test": "tests"
  },
  "dependencies": {
    "other-module": "^2.0.0"
  }
}
```

在这个示例中，directories属性指定了lib目录和test目录的路径，分别为src和tests。这意味着该模块的库代码将存储在src目录中，而测试代码将存储在tests目录中。

在实际的项目目录中，可能没有按照这个规范进行命名，那么就可以在directories字段指定每个目录对应的文件路径。

## 发布配置

主要是和项目发布相关的配置

<br/>

### private

当值为 true 时，npm会拒绝发布当前项目。

防止意外的把私有库发布到 npm 服务器。如果你要确定给定的包是只发布在特定registry（如内部registry）的，用publishConfighash 的描述来重写 registry 的 publish-time 配置参数。

<br/>

### publishConfig

用于设置发布时一些配置项的集合，在发布模块时生效。

如果不想模块被默认标记为最新，或者不想发布到公共仓库，可以在这里配置 tag 或仓库地址。更详细的配置可以参考 [npm-config](https://docs.npmjs.com/cli/v9/using-npm/config)

通常情况下，publishConfig 会配合 private 来使用，如果只想让模块发布到特定 npm 仓库，就可以这样来配置：

```json
"private": true,
"publishConfig": {
  "tag": "1.1.0",  // 指定当前版本对应的标签
  "registry": "https://registry.npmjs.org/",  // 发布的npm私源地址
  "access": "public"  // 发布有作用的包，如@leon/ping-url，必须设置access
  "publicPath": "" // 配置注册表的公共路径，默认公共路径是/package
}
```

比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry

```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}
```

<br/>

### preferGlobal 🚫

> 注意：npm v5版本后就已经被废弃

用于指示模块是否应该全局安装。如果 preferGlobal 为 true，则意味着该模块应该被视为工具或命令行程序，并建议在全局范围内安装。

<br/>

### license

指定软件的开源协议类型，开源协议表述了其他人获得代码后拥有的权利，可以对代码进行何种操作，何种操作又是被禁止的。常见的协议如下：

- MIT ：只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。
- Apache ：类似于 MIT ，同时还包含了贡献者向用户提供专利授权相关的条款。
- GPL ：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。

最简单的配置方法是，指定一个许可证的名字：

```
{ "license" : "MIT" }
```

如果你有更复杂的许可条件，或者想要提供给更多地细节，可以这样：

```json
"licenses" : [
  {
    "type" : "MyLicense",
    "url" : "http://github.com/owner/project/path/to/license"
  }
]
```

## 系统配置

和项目关联的系统配置，比如 node 版本或操作系统兼容性之类。这些要求只会起到提示警告的作用，即使用户的环境不符合要求，也不影响安装依赖包。

<br/>

### engines

一个对象，用于指定模块所需的 Node.js 版本范围，npm 会检查其运行环境是否符合要求，不符合时，会抛出错误并拒绝安装或使用模块。

```json
{
  "engines": {
    "node": ">=14 <16",
    "pnpm": ">7"
  }
}
```

> 注意：除非设置 engine-strict 标记，否则 engines 字段只是建议值

<br/>

### engineStrict

通常与 engines 配置一起使用，用于指定是否允许安装 Node.js 版本不符合 package.json 文件中指定版本范围的依赖项。默认情况下，`engineStrict` 的值为 `false`，即不启用严格模式。

启用了严格模式时，当遇到 Node.js 版本不符合要求的依赖项时，npm 会拒绝安装并报错。

<br/>

### packageManager

v 7.7+，对应 nodejs v 15+

用于指定项目使用的包管理器，例如 `npm` 、 `yarn`、`pnpm`。如果该配置项未设置，则默认使用 `npm`

<br/>

### os ⬇️

指定项目对操作系统的兼容性要求。

```json
"os": ["darwin", "linux"]
```

<br/>

### cpu ⬇️

指定项目只能在特定的 CPU 体系上运行

```json
"cpu": ["x64", "ia32"]

// 黑名单形式，在名字前加上“!”表示取反
"cpu" : [ "!arm", "!mips" ]
```

## 第三方配置

package.json 文件还可以承载一些第三方库特有的配置，例如 Babel、ESLint 等。它们每个都有特有的配置项，即可以放在单独的配置文件中，也可以写在 package.json 中。

参见 [配置文件是如何被插件获取并加载的](../../guide/some-questions#配置文件是如何被插件获取并加载的)

<br/>

### types 和 typeings

项目如果是用`TypeScript`写的，则需要`types`字段，对外暴露相关的类型定义，指定TypeScript的类型定义的入口文件

> `types` 是在 TypeScript 2.0 及更高版本中引入的， `typings` 是它的早期版本。

```json
"types": "./index.d.ts",
```

<br/>

### unpkg

Unpkg 是一个开源的 CDN（内容分发网络），用于分发 npm 包和其他前端资源。它提供了一个简单可靠的方式来获取和加载 npm 包，无需自己安装和管理依赖项。你可以在 HTML 页面中引入任何 npm 包或 JavaScript 文件，并直接从 unpkg 的服务器上下载和加载所需的资源

比如 vue package.json 的 unpkg 定义为 `dist/vue.global.js`

```json
"unpkg": "dist/vue.global.js",
```

当我们想通过 CDN 的方式使用链接引入 vue 时。

访问 `https://unpkg.com/vue` 会重定向到 `https://unpkg.com/vue@3.2.37/dist/vue.global.js`，其中 3.2.27 是 Vue 的最新版本。

<br/>

### jsdelivr

与 unpkg 类似，vue 通过如下的配置

```
"jsdelivr": "dist/vue.global.js",
```

访问 `https://cdn.jsdelivr.net/npm/vue` 实际上获取到的是 jsdelivr 字段里配置的文件地址。

<br/>

### borwserslist

设置项目的浏览器兼容情况，用来告知支持哪些浏览器及版本。

Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。比如：

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

这里指定了一个对象，里面定义了生产环境和开发环境的浏览器要求。上面的 development 就是指定开发环境中支持最后一个版本的 chrome、Firefox、safari 浏览器。

也可以使用 `.browserslistrc` 单文件配置，参见：[browserslist](../browserslist)

<br/>

### sideEffects

显式设置某些模块是否具有副作用，用于 tree-shaking 优化。

比如在项目中整体引入 Ant Design 组件库的 css 文件：

```json
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

如果 Ant Design 的 package.json 里不设置 sideEffects，那么 webapck 构建打包时会认为这段代码只是引入了但并没有使用，可以 tree-shaking 剔除掉，最终导致产物缺少样式。

所以 Ant Design 在 package.json 里设置了如下的 sideEffects，来告知 webpack，这些文件具有副作用，引入后不能被删除。

```json
"sideEffects": [
  "*.css"
]
```

参考：(ant-design - package.json)[https://github.com/ant-design/ant-design/blob/master/package.json]

<br/>

### lint-staged

lint-staged 是一个对 Git 暂存区文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查，图片优化等操作。通常配合 husky 这样的 git-hooks 工具一起使用。

git-hooks 用来定义一个钩子，这些钩子方法会在 git 工作流程中比如 pre-commit，commit-msg 时触发，可以把 lint-staged 放到这些钩子方法中。

```json 
"lint-staged": {
 "*.js": [
   "eslint --fix",
    "git add -A"
  ]
}
```

使用 lint-staged 时，每次提交代码只会检查当前改动的文件。

<br/>

### gitHooks

gitHooks 用来定义一个钩子，在git commit之前执行 ESlint 检查。在执行 lint 命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以需要用 git add 命令将修复后的文件重新加入暂存区。在执行 pre-commit 命令之后，如果没有错误，就会执行 git commit 命令：

```json 
"gitHooks": {
	"pre-commit": "lint-staged"
}
```

这里就是配合上面的 lint-staged 来进行代码的检查操作
