import{_ as s,v as n,b as a,R as l}from"./chunks/framework.8277b2e6.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/eslint/eslint-plugin-vue.md","filePath":"docs/eslint/eslint-plugin-vue.md","lastUpdated":1710309574000}'),p={name:"docs/eslint/eslint-plugin-vue.md"},o=l(`<h1>插件：eslint-plugin-vue</h1><p>v9.4.2</p><p><a href="https://eslint.vuejs.org/" target="_blank" rel="noreferrer">官网</a> | <a href="https://github.com/vuejs/eslint-plugin-vue" target="_blank" rel="noreferrer">github</a></p><p>Vue.js 的官方 ESLint 插件，允许 ESLint 检查<code>.vue</code>文件中的 <code>&lt;template&gt;</code> 和 <code>&lt;script&gt;</code> ，以及 <code>.js</code> 文件中的 Vue 代码。</p><ul><li>查找语法错误</li><li>使用vue指令的错误用法</li><li>发现与<a href="https://vuejs.org/style-guide/" target="_blank" rel="noreferrer">vue风格指南</a> 不一致的问题</li></ul><h2 id="基本用法" tabindex="-1">基本用法 <a class="header-anchor" href="#基本用法" aria-label="Permalink to &quot;基本用法&quot;">​</a></h2><p>1、安装：</p><p><code>pnpm add -D eslint-plugin-vue</code></p><p>2、配置</p><p>对于<code>.vue</code>文件， parser 必须指定为 <code>vue-eslint-parser </code>解析器，要指定其他解析器时，只能放在 parserOptions 中</p><p>（1）在 <code>.eslintrc.js</code> 文件中</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">extends</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// add more generic rulesets here, such as:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// &#39;eslint:recommended&#39;,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">plugin:vue/vue3-recommended</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// &#39;plugin:vue/recommended&#39; // Use this if you are using Vue.js 2.x.</span></span>
<span class="line"><span style="color:#BABED8;">  ]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parserOptions</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// override/add rules settings here, such as:</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// &#39;vue/no-unused-vars&#39;: &#39;error&#39;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>（2）在 <code>eslint.config.js</code> 文件中</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> pluginVue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint-plugin-vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">*</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#BABED8;"> parserVue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">files</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">**/*.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">languageOptions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> parserVue</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">parserOptions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">ecmaFeatures</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">          </span><span style="color:#F07178;">jsx</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">extraFileExtensions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">sourceType</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">vue</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> pluginVue</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">processor</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> pluginVue</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">processors[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.vue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;">[</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">...</span><span style="color:#BABED8;">pluginVue</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">configs</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">base</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">rules</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">...</span><span style="color:#BABED8;">pluginVue</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">configs[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue3-essential</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">rules</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">...</span><span style="color:#BABED8;">pluginVue</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">configs[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue3-recommended</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">rules</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#BABED8;">      ]</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">]</span></span></code></pre></div><h2 id="预设配置" tabindex="-1">预设配置 <a class="header-anchor" href="#预设配置" aria-label="Permalink to &quot;预设配置&quot;">​</a></h2><p>eslint-plugin-vue 可以适配vue2、vue3，同时预设了一些规则集，所以需要根据需求选择，添加到<code>extend</code>中即可，它的预设配置包含以下内容：</p><p>1、<code>plugin:vue/base</code>：eslint 解析 vue 的基础配置，让vue文件可以正确的被eslint解析，其内容如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> require</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parserOptions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">ecmaVersion</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2020</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">sourceType</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">env</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">browser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">es6</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">rules</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">vue/comment-directive</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">vue/jsx-uses-vars</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>2、以下预设适用于vue3 项目，依次增加更多规则：</p><ul><li><code>plugin:vue/vue3-essential</code>：在base基础上，rules 增加防止错误或意外行为的规则</li><li><code>plugin:vue/vue3-strongly-recommended</code>：在上面的规则基础上，增加提高代码可读性和最佳实践的规则</li><li><code>plugin:vue/vue3-recommended</code>：在上面的规则基础上，增加提高代码可读性和最佳实践的规则</li></ul><p>3、以下适用于vue2 项目，依次增加更多规则：</p><ul><li><code>plugin:vue/essential</code>：在base基础上，增加防止错误或意外行为的规则</li><li><code>plugin:vue/strongly-recommended</code>：在上面的规则基础上，增加提高代码可读性和最佳实践的规则</li><li><code>plugin:vue/recommended</code>：在上面的规则基础上，增加提高代码可读性和最佳实践的规则</li></ul><p>该插件支持 Vue.js 3.2 的基本语法、 <code>&lt;script setup&gt;</code> 、CSS 变量注入，但尚不支持 Vue.js 3.2 的实验性功能 ref sugar。</p><h2 id="解析器配置" tabindex="-1">解析器配置 <a class="header-anchor" href="#解析器配置" aria-label="Permalink to &quot;解析器配置&quot;">​</a></h2><p>与 eslint 的默认配置相似，示例如下：</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">parserOptions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    ecmaVersion?</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2018</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    sourceType?</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 或者 &quot;script&quot;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">ecmaFeatures</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#BABED8;">    	globalReturn?</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">impliedStrict</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">jsx</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#BABED8;">  	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 其他 ESLint 配置...</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h3 id="parser" tabindex="-1"><code>parser</code> <a class="header-anchor" href="#parser" aria-label="Permalink to &quot;\`parser\`&quot;">​</a></h3><p>指定自定义解析器来解析 <code>&lt;script&gt;</code> 标签，除解析器之外的其他属性将提供给指定的解析器</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">parserOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@babel/eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 或者</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">sourceType</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">module</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>还可以指定一个对象并单独更改 <code>&lt;script lang=&quot;...&quot;&gt;</code> 的解析器</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">parserOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// Script parser for \`&lt;script&gt;\`</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">js</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">espree</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// Script parser for \`&lt;script lang=&quot;ts&quot;&gt;\`</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// Script parser for vue directives (e.g. \`v-if=\` or \`:attribute=\`)</span></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// and vue interpolations (e.g. \`{{variable}}\`).</span></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// If not specified, the parser determined by \`&lt;script lang =&quot;...&quot;&gt;\` is used.</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">&lt;template&gt;</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">espree</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>使用 <code>.eslintrc.js</code>配置文件时，也可以直接设置为解析器对象</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> tsParser </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">require</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@typescript-eslint/parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> espree </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">require</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">espree</span><span style="color:#89DDFF;">&quot;</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">parserOptions</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Single parser</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> tsParser</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// Multiple parser</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#F07178;">parser</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#F07178;">js</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> espree</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#F07178;">ts</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> tsParser</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>如果不设置，则 <code>vue-eslint-parser</code> 完全跳过解析 <code>&lt;script&gt;</code></p><br><h3 id="vuefeatures" tabindex="-1"><code>vueFeatures</code> <a class="header-anchor" href="#vuefeatures" aria-label="Permalink to &quot;\`vueFeatures\`&quot;">​</a></h3><p>指定如何解析与 Vue 功能相关的内容</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vue-eslint-parser</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">parserOptions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">vueFeatures</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">filter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">interpolationAsNonHTML</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">styleCSSVariableInjection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#BABED8;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">customMacros</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[]</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>1、<code>filter</code>：是否解析 Vue2 过滤器，如果为 false，模板中的 <code>|</code>在 Vue2 中无法解析，在 Vue3 中被解析为按位操作。</p><p>2、<code>interpolationAsNonHTML</code>：默认 true，指定是否将插值解析为 HTML。如果为 true，解析器会将插值作为非 HTML 处理（但是，可以在插值中使用 HTML 转义）</p><p>3、<code>styleCSSVariableInjection</code>：默认 true，如果设置为 <code>true</code> ，则解析 <code>&lt;style&gt;</code>中的 <code>v-bind</code> 表达式。</p><p>4、<code>customMacros</code>：仅适用于 <code>&lt;script setup&gt; </code>，指定除 Vue 标准宏之外的自定义宏名称数组</p><p>5、<code>templateTokenizer</code>：<strong>实验性功能</strong>，指定自定义分词器来解析 <code>&lt;template lang=&quot;...&quot;&gt;</code> 标签</p>`,43),e=[o];function t(c,r,D,F,y,i){return n(),a("div",null,e)}const E=s(p,[["render",t]]);export{u as __pageData,E as default};