export default [
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
          { text: "概述", link: "/docs/typescript/" },
          { text: "jsconfig.json配置", link: "/docs/typescript/jsconfig" },
          { text: "tsconfig.json配置", link: "/docs/typescript/tsconfig" },
        ],
      },
      {
        text: "UnoCSS",
        link: "/docs/unocss/",
        collapsed: true,
        items: [
          { text: "概述", link: "/docs/unocss/" },
          { text: "配置", link: "/docs/unocss/config" },
          { text: "预设", link: "/docs/unocss/presets" },
        ],
      },
    ],
  },
];
