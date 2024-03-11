import{_ as a,v as e,b as n,R as s}from"./chunks/framework.8277b2e6.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/npm/npmrc.md","filePath":"docs/npm/npmrc.md","lastUpdated":1710175002000}'),r={name:"docs/npm/npmrc.md"},t=s(`<h1>.npmrc</h1><p>npm v9.8.0 nodejs v20</p><p><a href="https://docs.npmjs.com/cli/v9/configuring-npm/npmrc" target="_blank" rel="noreferrer">官网</a></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>npm 可以从命令行、环境变量、<code>.npmrc</code>中获取配置，因此，<code>.npmrc</code> 就是用来调设置 npm 的配置项的。</p><p>参阅 <a href="https://docs.npmjs.com/cli/v9/using-npm/config" target="_blank" rel="noreferrer">完整配置项 - npm config</a></p><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p>电脑中会有多个 .npmrc 文件，在我们使用 npm 的时候，会按照如下顺序读取这些配置文件，优先级从高到低：</p><ul><li>项目配置文件: /project/.npmrc</li><li>用户配置文件：~/.npmrc</li><li>全局配置文件：$PREFIX/etc/npmrc</li><li>npm 内置配置文件 /path/to/npm/npmrc</li></ul><p>所有 npm 配置文件都是 ini 格式的<code>key = value</code>参数列表</p><h2 id="常用配置" tabindex="-1">常用配置 <a class="header-anchor" href="#常用配置" aria-label="Permalink to &quot;常用配置&quot;">​</a></h2><h3 id="registry-安装源" tabindex="-1">registry 安装源 <a class="header-anchor" href="#registry-安装源" aria-label="Permalink to &quot;registry 安装源&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;"># 修改默认的安装源</span></span>
<span class="line"><span style="color:#babed8;">registry=http://mirrors.cloud.tencent.com/npm/</span></span>
<span class="line"><span style="color:#babed8;"># 指定私有源，这里专指以 @kd 开头的依赖包</span></span>
<span class="line"><span style="color:#babed8;">@kd:registry=http://192.168.12.201:4873/</span></span></code></pre></div>`,13),p=[t];function o(c,l,i,d,m,h){return e(),n("div",null,p)}const f=a(r,[["render",o]]);export{b as __pageData,f as default};