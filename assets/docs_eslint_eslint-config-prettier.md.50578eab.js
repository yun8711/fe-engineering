import{_ as s,v as n,b as l,R as a}from"./chunks/framework.8277b2e6.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":true},"headers":[],"relativePath":"docs/eslint/eslint-config-prettier.md","filePath":"docs/eslint/eslint-config-prettier.md","lastUpdated":1707047648000}'),p={name:"docs/eslint/eslint-config-prettier.md"},e=a(`<h1>插件：eslint-config-prettier</h1><p>v9.1.0</p><p><a href="https://github.com/prettier/eslint-config-prettier/" target="_blank" rel="noreferrer">github</a></p><p>一个 eslint 规则包，作用是：<strong>关闭所有不必要或可能与 Prettier 冲突的规则</strong>。这样可以避免在使用Prettier进行代码格式化时，出现由于ESLint规则冲突导致的格式化问题</p><p><strong>注意</strong>：此配置只是关闭规则，因此只有将其与其他配置一起使用才有意义</p><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><p>1、安装：<code>pnpm add -D eslint-config-prettier</code></p><p>2、配置</p><p>（1）在 <code>.eslintrc*</code> 文件中</p><p>在 extends 数组的最后添加&quot;prettier&quot;，这样它就能覆盖其他配置。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">some-other-config-you-use</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><blockquote><p>eslint 插件的命名格式：前缀必须为<code>eslint-plugin-</code>，使用时可以省略，以<code>@</code>开头的表示带命名空间的，正常引入即可。</p><p>所以这里只添加 prettier，但是表示是 eslint-config-prettier</p></blockquote><p>（2）在 eslint.config.js 文件中</p><p>导入<code> eslint-config-prettier</code>，并将其加入配置数组中，放在要覆盖的其他配置之后。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> someConfig </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">some-other-config-you-use</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> eslintConfigPrettier </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint-config-prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">  someConfig</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  eslintConfigPrettier</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>3、（可选）运行 CLI 帮助程序， 查找<code>rules</code>配置中的问题</p><h2 id="配合其他插件" tabindex="-1">配合其他插件 <a class="header-anchor" href="#配合其他插件" aria-label="Permalink to &quot;配合其他插件&quot;">​</a></h2><p>eslint-config-prettier 不仅会关闭核心规则，还会自动关闭这些插件中的一些规则：</p><ul><li><a href="https://github.com/typescript-eslint/typescript-eslint" target="_blank" rel="noreferrer">@typescript-eslint/eslint-plugin</a></li><li><a href="https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin" target="_blank" rel="noreferrer">@babel/eslint-plugin</a></li><li><a href="https://github.com/babel/eslint-plugin-babel" target="_blank" rel="noreferrer">eslint-plugin-babel</a></li><li><a href="https://github.com/gajus/eslint-plugin-flowtype" target="_blank" rel="noreferrer">eslint-plugin-flowtype</a></li><li><a href="https://github.com/yannickcr/eslint-plugin-react" target="_blank" rel="noreferrer">eslint-plugin-react</a></li><li><a href="https://github.com/xjamundx/eslint-plugin-standard" target="_blank" rel="noreferrer">eslint-plugin-standard</a></li><li><a href="https://github.com/sindresorhus/eslint-plugin-unicorn" target="_blank" rel="noreferrer">eslint-plugin-unicorn</a></li><li><a href="https://github.com/vuejs/eslint-plugin-vue" target="_blank" rel="noreferrer">eslint-plugin-vue</a></li></ul><p>所以从 v8.0.0 之后开始，上述的插件与 eslint-config-prettier 一起使用时，不需要再引入其他插件来处理规则冲突。</p><p>在 eslint.config.js 文件中，允许在 plugins 中自定义插件名称，但是 eslint-config-prettier 只能识别官方的名称</p><p><em>示例：</em></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> typescriptEslint </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/eslint-plugin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> eslintConfigPrettier </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint-config-prettier</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// 自定义插件名称</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">ts</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> typescriptEslint</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 🚨 Don’t do this!</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// With eslintrc, this is _always_ called:</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// @typescript-eslint/indent</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;font-style:italic;">// But in eslint.config.js (flat config), the name chosen above in \`plugins\` is used.</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ts/indent</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 🚨 Don’t do this!</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  eslintConfigPrettier</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>上述配置中，eslint-config-prettier 不会关闭 <code>ts/indent</code>规则，因为它只会关闭<code>@typescript-eslint/indent</code>，所在必须使用官方名称</p><h2 id="cli-帮助工具" tabindex="-1">CLI 帮助工具 <a class="header-anchor" href="#cli-帮助工具" aria-label="Permalink to &quot;CLI 帮助工具&quot;">​</a></h2><p>eslint-config-prettier 还附带了一个小型 CLI 工具，可帮助您检查配置是否包含任何不必要的规则或与 Prettier 冲突的规则。运行方法如下：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">eslint-config-prettier</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">待检查文件路</span><span style="color:#BABED8;">径</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 或</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dlx</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">eslint-config-prettier</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#C3E88D;">待检查文件路</span><span style="color:#BABED8;">径</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 输出示例</span></span>
<span class="line"><span style="color:#FFCB6B;">Progress:</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">resolved</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">reused</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">99</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">downloaded</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">added</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">100</span><span style="color:#C3E88D;">,</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">done</span></span>
<span class="line"><span style="color:#FFCB6B;">The</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">following</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">rules</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">are</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">unnecessary</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">or</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">might</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">conflict</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">with</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">Prettier:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">-</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">indent</span></span></code></pre></div><p>v7.0.0 之前的 CLI 工具略有不同，用法如下：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">eslint</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--print-config</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">index.js</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">npx</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">eslint-config-prettier-check</span></span></code></pre></div>`,29),o=[e];function t(r,c,i,y,D,F){return n(),l("div",null,o)}const u=s(p,[["render",t]]);export{E as __pageData,u as default};
