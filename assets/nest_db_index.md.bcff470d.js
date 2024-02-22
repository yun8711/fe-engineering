import{_ as s,v as o,b as a,R as n}from"./chunks/framework.8277b2e6.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"nest/db/index.md","filePath":"nest/db/index.md","lastUpdated":1708623445000}'),l={name:"nest/db/index.md"},p=n(`<h1>Nest</h1><p>v8.0.3</p><p><a href="https://typicode.github.io/husky/" target="_blank" rel="noreferrer">官网</a> | <a href="https://github.com/typicode/husky" target="_blank" rel="noreferrer">github</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Husky是一个非常流行的 Git hook 管理器，它可以让你在代码提交或推送到远程仓库之前运行命令。比如：当我们本地进行git commit或git push等操作前，能够执行 ESLint 检查，如果不通过，就不允许commit 或 push。</p><p>使用Husky，你可以轻松地处理诸如代码格式化、静态分析、单元测试等任务。Husky还支持多种Git钩子，包括pre-commit、commit-msg、pre-push等，使得它可以适应不同的开发场景。</p><br><h3 id="husky解决了什么问题" tabindex="-1">husky解决了什么问题 <a class="header-anchor" href="#husky解决了什么问题" aria-label="Permalink to &quot;husky解决了什么问题&quot;">​</a></h3><p>原生 git hooks 主要的问题是 git 无法跟踪 .git/hooks 下的文件，但是这个问题已经被 git core.hooksPath 解决了，那么新的问题就是，开发者仍然需要手动设置 git core.hooksPath</p><p>husky 在 install 命令中帮助我们设置了 git core.hooksPath，然后在 package.json 的 scripts 中添加 <code>&quot;prepare&quot;: &quot;husky install&quot;</code>，这样每次安装husky的时候就会执行 <code>husky install</code>，来保证设置的 git hooks 可以被触发了。</p><blockquote><p><code>prepare</code>是npm的一个脚本命令，它是在安装和发布npm包时自动执行的一个钩子函数</p><br><p>使用<code>npm install</code>命令安装某个包时，<code>prepare</code>脚本会在包下载之后、安装之前自动执行；而当我们使用<code>npm publish</code>命令发布某个包时，<code>prepare</code>脚本会在打包之前自动执行</p></blockquote><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><p>自动安装、初始化、添加 pre-commit 示例 hook：<code>pnpm dlx husky-init &amp;&amp; pnpm install</code></p><p>手动添加 hook：<code>npx husky add .husky/commit-msg &#39;npx --no -- commitlint --edit &quot;$1&quot;&#39;</code></p><p>卸载：<code>npm uninstall husky &amp;&amp; git config --unset core.hooksPath</code></p><p><strong>注意</strong>：必须使用 <code>pnpm dlx husky-init</code> 这种方式进行初始化，创建项目中的 .husky 目录，不要从其他项目进行复制，否则会出现意外情况，比如在 webstrom 中，编辑器无法识别 git hook，没有 git hook 选项</p><p>更多内容参考<a href="https://typicode.github.io/husky/getting-started.html" target="_blank" rel="noreferrer">官网</a></p><br><h3 id="husky-install" tabindex="-1">husky install <a class="header-anchor" href="#husky-install" aria-label="Permalink to &quot;husky install&quot;">​</a></h3><p>它是解决 git hooks 问题的关键</p><ol><li>第一步：<code>husky install</code> 会在项目根目录下创建<code>.husky</code>以及<code>.husky/_</code>目录（也可以自定义），然后在<code>.husky/_</code>目录下创建<code>husky.sh</code>脚本文件。这个文件的作用就是保证通过husky 创建的脚本能正常运行。</li><li>第二步：<code>husky install</code> 会运行<code>git config core.hooksPath \${path/to/hooks_dir}</code>，这个命令指定git hooks的路径，此时项目下<code>.git/config</code>文件，<code>[core]</code>下会多出一条配置：<code>hooksPath=xxx</code>，当git hooks被某些命令触发时，git会运行<code>core.hooksPath</code>指定的目录下的 git hook。</li></ol><br><h3 id="husky-add" tabindex="-1">husky add <a class="header-anchor" href="#husky-add" aria-label="Permalink to &quot;husky add&quot;">​</a></h3><p>当运行如下命令：<code>npx husky add .husky/pre-commit vue-cli-service lint --fix</code></p><p>.hushky 目录下会新增一个 pre-commit 文件，文件内容为：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#82AAFF;">.</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;$(</span><span style="color:#FFCB6B;">dirname</span><span style="color:#C3E88D;"> -- </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;font-style:italic;">$0</span><span style="color:#89DDFF;">&quot;)</span><span style="color:#C3E88D;">/_/husky.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">vue-cli-service</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">lint</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--fix</span></span></code></pre></div><p>此时成功添加了一个pre-commit的git hook，这个脚本会在运行git commit命令时执行。在脚本第二行，引用了上面所说的<code>.husky.sh</code>文件，也就是说通过husky创建的git hook在被触发时，都会执行这个脚本</p><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p>husky 一般都会配置其他工具一起使用，比如：commitlint、lint-staged，常见的场景有：</p><p>（1）在提交代码前，对修改的代码进行 lint</p><p><em>.husky/pre-commit</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#BABED8;">. </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$(dirname -- </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">$0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">)/_/husky.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">npm run lint:lint-staged</span></span></code></pre></div><p><em>packages.json</em></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lint:lint-staged</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lint-staged</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p><em>lint-staged.config.js</em></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">*.{js,jsx,ts,tsx}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint --fix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">{!(package)*.json,*.code-snippets,.!(browserslist)*rc}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write--parser json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">package.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">*.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint --fix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylelint --fix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">*.{scss,less,styl,html}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylelint --fix</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">*.md</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prettier --write</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><p>（2）在 push 代码前，借助 commitlint 检查提交信息格式</p><p><em>.husky/commit-msg</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/usr/bin/env sh</span></span>
<span class="line"><span style="color:#BABED8;">. </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$(dirname -- </span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">$0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">)/_/husky.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">npx --no-install commitlint --edit $1</span></span></code></pre></div><h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2><p>其他类似的 git hook 工具：</p><ul><li><a href="https://github.com/toplenboren/simple-git-hooks" target="_blank" rel="noreferrer">simple-git-hooks</a>：轻量（0 依赖）、体积小（10.1kB）、配置少的 git hook 工具</li><li><a href="https://github.com/observing/pre-commit" target="_blank" rel="noreferrer">pre-commit</a>：预提交 hook</li></ul>`,42),t=[p];function e(c,r,i,y,D,h){return o(),a("div",null,t)}const d=s(l,[["render",e]]);export{F as __pageData,d as default};
