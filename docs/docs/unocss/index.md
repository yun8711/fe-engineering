---
outline: deep
---

# UnoCSS 概述

> v0.58.5（2024-02-27）



## 介绍

UnoCSS 是即时原子 CSS **引擎**（区别于框架），旨在灵活且可扩展。所有的CSS实用程序都是通过预设提供的。

> 个人感觉，原子类 CSS 本身是一个不错的出发点，可以在项目、团队中避免很多重复的工作。但是当它变得不那么直观、易用的时候，使用的成本就会上升，尤其是心智负担

<br/>

**对比 Windi CSS**

UnoCSS 是由 Windi CSS 的一位团队成员发起的，从 Windi CSS 的工作中汲取了很多灵感。虽然 Windi CSS 不再积极维护（截至 2023 年 3 月），但可以将 UnoCSS 视为 Windi CSS 的“精神继承者”

UnoCSS 继承了 Windi CSS 的按需特性、归因模式、快捷方式、变体组、编译模式等等。最重要的是，UnoCSS是从头开始构建的，考虑到了最大的可扩展性和性能，能够引入新的功能。

<br/>

**对比 Tailwind CSS**

Windi CSS 和 UnoCSS 都从 Tailwind CSS 中汲取了很多灵感，但它们的设计目标完全不同。

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个同构引擎，具有与构建工具（包括 PostCSS 插件）的一流集成集合。这意味着 UnoCSS 可以更灵活地在不同的地方使用（例如，CDN 运行时，它可以动态生成 CSS），并与构建工具深度集成，以提供更好的 HMR、性能和开发人员体验（例如，Inspector）。

除开技术权衡，UnoCSS 也被设计为完全可扩展和可定制，而 Tailwind CSS 则更加固执己见。在 Tailwind CSS 之上构建一个自定义设计系统可能很困难，而且你不能真正摆脱 Tailwind CSS 的约定。使用 UnoCSS，您可以完全控制构建几乎任何您想要的东西。



## 预设

[预设](https://unocss.dev/presets/)是 UnoCSS 的核心。



## 配置文件

建议使用专用 `uno.config.ts` 文件来配置 UnoCSS

1、专用配置文件能更好地与 IDE 、ESLint 插件等其他工具配合使用，还可以使 HMR 更好地工作

2、默认情况下，UnoCSS 会在项目的根目录自动查找 `uno.config.{js,ts,mjs,mts}` 或 `unocss.config.{js,ts,mjs,mts}` ，也可以手动指定配置文件，例如在 Vite 中：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS({
      configFile: '../my-uno.config.ts',
    }),
  ],
})
```

3、完整的配置如下：

```typescript
// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
```

