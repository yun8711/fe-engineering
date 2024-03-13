import{_ as s,v as a,b as n,R as l}from"./chunks/framework.8277b2e6.js";const A=JSON.parse('{"title":"Nest 装饰器","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"nest/basic/decorator.md","filePath":"nest/basic/decorator.md","lastUpdated":1710299060000}'),p={name:"nest/basic/decorator.md"},o=l(`<h1 id="nest-装饰器" tabindex="-1">Nest 装饰器 <a class="header-anchor" href="#nest-装饰器" aria-label="Permalink to &quot;Nest 装饰器&quot;">​</a></h1><h3 id="module-声明模块" tabindex="-1"><code>@Module</code> 声明模块 <a class="header-anchor" href="#module-声明模块" aria-label="Permalink to &quot;\`@Module\` 声明模块&quot;">​</a></h3><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">imports</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [PersonModule]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppService]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><h3 id="controller-声明-controller" tabindex="-1"><code>@Controller</code> 声明 controller <a class="header-anchor" href="#controller-声明-controller" aria-label="Permalink to &quot;\`@Controller\` 声明 controller&quot;">​</a></h3><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="injectable-声明-provider" tabindex="-1"><code>@Injectable</code> 声明 provider <a class="header-anchor" href="#injectable-声明-provider" aria-label="Permalink to &quot;\`@Injectable\` 声明 provider&quot;">​</a></h3><p>这个 provider 可以是任何的 class</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello World!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="inject-基于属性注入" tabindex="-1"><code>@Inject</code> 基于属性注入 <a class="header-anchor" href="#inject-基于属性注入" aria-label="Permalink to &quot;\`@Inject\` 基于属性注入&quot;">​</a></h3><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Inject</span><span style="color:#BABED8;">(AppService) </span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="optional-可选注入" tabindex="-1"><code>@Optional</code> 可选注入 <a class="header-anchor" href="#optional-可选注入" aria-label="Permalink to &quot;\`@Optional\` 可选注入&quot;">​</a></h3><p>用来声明所需要的 provider 是可选的，没有创建对象是不会报错</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Optional</span><span style="color:#BABED8;">() </span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#BABED8;">  </span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Optional</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Inject</span><span style="color:#BABED8;">(AppService)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="global-声明全局模块" tabindex="-1"><code>@Global</code> 声明全局模块 <a class="header-anchor" href="#global-声明全局模块" aria-label="Permalink to &quot;\`@Global\` 声明全局模块&quot;">​</a></h3><p>一般用在 xxx.module.ts 上，声明为全局的模块，它 exports 的 provider，不需要 imports 就可以直接使用</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Global</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">imports</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [PersonModule]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppService]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><h3 id="global-声明全局模块-1" tabindex="-1"><code>@Global</code> 声明全局模块 <a class="header-anchor" href="#global-声明全局模块-1" aria-label="Permalink to &quot;\`@Global\` 声明全局模块&quot;">​</a></h3><p>一般用在 xxx.module.ts 上，声明为全局的模块，它 exports 的 provider，不需要 imports 就可以直接使用</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Global</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">imports</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [PersonModule]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppService]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span></code></pre></div><h3 id="catch-指定处理的异常" tabindex="-1"><code>@Catch</code> 指定处理的异常 <a class="header-anchor" href="#catch-指定处理的异常" aria-label="Permalink to &quot;\`@Catch\` 指定处理的异常&quot;">​</a></h3><p>作用在过滤器上，参数就是要处理的异常类型</p>`,21),e=[o];function t(c,r,y,D,i,F){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};