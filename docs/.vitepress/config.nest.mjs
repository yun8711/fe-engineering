export default [
  {
    text: "Nestjs",
    link: "/nest/basic/",
    items: [
      {
        text: "基础",
        collapsed: true,
        activeMatch: "/nest/basic/",
        items: [
          { text: "概述", link: "/nest/basic/" },
          { text: "nest-cli", link: "/nest/basic/nest-cli" },
          { text: "理解 IoC", link: "/nest/basic/ioc" },
          { text: "理解 AOP", link: "/nest/basic/aop" },
          { text: "HTTP 数据传输", link: "/nest/basic/http-transfer" },
          { text: "内置装饰器", link: "/nest/basic/decorator" },
        ],
      },
      {
        text: "核心",
        collapsed: true,
        items: [
          { text: "module", link: "/nest/core/module" },
          { text: "provider", link: "/nest/core/provider" },
          { text: "middleware", link: "/nest/core/middleware" },
          { text: "pipe", link: "/nest/core/pipe" },
        ],
      },
      {
        text: "进阶",
        collapsed: true,
        items: [
          { text: "全局配置", link: "/nest/advanced/setting" },
          { text: "日志系统", link: "/nest/advanced/log" },
          { text: "参数校验", link: "/nest/advanced/validate" },
          { text: "异常过滤器", link: "/nest/advanced/exception-filter" },
          { text: "集成redis", link: "/nest/advanced/redis" },
          { text: "集成mysql", link: "/nest/advanced/mysql" },
          { text: "集成swagger", link: "/nest/advanced/swagger" },
          { text: "集成compodoc", link: "/nest/advanced/compodoc" },
          { text: "登录状态", link: "/nest/advanced/login" },
        ],
      },
      // { text: "数据库", link: "/nest/index2" },
    ],
  },
  // {
  //   text: "数据库",
  //   link: "/nest/db/",
  //   items: [
  //     { text: "概述", link: "/nest/db/" },
  //     // { text: "配置", link: "/nest/index1" },
  //     // { text: "数据库", link: "/nest/index2" },
  //   ],
  // },
];
