import { defineConfig } from "vitepress";
import configNest from "./config.nest.mjs";
import configFe from "./config.fe.mjs";
import configPkgs from "./config.pkgs.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 站点元数据，会被注入到所有页面的 HTML 中
  // 网站标题
  lang: "zh-CN",
  title: "老刘开发笔记",
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
      { text: "综合知识", link: "/integration/text-format", activeMatch: "/integration/" },
      {
        text: "前端",
        activeMatch: "/docs/",
        items: [{ text: "工程配置", link: "/docs/catalogue" }],
      },
      {
        text: "Nodejs",
        items: [
          { text: "库收集", link: "/pkgs/" },
          { text: "Nestjs", link: "/nest/basic/" },
        ],
      },
      // { text: "工具", link: "https://github.com/yun8711/yun-kit.git" },
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
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    // 在某个导航下的侧边栏配置
    sidebar: {
      "/guide/": [
        {
          items: [
            { text: "关于本站", link: "/guide/about" },
            { text: "Q&A", link: "/guide/some-questions" },
          ],
        },
      ],
      "/docs/": configFe,
      "/pkgs/": configPkgs,
      "/nest/": configNest,
    },

    // 顶部导航栏右侧图标
    socialLinks: [{ icon: "github", link: "https://github.com/yun8711/fe-configuration.git" }],
  },
});
