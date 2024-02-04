import{_ as s,v as n,b as a,R as l}from"./chunks/framework.8277b2e6.js";const o="/fe-engineering/assets/image-20230727133154379.ae56b689.png",F=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"docs/changelog/commitlint.md","filePath":"docs/changelog/commitlint.md","lastUpdated":1707047648000}'),e={name:"docs/changelog/commitlint.md"},t=l(`<h1>Commitlint</h1><p>v17.6.7</p><p><a href="https://github.com/conventional-changelog/commitlint" target="_blank" rel="noreferrer">github</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Commitlint 是一个检查 Git 提交信息格式是否符合约定式提交规范的工具，可以规范化提交信息格式，使得代码仓库更加清晰和易于管理</p><p>Commitlint 的本质是一个 Node.js 模块，它提供了一个命令行工具。结合 husky，可以在 git commit 之前对提交信息进行验证。通过配置规则文件，可以设置各种校验条件。</p><p>除此之外，还可以使用正则表达式进行更复杂的校验。如果提交信息不符合规则，Commitlint 将会提示错误信息，阻止提交操作。</p><br><p>使用 commitlint 时，需要安装以下两个依赖</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">pnpm add @commitlint/cli @commitlint/config-conventional -D</span></span></code></pre></div><p>@commitlint/cli 是 Commitlint 命令行工具，它可以从终端读取 Git 提交信息，并根据配置文件进行校验，是与 commitlint 交互的主要方式。</p><blockquote><p>它内部实现了一个 <a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/git-raw-commits/index.js" target="_blank" rel="noreferrer">gitRawCommits</a> 方法，通过调用 <code>git log</code> 命令来读取仓库的 git 提交信息</p></blockquote><p>@commitlint/config-conventional 是一个预设的规则（基于 Angular）配置文件，其中包括了一些常见的提交类型、范围等基础规则，以及针对这些规则的错误消息。</p><p>在@commitlint 仓库下还有其他一些共享的配置：</p><ul><li><a href="https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-angular" target="_blank" rel="noreferrer">@commitlint/config-angular</a></li><li><a href="https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional" target="_blank" rel="noreferrer">@commitlint/config-conventional</a></li><li><a href="https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-lerna-scopes" target="_blank" rel="noreferrer">@commitlint/config-lerna-scopes</a></li><li><a href="https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-nx-scopes" target="_blank" rel="noreferrer">@commitlint/config-nx-scopes</a></li><li><a href="https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-patternplate" target="_blank" rel="noreferrer">@commitlint/config-patternplate</a></li><li><a href="https://github.com/erikmueller/conventional-changelog-lint-config-atom" target="_blank" rel="noreferrer">conventional-changelog-lint-config-atom</a></li><li><a href="https://github.com/gajus/conventional-changelog-lint-config-canonical" target="_blank" rel="noreferrer">conventional-changelog-lint-config-canonical</a></li><li><a href="https://github.com/Gherciu/commitlint-jira" target="_blank" rel="noreferrer">commitlint-config-jira</a></li></ul><h2 id="简单用法" tabindex="-1">简单用法 <a class="header-anchor" href="#简单用法" aria-label="Permalink to &quot;简单用法&quot;">​</a></h2><p>命令行创建</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">echo &quot;module.exports = {extends: [&#39;@commitlint/config-conventional&#39;]}&quot; &gt; commitlint.config.js</span></span></code></pre></div><p>或者手动在项目根目录下创建 <code>commitlint.config.cjs</code> 内容如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@commitlint/config-conventional</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>这样就完成了配置，表示在项目中使用 @commitlint/config-conventional 提供的配置作为提交消息的模板。</p><p>为了能正常触发 commitlint 对提交消息进行检查，一般会与 husky 共同使用，在 commit-msg 这个 git hook 时触发 @commitlint/cli 对提交的消息进行校验。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npx husky add .husky/commit-msg  &#39;npx --no -- commitlint --edit &quot;$1&quot;&#39;</span></span></code></pre></div><p>或者在 ./husky/ 目录下创建 commit-msg 文件，内容如下</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#BABED8;">. </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$(dirname -- </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">$0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">)/_/husky.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">npx --no -- commitlint --edit </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$1</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><p>到此就完成了配置，在执行 <code>git commit -m &quot;xxx&quot;</code> 操作时，就会触发对消息的检查，符合 @commitlint/config-conventional 预设的规范时才会被提交，不符合时，中终提交，并根据格式中的问题返回预设中配置的报错信息。</p><blockquote><p>通过这个命令，可以在控制台测试一下配置是否正常：<code>echo &#39;refactor:remove old files, add dev files&#39; | npx commitlint -V </code></p></blockquote><p><em>提交示例</em></p><p><img src="`+o+`" alt="image-20230727133154379"></p><h2 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h2><p>从官网以及仓库中的预设，可以看出 commitlint.config.cjs 的完整配置如下</p><h3 id="extends" tabindex="-1">extends <a class="header-anchor" href="#extends" aria-label="Permalink to &quot;extends&quot;">​</a></h3><p>继承一个或多个预设规则，例如 @commitlint/config-conventional，也可以指定自定义配置文件路径：</p><ul><li>可以是以 commitlint-config- 为前缀的依赖包，如：commitlint-config-lerna</li><li>作用域包，直接写命名，如：@commitlint/config-conventional</li><li>本地配置文件地址：<code>&#39;./commitlint.base.js&#39;</code></li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lerna</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// prefixed with commitlint-config-*,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@commitlint/config-conventional</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// scoped packages are not prefixed</span></span>
<span class="line"><span style="color:#BABED8;">    ]</span></span>
<span class="line"><span style="color:#89DDFF;">  	</span><span style="color:#676E95;font-style:italic;">// 本地配置</span></span>
<span class="line"><span style="color:#BABED8;">  	extends: [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./commitlint.base.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./commitlint.types.js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>在每个预设配置里，都配置了关键的配置项，比如 parserPreset、rules、prompt这些选项。</p><br><h3 id="parserpreset-⬇️-❓" tabindex="-1">parserPreset ⬇️ ❓ <a class="header-anchor" href="#parserpreset-⬇️-❓" aria-label="Permalink to &quot;parserPreset ⬇️ ❓&quot;">​</a></h3><p>指定解析器预设，以便正确地解析和分析提交消息，可以使用 commitlint 内置的，也可以是一个自定义的解析器预设。</p><p>每种提交规范所使用的消息格式有所不同，所以需要对应的解析器对消息内容按模板进行解析，才能对消息进行检查。在每个解析器预设的下的 templates 目录里，有几个 <code>.hbs</code> 格式的文件，就是该种规范所对应的格式模板。</p><blockquote><p>.hbs 文件是一种使用 Handlebars 模板引擎语法编写的模板文件，通常用于网页开发中生成动态 HTML 页面。</p><p>Handlebars 是一个基于 Mustache 模板（Vue 也使用了该语法）语言的扩展，它允许开发者在静态 HTML 页面中嵌入动态内容。</p></blockquote><p>像上面用到的 @commitlint/config-conventional 预设配置中，其中指定的解析器预设是 <a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-conventionalcommits/README.md" target="_blank" rel="noreferrer">conventional-changelog-conventionalcommits</a>，这是 commitlint 内置的一个份配置，是前面说到的约定式提交规范 <a href="https://www.conventionalcommits.org/zh-hans/v1.0.0/" target="_blank" rel="noreferrer">Conventional Commits</a> 的具体实现。</p><p>Commitlint 内置了多种解析器预设，在源码仓库的 <code>/packages</code> 目录下，可以根据不同的提交信息格式规范进行选择。还有一些 parserPreset：</p><ul><li><a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/README.md" target="_blank" rel="noreferrer">conventional-changelog-angular</a>：</li><li><a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-atom/README.md" target="_blank" rel="noreferrer">conventional-changelog-atom</a>：</li><li><a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-eslint/README.md" target="_blank" rel="noreferrer">conventional-changelog-eslint</a>：</li><li><a href="https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-express/README.md" target="_blank" rel="noreferrer">conventional-changelog-express</a>：</li></ul><br><h3 id="rules" tabindex="-1">rules <a class="header-anchor" href="#rules" aria-label="Permalink to &quot;rules&quot;">​</a></h3><p>设置具体规则，例如提交消息的长度、格式、类型等，格式为：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 数组</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rule-name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">: [Level</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Applicable</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Value]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 返回数组的函数</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rule-name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">: </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> [Level</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Applicable</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Value]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// async 风格</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rule-name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">: </span><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> [Level</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Applicable</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Value]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// Promise 风格</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rule-name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">: </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">resolve</span><span style="color:#BABED8;">([Level</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Applicable</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">Value])</span></span></code></pre></div><ul><li>rule-name：规则名称，需要遵循预设的规则，获取所有规则名称可以查看<a href="https://commitlint.js.org/#/reference-rules?id=available-rules" target="_blank" rel="noreferrer">官网</a></li><li>Level：0-禁用，1-警告，2-错误</li><li>Applicable：<code>always</code> - 正匹配， <code>never</code> - 反匹配，类似&quot;取反&quot;</li><li>Value：用于此规则的值，可以为<code>number/string/array</code>等类型</li></ul><p>例如：<code>&quot;body-full-stop&quot;: [0,&#39;never&#39;,&#39;.&#39;]</code>，表示的意思是：提交的<code>commit message</code>不能以字符<code>.</code>结尾</p><p>每个预设规范中都有一些共同的基础规则，例如 <code>type-case</code>、<code>subject-max-length</code>等。同时，不同的预设规范也可能具有一些独有的规则，用于满足特定的项目需求。</p><p>这里比较重要的规则是 <code>type-enum</code>，它定义了可以提交哪些类型，默认值有 <code>[&#39;feat&#39;, &#39;fix&#39;, &#39;docs&#39;, &#39;style&#39;, &#39;refactor&#39;, &#39;test&#39;, &#39;revert&#39;]</code> 这 7 种，在 @commitlint/config-conventional 这份配置中，定义如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">type-enum</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">: [</span></span>
<span class="line"><span style="color:#BABED8;">			</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">			</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">always</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">			[</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">build</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">chore</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ci</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">docs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">feat</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">fix</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">perf</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">refactor</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">revert</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">style</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">				</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">			]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">		]</span><span style="color:#89DDFF;">,</span></span></code></pre></div><p>根据这个规则配置，可以当前 commitlint 允许提交哪些类型</p><br><h3 id="prompt" tabindex="-1">prompt <a class="header-anchor" href="#prompt" aria-label="Permalink to &quot;prompt&quot;">​</a></h3><p>提示用户输入自定义提交消息</p><h3 id="formatter-⬇️-❓" tabindex="-1">formatter ⬇️ ❓ <a class="header-anchor" href="#formatter-⬇️-❓" aria-label="Permalink to &quot;formatter ⬇️ ❓&quot;">​</a></h3><p>指定错误消息格式化程序，可以是 &#39;@commitlint/format-xxx&#39;，也可以是一个自定义的格式化程序</p><h3 id="ignores" tabindex="-1">ignores <a class="header-anchor" href="#ignores" aria-label="Permalink to &quot;ignores&quot;">​</a></h3><p>忽略检查的文件路径或者正则表达式；</p><h3 id="defaultignores" tabindex="-1">defaultIgnores <a class="header-anchor" href="#defaultignores" aria-label="Permalink to &quot;defaultIgnores&quot;">​</a></h3><p>是否默认忽略某些文件，例如 node_modules 等</p><h3 id="helpurl" tabindex="-1">helpUrl <a class="header-anchor" href="#helpurl" aria-label="Permalink to &quot;helpUrl&quot;">​</a></h3>`,64),p=[t];function c(r,i,D,m,y,g){return n(),a("div",null,p)}const d=s(e,[["render",c]]);export{F as __pageData,d as default};