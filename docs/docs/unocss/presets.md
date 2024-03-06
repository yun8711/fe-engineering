---
outline: deep
---

# UnoCSS 常用预设

> v0.58.5（2024-02-27）

社区预设：https://unocss.dev/presets/community

以下是一些官方预设

## 样式重置

UnoCSS 提供了一个小集合用于快速获取样式重置库

<br/>

### 用法

1、安装

```
pnpm add @unocss/reset
```

2、使用

将以下重置样式表之一添加到 main.js 文件中：

[Normalize.css](https://github.com/csstools/normalize.css)

```js
import '@unocss/reset/normalize.css'
```

[sanitize.css](https://github.com/csstools/sanitize.css)

```js
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
```

[Eric Meyer](https://meyerweb.com/eric/tools/css/reset/index.html)

```js
import '@unocss/reset/eric-meyer.css'
```

Tailwind

```js
import '@unocss/reset/tailwind.css'
```

Tailwind compat

此重置样式表基于 Tailwind，删除了按钮的背景颜色覆盖，避免与 UI 库发生冲突

```js
import '@unocss/reset/tailwind-compat.css'
```





## 默认预设

此预设提供了包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等流行的框架的超集，也就是说这些框架的规则，都可以直接使用

继承 `@unocss/preset-wind` 和 `@unocss/preset-mini` ，目前等同于 `@unocss/preset-wind`

<br/>

### 用法

1、安装

```
pnpm add -D @unocss/preset-uno
```

2、配置

此预设包含在包中 `unocss` ，也可以从那里导入它

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
// 或
import { presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
  ],
})
```

<br/>

### 选项

此预设的选项继承自 `@unocss/preset-mini` 



## 最小预设

UnoCSS 的基本预设，是 `@unocss/preset-wind` 的子集，仅包含与 CSS 属性一致的最基本的样式集，但不包括 Tailwind CSS 中引入的有争议的或复杂的样式（ `container` 、 `gradient` 等 `animation` ）。

<br/>

### 用法 

1、安装

```
pnpm add -D @unocss/preset-mini
```

2、配置

此预设包含在包中 `unocss` ，也可以从那里导入它

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetMini from '@unocss/preset-mini'
// 或
import { presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    // ...other presets
  ],
})
```

<br/>

### 选项

**dark**

类型： `class | media | DarkModeSelectors`，默认： `class`

深色模式选项。它可以是 `class` 、 `media` 或自定义选择器对象 （ `DarkModeSelectors` ）

```ts
interface DarkModeSelectors {
  /**
   * Selector for light variant.
   *
   * @default '.light'
   */
  light?: string

  /**
   * Selector for dark variant.
   *
   * @default '.dark'
   */
  dark?: string
}
```

**attributifyPseudo**

类型： `Boolean`，默认： `false` 

生成伪选择器 `[group=""]`  而不是 `.group` 

**variablePrefix**

类型： `string`，默认：`un-`

自定义 css 属性（变量）的前缀

**prefix**

类型： `string | string[]`，默认：`undefined`

Utils 前缀，用于设置生成的实用程序类的前缀。例如，如果你设置 prefix: 'u-'，那么生成的实用程序类会变为 u-bg-red、u-text-green 等

**preflight**

类型： `Boolean`，默认： `true`

配置是否使用 Unocss 的预设样式。默认情况下，Unocss 会提供一些基础的样式重置。如果你不想使用这些预设样式，可以设置为 false。

<br/>

### 特性

**深色模型**

**CSS @layer**

**主题**



## Wind 预设

UnoCSS 的 Tailwind CSS / Windi CSS 紧凑预设，继承 `@unocss/preset-mini` 

<br/>

### 用法 

1、安装

```
pnpm add -D @unocss/preset-wind
```

2、配置

包含在包中 `unocss` ，也可以从那里导入它

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'
// 或
import { presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
  ],
})
```



## Rem 转 px

将所有的 rem 转换为 px

<br/>

### 用法 

1、安装

```
pnpm add -D @unocss/preset-rem-to-px
```

2、配置

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetRemToPx(),
    // ...other presets
  ],
})
```

<br/>

### 选项

baseFontSize 

类型： `number`，默认：16

将 rem 转换为 px 的基本字体大小（ `1rem = n px` ）



## 图标

在 UnoCSS 中使用纯 CSS 图标，并且可以按需加载。

