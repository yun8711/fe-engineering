import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点元数据，会被注入到所有页面的 HTML 中
  // 网站标题
  lang: "zh-CN",
  title: "前端工程",
  // 网站描述
  description: "分享前端工程配置，探索前端工程最佳实践",
  base: "/fe-engineering/",
  // 指定源文件目录，默认是在根目录下
  srcDir: "./",
  // 显示最新更新时间
  lastUpdated: true,
  // 纯净url，去掉.html后缀
  cleanUrls: true,

  // 主题配置
  // @see https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // 首页顶部导航栏
    nav: [
      { text: "关于本站", link: "/guide/about", activeMatch: "/guide/" },
      { text: "配置文档", link: "/docs/catalogue", activeMatch: "/docs/" },
      { text: "npm包", link: "/pkgs/", activeMatch: "/pkgs/" },
      { text: "工具", link: "https://github.com/yun8711/yun-kit.git" },
    ],
    // 每个页面右侧大纲标题
    outline: {
      label: "内容大纲",
    },
    // 全局搜索功能，使用浏览器的搜索功能
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "没有找到相关结果",
                resetButtonTitle: "重置搜索",
                footer: {
                  selectText: "选择",
                  navigateText: "导航到",
                },
              },
            },
          },
        },
      },
    },

    // 在某个导航下的侧边栏配置
    sidebar: {
      "/guide/": [
        {
          items: [
            { text: "关于本站", link: "/guide/about" },
            { text: "Q&A", link: "/guide/some-questions" },
            { text: "文本格式", link: "/guide/text-format" },
            { text: "Cosmiconfig", link: "/guide/cosmiconfig" },
          ],
        },
      ],
      "/docs/": [
        {
          items: [
            { text: "文档目录", link: "/docs/catalogue" },
            { text: "EditorConfig", link: "/docs/editorconfig" },
            {
              text: "Prettier",
              link: "/docs/prettier/",
              collapsed: true,
              items: [
                { text: "概述", link: "/docs/prettier/" },
                { text: "配置详解", link: "/docs/prettier/prettierrc" },
              ],
            },
            {
              text: "ESLint",
              link: "/docs/eslint/",
              collapsed: true,
              items: [
                { text: "概述", link: "/docs/eslint/" },
                { text: "解析器", link: "/docs/eslint/parser" },
                { text: "Flat Config 配置详解", link: "/docs/eslint/eslint-config-js" },
                { text: "eslintrc* 配置详解", link: "/docs/eslint/eslintrc" },
                { text: "忽略文件配置", link: "/docs/eslint/eslintignore" },
                { text: "插件:eslint-config-prettier", link: "/docs/eslint/eslint-config-prettier" },
                { text: "插件:eslint-plugin-prettier", link: "/docs/eslint/eslint-plugin-prettier" },
                { text: "插件:typescript-eslint", link: "/docs/eslint/typescript-eslint" },
                { text: "插件:@babel/eslint-parser", link: "/docs/eslint/babel-eslint-parser" },
                { text: "插件:eslint-plugin-vue", link: "/docs/eslint/eslint-plugin-vue" },
                { text: "插件:eslint-define-config", link: "/docs/eslint/eslint-define-config" },
              ],
            },
            {
              text: "Stylelint",
              link: "/docs/stylelint/",
              collapsed: true,
              items: [
                { text: "概述", link: "/docs/stylelint/" },
                { text: "配置详解", link: "/docs/stylelint/stylelintrc" },
                { text: "集成插件", link: "/docs/stylelint/integrate" },
              ],
            },
            { text: "markdownlint", link: "/docs/markdownlint" },
            { text: "ls-lint", link: "/docs/ls-lint" },
            { text: "Husky", link: "/docs/husky" },
            { text: "Lint-staged", link: "/docs/lint-staged" },
            { text: "Browserslist", link: "/docs/browserslist" },
            {
              text: "版本和changelog管理",
              link: "/docs/changelog/",
              collapsed: true,
              items: [
                { text: "commitlint", link: "/docs/changelog/commitlint" },
                { text: "czg", link: "/docs/changelog/czg" },
                { text: "release-it", link: "/docs/changelog/release-it" },
                { text: "conventional-changelog", link: "/docs/changelog/conventional-changelog" },
              ],
            },
            {
              text: "Pnpm",
              link: "/docs/pnpm/",
              collapsed: true,
              items: [
                { text: "概述", link: "/docs/pnpm/" },
                { text: ".npmrc配置", link: "/docs/pnpm/npmrc" },
                { text: "功能", link: "/docs/pnpm/function" },
              ],
            },
            {
              text: "npm",
              link: "/docs/npm/package-json",
              collapsed: true,
              items: [
                { text: "package.json", link: "/docs/npm/package-json" },
                { text: "package-lock.json", link: "/docs/npm/package-lock" },
                { text: ".npmrc", link: "/docs/npm/npmrc" },
              ],
            },
            {
              text: "Git",
              link: "/docs/git/gitignore",
              collapsed: true,
              items: [
                { text: ".gitignore", link: "/docs/git/gitignore" },
                { text: ".gitattributes", link: "/docs/git/gitattributes" },
                { text: "Git LFS", link: "/docs/git/git-lfs" },
                { text: "Git Workflows", link: "/docs/git/git-workflows" },
              ],
            },
            {
              text: "Github",
              link: "/docs/github/github-actions",
              collapsed: true,
              items: [
                { text: "github actions", link: "/docs/github/github-actions" },
                { text: "github pages", link: "/docs/github/github-pages" },
              ],
            },
            {
              text: "TypeScript",
              link: "/docs/typescript/",
              collapsed: true,
              items: [
                { text: "jsconfig.json", link: "/docs/typescript/jsconfig" },
                { text: "tsconfig.json", link: "/docs/typescript/tsconfig" },
              ],
            },
          ],
        },
      ],
      "/pkgs/": [
        {
          items: [
            { text: "文档目录", link: "/pkgs/" },
            { text: "escape-html", link: "/pkgs/escape-html" },
            { text: "prismjs", link: "/pkgs/prismjs" },
          ],
        },
      ],
    },

    // 顶部导航栏右侧图标
    socialLinks: [{ icon: "github", link: "https://github.com/yun8711/fe-configuration.git" }],
  },
});
