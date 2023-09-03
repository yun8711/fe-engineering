---
outline: deep
prev: false
next: false



---

<h1>Github Pages</h1>

[官网](https://docs.github.com/zh/pages) | [官方示例](https://github.com/collections/github-pages-examples)



## 介绍

GitHub Pages 是一项静态站点托管服务，它直接从 GitHub 上的仓库获取 HTML、CSS 和 JavaScript 文件，也可以通过构建过程运行文件，或者配置 github actions 来发布网站。通过 GitHub 托管和发布的公共网页，可以用来展示一些开源项目、博客甚或分享您的简历，



## 示例

### 使用 github actions 发布 vitepress 项目

在启用了 `pages` 后可以在 `actions` 界面中看到一条默认的 `pages-build-deployment workflow`，里面默认会使用 `jekyll` 来 `build` 页面，上传制品，然后进行 `deploy` 发布页面。通过 `action` 进度可以清晰的看到发布的情况。

默认的 `workflow` 只能支持 `jekyll` 和静态页面，如果文档或站点使用了一些其它的工具需要构建，则可以借助其他的 `workflow` 来完成，下面是发布 vitepress 项目的配置示例

```yaml
# 工作流名称
name: Deploy Pages
# master分支有push操作时触发
on:
  push:
    branches: [ master ]

jobs:
  deploy:
    # 运行环境
    runs-on: ubuntu-latest
    steps:
      # 检出仓库
      - name: Checkout
        uses: actions/checkout@v3
      # 安装PNPM
      - name: Setup Pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: false
      # 安装依赖并构建
      - name: Install and Build
        run: | 
          pnpm install
          pnpm docs:build
      # 部署到gh-pages
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.ACCESS_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

