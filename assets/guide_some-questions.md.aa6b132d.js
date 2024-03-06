import{_ as e,v as i,b as o,R as c}from"./chunks/framework.8277b2e6.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/some-questions.md","filePath":"guide/some-questions.md","lastUpdated":1709747010000}'),l={name:"guide/some-questions.md"},r=c('<p>不知道你有没有过以下疑问</p><nav class="table-of-contents"><ul><li><a href="#为什么很多库配置文件都是-xxxrc格式">为什么很多库配置文件都是.xxxrc格式？</a></li><li><a href="#配置文件是如何被获取并加载的">配置文件是如何被获取并加载的？</a></li><li><a href="#xxxignore文件是如何起作用的">.xxxignore文件是如何起作用的？</a></li><li><a href="#cli-工具是如何识别命令行参数的">cli 工具是如何识别命令行参数的？</a></li></ul></nav><br><h3 id="为什么很多库配置文件都是-xxxrc格式" tabindex="-1">为什么很多库配置文件都是<code>.xxxrc</code>格式？ <a class="header-anchor" href="#为什么很多库配置文件都是-xxxrc格式" aria-label="Permalink to &quot;为什么很多库配置文件都是`.xxxrc`格式？&quot;">​</a></h3><p>在 Unix 系统中，约定将一些用于全局配置和环境配置的文件命名以 <code>.</code> 开头，比如 <code>.bashrc</code>、<code>.gitconfig</code> 等，这些文件存储了用户自定义的配置信息。</p><p>在早期的 Unix 系统中，为了避免一些系统关键文件被误删除或修改，这些文件通常会设置为只读权限或者隐藏属性，以防止用户误操作。从而衍生出了一种风格，即将用户自定义的配置文件命名为 <code>*.rc</code>，其中 <code>rc</code> 的含义据说是 &quot;<strong>run commands</strong>&quot;，表示该文件包含了用户需要运行的一系列命令或脚本。</p><p>随着时间的推移，这种命名规约逐渐成为了 Unix 系统上各种常用软件配置文件的通用后缀。在各种编程语言和工具中，我们可以看到很多以 <code>.rc</code> 或 <code>.cfg</code> 为后缀的配置文件，如 <code>.vimrc</code>、<code>.eslintrc</code>、<code>.babelrc</code> 等。虽然在实际使用时，这些文件的名称和后缀并不是强制规定的，但是遵守这种约定可以更好地组织和管理项目中的配置文件。</p><br><h3 id="配置文件是如何被获取并加载的" tabindex="-1">配置文件是如何被获取并加载的？ <a class="header-anchor" href="#配置文件是如何被获取并加载的" aria-label="Permalink to &quot;配置文件是如何被获取并加载的？&quot;">​</a></h3><p>基于问题 1 的默认格式规范，由 James Kyle 在 2016 年创建了 <a href="/fe-engineering/pkgs/cosmiconfig">Cosmiconfig</a> 这个库，提供一种简单和灵活的配置文件加载方案，它会按照约定的优先级顺序在项目中搜索并加载配置文件。</p><p>默认情况下，Cosmiconfig 将从指定的起始位置开始搜索，并向上遍历目录树，搜索以下内容（顺序即优先级）：</p><ul><li>package.json 文件中指定的 <code>myapp</code> 属性</li><li>JSON 或 YAML 格式编写的，无扩展名的 &quot;.rc&quot; 文件，如：<code>.myapprc</code></li><li>扩展名为 <code>.json</code>、<code>.yaml</code>、<code>.yml</code>、<code>.js</code>、<code>.mjs</code> 或 <code>.cjs</code> 的 &quot;.rc&quot; 文件，如：<code>.myapprc.json</code></li><li>位于 <code>.config</code> 子目录内的，符合上面两项格式的配置文件</li><li><code>.config.js</code>、<code>.config.mjs</code> 或 <code>.config.cjs</code> 文件</li></ul><p>一些非常流行的库都使用了 Cosmiconfig 的插件：Prettier、ESLint、Jest、TypeScript、Stylelint、PostCSS。注意：每个插件仍然有自己独特的配置选项和语法规则</p><br><h3 id="xxxignore文件是如何起作用的" tabindex="-1"><code>.xxxignore</code>文件是如何起作用的？ <a class="header-anchor" href="#xxxignore文件是如何起作用的" aria-label="Permalink to &quot;`.xxxignore`文件是如何起作用的？&quot;">​</a></h3><p><code>ignore</code> 文件一般表示不需要应用规则的目录或者文件，一般都是使用基于 <a href="/fe-engineering/general/text-format">glob</a> 的解析库。常用的解析库有：</p><ul><li>ignore：一个轻量级的 Node.js 库，可以解析 <code>.gitignore</code> 和 <code>.npmignore</code> 文件，并返回一个过滤器函数，可以用来过滤指定目录中的文件。</li><li>glob：一个功能强大的文件匹配库，可以使用 glob 语法模式匹配文件路径，并返回匹配的文件列表。</li><li>micromatch：一个类似于 glob 的快速、高度可配置和易于使用的文件匹配库，具有更丰富的特性和选项，并且可以非常灵活地扩展和自定义。</li></ul><br><p>一些常见的库中的实现方案：</p><ul><li>在 Git 中，使用自己实现的一个基于 C 语言实现的名为 <code>fnmatch()</code> 的函数来解析 glob 语法模式。该函数可以将一个字符串和一个模式进行匹配，并返回是否匹配成功的结果。</li><li>npm 使用 ignore 库来解析 <code>.npmignore</code> 和 <code>.gitignore</code> 文件，并返回一个过滤器函数</li><li>ESLint 使用 fast-glob 库来解析 <code>.eslintignore</code> 文件中的匹配模式，并对文件进行过滤</li><li>Prettier 使用 minimatch 库提供的 <code>match()</code> 函数来解析 <code>.prettierignore</code> 文件中的 glob</li><li>Stylelint 使用 micromatch 库来解析 <code>.stylelintignore</code> 文件中的 glob 模式，并返回一个正则表达式</li></ul><p>这些库具有不同的特点和用途，但它们的核心功能都是基于 <a href="/fe-engineering/general/text-format">glob</a> 语法实现的</p><br><h3 id="cli-工具是如何识别命令行参数的" tabindex="-1">cli 工具是如何识别命令行参数的？ <a class="header-anchor" href="#cli-工具是如何识别命令行参数的" aria-label="Permalink to &quot;cli 工具是如何识别命令行参数的？&quot;">​</a></h3><p>各种库的 CLI 工具中，参数通常是通过命令行解析库来识别的。常用的命令行解析库包括：</p><ul><li>yargs：一个流行的 Node.js 命令行解析库，提供了丰富的特性和选项，包括可组合的命令、子命令、自动生成帮助信息、处理异步命令等。yargs 底层使用 minimist 解析命令行参数。</li><li>commander：一个流行的 Node.js 命令行解析库，类似于 yargs，也提供了很多有用的特性和选项，例如自动生成帮助信息、错误处理、版本控制等。</li><li>minimist：一个小型的命令行参数解析库，可以解析简单的参数，例如布尔值、字符串等，但不支持复杂的参数模式。</li><li>arg：一个轻量级的命令行解析库，可以解析多个参数类型，并允许定义复杂的参数模式和正则表达式。</li><li>meow：一个小巧的命令行解析库，基于 minimist 实现，提供了类似于 yargs 的特性，例如自动生成帮助信息、处理默认值、处理多个命令等。</li></ul><hr><p>命令行解析的底层逻辑通常是通过读取进程的 argv（Argument Vector，<strong>参数向量</strong>）数组来实现的。argv 数组包含了启动进程时传递给它的所有命令行参数，例如程序名、选项和参数等，并按照空格进行分隔。</p><p>具体来说，命令行解析通常包含以下几个步骤：</p><ol><li>读取 argv 数组，并将其拆分为程序名和参数列表。</li><li>遍历参数列表，识别并解析所有可识别的选项和参数，并将它们存储在一个对象或 Map 中。</li><li>检查是否有未知的参数或选项，如果有则抛出异常或警告。</li><li>检查是否缺少必要的参数或选项，如果有则抛出异常或警告。</li><li>返回解析后的参数对象或 Map。</li></ol><p>命令行解析库简化了上步骤的处理，并且提供一些额外的功能，例如自动生成帮助信息、支持多种格式的参数输入、处理异步命令等。</p><hr><p>一些比较流行的库中使用的解析库：</p><ul><li>stylelint：使用 micromatch 库来解析命令行参数，并提供了许多有用的特性和选项，例如指定配置文件路径、忽略文件或目录、自定义报告机制等。</li><li>eslint：使用 yargs 库来解析命令行参数，并提供了许多扩展功能，例如支持多种配置文件格式、指定扩展插件等。</li><li>npm：使用 yargs 库和 ignore 库来解析和处理命令行参数，例如指定操作类型、安装依赖包、升级依赖等。</li><li>pnpm：使用 yargs 库来解析和处理命令行参数，但与 npm 不同的是，pnpm 提供了更加高级和灵活的依赖管理功能，例如嵌套式依赖、并发安装等。</li><li>Express：使用内置的 process.argv 命令行参数处理模块来解析命令行参数。</li><li>Koa：使用内置的 process.argv 模块来解析命令行参数。</li><li>Mocha：使用 yargs 库来解析命令行参数，并提供了许多扩展功能，例如支持多种报告格式、指定测试文件或目录等。</li><li>Webpack：使用 yargs 和 webpack-cli 库来解析命令行参数，并提供了非常丰富和灵活的特性和选项，例如配置文件路径、热重载服务器等。</li><li>Jest：使用 yargs 库来解析命令行参数，并提供了许多扩展功能，例如支持多进程运行、覆盖率报告等</li></ul><br>',34),a=[r];function n(t,d,s,g,p,m){return i(),o("div",null,a)}const u=e(l,[["render",n]]);export{h as __pageData,u as default};
