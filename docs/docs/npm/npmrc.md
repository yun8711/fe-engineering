---
outline: deep
#prev: false
#next: false
---

<h1>.npmrc</h1><p>npm v9.8.0 nodejs v20</p>

[官网](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)



## 介绍

npm 可以从命令行、环境变量、`.npmrc`中获取配置，因此，`.npmrc` 就是用来调设置 npm 的配置项的。

参阅 [完整配置项 - npm config](https://docs.npmjs.com/cli/v9/using-npm/config)

## 配置文件

电脑中会有多个 .npmrc 文件，在我们使用 npm 的时候，会按照如下顺序读取这些配置文件，优先级从高到低：

- 项目配置文件: /project/.npmrc
- 用户配置文件：~/.npmrc
- 全局配置文件：$PREFIX/etc/npmrc
- npm 内置配置文件 /path/to/npm/npmrc

所有 npm 配置文件都是 ini 格式的`key = value`参数列表

## 常用配置

### registry 安装源

```
# 修改默认的安装源
registry=http://mirrors.cloud.tencent.com/npm/
# 指定私有源，这里专指以 @kd 开头的依赖包
@kd:registry=http://192.168.12.201:4873/
```
