import{_ as s,v as n,b as a,R as l}from"./chunks/framework.8277b2e6.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/changelog/attachment-rule-name.md","filePath":"docs/changelog/attachment-rule-name.md","lastUpdated":1693758295000}'),o={name:"docs/changelog/attachment-rule-name.md"},p=l(`<h2 id="commitlint-config-js-中可用的-rules" tabindex="-1">commitlint.config.js 中可用的 rules <a class="header-anchor" href="#commitlint-config-js-中可用的-rules" aria-label="Permalink to &quot;commitlint.config.js 中可用的 rules&quot;">​</a></h2><p><a href="https://commitlint.js.org/#/reference-rules?id=available-rules" target="_blank" rel="noreferrer">https://commitlint.js.org/#/reference-rules?id=available-rules</a></p><p><strong>body-full-stop</strong></p><p>说明：body结束符</p><p>默认值：<code>[0,&#39;never&#39;,&#39;.&#39;]</code>，不能以<code>.</code>结尾</p><p><strong>body-leading-blank</strong></p><p>说明：body 以空行开始</p><p>默认值：<code>[0,&#39;never&#39;,&#39;.&#39;]</code>，不能以<code>.</code>结尾</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">rules</span><span style="color:#89DDFF;">:{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 单词格式</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">header-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 结束符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">header-full-stop</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// header 最大长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">header-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// header 最小长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">header-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 结束符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">references-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// scope 可选值, 例如 [ &#39;components&#39;, &#39;utils&#39;, &#39;cli&#39; ]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scope-enum</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// scope 单词格式</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scope-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;font-style:italic;">// 是否为空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scope-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// scope最大内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scope-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// scope最小内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scope-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// subject 单词格式</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// subject 是否为空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// subject 中止符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-full-stop</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// subject 最大内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// subject 最小内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">// 分割符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">subject-exclamation-mark</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// type 可选值 例如: [ &#39;feat&#39;, &#39;fix&#39; ]</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type-enum</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// type 单词格式</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// type是否为空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// type最大内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// type最小内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">type-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// 分割符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">signed-off-by</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 分割符</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">trailer-exists</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">             </span><span style="color:#676E95;font-style:italic;">// body结束符：不以.结尾</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-full-stop</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">: [</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">never</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// body 以空行开始：总是以空行开始</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-leading-blank</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">always</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// body 是否为空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// body最大内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// body最大内容行数</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-max-line-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// body最小内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// 单词格式 ， 例如： upper-case 全大写</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">body-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">                 </span><span style="color:#676E95;font-style:italic;">// footer 开头空行</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">footer-leading-blank</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// footer是否为空</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">footer-empty</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// footer最大内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">footer-max-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// footer最大内容行数</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">footer-max-line-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;font-style:italic;">// footer最小内容长度</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">footer-min-length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">:[]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>格式列表：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">[</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lower-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// default</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">upper-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// UPPERCASE</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">camel-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// camelCase</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">kebab-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// kebab-case</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">pascal-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// PascalCase</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sentence-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Sentence case</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">snake-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// snake_case</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">start-case</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// Start Case</span></span>
<span class="line"><span style="color:#BABED8;">]</span><span style="color:#89DDFF;">;</span></span></code></pre></div>`,11),t=[p];function e(c,r,y,F,D,i){return n(),a("div",null,t)}const q=s(o,[["render",e]]);export{E as __pageData,q as default};
