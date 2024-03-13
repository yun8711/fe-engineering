import{_ as s,v as a,b as n,R as l}from"./chunks/framework.8277b2e6.js";const p="/fe-engineering/assets/ts-error-1259.fec0cef9.png",E=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false},"headers":[],"relativePath":"docs/typescript/error-code.md","filePath":"docs/typescript/error-code.md","lastUpdated":1710299060000}'),o={name:"docs/typescript/error-code.md"},e=l('<h1>TypeScript错误码</h1><p>v5.2（2023.08.26）</p><p><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">官网</a> | <a href="https://github.com/microsoft/TypeScript" target="_blank" rel="noreferrer">github</a> | <a href="https://typescript.bootcss.com/" target="_blank" rel="noreferrer">中文网</a> | <a href="http://www.patrickzhong.com/TypeScript/" target="_blank" rel="noreferrer">《TypeScript 入门与实战》</a></p><p><a href="https://blog.csdn.net/u010785091/article/details/103123696/" target="_blank" rel="noreferrer">https://blog.csdn.net/u010785091/article/details/103123696/</a></p><h4 id="ts1259" tabindex="-1">TS1259 <a class="header-anchor" href="#ts1259" aria-label="Permalink to &quot;TS1259&quot;">​</a></h4><p><img src="'+p+`" alt="ts-error-1259"></p><h4 id="ts7053" tabindex="-1">TS7053 <a class="header-anchor" href="#ts7053" aria-label="Permalink to &quot;TS7053&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> chalk </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">chalk</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> chalkPrint </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">chalk</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">msg</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">color</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">greenBright</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">chalk</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">color</span><span style="color:#F07178;">](</span><span style="color:#BABED8;">msg</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>错误信息</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">TS7053: Element implicitly has an  any  type because expression of type  string  can&#39;t be used to index type  ChalkInstance </span></span>
<span class="line"><span style="color:#babed8;">No index signature with a parameter of type  string  was found on type  ChalkInstance</span></span></code></pre></div><p>意思是：元素隐式具有 “any” 类型，因为string类型的表达式不能用于索引ChalkInstance类型；在ChalkInstance类型上没有找到string类型参数的索引签名</p><p>解决方案：</p><p>（1）修改 tsconfig.json 配置</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;suppressImplicitAnyIndexErrors&quot;: true,</span></span></code></pre></div><p>（2）写一个函数转类型</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">isValidKey</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">key</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">symbol</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">object</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">):</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">key</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">is</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">keyof</span><span style="color:#BABED8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">typeof</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">object</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">key</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">in</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">object</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#BABED8;"> (</span><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> key </span><span style="color:#89DDFF;">in</span><span style="color:#BABED8;"> obejct) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">isValidKey</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">obejct</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;font-style:italic;">// 处理...</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#BABED8;">obejct</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">....</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>（3）定义一个 string 作为 key 的类型</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> modules</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Record</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">object</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> files </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> require</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">context</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./modules</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">/</span><span style="color:#BABED8;">\\.</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;font-style:italic;">$</span><span style="color:#89DDFF;">/</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">files</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">key</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">modules</span><span style="color:#F07178;">[</span><span style="color:#BABED8;">key</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replace</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">/(</span><span style="color:#C3E88D;">modules</span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;">\\/</span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;">\\.</span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">)/</span><span style="color:#F78C6C;">g</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#F07178;">)] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">...</span><span style="color:#82AAFF;">files</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">key</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">default</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    namespaced</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> store </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">createStore</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> modules </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div>`,18),t=[e];function c(r,y,D,F,i,B){return a(),n("div",null,t)}const d=s(o,[["render",c]]);export{E as __pageData,d as default};