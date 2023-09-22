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
      { text: "首页", link: "/" },
      { text: "关于本站", link: "/guide/about", activeMatch: "/guide/" },
      { text: "文档目录", link: "/docs/catalogue", activeMatch: "/docs/" },
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
          // text: "指引",
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
            { text: "EditorConfig", link: "/docs/editorconfig" },
            { text: "jsconfig.json", link: "/docs/jsconfig" },
            {
              text: "ESLint",
              link: "/docs/eslint/",
              collapsed: true,
              items: [
                { text: "parser", link: "/docs/eslint/parser" },
                { text: ".eslintrc", link: "/docs/eslint/eslintrc" },
                { text: ".eslintignore", link: "/docs/eslint/eslintignore" },
              ],
            },
            {
              text: "Git",
              link: "/docs/git/gitattributes",
              collapsed: true,
              items: [
                { text: "git workflows", link: "/docs/git/git-workflows" },
                { text: ".gitattributes", link: "/docs/git/gitattributes" },
                { text: ".gitignore", link: "/docs/git/gitignore" },
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
            { text: "Husky", link: "/docs/husky" },
            { text: "Prettier", link: "/docs/prettier" },
            { text: "Lint-staged", link: "/docs/lint-staged" },
            { text: "ls-lint", link: "/docs/ls-lint" },
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
              text: "Stylelint",
              link: "/docs/stylelint/",
              collapsed: true,
              items: [{ text: ".stylelintrc", link: "/docs/stylelint/stylelintrc" }],
            },
          ],
        },
      ],
    },

    // 顶部导航栏右侧图标
    socialLinks: [{ icon: "github", link: "https://github.com/yun8711/fe-configuration.git" }],
  },
});
