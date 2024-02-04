import{_ as s,v as a,b as l,R as n}from"./chunks/framework.8277b2e6.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"pkgs/prismjs.md","filePath":"pkgs/prismjs.md","lastUpdated":1707047648000}'),o={name:"pkgs/prismjs.md"},p=n(`<h1>prismjs</h1><p>v1.29.0</p><p><a href="https://prismjs.com/" target="_blank" rel="noreferrer">官网</a> | <a href="https://www.npmjs.com/package/prismjs" target="_blank" rel="noreferrer">npm</a> | <a href="https://github.com/PrismJS/prism" target="_blank" rel="noreferrer">github</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>一个轻量级、强大且优雅的语法高亮库，是Dabblet的一个衍生项目。</p><br><h3 id="优点" tabindex="-1">优点 <a class="header-anchor" href="#优点" aria-label="Permalink to &quot;优点&quot;">​</a></h3><ul><li>轻量：核心代码压缩后只有 1.5KB，每种语言支持增加约 0.3～0.5KB，主题大约 1KB</li><li>扩展性好：支持通过插件机制来添加新语言支持，或者扩展现有语言</li><li>兼容性好：所有样式都是通过 CSS 完成的，使用<a href="https://prismjs.com/faq.html#how-do-i-know-which-tokens-i-can-style-for" target="_blank" rel="noreferrer">合理的类名</a>，支持：Edge、IE11、Firefox、Chrome、Safari、<a href="https://prismjs.com/faq.html#this-page-doesnt-work-in-opera" target="_blank" rel="noreferrer">Opera</a>、大多数移动浏览器</li><li>语言定义可继承：多个具有相同语言的代码片段，只需定义一次即可</li><li>使用简单：导入 prism.css 和 prism.js，然后使用标签<code>code.language-xxx</code>即可</li><li>速度快：支持Web Workers 特性</li><li>当前支持 297 种语言</li></ul><br><h3 id="限制" tabindex="-1">限制 <a class="header-anchor" href="#限制" aria-label="Permalink to &quot;限制&quot;">​</a></h3><ul><li>基于正则表达式进行语法高亮显示，会在某些边缘情况下失败，<a href="https://prismjs.com/known-failures.html" target="_blank" rel="noreferrer">查看已知故障</a></li><li>不支持 IE 6-10</li><li>代码中任何预先存在的 HTML 都将被删除，<a href="https://prismjs.com/faq.html#if-pre-existing-html-is-stripped-off-how-can-i-highlight" target="_blank" rel="noreferrer">查看解决方案</a></li><li>一些主题在某些布局下存在问题，<a href="https://prismjs.com/known-failures.html#themes" target="_blank" rel="noreferrer">此处</a>记录了已知案例</li></ul><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><h3 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h3><p>引入 Prism 的 CSS 和 JS 文件</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;!</span><span style="color:#F07178;">DOCTYPE</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">link</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">themes/prism.css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">rel</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">stylesheet</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">head</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">    &lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prism.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>将要高亮的代码按照如下的格式组织（ <code>&lt;pre&gt;</code> 标签内嵌套 <code>&lt;code&gt;</code> 标签）：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">pre</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">code</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">language-css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    p { color: red }</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">code</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">pre</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>这样代码就会被自动高亮</p><p>如果不想自动高亮，如下，给引用代码的 <code>script</code> 标签加上 <code>data-manual</code> 属性</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">prism.js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">data-manual</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>然后手动调用 api，这种用法应用的场景：页面上手动书写代码让其及时高亮预览</p><h3 id="与-webpack-一起使用" tabindex="-1">与 webpack 一起使用 <a class="header-anchor" href="#与-webpack-一起使用" aria-label="Permalink to &quot;与 webpack 一起使用&quot;">​</a></h3><p>安装依赖：<code>pnpm add prismjs</code></p><p>为了便于仅使用所需的语言和插件配置 Prism 实例，推荐使用 babel 插件 <a href="https://www.npmjs.com/package/babel-plugin-prismjs" target="_blank" rel="noreferrer">babel-plugin-prismjs</a>，实现按需加载语言和插件</p><h3 id="在-nodejs-中使用" tabindex="-1">在 nodejs 中使用 <a class="header-anchor" href="#在-nodejs-中使用" aria-label="Permalink to &quot;在 nodejs 中使用&quot;">​</a></h3><p>1、先导入依赖和语言加载器</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> prism </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">prismjs</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 导入语言加载器，可选</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> loadLanguages </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">prismjs/components</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>2、声明要加载的语言支持</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">loadLanguages</span><span style="color:#BABED8;">([</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">markup</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">javascript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">])</span></span></code></pre></div><p>loadLanguages将自动处理任何所需的依赖语言包</p><p>prismjs 默认会加载： <code>markup</code>、<code>css</code>、<code>clike</code> 、<code>javascript</code>，可以按需加载其他语言，<a href="https://prismjs.com/#supported-languages" target="_blank" rel="noreferrer">支持的语言列表</a></p><p>3、调用 API 处理源码</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">= [&#39;hi&#39;, &#39;there&#39;, &#39;reader!&#39;].join &quot; &quot;</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> html </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> prism</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">highlight</span><span style="color:#BABED8;">(code</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> prism</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">languages</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">haml</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">haml</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="api" tabindex="-1"><a href="https://prismjs.com/docs/index.html" target="_blank" rel="noreferrer">API</a> <a class="header-anchor" href="#api" aria-label="Permalink to &quot;[API](https://prismjs.com/docs/index.html)&quot;">​</a></h2><h3 id="highlight" tabindex="-1">highlight <a class="header-anchor" href="#highlight" aria-label="Permalink to &quot;highlight&quot;">​</a></h3><p>接受文本字符串作为输入和要使用的语言定义，并返回一个生成的 HTML 字符串</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">highlight</span><span style="color:#BABED8;">(text</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> grammar</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> language)</span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;">string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 示例</span></span>
<span class="line"><span style="color:#BABED8;">Prism</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">highlight</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">var foo = true;</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> Prism</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">languages</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">javascript</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">javascript</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><ul><li>text：代码字符串</li><li>grammar：语法，通常为语言定义，如 <code>Prism.languages.markup</code></li><li>language：string，传递给 grammar 的语言定义的名称</li></ul><h3 id="highlightelement" tabindex="-1">highlightElement <a class="header-anchor" href="#highlightelement" aria-label="Permalink to &quot;highlightElement&quot;">​</a></h3><p>高亮显示单个元素中的代码</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">highlightElement（element， async， callback）</span></span></code></pre></div><ul><li>element：包含代码的元素，必须有一个要处理的合法的 <code>language-xxxx</code> 类</li><li>async： 默认 false，是否使用 Web Worker来提升性能，可以避免大量代码时阻塞 UI</li><li>callback：可选，回调函数，当 async 为 true 时最有用</li></ul><h3 id="highlightallunder" tabindex="-1">highlightAllUnder <a class="header-anchor" href="#highlightallunder" aria-label="Permalink to &quot;highlightAllUnder&quot;">​</a></h3><p>获取具有 <code>.language-xxxx</code> 类的 <code>container</code> 的所有后代，然后调用 <code>Prism.highlightElement</code> 处理每个后代</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">highlightAllUnder(container, async, callback)</span></span></code></pre></div><ul><li>container：根节点元素，具有 <code>.language-xxxx</code> 类</li><li>async：默认 false，是否使用 Web Worker来提升性能，可以避免大量代码时阻塞 UI</li><li>callback：可选，每个元素处理完成后的回调函数</li></ul><h3 id="tokenize" tabindex="-1">tokenize <a class="header-anchor" href="#tokenize" aria-label="Permalink to &quot;tokenize&quot;">​</a></h3><p>核心功能，也是最底层的功能。它接受文本字符串作为输入和要使用的语言定义，返回一个包含标记化代码的数组。</p><p>当语言定义包含嵌套标记时，将递归调用每个标记的函数，此方法在其他上下文中作为一个解析器也很有用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">tokenize（text， grammar） → { TokenStream}</span></span></code></pre></div><ul><li>text：包含要高亮显示的代码的字符串</li><li>grammar：包含要使用的令牌的对象，通常是一个语言定义，如 <code>Prism.languages.markup</code></li></ul><p>示例</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> code </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">var foo = 0;</span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">let</span><span style="color:#BABED8;"> tokens </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> Prism</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">tokenize</span><span style="color:#BABED8;">(code</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> Prism</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">languages</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">javascript)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">tokens</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#BABED8;">(</span><span style="color:#BABED8;font-style:italic;">token</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#BABED8;">token</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">Prism</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Token</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">token</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">type</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">number</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Found numeric literal: </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">token</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">content</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="highlightall" tabindex="-1">highlightAll <a class="header-anchor" href="#highlightall" aria-label="Permalink to &quot;highlightAll&quot;">​</a></h3><p>最高级的功能，获取 <code>.language-xxxx</code> 类的所有元素，然后调用 <code>Prism.highlightElement</code> 作用于每个元素，相当于 <code>Prism.highlightAllUnder(document, async, callback)</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">highlightAll(async, callback)</span></span></code></pre></div><ul><li>async：默认 false，与 <code>Prism.highlightAllUnder</code> 中的相同，表示是否使用 Web Worker来提升性能</li><li>callback：可选，每个元素处理完成后的回调函数</li></ul>`,57),e=[p];function t(r,c,i,D,F,y){return a(),l("div",null,e)}const g=s(o,[["render",t]]);export{d as __pageData,g as default};