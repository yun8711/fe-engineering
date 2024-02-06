import{_ as e,v as l,b as t,R as i}from"./chunks/framework.8277b2e6.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"docs/stylelint/index.md","filePath":"docs/stylelint/index.md","lastUpdated":1707235725000}'),o={name:"docs/stylelint/index.md"},a=i('<h1>Stylelint</h1><p>v16.2.1</p><p><a href="https://stylelint.io/" target="_blank" rel="noreferrer">官网</a> | <a href="https://github.com/stylelint/stylelint" target="_blank" rel="noreferrer">github</a></p><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>Stylelint是一个强大的，现代的代码检查工具，与ESLint类似，Stylelint能够通过定义一系列的编码风格规则帮助我们避免在样式表中出现错误。</p><p>关于CSS Lint的解决方案主要包括了csslint、SCSS-Lint和Stylelint等几种。而由于Stylelint在技术架构上基于AST 的方式扩展CSS，除原生CSS 语法，其也支持 SCSS、Less 这类预处理器，并且也有非常多的第三方插件。</p><p>在 Stylelint v14 及更高版本默认不解析非css文件，需要使用插件来支持其他类型文件</p><h2 id="版本变化" tabindex="-1">版本变化 <a class="header-anchor" href="#版本变化" aria-label="Permalink to &quot;版本变化&quot;">​</a></h2><h3 id="v16" tabindex="-1"><a href="https://stylelint.io/migration-guide/to-16" target="_blank" rel="noreferrer">v16</a> <a class="header-anchor" href="#v16" aria-label="Permalink to &quot;[v16](https://stylelint.io/migration-guide/to-16)&quot;">​</a></h3><ul><li>添加对 ESM 的支持，支持ESM 插件、ESM 自定义语法、ESM 自定义格式化程序</li><li>弃用了 CommonJS Node.js API</li><li>内部重构为使用 <code>.mjs</code> 和 <code>.cjs</code> 扩展</li><li>删除了已弃用的样式规则</li><li>要求 Node.js &gt;= 18.12.0</li></ul><h3 id="v15" tabindex="-1"><a href="https://stylelint.io/migration-guide/to-15" target="_blank" rel="noreferrer">v15</a> <a class="header-anchor" href="#v15" aria-label="Permalink to &quot;[v15](https://stylelint.io/migration-guide/to-15)&quot;">​</a></h3><ul><li>弃用了 76 条样式相关的规则，专注于编写和维护 Stylelint 独有的 <a href="https://stylelint.io/user-guide/rules#avoid-errors" target="_blank" rel="noreferrer">avoid errors</a> 和 <a href="https://stylelint.io/user-guide/rules#enforce-conventions" target="_blank" rel="noreferrer">enforce (non-stylistic) conventions</a>，这些弃用的规则在当前版本仍有效，在 v16 中会完全删除。</li><li>添加``declaration-property-value-no-unknown` 规则，标记 css 规范中未知的属性值。</li><li>不再支持 Node.js 12</li><li>删除 <code>processors</code> 的配置属性</li></ul><h3 id="v14" tabindex="-1"><a href="https://stylelint.io/migration-guide/to-14" target="_blank" rel="noreferrer">v14</a> <a class="header-anchor" href="#v14" aria-label="Permalink to &quot;[v14](https://stylelint.io/migration-guide/to-14)&quot;">​</a></h3><ul><li>删除了 <code>syntax</code> 语法的选项和自动推断</li><li>不再支持Node.js 10</li><li>删除了 13.7.0 中弃用的规则</li><li>删除<code>configOverrides</code> 选项</li></ul><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>Stylelint 需要一个配置对象，并从以下位置查找：</p><ul><li><code>stylelint.config.js</code> 或 <code>.stylelintrc.js</code> 文件</li><li><code>stylelint.config.mjs</code> 或 <code>.stylelintrc.mjs</code> 文件，使用 ESM 导出</li><li><code>stylelint.config.cjs</code> 或使用 <code>.stylelintrc.cjs</code> <code>module.exports</code> ，使用CommonJS 导出</li><li><code>.stylelintrc.json</code> 、 <code>.stylelintrc.yml</code> 或 <code>.stylelintrc.yaml</code> 文件</li><li><code>.stylelintrc</code> JSON或YAML格式的文件，推荐 JSON 格式</li><li><code>package.json</code>的 stylelint 属性</li></ul><p>推荐使用<code>stylelint.config.js</code></p><h3 id="行内配置" tabindex="-1">行内配置 <a class="header-anchor" href="#行内配置" aria-label="Permalink to &quot;行内配置&quot;">​</a></h3><p>Stylelint 也提供了行内注释，但是不推荐使用</p><ul><li><code>/* stylelint-disable */</code>，关闭当前文件内所有规则</li><li><code>/* stylelint-disable selector-max-id, declaration-no-important */</code>，关闭指定规则</li><li><code>/* stylelint-disable-line */</code>，关闭当前行的选择器的所有规则</li><li><code>/* stylelint-disable-line declaration-no-important */</code>，关闭当前行的css属性的指定规则</li><li><code>/* stylelint-disable-next-line declaration-no-important */</code>，关闭下一行的所有或指定规则</li></ul><h3 id="stylelintignore" tabindex="-1">.stylelintignore <a class="header-anchor" href="#stylelintignore" aria-label="Permalink to &quot;.stylelintignore&quot;">​</a></h3><p>忽略特定的文件和目录，纯文本文件，每一行都是一个 glob 模式的文件或目录路径</p><p>默认忽略node_modules</p>',25),n=[a];function r(s,d,c,h,u,p){return l(),t("div",null,n)}const f=e(o,[["render",r]]);export{m as __pageData,f as default};
