import{_ as s,v as n,b as l,R as a}from"./chunks/framework.8277b2e6.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep","prev":false,"next":false},"headers":[],"relativePath":"docs/prettier/prettierrc.md","filePath":"docs/prettier/prettierrc.md","lastUpdated":1710175002000}'),t={name:"docs/prettier/prettierrc.md"},o=a(`<h1>Prettier 配置详解</h1><p>v3.2.4（2024-02）</p><p>根据 prettier 类型定义及官方文档整理</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// @ts-check</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">/** </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">type</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">{</span><span style="color:#FFCB6B;font-style:italic;">import(&quot;prettier&quot;).Config</span><span style="color:#89DDFF;font-style:italic;">}</span><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 打印宽度</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">80</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">printWidth</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">100</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 缩进大小</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">tabWidth</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否使用制表符进行缩进</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">useTabs</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否在语句末尾添加分号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">semi</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否使用单引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span><span style="color:#676E95;font-style:italic;"> 使用双引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">singleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 在 JSX 中使用单引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">jsxSingleQuote</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 尽可能添加尾随逗号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">all</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;none&quot; - 不添加尾随逗号，意味着在多行的对象、数组、函数参数等的最后一个元素后面，不会添加逗号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;es5&quot; - 在符合ES5规范的地方添加尾随逗号，在多行的对象、数组的最后一个元素后会添加逗号，但在函数参数后面不会添加</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;all&quot; - 在可能的地方添加尾随逗号，包括函数参数。这需要ES2017规范支持。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">trailingComma</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">es5</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 在对象大括号与文本之间是否添加空格</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">true</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">bracketSpacing</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 多行HTML元素的结尾&gt;，放在最后一行的末尾，还是单独放在下一行（不适用于自闭合元素）。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 如果设置为true，则&gt;会放在最后一行的末尾</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">bracketSameLine</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 格式化文件时的起始位置</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">0</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">rangeStart</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 格式化文件时的结束位置</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">Number.POSITIVE_INFINITY，即正无穷大</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">rangeEnd</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> Number</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">POSITIVE_INFINITY</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 指定要使用的解析器</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">desc</span><span style="color:#676E95;font-style:italic;"> 会根据文件类型自动推断，支持常见的多种语言，prettier内部已经集成了对应的解析器</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">link</span><span style="color:#676E95;font-style:italic;"> https://prettier.io/docs/en/options.html#parser</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 指定输入文件路径，Prettier会使用这个路径来推断应该使用哪个解析器来解析你的代码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">filepath</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#BABED8;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否只格式化包含特定注释（称为pragma，把@prettier或@format放在文件顶部的多行注释中）的文件，默认为false，即格式化所有文件</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  requirePragma: </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否在Prettier格式化文件后的文件顶部插入一个特殊的注释标记，标记为@format。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 与requirePragma选项一起使用，可以在提交代码时检查是否格式化了文件</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">insertPragma</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 如何处理Markdown文本的换行</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">preserve</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;always&quot; - 在文本超过打印宽度时换行</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;never&quot; - 不会文本换行</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;preserve&quot; - （推荐）保留原始文件中的换行，因为某些服务对换行敏感</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">proseWrap</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">preserve</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 箭头函数只有一个参数时，是否添加括号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">always</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;always&quot; - 总是添加括号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;avoid&quot; - 只有一个参数时不添加括号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">arrowParens</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">avoid</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 添加额外的语言插件。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 接受一个数组，数组中的每个元素都是一个插件，可以是一个字符串（插件的名称或路径），也可以是一个插件对象</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">example</span><span style="color:#676E95;font-style:italic;"> [&quot;prettier-plugin-graphql&quot;]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// plugins: Array&lt;string | Plugin&gt;;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 如何处理 HTML 中的空格</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">css</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;css&quot; - 保留CSS显示属性的空格，尊重HTML中的默认行为，其中某些标签（如&lt;pre&gt;、&lt;textarea&gt;）会保留空格，而其他标签则不会</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;strict&quot; - 保留所有空格，无论HTML标签是什么，所有的空格都会被保留</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;ignore&quot; - 忽略所有空格，无论HTML标签是什么，所有的空格都会被删除</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">htmlWhitespaceSensitivity</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">css</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 要应用哪个行尾字符</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">lf</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;auto&quot; - （推荐，保持兼容性）保持现有的行尾字符（通过查看文件的第一行来决定）</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;lf&quot; - 行层添加LF（Line Feed，换行）字符，即\\n，这是Unix系统（包括Linux和macOS）的标准行尾字符</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;crlf&quot; - 行尾添加CRLF（Carriage Return Line Feed，回车换行）字符，即\\r\\n，这是Windows系统的标准行尾字符</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;cr&quot; - 行尾添加CR（Carriage Return，回车）字符，旧的Mac系统的标准行尾字符</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">endOfLine</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 更改引用对象中的属性的时间</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">as-needed</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;as-needed&quot; - 仅在需要时添加引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;consistent&quot; - 如果文件中的任一属性需要引号，则所有属性都需要引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;preserve&quot; - 保留原始文件中的引号</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">quoteProps</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">as-needed</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否缩进Vue 文件中的 &lt;script&gt; 和&lt;style&gt;标签</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">vueIndentScriptAndStyle</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否格式化嵌入在文件中的带引号的代码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#89DDFF;font-style:italic;">&quot;</span><span style="color:#BABED8;font-style:italic;">auto</span><span style="color:#89DDFF;font-style:italic;">&quot;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;auto&quot; - 根据文件内容自动检测</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * &quot;off&quot; - 不格式化嵌入的代码</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">embeddedLanguageFormatting</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 是否强制在 HTML、Vue 和 JSX 中每行只能有一个属性</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">singleAttributePerLine</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * 三元运算符的格式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">default</span><span style="color:#676E95;font-style:italic;"> </span><span style="color:#BABED8;font-style:italic;">false</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * </span><span style="color:#89DDFF;font-style:italic;">@</span><span style="color:#C792EA;font-style:italic;">values</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * true - 在多行三元运算符的问号和冒号之间添加换行符</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   * false - 保留三元的默认行为;将问号与结果放在同一行上</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">   */</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">experimentalTernaries</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div>`,4),p=[o];function e(c,i,y,r,D,f){return n(),l("div",null,p)}const B=s(t,[["render",e]]);export{F as __pageData,B as default};
