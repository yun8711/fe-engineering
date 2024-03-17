import{_ as s,v as a,b as n,R as l}from"./chunks/framework.8277b2e6.js";const d=JSON.parse('{"title":"Guard 守卫","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"nest/core/guard.md","filePath":"nest/core/guard.md","lastUpdated":1710644343000}'),o={name:"nest/core/guard.md"},p=l(`<h1 id="guard-守卫" tabindex="-1">Guard 守卫 <a class="header-anchor" href="#guard-守卫" aria-label="Permalink to &quot;Guard 守卫&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>守卫有一个单独的责任：根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。这通常称为授权。</p><p>另一方面，守卫可以访问 <code>ExecutionContext</code> 实例，因此确切地知道接下来要执行什么。</p><p><strong>执行时机</strong>：守卫在每个中间件之后，任何拦截器或管道之前执行</p><p>守卫应该实现 <code>CanActivate</code> 接口</p><h3 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h3><p>日志系统、cors跨域处理、图片防盗等</p><h3 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-label="Permalink to &quot;分类&quot;">​</a></h3><p>按照编写形式，可分为：类中间件，函数中间件</p><p>按照作用范围，可分为：全局中间件，局部中间件</p><h2 id="定义中间件" tabindex="-1">定义中间件 <a class="header-anchor" href="#定义中间件" aria-label="Permalink to &quot;定义中间件&quot;">​</a></h2><h3 id="类中间件" tabindex="-1">类中间件 <a class="header-anchor" href="#类中间件" aria-label="Permalink to &quot;类中间件&quot;">​</a></h3><p>使用<code>@Injectable()</code>装饰器，必须实现<code>NestMiddleware</code>接口，即重写 use 方法，该方法有三个参数：</p><ul><li>req：请求对象</li><li>res：响应对象</li><li>next：一个函数，在实现逻辑中，最后必须执行 <code>next()</code>，否则会阻塞请求</li></ul><p>下面以日志中间件为例</p><blockquote><p>使用 <code>nest g mi logger</code>方式自动创建的中间件，会默认放在 src 目录下</p></blockquote><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Injectable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">NestMiddleware</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Request</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Response</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Injectable</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">LoggerMiddleware</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">NestMiddleware</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">use</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">req</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Request</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">res</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Response</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">next</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">method</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">path</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">req</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Request...</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">method</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">path</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="函数中间件" tabindex="-1">函数中间件 <a class="header-anchor" href="#函数中间件" aria-label="Permalink to &quot;函数中间件&quot;">​</a></h3><p><code>LoggerMiddleware</code> 类非常简单，没有成员、额外的方法、依赖关系，所以可以转换为函数中间件。</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">logger</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">req</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">res</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">next</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Request...</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">next</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h2 id="使用中间件" tabindex="-1">使用中间件 <a class="header-anchor" href="#使用中间件" aria-label="Permalink to &quot;使用中间件&quot;">​</a></h2><h3 id="局部使用" tabindex="-1">局部使用 <a class="header-anchor" href="#局部使用" aria-label="Permalink to &quot;局部使用&quot;">​</a></h3><p>中间件创建完成后，需要在模块中进行挂载，但是 <code>@Module()</code> 装饰器没有中间件的相关配置，必须让<code>module</code>类实现<code>NestModule</code>接口，实现 <code>configure()</code> 方法来挂载。</p><p><em>以日志中间件为例，把它应用在 User 模块中时，<code>user.module.ts</code>中内容如下：</em></p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Module</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">NestModule</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">MiddlewareConsumer</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;">RequestMethod</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">UserService</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./user.service</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">UserController</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./user.controller</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">LoggerMiddleware</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./common/middleware/logger.middleware</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [UserController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [UserService]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">UserModule</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">NestModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">configure</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">consumer</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">MiddlewareConsumer</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">consumer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">LoggerMiddleware</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exclude</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">hello</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;">method</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;">RequestMethod</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">GET</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">// 排除的路径及方法</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forRoutes</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 要应用的路由，这里表示所有路径，相当于全局使用</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="middlewareconsumer" tabindex="-1">MiddlewareConsumer <a class="header-anchor" href="#middlewareconsumer" aria-label="Permalink to &quot;MiddlewareConsumer&quot;">​</a></h3><p><code>MiddlewareConsumer</code>是一个帮助类，提供了几种内置方法来管理中间件，可以链式调用。</p><ul><li><code>apply()</code> ：表示挂载哪个中间件，可以指定单个中间件或多个中间件</li><li><code>exclude()</code> 方法用来排除某些路由，可以是一或多个字符串（<code>&#39;cats/(.*)&#39;</code>）、一个 <code>RouteInfo</code> 对象（<code>{path: &#39;cats&#39;, method: RequestMethod.GET}</code>）来标识不应用中间件的路由</li><li><code>forRoutes()</code> ：表示作用范围，可接受一或多个字符串、对象、一或多个控制器类</li></ul><p><strong>路由通配符</strong></p><p>路由同样支持模式匹配。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">forRoutes</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">ab*cd</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">method</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> RequestMethod</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">ALL </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>以上路由地址将匹配 <code>abcd</code> 、 <code>ab_cd</code> 、 <code>abecd</code> 等。字符 <code>?</code> 、 <code>+</code> 、 <code>*</code> 以及 <code>()</code> 是它们的正则表达式对应项的子集。连字符 (<code>-</code>) 和点 (<code>.</code>) 按字符串路径解析。</p><p><strong>多个中间件</strong></p><p>为了绑定顺序执行的多个中间件，可以在 <code>apply()</code> 方法内用逗号分隔它们。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">consumer</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#82AAFF;">cors</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">helmet</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> logger)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forRoutes</span><span style="color:#BABED8;">(CatsController)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h3 id="全局使用" tabindex="-1">全局使用 <a class="header-anchor" href="#全局使用" aria-label="Permalink to &quot;全局使用&quot;">​</a></h3><p>如果想一次性将中间件绑定到每个路由，可以使用由<code>INestApplication</code>实例提供的 <code>use()</code>方法：</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// main.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">LoggerMiddleware</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./common/middleware/logger.middleware</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#BABED8;"> NestFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#BABED8;">(AppModule)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#BABED8;">(LoggerMiddleware)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#BABED8;"> app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p><code>app.use()</code> 方法的参数可以是一个函数，也可以是一个实现了 NestMiddleware 接口的中间件类的实例</p><blockquote><p>使用时发现全局使用中间件时，只能使用函数</p></blockquote>`,41),e=[p];function t(c,r,y,D,F,i){return a(),n("div",null,e)}const A=s(o,[["render",t]]);export{d as __pageData,A as default};