---
outline: deep

---

<h1>忽略文件配置</h1>



## .eslintignore 文件

可以在项目的根目录下创建 `.eslintignore` 文件来指定要忽略哪些文件和目录，该文件是一个纯文本文件，其中每一行都是一个 glob 模式，表示哪些路径应该被省略掉。

Glob 使用 [node-ignore](https://github.com/kaelzhang/node-ignore) 进行匹配，因此有许多特性：

- 以 `#` 开头的行被视为注释
- 路径是相对于当前工作目录的，这也适用于通过 `--ignore-pattern`[命令](https://zh-hans.eslint.org/docs/latest/use/command-line-interface#--ignore-pattern)传递的路径。
- 前面有 `!` 的行是否定模式，重新包括被先前模式忽略的模式。
- 忽略模式的行为与 `.gitignore` [规范](https://git-scm.com/docs/gitignore)一致
- 必须使用正斜杠（`/`）作为路径分隔符

参阅 [`.gitignore`](https://git-scm.com/docs/gitignore) 的规范，了解更多有效的语法实例



通过 eslint 的 `--ignore-path`可以指定特定的忽略配置文件



## package.json 中的 eslintIgnore

也可以在 `package.json` 中的 `eslintIgnore` 指定要忽略检查的文件

```js
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    },
    "eslintIgnore": ["hello.js", "world.js"]
}
```



## 行内注释

eslint 也提供了一些行内注释，允许对局部代码进行忽略
