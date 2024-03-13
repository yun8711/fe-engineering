import{_ as o,v as i,b as e,R as c}from"./chunks/framework.8277b2e6.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"pkgs/cosmiconfig.md","filePath":"pkgs/cosmiconfig.md","lastUpdated":1710309574000}'),a={name:"pkgs/cosmiconfig.md"},t=c('<h1>Cosmiconfig</h1><p><a href="https://github.com/cosmiconfig/cosmiconfig" target="_blank" rel="noreferrer">github</a></p><h3 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h3><p>cosmiconfig 是一个 JavaScript 库，用于在应用程序中<strong>搜索并加载</strong>配置文件。它可以自动搜索应用程序目录及其祖先目录中的各种常见配置文件格式（如 JSON、YAML、INI 等），并返回包含解析后配置信息的 JavaScript 对象。</p><p>cosmiconfig 最初由 James Kyle 在 2016 年创建，并在当时发布了第一个版本。</p><p>它是基于早期的 Nconf 库开发的，旨在提供一种更加简单和灵活的配置文件加载方案。自从发布以来，受到越来越多的关注和使用，特别是在 Node.js 和 JavaScript 生态系统中，它已经成为一个广泛使用的工具之一。</p><br><h3 id="优势" tabindex="-1">优势 <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势&quot;">​</a></h3><p>它流行的原因有以下几点：</p><ol><li>基于约定大于配置的原则，大幅简化了应用程序的配置文件查找和读取过程，避免了手动处理路径等细节。</li><li>支持多种格式的配置文件，如 JSON、YAML、INI 等，满足不同项目和场景的需求。</li><li>可以通过插件机制进行扩展，支持自定义的配置文件格式和解析方式。</li><li>可以根据应用程序运行时的环境变量或命令行参数来指定特定的配置文件，实现灵活的配置管理。</li></ol><br><p>一些非常流行的库都使用了 Cosmiconfig 的插件：</p><ul><li>Prettier</li><li>ESLint</li><li>Jest</li><li>TypeScript</li><li>Stylelint</li><li>PostCSS</li></ul><p><strong>注意</strong>：每个插件仍然有自己独特的配置选项和语法规则</p><br><h3 id="如何工作" tabindex="-1">如何工作 <a class="header-anchor" href="#如何工作" aria-label="Permalink to &quot;如何工作&quot;">​</a></h3><p>默认情况下，Cosmiconfig 将从指定的起始位置开始搜索，并向上遍历目录树，搜索以下内容（顺序即优先级）：</p><ul><li>package.json 文件中指定的 <code>myapp</code> 属性</li><li>JSON 或 YAML 格式编写的，无扩展名的 &quot;.rc&quot; 文件，如：<code>.myapprc</code></li><li>扩展名为 <code>.json</code>、<code>.yaml</code>、<code>.yml</code>、<code>.js</code>、<code>.mjs</code> 或 <code>.cjs</code> 的 &quot;.rc&quot; 文件，如：<code>.myapprc.json</code></li><li>位于 <code>.config</code> 子目录内的，符合上面两项格式的配置文件</li><li><code>.config.js</code>、<code>.config.mjs</code> 或 <code>.config.cjs</code> 文件</li></ul><p>Cosmiconfig 会继续向上遍历目录树，在每个目录中检查这些位置，直到找到可接受的配置（或命中主目录）。</p><br><p>需要注意的是，cosmiconfig 已经被标记为不推荐使用，因为它存在一些缺陷，比如性能较低，无法识别复杂的 JSON 文件等。取而代之，建议使用更加强大和高效的配置库和工具，例如 dotenv、rc 或者 yargs 等。</p>',21),s=[t];function l(r,n,d,p,m,f){return i(),e("div",null,s)}const u=o(a,[["render",l]]);export{h as __pageData,u as default};