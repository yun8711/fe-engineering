---
outline: deep
prev: false
next: false
---

<h1>Browserslist</h1><p>v4.21.9（2023-06-15）</p>

[github](https://github.com/browserslist/browserslist) | [官方示例](https://github.com/browserslist/browserslist-example)

## 介绍

Browserslist 是一个用于配置支持的浏览器列表的工具，通过Browserslist，开发者可以在项目中明确指定要支持的浏览器版本范围，从而让构建工具（如Webpack等）根据这些限制来做出更好的决策。

Browserslist不仅可以在前端项目中使用，还可以在Node.js环境下运行的工具中使用。例如，PostCSS、Autoprefixer和babel-env等工具都可以使用 Browserslist 来确定所需的浏览器范围，并自动提供相应的代码转换和 polyfill。

## 查询来源

Browserslist 使用 [Can I Use](https://caniuse.com/) 网站的数据来查询浏览器版本范围。也提供了在线的查询练习[网站](https://browsersl.ist/)。

## 配置

### 优先级

browerslist 将使用如下配置文件限定的的浏览器和 node 版本范围：

1. 工具 options，例如 Autoprefixer 工具配置中的 browsers 属性。
2. BROWERSLIST 环境变量。
3. 当前目录或者上级目录的browserslist配置文件。
4. 当前目录或者上级目录的browserslistrc配置文件。
5. 当前目录或者上级目录的package.json配置文件里面的browserslist配置项（**推荐**）。
6. 如果上述的配置文件缺失或者其他因素导致未能生成有效的配置，browserslist 将使用默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。

<br/>

### 配置方式

（1）在 package.json 中

```
{
  "browserslist": [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead"
  ]
}
```

<br/>

（2）.browserslistrc

在项目根目录下创建`.browerslistrc `配置文件

```
# 注释是这样写的，以#号开头
last 1 version
> 1%
maintained node versions
not dead
```

### 差异化配置

可以为不同的环境配置不同的浏览器查询条件。

Browserslist 将依赖BROWSERSLIST_ENV 或者 NODE_ENV 查询浏览器版本范围。如果两个环境变量都没有配置正确的查询条件，那么优先从 production 对应的配置项加载查询条件，如果再不行就应用默认配置。

在package.json:

```javascript
  "browserslist": {
    "production": [
      "> 1%",
      "ie 10"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version"
    ]
  }
```

在.browserslistrc 中配置：

```yaml
[production staging]
> 1%
ie 10

[development]
last 1 chrome version
last 1 firefox version
```

## 配置规则

### 浏览器

下表将浏览器名称及其目标设备映射到 browserslist 使用的标识符。

| 浏览器名称                                                                                            | 桌面端          | Android                   | iOS             | Other Mobile      |
| ----------------------------------------------------------------------------------------------------- | --------------- | ------------------------- | --------------- | ----------------- |
| Android (WebView)                                                                                     |                 | `Android`                 |                 |                   |
| Baidu                                                                                                 | `Baidu`         |                           |                 |                   |
| BlackBerry                                                                                            |                 |                           |                 | `BlackBerry` `bb` |
| Chrome                                                                                                | `Chrome`        | `ChromeAndroid` `and_chr` | ↪️`ios_saf`     |                   |
| Edge                                                                                                  | `Edge`          | ↪️ `and_chr`              | ↪️`ios_saf`     |                   |
| Electron                                                                                              | `Electron`      |                           |                 |                   |
| Firefox                                                                                               | `Firefox` `ff`  | `FirefoxAndroid` `and_ff` | ↪️`ios_saf`     |                   |
| Internet Explorer                                                                                     | `Explorer` `ie` |                           |                 | `ie_mob`          |
| Node.js                                                                                               | `Node`          |                           |                 |                   |
| [KaiOS Browser](https://medium.com/design-at-kai/what-you-didnt-know-about-kaios-browser-53937ea1636) |                 |                           |                 | `kaios`           |
| Opera                                                                                                 | `Opera`         | `op_mob`                  | ↪️`ios_saf`     |                   |
| [Opera Mini](https://en.wikipedia.org/wiki/Opera_Mini)3                                               |                 | `OperaMini`               |                 |                   |
| [QQ browser](https://en.wikipedia.org/wiki/QQ_browser)                                                |                 | `and_qq`                  |                 |                   |
| Safari                                                                                                | `Safari`        |                           | `iOS` `ios_saf` |                   |
| Samsung Internet                                                                                      |                 | `Samsung`                 |                 |                   |
| [UC Browser](https://en.wikipedia.org/wiki/UC_Browser)                                                |                 | `UCAndroid` `and_uc`      |                 |                   |

- ↪️表示浏览器使用相同的引擎捕获 name
- `op_mob` 约等于 `ChromeAndroid`
- 所有 iOS 浏览器都使用 WebKit
- Opera Mini 有“Extreme”和“High”两种数据保存模式。 `op_mini`目标是“Extreme（极致）”，“High”与普通 Opera Mobile 兼容。

<br/>

### 规则列表

[国家/地区代码](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) | [区域代码](https://github.com/browserslist/caniuse-lite/tree/main/data/regions)

可以通过查询指定浏览器和 Node.js 版本（不区分大小写）：

- `defaults`：默认浏览器，即 `> 0.5%, last 2 versions, Firefox ESR, not dead`
- 按使用情况：
  - `> 5%`：根据全球使用统计数据选择的浏览器版本，也可以 `>=`、`<`、`<=`
  - `> 5% in US`：使用美国使用统计数据，这里US代表国家/地区代码
  - `> 5% in alt-AS`：使用亚洲地区的使用统计数据，alt-AS 表示区域代码
  - `> 5% in my stats`：使用自定义数据
  - `cover 99.5%`：提供覆盖范围的最流行的浏览器
  - `cover 99.5% in US`：
  - `cover 99.5% in my stats`：
- 最新版本
  - `last 2 versions`：每个浏览器的最后 2 个版本
  - `last 2 Chrome versions`：Chrome 浏览器的最新 2 个版本
  - `last 2 major versions`或`last 2 iOS major versions`：最后 2 个主要版本的所有次要/补丁版本
- `dead`：24 个月内没有官方支持或更新的浏览器。现在是`IE 11`、`IE_Mob 11`、`BlackBerry 10`、`BlackBerry 7`、 `Samsung 4`以及`OperaMobile 12.1`的所有版本`Baidu`
- Node.js 版本：
  - `node 10`和`node 10.4`：选择最新的 Node.js`10.x.x` 或`10.4.x`版本。
  - `last 2 node versions`：选择 2 个最新的 Node.js 版本
  - `last 2 node major versions`：选择 2 个最新的 Node.js 主要版本
  - `current node`：Browserslist 目前使用的 Node.js 版本
  - `maintained node versions`：所有 Node.js 版本，仍由 Node.js 基金会[维护](https://github.com/nodejs/Release)
- 浏览器版本：
  - `iOS 7`：直接使用iOS浏览器版本7。注意，`op_mini` 有特殊版本`all`。
  - `Firefox > 20`： Firefox 版本高于 20，也可以是 `>=`，`<`、`<=`，也适用于 Node.js
  - `ie 6-8`：选择包含的版本范围。
  - `Firefox ESR`：最新的[Firefox 扩展支持版本](https://support.mozilla.org/en-US/kb/choosing-firefox-update-channel)。
  - `PhantomJS 2.1`和`PhantomJS 1.9`：选择与 PhantomJS 运行时类似的 Safari 版本
- `extends browserslist-config-mycompany``browserslist-config-mycompany`：从npm 包中获取查询
- `supports es6-module`：支持特定功能的浏览器。 `es6-module`这是[Can I Use](https://caniuse.com/)`feat`页面URL 上的参数 。所有可用功能的列表可以在 找到 。[`caniuse-lite/data/features`](https://github.com/ben-eb/caniuse-lite/tree/main/data/features)
- `browserslist config`：Browserslist 配置中定义的浏览器。在差异服务中很有用，可以修改用户的配置，例如 `browserslist config and supports es6-module`.
- `since 2015`或`last 2 years`：自 2015 年以来发布的所有版本（还有`since 2015-03`和`since 2015-03-10`）。
- `unreleased versions`或者`unreleased Chrome versions`：alpha 和 beta 版本。
- `not ie <= 8`：从之前的查询中排除 IE 8 及更低版本

<br/>

### 最佳实践

1. 只有在特定情况下，才使用 last 2 Chrome versions 这种锁定浏览器品牌的条件
2. 不要只使用 last n versions 这种配置，会导致添加太多废弃的浏览器兼容代码到项目中，最好加上 not dead，> 1%，这样的限制条件
3. 根据项目情况和产品用户制定合适的兼容范围，比如：Opera Mini在非洲拥有1亿用户，在全球市场上比微软 Edge 更受欢迎；中文QQ浏览器的市场份额比 Firefox 和桌面Safari更多

## 衍生工具

browserslit-ga：该工具能生成访问你运营的网站的浏览器的版本分布数据，以便用于类似> 0.5% in my stats查询条件, 前提是你运营的网站部署有 Google Analytics。

browserslist-useragent ： 检验某浏览器的user-agent 字符串是否匹配 browserslist 给出的浏览器范围。

browserslist-useragent-ruby ： 功能同上，ruby 库。

caniuse-api： 返回支持指定特性的浏览器版本范围

npx browserslist ：在前端工程目录下运行上面命令，输出当前工程的目标浏览器列表。
