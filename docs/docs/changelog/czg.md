---
outline: deep
prev: false
next: false

---

<h1>czg</h1><p>v1.7.0</p>

[czg官网](https://cz-git.qbb.sh/zh/cli/) | [cz-git - github](https://github.com/Zhengqbbb/cz-git)

<br/>

尽管使用 Commitlint 可以对 Git 提交信息进行检查，但它的只能在我们 git commit 的时候才能触发，对于刚刚参与到项目，或者不熟悉 commitlint 的开发者来说，面对提交时有点迷茫，所以提供友好的提示可以帮助开发者熟悉这个流程。



## Commitizen

commitizen 是一个命令行交互式的 git commit 替代工具，可以让你不再手动输入 commit 类型。

注意：Commitizen 是另一个团队的仓库，他们也提供了与 conventional-changelog 团队类似的工具链，但与 conventional-changelog 没有直接的关系，只是习惯这么去搭配使用。

长期以来 Commitizen 都是项目中进行 commitlint 提示的首选，但是现在**推荐使用 czg**。



## czg

关于 czg 的介绍，可以查看中文官网，内容很详细。这里要区别两个工具：

[cz-git](https://cz-git.qbb.sh/zh/guide/introduction) : 一款轻量级，交互友好，高度自定义，遵循标准 Angular commit 规范的 Commitizen Adapter

> 就是与 commitizen 进行兼容的适配器，这种情况下需要全局安装 commitizen

[czg](https://cz-git.qbb.sh/zh/cli/) : 可以理解为是一款内置了 `cz-git` 适配器的 `Commitizen CLI` 替代品

> czg 是一个可直接使用的 CLI 工具，也是一般情况下直接在项目使用的调用的命令

在使用 czg 的过程中，感受最好的地方就是完美的兼容性和高度的自定义



## 用法

官网有详细的用法说明，这里只简要说一下几种方式：

### npx czg

如果是临时使用，可以直接在项目终端下输入 ` pnpm dlx czg` 或 `npx czg` 就可以调用起来

<br/>

### cz-git + commitlint + commitizen

使用 commitizen 提供的CLI 工具，指定适配器为 cz-git，使用 commitlint 进行最终的校验

全局安装 commitizen，项目内安装 cz-git

```
pnpm add commitizen -g
pnpm add cz-git -D
```

在 package.json 中增加 commitizen 配置和脚本

```json
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      // 指定适配器
      "path": "node_modules/cz-git",
      // 其他自定义配置
    }
  }
}
```

不过一般都把自定义配置放在 commitlint.config.js 中，避免 package.json 中内容过多

``` json
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```

<br/>

### czg CLI + commitlint

czg 内置了 cz-git，完全可以用来代替 commitizen，从实际使用来看，这种方式更方便

全局安装 czg，使用方式也是在当前项目下调用 czg

在 commitlint.config.js 中添加 czg 的配置即可。
