import{_ as e,v as p,b as a,R as o}from"./chunks/framework.8277b2e6.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"docs/pnpm/pnpm-workspace.md","filePath":"docs/pnpm/pnpm-workspace.md","lastUpdated":1695401145000}'),s={name:"docs/pnpm/pnpm-workspace.md"},n=o(`<h1>pnpm-workspace.yaml</h1><p>v8.x</p><p><a href="https://pnpm.io/zh/workspaces" target="_blank" rel="noreferrer">官方文档</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>monorepo 也称为多包存储库、多项目存储库或单体存储库，是现在很多基础类库主流的代码仓库管理模式，可以将多个项目合并到一个仓库中，<strong>这样的作用是能在我们开发调试多包时，彼此间的依赖引用更加简单。</strong></p><p>pnpm 内置了对 monorepo 的支持。</p><p><code>pnpm-workspace.yaml</code> 文件是用来定义 pnpm 工作空间（workspace）的配置文件。工作空间是一种管理多个包的方式，它可以让你在一个父目录下统一管理多个子包的依赖和版本号等信息。</p><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p>pnpm-workspace.yaml 的书写格式遵循 <a href="./../../guide/text-format">YAML</a> 格式规范，配置项包括以下以种（未全部验证）</p><p>（1）packages：数组，列出所有子包名称，格式可以为：</p><ul><li><code>packages/*</code>：表示匹配所有位于 packages 目录下的直接子目录</li><li><code>conponents/**</code>：表示匹配所有位于 <code>components</code> 目录下的子目录，无论层次结构有多少级</li><li><code>!**/test/**</code>：排除测试目录中的包</li></ul><p>（2）dir：字符串，指定工作空间目录的名称，默认值为<code>&quot;.&quot;</code></p><p>（3）noHoist：数组，用来列出不能被 hoisted 的依赖项</p><p>（4）packagesToHoist：数组，用来列出需要 hoist 的依赖项</p><p>（5）virtualStoreDir：字符串，指定虚拟存储目录的名称，默认值为 <code>&quot;node_modules/.pnpm&quot;</code></p><p>（6）sharedWorkspaceLockfile：布尔值，指定是否启用共享工作空间锁定文件，默认值为 <code>false</code></p><p>（7）store：字符串，指定包存储目录的名称，默认值为 <code>&quot;~/.pnpm-store&quot;</code></p><p>（8）packageImportMethod：字符串，指定在工作空间中如何导入子包的依赖项，默认值为 <code>&quot;auto&quot;</code>，意味着自动决定最佳导入方式</p><p><strong>关于 hoist</strong></p><p>在 pnpm 工作空间中，<code>hoisted</code> 是一个特殊的概念，表示将依赖项安装到工作空间根目录下的 <code>node_modules</code> 目录中，而不是将其安装在每个子包的 <code>node_modules</code> 目录下</p><p>有助于减少重复的依赖项，从而提高整个工作空间的性能和稳定性。当多个子包共享同一个依赖项时，该依赖项只需要被安装一次，并且可以被所有子包共享</p><h2 id="实战" tabindex="-1">实战 <a class="header-anchor" href="#实战" aria-label="Permalink to &quot;实战&quot;">​</a></h2><p>有如下的项目结构</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">my-project/</span></span>
<span class="line"><span style="color:#babed8;">├── package.json</span></span>
<span class="line"><span style="color:#babed8;">└── packages/</span></span>
<span class="line"><span style="color:#babed8;">    └── eslint-config/</span></span>
<span class="line"><span style="color:#babed8;">        ├── package.json</span></span>
<span class="line"><span style="color:#babed8;">        └── index.ts</span></span></code></pre></div><p>my-project 是项目根目录，packages 是子项目的目录，eslint-config 是其中一个子项目</p><p>从结构上看，eslint-config 有 package.json、index.ts，本质上也是一个完整的项目。</p><p>使用 monorope 管理这样的仓库，让每个项目相互独立（安装依赖、构建），</p><p>（1）在项目根目录下创建配置文件：<code>pnpm-workspace.yaml</code></p><p>（2）在配置文件中声明工作空间，把 eslint-config 当作一个子包</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">packages:</span></span>
<span class="line"><span style="color:#babed8;">  - packages/*</span></span></code></pre></div><p>（3）修改根目录下的 package.json 中的 workspaces 配置，与pnpm-workspace.yaml 保持一致。原因：</p><ul><li>不利于维护和管理：<code>pnpm-workspace.yaml</code> 文件是一种特定于 <code>pnpm</code> 的配置文件，不同的包管理器或者开发环境可能无法识别和处理它</li><li>可能导致依赖安装问题：如果在 <code>pnpm-workspace.yaml</code> 中声明了工作区，但是没有在 <code>package.json</code> 中同步进行声明，那么 <code>pnpm</code> 可能会错误地解析工作区信息，导致依赖安装失败或者缺失。</li><li>可能导致其他问题：除了上述可能性外，如果在项目中只声明了 <code>pnpm-workspace.yaml</code> 而没有遵循规范同时在 <code>package.json</code> 中进行声明，还可能产生其他未知的问题，例如构建、测试、打包等方面出现异常等。</li></ul><p>（4）修改子项目的 package.json 中的 name，最好以<code>@scope/xxx</code>的形式命名，这样会方便子包管理，也可以是其他合法的 npm 包名。</p><h2 id="相关操作" tabindex="-1">相关操作 <a class="header-anchor" href="#相关操作" aria-label="Permalink to &quot;相关操作&quot;">​</a></h2><p>通过 pnpm 管理 monorepo 项目时，经常涉及到以下操作</p><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><p>（1）在根目录下，给子包安装依赖时，需要通过 <code>-F</code> 指定具体的子包名称，安装的依赖会存放在子包的 node_modules 中</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">pnpm add -D -F &quot;@kd/eslint-config&quot;</span></span></code></pre></div><p>如果想让主包和子包使用相同的依赖，需要在 <code>.npmrc</code>中配置<code>link-workspace-packages = true</code>，pnpm 就会使用工作区链接来安装和管理依赖项，也就是在子包中安装依赖时，pnpm 会检查根目录的 node_modules 中是否已存在该依赖，并将其链接到子包中，而不是在子包中再安装一次。</p><p>（2）把子包安装到根目录中，需要这样操作。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">pnpm add -w &lt;pkg&gt;</span></span></code></pre></div><p>但是这么做没意义，子包是某类功能的集合，正常情况下应该是被另一个子包使用。</p><p>（3）在子包 pa 中安装另一个子包 pb ，让 pb 成为 pa 的依赖：</p><p>进入该子项目的根目录：<code>cd packages/pa</code></p><p>执行安装命令：<code>pnpm add pb</code></p><p>然后在 pa 的 package.json 中会出现 <code>&quot;pc&quot;: &quot;workspace:^&quot;</code>，这里的 <code>workspace: </code>是workspace 协议，pnpm 只会在本地的 workspace 包含的子项目中解析此包</p><p>（4）只安装根目录下的依赖</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">pnpm install --ignore-workspace</span></span></code></pre></div><p>（5）</p>`,49),c=[n];function l(t,d,r,i,m,h){return p(),a("div",null,c)}const g=e(s,[["render",l]]);export{k as __pageData,g as default};