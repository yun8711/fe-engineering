import{_ as s,v as a,b as l,R as n}from"./chunks/framework.8277b2e6.js";const h=JSON.parse('{"title":"文本格式","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"general/text-format.md","filePath":"general/text-format.md","lastUpdated":1710175002000}'),o={name:"general/text-format.md"},p=n(`<h1 id="文本格式" tabindex="-1">文本格式 <a class="header-anchor" href="#文本格式" aria-label="Permalink to &quot;文本格式&quot;">​</a></h1><h2 id="glob-语法" tabindex="-1">Glob 语法 <a class="header-anchor" href="#glob-语法" aria-label="Permalink to &quot;Glob 语法&quot;">​</a></h2><h3 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h3><p>Glob 模式是指 shell 所使用的简化了的正则表达式，是一种常用的文件路径匹配模式语言，可以用来匹配符合特定规则的文件名或路径。Glob 语法通常用在命令行中和一些编程语言中，如 Linux shell、Node.js 等。</p><br><h3 id="不同语言的实现" tabindex="-1">不同语言的实现 <a class="header-anchor" href="#不同语言的实现" aria-label="Permalink to &quot;不同语言的实现&quot;">​</a></h3><p>Glob 只是一种文件路径匹配模式语言，并不是某个特定软件或工具的名称，可能会因为不同的操作系统和环境而存在差异。在各种编程语言中，有很多支持 Glob 语法的库或模块，这些库或模块通常都有自己的官方网站或文档网站。</p><p>以下是几种编程语言中常用的支持 Glob 语法的库或模块：</p><ul><li>Node.js：node-glob 模块，官网：<a href="https://github.com/isaacs/node-glob" target="_blank" rel="noreferrer">https://github.com/isaacs/node-glob</a></li><li>Python：glob 模块，官方文档：<a href="https://docs.python.org/3/library/glob.html" target="_blank" rel="noreferrer">https://docs.python.org/3/library/glob.html</a></li><li>Java：Ant-Style 路径模式，官方文档：<a href="https://ant.apache.org/manual/dirtasks.html#patterns" target="_blank" rel="noreferrer">https://ant.apache.org/manual/dirtasks.html#patterns</a></li><li>Ruby：Dir.glob 方法，官方文档：<a href="https://ruby-doc.org/core-2.7.0/Dir.html#method-c-glob" target="_blank" rel="noreferrer">https://ruby-doc.org/core-2.7.0/Dir.html#method-c-glob</a></li></ul><p>需要注意的是，虽然以上库或模块都支持 Glob 语法，但是在具体使用时可能会因为实现方式等原因存在细微的差异，需要根据具体情况进行调整和修改。</p><br><h3 id="匹配规则" tabindex="-1">匹配规则 <a class="header-anchor" href="#匹配规则" aria-label="Permalink to &quot;匹配规则&quot;">​</a></h3><p>node-glob 模块使用了minimatch 库来进行匹配。主要的匹配规则如下：</p><ul><li><code>*</code>：匹配任意数量的字符（包括0个字符）</li><li><code>**</code>：跨路径匹配任意字符，也就是匹配任意多级路径</li><li><code>?</code>：匹配单个字符</li><li><code>[...]</code>：匹配方括号内的任意一个字符，可以使用连字符 <code>-</code> 表示相邻字符范围，如 <code>[a-z]</code></li><li><code>!(pattern | pattern | pattern)</code>：匹配不符合规则的文件或路径</li><li><code>?(pattern | pattern | pattern)</code>：匹配规则出现0次或1次的文件或路径</li><li><code>+(pattern | pattern | pattern)</code>：匹配规则出现至少1次的文件或路径</li><li><code>*(pattern | pattern | pattern)</code>：匹配规则出现任意次数的文件或路径</li><li><code>@(pattern | pat* | pat?erN)</code>：匹配规则只出现1次的文件或路径</li><li>包含大括号时内里的内容会被展开，如 <code>a{/b/c,xy}</code> 会被展开为 <code>a/b/c</code> 和 <code>a/xy</code></li></ul><table><thead><tr><th>通配符</th><th>描述</th><th>例子</th><th>匹配</th><th>不匹配</th></tr></thead><tbody><tr><td><code>*</code></td><td>匹配任意数量的字符（包括0个字符）</td><td>Law*</td><td>Law<code>, </code>Laws<code>, </code>Lawyer</td><td>GrokLaw<code>, </code>La<code>, </code>aw</td></tr><tr><td><code>**</code></td><td>跨路径匹配任意字符，也就是任意多级路径</td><td></td><td></td><td></td></tr><tr><td><code>？</code></td><td>匹配单个字符</td><td>?at</td><td>Cat<code>, </code>cat<code>, </code>Bat<code>, </code>bat</td><td>at</td></tr><tr><td><code>[...]</code></td><td>匹配方括号内的任意一个字符，可以使用连字符 <code>-</code> 表示相邻字符范围，如 <code>[a-z]</code></td><td>[CB]at</td><td>Cat<code>, </code>Bat</td><td>cat<code>, </code>bat</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></tbody></table><p>例如，<code>*.js</code> 可以匹配当前目录下所有扩展名为 <code>.js</code> 的文件，<code>src/*.js</code> 可以匹配 <code>src</code> 目录下所有扩展名为 <code>.js</code> 的文件，<code>[ab].txt</code> 可以匹配当前目录下以 <code>a.txt</code> 或者 <code>b.txt</code> 命名的文件，<code>!(test)*</code> 可以匹配不以 <code>test</code> 开头的文件或路径等。</p><p>一些其他特性：</p><ul><li>以 # 开头的行被当作注释</li><li>路径是相对于 .xxxignore 的位置或当前工作目录</li><li>以 ! 开头的行是否定模式，它将会重新包含一个之前被忽略的模式</li><li>忽略模式依照 .gitignore 规范</li></ul><h2 id="json" tabindex="-1">JSON <a class="header-anchor" href="#json" aria-label="Permalink to &quot;JSON&quot;">​</a></h2><p>JSON（全称 JavaScript Object Notation，JavaScript 对象表示法）是一种轻量级的数据交换格式，由 Douglas Crockford 在 2001 年首次提出，最初用于解决 JavaScript 语言中对象序列化和反序列化的问题。后来随着 AJAX 技术的流行，JSON 逐渐成为了 Web 应用程序中的常用数据传输格式。</p><p>不同于 XML 这样的标记式语言，JSON 中的数据结构类似于 JavaScript 中的对象或数组，具有良好的可读性和易于理解的特点，同时也比 XML 更加简洁和易于处理。</p><br><h3 id="json-的格式规范" tabindex="-1">JSON 的格式规范 <a class="header-anchor" href="#json-的格式规范" aria-label="Permalink to &quot;JSON 的格式规范&quot;">​</a></h3><p><strong>数据类型</strong></p><p>JSON 支持以下几种基本数据类型：</p><ul><li>字符串（String）</li><li>数字（Number）</li><li>布尔值（Boolean）</li><li>null</li><li>对象（Object）</li><li>数组（Array）</li></ul><p>其中，对象和数组可以嵌套使用，构成复杂的数据结构。</p><br><p><strong>语法要素</strong></p><p>JSON 的语法要素包括以下几个部分：</p><ul><li>名称和值之间使用冒号（:）分隔</li><li>多个名称和值之间使用逗号（,）分隔</li><li>所有的名称（键）必须使用双引号（&quot;）包含</li><li>所有的字符串值必须使用双引号（&quot;）包含</li><li>数字、布尔值和 null 不需要使用引号包含</li><li>数组元素之间使用逗号（,）分隔</li><li>数组元素可以是任意类型的数据</li></ul><br><p><strong>注意事项</strong></p><ul><li>JSON 数据必须是有效的 UTF-8 编码。</li><li>JSON 数据一般都是通过异步网络请求获取到的，因此需要进行严格的错误处理和安全检查。</li><li>在使用 JSON 数据时，应该尽可能地避免使用 <code>eval()</code> 函数或将未经过验证的数据直接转换为对象，以避免安全风险。</li></ul><br><h3 id="jsonc" tabindex="-1">JSONC <a class="header-anchor" href="#jsonc" aria-label="Permalink to &quot;JSONC&quot;">​</a></h3><p>JSONC（JSON with Comments）是一种支持注释的 JSON 格式，通过允许开发人员在 JSON 数据中添加注释，提高了代码的可读性和可维护性。JSONC 格式可以在现代浏览器和 Node.js 等环境中直接使用，但它并未被标准化。</p><p>在 JSONC 中，注释以 <code>//</code> 或 <code>/* */</code> 的形式添加，与 JavaScript 中的注释语法类似。例如：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">// 这是一个对象</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">age</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  这是一个数组</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">  */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">hobbies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">reading</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">music</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cooking</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 最后一个元素不需要逗号</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><br><h3 id="json5" tabindex="-1">JSON5 <a class="header-anchor" href="#json5" aria-label="Permalink to &quot;JSON5&quot;">​</a></h3><p>JSON5 是一种扩展的 JSON 格式，主要通过增加一些特性来提高 JSON 数据的可读性和可维护性。JSON5 支持像 JavaScript 一样的语法，并且允许在数据中添加注释、省略结尾逗号等。以下是一些 JSON5 的特性和示例：</p><ul><li>键名可以使用单引号或不使用引号。</li><li>字符串可以使用反斜杠换行。</li><li>数字可以使用二进制、八进制、十进制或十六进制表示。</li><li>对象和数组元素末尾可以省略逗号。</li><li>注释可以使用 <code>//</code> 或 <code>/* */</code> 形式添加。</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;John&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 键名可以不用双引号</span></span>
<span class="line"><span style="color:#BABED8;">  age</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">30</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  email</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;john@example.com&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  isActive</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#BABED8;">  hobbies</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#BABED8;">    &#39;reading&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    &#39;music&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    &#39;cooking&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 数组元素末尾可以省略逗号</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#BABED8;">  address</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    street</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;</span><span style="color:#F78C6C;">123</span><span style="color:#BABED8;"> Main St&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    city</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;Seattle&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    state</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;WA&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    zipcode</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> &#39;</span><span style="color:#F78C6C;">98101</span><span style="color:#BABED8;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">// 注释可以使用 // 或 /* */ 形式添加</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><br><h3 id="json-schema" tabindex="-1">JSON Schema <a class="header-anchor" href="#json-schema" aria-label="Permalink to &quot;JSON Schema&quot;">​</a></h3><p>JSON Schema 是一种用于描述 JSON 数据结构的规范。可以帮助开发人员定义和验证 JSON 数据的格式、类型、范围、约束等元数据，从而提高代码的可读性、可维护性和安全性。</p><p>这是 czg 的 json schema 地址：<a href="https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@1.7.0/docs/public/schema/cz-git.json" target="_blank" rel="noreferrer">https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@1.7.0/docs/public/schema/cz-git.json</a></p><p>JSON Schema 本质上就是一个 JSON 对象，它的属性对应着需要检查的 JSON 数据对象中的属性。使用 JSON Schema，可以定义以下内容：</p><ul><li>数据类型</li><li>属性名称和值</li><li>最小值和最大值</li><li>正则表达式</li><li>枚举值</li><li>数组元素个数、元素类型、元素约束等</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">$schema</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://json-schema.org/draft-07/schema#</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">$id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://example.com/person.schema.json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Person</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">A person schema</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">object</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">properties</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">firstName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">lastName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">age</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">integer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">minimum</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">maximum</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">150</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">required</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">firstName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lastName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>上述示例定义了一个名为 <code>Person</code> 的 JSON Schema，其中包含三个属性：<code>firstName</code>、<code>lastName</code> 和 <code>age</code>。其中 <code>firstName</code> 和 <code>lastName</code> 是字符串类型，<code>age</code> 是整数类型，且其取值范围在 0 到 150 之间。此外，<code>firstName</code> 和 <code>lastName</code> 属性是必需的，因为它们被定义在 <code>required</code> 属性中。</p><p>可以将此 JSON Schema 应用于验证一个符合该模式的 JSON 对象，以确保它满足所定义的数据结构和约束条件。例如，下面是一个符合该 JSON Schema 的 JSON 对象：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">firstName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">John</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">lastName</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Doe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">age</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">30</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="ini" tabindex="-1">INI <a class="header-anchor" href="#ini" aria-label="Permalink to &quot;INI&quot;">​</a></h2><p>INI（Initial Configuration）格式是一种配置文件格式，用于存储程序的初始配置信息。INI 格式最初由 Microsoft 开发，并被广泛应用于 Windows 操作系统中的配置文件中。</p><p>INI 格式的<strong>优点</strong>在于其简洁性和易读性，易于开发人员编写和维护这样的配置文件，同时也方便程序读取和解析。不过，INI 格式并没有标准化的规范，因此在实际开发中需要注意兼容性问题，以确保程序能够正确地处理各种不同版本的 INI 配置文件。</p><p>INI 格式通常采用了“节”和“键值对”的方式来组织数据。其中，“节”指定了一个配置块，包括一组相关的配置项；“键值对”则表示具体的配置项及其取值。以下是一个简单的 INI 文件示例：</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">; 注释</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[database]</span></span>
<span class="line"><span style="color:#F07178;">host</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> localhost</span></span>
<span class="line"><span style="color:#F07178;">port</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> 5432</span></span>
<span class="line"><span style="color:#F07178;">database</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> mydb</span></span>
<span class="line"><span style="color:#F07178;">username</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> user</span></span>
<span class="line"><span style="color:#F07178;">password</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> secret</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[server]</span></span>
<span class="line"><span style="color:#F07178;">host</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> example.com</span></span>
<span class="line"><span style="color:#F07178;">port</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> 80</span></span></code></pre></div><p>在上述示例中，方括号 <code>[]</code> 表示了一个节的开始，例如 <code>[database]</code> 和 <code>[server]</code> 分别代表了两个节，它们各自包含若干个键值对。键值对使用等号 <code>=</code> 进行赋值，例如 <code>host = localhost</code> 就是一个键值对，其中 <code>host</code> 是键名，<code>localhost</code> 是键值。分号 <code>;</code> 表示注释，任何分号后面的内容都将被视为注释内容，不会被解析为配置项。</p><h2 id="yaml" tabindex="-1">YAML <a class="header-anchor" href="#yaml" aria-label="Permalink to &quot;YAML&quot;">​</a></h2><p><a href="https://yaml.org/" target="_blank" rel="noreferrer">官网</a> | <a href="https://learnxinyminutes.com/docs/yaml/" target="_blank" rel="noreferrer">参考一</a></p><p>Yet Another Markup Language，一种轻量级的、人类可读的数据序列化语言。最早出现在 2001 年，由 Clark Evans 开发。</p><p>它是 JSON 的严格超集，添加了语法上重要的换行符和缩进，就像 Python 一样。然而，与 Python 不同的是，YAML 不允许使用文本制表符进行缩进。</p><p><code>.yaml</code> 和 <code>.yam</code> 文件扩展名通常用于存储采用 YAML格式的数据，但 <code>.yam</code> 相对而言比较少见</p><br><h3 id="特点" tabindex="-1">特点 <a class="header-anchor" href="#特点" aria-label="Permalink to &quot;特点&quot;">​</a></h3><ul><li>简洁易读：使用缩进和标点符号来表示层次结构和关联关系，减少了冗余的字符和嵌套的括号。</li><li>高层次表达能力：支持复杂的数据类型，如列表、字典、时间戳、正则表达式等。</li><li>可扩展性：允许自定义标签和类型，以便更好地适应不同的场景需求。</li><li>易于解析：由于语法简单，所以可以快速解析和加载文件，适合作为配置文件格式使用。</li></ul><br><h3 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h3><ol><li>配置文件：YAML 可以作为配置文件格式使用，如 Rails 的 <code>database.yml</code> 和 Jekyll 的 <code>_config.yml</code> 等。</li><li>数据序列化：YAML 可以将数据序列化成文本格式，并存储到文件或数据库中，便于传输和存储。</li><li>网络传输：YAML 可以将数据序列化成基于文本的格式，方便在网络上传输和接收数据。</li><li>日志文件：YAML 可以作为日志文件格式使用，记录系统事件和错误信息等。</li><li>编程语言：许多编程语言都提供了 YAML 解析器和序列化器，例如 Python 的 PyYAML 库和 Ruby 的 Psych 库等。</li></ol><br><h3 id="基本语法规则" tabindex="-1">基本语法规则 <a class="header-anchor" href="#基本语法规则" aria-label="Permalink to &quot;基本语法规则&quot;">​</a></h3><ol><li><p>大小写敏感：</p><p>YAML 对大小写是敏感的，例如 <code>Foo</code> 和 <code>foo</code> 是不同的值。</p></li><li><p>使用缩进表示层次结构：</p><p>YAML 使用缩进来表示数据之间的层次关系，缩进必须使用空格，不能使用制表符。通常情况下，每级缩进为 2 个空格。</p></li><li><p>使用键值对表示数据：</p><p>YAML 使用键值对的方式来表示数据，其中键值对之间使用一个空格分隔。键和值之间用冒号 <code>:</code> 分隔，例如 <code>name: John</code>。</p></li><li><p>支持数组和列表：</p><p>YAML 支持数组和列表，可以使用 <code>-</code> 符号来表示数组元素或者列表项。例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">languages:</span></span>
<span class="line"><span style="color:#babed8;">  - Java</span></span>
<span class="line"><span style="color:#babed8;">  - JavaScript</span></span>
<span class="line"><span style="color:#babed8;">  - Python</span></span></code></pre></div><p>这里就定义了一个名为 <code>languages</code> 的列表，包含三个元素。</p></li><li><p>多行字符串：</p><p>YAML 支持多行字符串，可以在字符串前后使用 <code>|</code> 或 <code>&gt;</code> 符号，例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">text: |</span></span>
<span class="line"><span style="color:#babed8;">  This is a long block of text</span></span>
<span class="line"><span style="color:#babed8;">  that spans multiple lines.</span></span></code></pre></div></li><li><p>注释：</p><p>YAML 支持注释功能，可以使用 <code>#</code> 符号表示注释内容。例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;"># This is a comment</span></span>
<span class="line"><span style="color:#babed8;">name: John # This is another comment</span></span></code></pre></div></li><li><p>引用：</p><p>YAML 支持引用其他节点的值，可以使用 <code>&amp;</code> 符号来标记一个节点，并使用 <code>*</code> 符号来引用它。例如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">defaults: &amp;defaults</span></span>
<span class="line"><span style="color:#babed8;">  host: localhost</span></span>
<span class="line"><span style="color:#babed8;">  port: 3000</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">development:</span></span>
<span class="line"><span style="color:#babed8;">  &lt;&lt;: *defaults</span></span>
<span class="line"><span style="color:#babed8;">  database: dev_db</span></span></code></pre></div><p>这里先定义了一个名为 <code>defaults</code> 的节点，并将其值设置为 <code>{host: localhost, port: 3000}</code>。然后，在 <code>development</code> 节点中，使用 <code>&lt;&lt;: *defaults</code> 来引用 <code>defaults</code> 节点中的值。</p></li></ol><br><h3 id="扩展" tabindex="-1">扩展 <a class="header-anchor" href="#扩展" aria-label="Permalink to &quot;扩展&quot;">​</a></h3><p>标准的 YAML 规范本身并不支持 glob 语法，也没有直接支持通配符的语法，但是在很多 <code>.yaml</code> 格式的配置文件中，可以看到使用通配符等非标准的情况，比如：pnpm-workspace.yaml</p><p>这是因为一些 YAML 库和工具可以扩展 YAML 的能力，常见的有（抄来的）：</p><ol><li>JSON Schema：一种用于描述 JSON 数据结构的规范，可以被扩展用于验证和描述 YAML 文件的结构。</li><li>YAML Anchors &amp; Aliases：该规范提供了一种使用 <code>$ref</code> 引用和复用节点的方式，使得 YAML 文件可以更加简洁和可维护</li><li>Custom Tags：一种自定义 YAML 标签的机制，允许用户将自定义类型映射到 YAML 中的标量值或者序列中</li><li>PyYAML：是 Python 中的一个 YAML 库，它支持 YAML1.1 和 YAML1.2 规范，并提供了一些额外的功能和扩展。</li><li>Ruby Psych：是 Ruby 语言中的一个 YAML 库，它支持 YAML1.1 和 YAML1.2 规范，并提供了一些额外的功能和扩展。</li><li>YAML Loaders/LoadExtensions：一种加载 YAML 文件时进行扩展和定制的机制，包括过滤器、类型转换器、默认值等等。</li></ol>`,79),e=[p];function t(c,r,i,D,d,y){return a(),l("div",null,e)}const B=s(o,[["render",t]]);export{h as __pageData,B as default};