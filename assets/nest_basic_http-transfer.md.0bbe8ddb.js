import{_ as s,v as n,b as a,R as l}from"./chunks/framework.8277b2e6.js";const p="/fe-engineering/assets/http_transfer_1.7f380ae4.webp",o="/fe-engineering/assets/http_transfer_2.0de94b9a.webp",d=JSON.parse('{"title":"HTTP 数据传输（接口参数）","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"nest/basic/http-transfer.md","filePath":"nest/basic/http-transfer.md","lastUpdated":1710309574000}'),e={name:"nest/basic/http-transfer.md"},t=l(`<h1 id="http-数据传输-接口参数" tabindex="-1">HTTP 数据传输（接口参数） <a class="header-anchor" href="#http-数据传输-接口参数" aria-label="Permalink to &quot;HTTP 数据传输（接口参数）&quot;">​</a></h1><h2 id="url-param-路径参数" tabindex="-1">url param 路径参数 <a class="header-anchor" href="#url-param-路径参数" aria-label="Permalink to &quot;url param 路径参数&quot;">​</a></h2><p>如：<code>http://guang.zxg/person/1111</code></p><p>nest 实现</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// src/person/person.controller.ts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PersonController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">:id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">urlParam</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Param</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">) </span><span style="color:#BABED8;font-style:italic;">id</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">received: id=</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">id</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>前端请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">urlParam</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/person/1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">res</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;">            </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="query-参数" tabindex="-1">query 参数 <a class="header-anchor" href="#query-参数" aria-label="Permalink to &quot;query 参数&quot;">​</a></h2><p>如：<code>http://guang.zxg/person?name=guang&amp;age=20</code>，name 和 age 就是参数</p><p>非英文的字符和一些特殊字符要经过编码，可以使用 encodeURIComponent 的 api 来编码：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> query </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">?name=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">encodeURIComponent</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">) </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">&amp;age=20</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ?name=%E5%85%89&amp;age=20</span></span></code></pre></div><p>或者使用封装了一层的 query-string 库来处理</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> queryString </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">require</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">query-string</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">queryString</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ?name=%E5%85%89&amp;age=20</span></span></code></pre></div><p>nest 实现</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PersonController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">find</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">query</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Query</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">) </span><span style="color:#BABED8;font-style:italic;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Query</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">age</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">) </span><span style="color:#BABED8;font-style:italic;">age</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">received: name=</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">name</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,age=</span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">age</span><span style="color:#89DDFF;">}\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>前端请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">query</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/person/find</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		params</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">			name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">			age</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">res</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;">            </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="form-urlencoded-表单参数" tabindex="-1">form-urlencoded 表单参数 <a class="header-anchor" href="#form-urlencoded-表单参数" aria-label="Permalink to &quot;form-urlencoded 表单参数&quot;">​</a></h2><p>直接用 form 表单提交数据，和 query 字符串的方式的区别只是放在了 body 里，并且需要指定 <code>content-type :application/x-www-form-urlencoded</code></p><p><img src="`+p+`" alt="nest_http_transfer_1"></p><p>它的内容也是 query 字符串，所以也要对参数进行编码处理</p><p>nest 实现，使用 @Body 装饰器，Nest 会解析请求体，然后注入到 dto 中</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CreatePersonDto</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dto/create-person.dto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PersonController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Post</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Body</span><span style="color:#BABED8;">() </span><span style="color:#BABED8;font-style:italic;">createPersonDto</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CreatePersonDto</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">received: </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#BABED8;">(createPersonDto)</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>前端请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">formUrlEncoded</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Qs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    age</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    headers</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">content-type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">application/x-www-form-urlencoded</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">res</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="form-data" tabindex="-1">form-data <a class="header-anchor" href="#form-data" aria-label="Permalink to &quot;form-data&quot;">​</a></h2><p>指定 content type 为 <code>multipart/form-data</code>，数据是用 <code>--------- + 一串数字</code>做为 boundary 分隔符，不需要 url encode</p><p><img src="`+o+`" alt="nest_http_transfer_2"></p><p>Nest 解析 form data 使用 FilesInterceptor 的拦截器，用 @UseInterceptors 装饰器启用，然后通过 @UploadedFiles 来获取非文件的内容，同样是通过 @Body 来取</p><p>安装 <code>npm i -D @types/multer</code>提供类型声明</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">AnyFilesInterceptor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@nestjs/platform-express</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CreatePersonDto</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./dto/create-person.dto</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PersonController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Post</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">file</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(</span><span style="color:#82AAFF;">AnyFilesInterceptor</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">dest</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uploads/</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">))</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">body2</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Body</span><span style="color:#BABED8;">() </span><span style="color:#BABED8;font-style:italic;">createPersonDto</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CreatePersonDto</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UploadedFiles</span><span style="color:#BABED8;">() </span><span style="color:#BABED8;font-style:italic;">files</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Array</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Express</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">Multer</span><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">File</span><span style="color:#89DDFF;">&gt;)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">files</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">received: </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#BABED8;">(createPersonDto)</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>前端请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">fileInput</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">file</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">multiple</span><span style="color:#89DDFF;">/&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">const fileInput = document.querySelector(&#39;#fileInput&#39;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">async function formData() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  const data </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">FormData</span><span style="color:#BABED8;">();</span></span>
<span class="line"><span style="color:#BABED8;">  data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">);</span></span>
<span class="line"><span style="color:#BABED8;">  data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">age</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">20</span><span style="color:#BABED8;">);</span></span>
<span class="line"><span style="color:#BABED8;">  data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">file1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> fileInput</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">files[</span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;">]);</span></span>
<span class="line"><span style="color:#BABED8;">  data</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">set</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">file2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> fileInput</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">files[</span><span style="color:#F78C6C;">1</span><span style="color:#BABED8;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  const res </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#BABED8;"> axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/person/file</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> data</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">content-type</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">multipart/form-data</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">);</span></span>
<span class="line"><span style="color:#BABED8;">  console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(res);</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">fileInput.onchange = formData;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="json" tabindex="-1">json <a class="header-anchor" href="#json" aria-label="Permalink to &quot;json&quot;">​</a></h2><p>指定<code>content type: application/json</code>，是 http 请求中最常见的</p><p>nest 实现，使用 @Body 来接收，Nest 内部会根据 content type 区分不同的解析方式</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">PersonController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Post</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">(@</span><span style="color:#82AAFF;">Body</span><span style="color:#BABED8;">() </span><span style="color:#BABED8;font-style:italic;">createPersonDto</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CreatePersonDto</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">received: </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">JSON</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#BABED8;">(createPersonDto)</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>前端请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">json</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">axios</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/person</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    name</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">光</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    age</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">res</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div>`,39),c=[t];function r(y,D,F,B,i,A){return n(),a("div",null,c)}const C=s(e,[["render",r]]);export{d as __pageData,C as default};