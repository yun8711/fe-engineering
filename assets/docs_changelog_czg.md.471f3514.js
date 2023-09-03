import{_ as s,v as n,b as a,R as o}from"./chunks/framework.8277b2e6.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"docs/changelog/czg.md","filePath":"docs/changelog/czg.md","lastUpdated":1693758295000}'),l={name:"docs/changelog/czg.md"},p=o(`<h1>czg</h1><p>v1.7.0</p><p><a href="https://cz-git.qbb.sh/zh/cli/" target="_blank" rel="noreferrer">czg官网</a> | <a href="https://github.com/Zhengqbbb/cz-git" target="_blank" rel="noreferrer">cz-git - github</a></p><br><p>尽管使用 Commitlint 可以对 Git 提交信息进行检查，但它的只能在我们 git commit 的时候才能触发，对于刚刚参与到项目，或者不熟悉 commitlint 的开发者来说，面对提交时有点迷茫，所以提供友好的提示可以帮助开发者熟悉这个流程。</p><h2 id="commitizen" tabindex="-1">Commitizen <a class="header-anchor" href="#commitizen" aria-label="Permalink to &quot;Commitizen&quot;">​</a></h2><p>commitizen 是一个命令行交互式的 git commit 替代工具，可以让你不再手动输入 commit 类型。</p><p>注意：Commitizen 是另一个团队的仓库，他们也提供了与 conventional-changelog 团队类似的工具链，但与 conventional-changelog 没有直接的关系，只是习惯这么去搭配使用。</p><p>长期以来 Commitizen 都是项目中进行 commitlint 提示的首选，但是现在<strong>推荐使用 czg</strong>。</p><h2 id="czg" tabindex="-1">czg <a class="header-anchor" href="#czg" aria-label="Permalink to &quot;czg&quot;">​</a></h2><p>关于 czg 的介绍，可以查看中文官网，内容很详细。这里要区别两个工具：</p><p><a href="https://cz-git.qbb.sh/zh/guide/introduction" target="_blank" rel="noreferrer">cz-git</a> : 一款轻量级，交互友好，高度自定义，遵循标准 Angular commit 规范的 Commitizen Adapter</p><blockquote><p>就是与 commitizen 进行兼容的适配器，这种情况下需要全局安装 commitizen</p></blockquote><p><a href="https://cz-git.qbb.sh/zh/cli/" target="_blank" rel="noreferrer">czg</a> : 可以理解为是一款内置了 <code>cz-git</code> 适配器的 <code>Commitizen CLI</code> 替代品</p><blockquote><p>czg 是一个可直接使用的 CLI 工具，也是一般情况下直接在项目使用的调用的命令</p></blockquote><p>在使用 czg 的过程中，感受最好的地方就是完美的兼容性和高度的自定义</p><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><p>官网有详细的用法说明，这里只简要说一下几种方式：</p><h3 id="npx-czg" tabindex="-1">npx czg <a class="header-anchor" href="#npx-czg" aria-label="Permalink to &quot;npx czg&quot;">​</a></h3><p>如果是临时使用，可以直接在项目终端下输入 <code> pnpm dlx czg</code> 或 <code>npx czg</code> 就可以调用起来</p><br><h3 id="cz-git-commitlint-commitizen" tabindex="-1">cz-git + commitlint + commitizen <a class="header-anchor" href="#cz-git-commitlint-commitizen" aria-label="Permalink to &quot;cz-git + commitlint + commitizen&quot;">​</a></h3><p>使用 commitizen 提供的CLI 工具，指定适配器为 cz-git，使用 commitlint 进行最终的校验</p><p>全局安装 commitizen，项目内安装 cz-git</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">pnpm add commitizen -g</span></span>
<span class="line"><span style="color:#babed8;">pnpm add cz-git -D</span></span></code></pre></div><p>在 package.json 中增加 commitizen 配置和脚本</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">commit</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">git-cz</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">config</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">commitizen</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#676E95;font-style:italic;">// 指定适配器</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">path</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node_modules/cz-git</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#676E95;font-style:italic;">// 其他自定义配置</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>不过一般都把自定义配置放在 commitlint.config.js 中，避免 package.json 中内容过多</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/** @type {import(&#39;cz-git&#39;).UserConfig} */</span></span>
<span class="line"><span style="color:#BABED8;">module.exports = </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  rule</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    ...</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  prompt</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    useEmoji</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#676E95;font-style:italic;">//option...</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><br><h3 id="czg-cli-commitlint" tabindex="-1">czg CLI + commitlint <a class="header-anchor" href="#czg-cli-commitlint" aria-label="Permalink to &quot;czg CLI + commitlint&quot;">​</a></h3><p>czg 内置了 cz-git，完全可以用来代替 commitizen，从实际使用来看，这种方式更方便</p><p>全局安装 czg，使用方式也是在当前项目下调用 czg</p><p>在 commitlint.config.js 中添加 czg 的配置即可。</p>`,34),t=[p];function e(c,i,r,m,D,g){return n(),a("div",null,t)}const d=s(l,[["render",e]]);export{F as __pageData,d as default};