作者在 [antfu 聊聊纯 CSS 图标](https://antfu.me/posts/icons-in-pure-css-zh) 文章里说明了如何实现的纯 CSS 图标。

使用 Iconify 作为图标的数据源，所以使用时，需要安装对应的图标集，例如：`@iconify-json/mdi` 表示 Material Design 的图标集，也可以使用 `@iconify/json` 安装[全部图标集](https://icon-sets.iconify.design/)，约 130MB

<br/>

### 用法 

1、安装

```
pnpm add -D @unocss/preset-icons @iconify-json/[图标集名称]
```

2、配置

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'
// 或
import { presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```

<br/>

### 特性

<br/>

**额外属性**

提供额外的 CSS 属性来控制图标的默认行为。以下是默认情况下使图标内联的示例：

```ts
presetIcons({
  extraProperties: {
    'display': 'inline-block',
    'vertical-align': 'middle',
    // ...
  },
})
```

<br/>

**模式覆盖**

默认情况下，此预设将根据图标的特征自动为每个图标选择渲染模式。如果希望显示的控制图标的渲染模式，可以通过下面的标识：

- `?bd`：将图标显现为背景图片，用于固定颜色的图标
- `?mask`：将图标呈现为蒙版图像，用于可变颜色的图标

```html
<div class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4">
  <div class="i-vscode-icons:file-type-light-pnpm" />
  <div class="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
</div>
```

<br/>

**图标集合和解析程序**

**在浏览器中**

使用 `@iconify-json/[图标集名称]`，不要使用 `@iconify/json` ，因为 `json` 文件很大

1、使用构建工具

使用`import`动态导入，以便使它们作为异步模块实现按需加载

```ts
import presetIcons from '@unocss/preset-icons/browser'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
      }
    })
  ]
})
```

2、自定义集合

使用 CustomIconLoader 或 InlineCollection 提供自己的自定义集合，例如使用 `InlineCollection` ：

```ts
presetIcons({
  collections: {
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ... */
    },
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
    /* ... */
  }
})
```

然后，你可以在你的html上使用它： `<span class="i-custom:circle"></span>`

**在 Nodejs 中**

https://unocss.dev/presets/icons#node-js

<br/>

### 选项

**scale**

类型： `number`，默认：1

与当前字体大小相关的比例 （1em）

**mode**

类型： `'mask' | 'background-img' | 'auto'`，默认：`'auto'`

生成的 CSS 图标的模式，

- `mask`：使用背景颜色和单色图标的 `mask` 属性
- `background-img` - 使用背景图像作为图标，颜色是静态的

**prefix**

类型： `string | string[]`，默认：`i-`

用于匹配图标规则的类前缀。

**extraProperties**

类型： `Record<string, string>`，默认：`{}`

应用于生成的 CSS 的额外 CSS 属性

**warn**

类型： `boolean`，默认：`false`

当缺少的图标匹配时发出警告。

**collections**

类型： `Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>`，默认：`undefined`

Node.js环境中，预设将自动搜索已安装的 iconify 数据集。在浏览器中使用时，提供此选项是为了给数据集提供自定义加载机制。

**customizations**

类型： `Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>`，默认：`undefined`

自定义图标定义。

**autoInstall**

类型： `boolean`，默认：`false`

检测到使用情况时自动安装图标源包。仅在 node 环境生效，在 browser 环境下此选项被忽略

**unit**

类型： `string`，默认：`em`

自定义图标单位

**cdn**

类型： `string`，默认：`undefined`

从 CDN 加载图标。应以 `https://` `/` 开头和结尾，建议：

- `https://esm.sh/`
- `https://cdn.skypack.dev/`



## 标签化

当只需要将单个 unocss 规则应用于元素时，此预设可以简化标签书写

> 人个感觉，这个特性增大了心智负担，如果对 unocss 不了解，代码可读性会很差

### 用法 

1、安装

```
pnpm add -D @unocss/preset-tagify
```

2、配置

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import presetTagify from '@unocss/preset-tagify'

export default defineConfig({
  presets: [
    presetTagify({ /* options */ }),
    // ...other presets
  ],
})
```

<br/>

### 说明

如下为正常的书写模式

```html
<span class="text-red"> red text </span>
<div class="flex"> flexbox </div>
I'm feeling <span class="i-line-md-emoji-grin"></span> today!
```

使用 tagify 模式，您可以将 CSS 样式嵌入到 HTML 标签中：

```html
<text-red> red text </text-red>
<flex> flexbox </flex>
I'm feeling <i-line-md-emoji-grin /> today!
```

<br/>

### 选项

**prefix**

类型：`string`

用于 tagify 变体的前缀。

**excludedTags**

类型： `string[] | RegExp[]`，默认：`['b', /^h\d+$/, 'table']`

从处理中排除的标记。

**extraProperties**

类型： `Record<string, string> | ((matched: string) => Partial<Record<string, string>>)`

要应用于匹配规则的额外 CSS 属性，可以将额外的属性注入匹配的规则：

```ts
presetTagify({
  // adds display: inline-block to matched icons
  extraProperties: matched => matched.startsWith('i-')
    ? { display: 'inline-block' }
    : { }
})

presetTagify({
  // 可以是一个对象
  extraProperties: { display: 'block' }
})
```

**defaultExtractor**

类型： `boolean`，默认：`true`

启用默认提取器。



## [属性化](https://unocss.dev/presets/attributify)

为其他预设启用属性化模式。

> 人个感觉，在一般项目中，使用 ui 库的情况下，不太会出现类名列表过长的问题，而且这个特性增大了心智负担，如果对 unocss 不了解，代码可读性会很差

### 用法 

1、安装

```
pnpm add -D @unocss/preset-attributify
```

2、配置

```ts
// uno.config.ts
import presetAttributify from '@unocss/preset-attributify'
// 或
import { presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */ }),
    // ...
  ],
})
```



### 说明

所谓属性化，就是把 class 类名以 html 属性的形式书写，避免类名列表过长

例如：使用 Tailwind CSS 的实用程序来获得下面的按钮。当列表变长时，阅读和维护变得非常困难。

```html
<button class="bg-blue-400 hover:bg-blue-500 text-sm text-white font-mono font-light py-2 px-4 rounded border-2 border-blue-200 dark:bg-blue-500 dark:hover:bg-blue-600">
  Button
</button>
```

使用归因模式，您可以将实用程序划分为属性：

```html
<button
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
  text="sm white"
  font="mono light"
  p="y-2 x-4"
  border="2 rounded blue-200"
>
  Button
</button>
```



