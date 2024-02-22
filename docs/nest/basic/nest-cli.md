---
outline: deep
---

# nest-cli

[文档](https://docs.nestjs.cn/10/cli)


## 概述

一个命令行界面工具，以帮助初始化、开发和维护 `Nest` 应用程序。包括搭建项目、以开发模式为其提供服务，以及为生产分发构建和打包应用程序。

安装：`pnpm install -g @nestjs/cli`

验证：`nest -v`，输出版本号即为安装成功

<br/>

## 常用命令

### new 创建项目

创建并初始化一个新的 `Nest` 项目，会提示使用哪种包管理器。

```shell
nest new <name> [options]
nest n <name> [options]
```

选项：

- --skip-git，-g：跳过 git 初始化
- --package-manager [package-manager]，-g：指定包管理器，必须全局安装
- --language [language]，-l：指定语言，TS/JS
- --strict：默认 false，是否开启 ts 严格模式

<br/>

### generate/g 生成器

用来快速生成各种代码，原理就是模板引擎，这些代码模版的集合是在 [@nestjs/schematics](https://github.com/nestjs/schematics/tree/master/src/lib) 这个包里。nest new 命令的底层就是 nest generate applicaion，加额外的 git init 和 npm install

```shell
nest generate <schematic> <name> [options]
nest g <schematic> <name> [options]
```

参数：

- name：生成组件的名称
- schematic：要使用的模板，常用的有
  - `app`：在 `monorepo` 中生成一个新应用程序，如果是标准项目结构，则转换为 `monorepo`
  - `resource`：快速生成一个模块，包含 crud 模板
  - `library/lib`：在 `monorepo` 中生成一个新库，如果是标准项目结构，则转换为 `monorepo` 
  - `controller/co`：控制器，即 controller 文件
  - `module/mo`：模块，
  - `service/s`：服务，即 service 文件
  - `class/cl`：类
  - `provider/pr`：提供者
  - `decorator/d`：自定义装饰器
  - `filter/f`：过滤器
  - `gateway/ga`：网关
  - `guard/gu`：守卫
  - `interface`：接口
  - `interceptor/in`：拦截器
  - `middleware/mi`：中间件
  - `pipe/pi`：管道
  - `resolver/r`：解析器

*示例：生成完整的模块*

```shell
nest g resource user
? What transport layer do you use? (Use arrow keys)
❯ REST API 
  GraphQL (code first) 
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets 
```

<br/>

*示例：生成 controller*

```shell
nest g co demo
CREATE src/demo/demo.controller.spec.ts (478 bytes)
CREATE src/demo/demo.controller.ts (97 bytes)
UPDATE src/app.module.ts (322 bytes)
```

<br/>

### start 运行

编译并运行应用程序或工作空间中的默认项目

```shell
nest start <name> [options]
```

**选项**

- `--watch，-w`：在监视模式下运行，实时重载，即实时自动 build
- `--debug [hostport]，-d`：在debug模式运行，使用–inspect标识
- `--exec [binary]，-e`：使用哪种运行时运行二进制文件（默认：`node`），也可指定别的运行时
- `--preserveWatchOutput`：在watch模式下，保存命令行输出内容而不是清空屏幕（仅在`tsc watch`模式下)
- 其他选项与 build 命令基本一致



### build 构建

将应用程序或工作区编译到输出文件夹中。

```shell
nest build <name> [options]
```

- `--path [path]，-p`：`tsconfig`文件的路径
- `--watch，-w`：在监视模式下运行，可以实时重载，自动 build，但是默认只监听 ts/js 文件，
- `--watchAssets`：会连同别的文件一同监听变化，比如 md、yml 等文件
- `--webpack`：使用 `webpack` 进行编译
- `--webpackPath`：配置 `webpack` 的路径
- `--tsc`：强制使用 `tsc` 编译
- `--config`：指定 nest cli 的配置文件

tsc 不做打包、webpack 会做打包，两种方式都可以，node 模块本来就不需要打包，但是打包成单模块会提升加载的性能。



### info 查看信息

显示项目信息，包括 nest 安装的包和其他系统信息，node、npm 和依赖版本，例如：

```shell
 liuyun@iMac  ~/Desktop/test2/nest-demo   main  nest info         

 _   _             _      ___  _____  _____  _     _____
| \ | |           | |    |_  |/  ___|/  __ \| |   |_   _|
|  \| |  ___  ___ | |_     | |\ `--. | /  \/| |     | |
| . ` | / _ \/ __|| __|    | | `--. \| |    | |     | |
| |\  ||  __/\__ \| |_ /\__/ //\__/ /| \__/\| |_____| |_
\_| \_/ \___||___/ \__|\____/ \____/  \____/\_____/\___/


[System Information]
OS Version     : macOS Unknown
NodeJS Version : v14.21.3
PNPM Version    : 8.3.1 

[Nest CLI]
Nest CLI Version : 9.0.0 

[Nest Platform Information]
platform-express version : 9.0.0
schematics version       : 9.0.0
testing version          : 9.0.0
common version           : 9.0.0
core version             : 9.0.0
cli version              : 9.0.0
```



## 配置文件

Nest在`nest-cli.json`文件中保留了组织、创建和部署标准项目和monorepo结构项目的元数据。

一般情况下，在通过 nest-cli 添加项目时会自动更新配置文件，但是有些配置需要手动修改。

### 顶层属性

- `collection`：用于配置生成部件的schematics组合的点，一般不需要改变这个值。
- `sourceRoot`：标准模式中单项目源代码根入口，或者monorepo模式结构中的默认项目。
- `compilerOptions`：全局编译器选项，用于指定编译选项和选项的设置；详见后文。
- `generateOptions`：全局生成器选项，用于指定全局生成的选项和选项的设置；详见后文。
- `monorepo`：（仅用于monorepo）在monorepo结构中，该设置始终为`true`。
- `root`：（仅用于monorepo）默认项目的项目根目录。

### compilerOptions

| 属性名称            | 值类型    | 默认值                               | 描述                                                         |
| :------------------ | :-------- | ------------------------------------ | :----------------------------------------------------------- |
| `webpack`           | `boolean` | false，在 monorepo 模式下默认为 true | 如果为`true`，使用`webpack compiler`。如果`false`或者不存在，使用`tsc` |
| `tsConfigPath`      | `string`  |                                      | （仅用于monorepo）指定`tsconfig.json`文件的路径，在使用`nest build`或者`nest start`而未指定`project`选项时将使用该设置（例如，默认项目在构建或启动时） |
| `webpackConfigPath` | `string`  |                                      | webpack选项文件，如果不指定，Nest会查找`webpack.config.js`。详见后文。 |
| `deleteOutDir`      | `boolean` |                                      | 如果为`true`，无论编译器是否激活， 首先会移除汇编输出目录（在`tsconfig.json`中配置，默认`./dist`)。 |
| `assets`            | `array`   |                                      | 当编译步骤开始时，使能非Typescript资源文件的自动部署（在–watch模式下，资源文件在增量编译时不会部署）。详见后文 |
| `watchAssets`       | `boolean` |                                      | 如果为`true`，在watch模式运行时，监视所有非Typescript资源文件（如果要更精确控制要监控的资源文件，见后续**资源文件**章节）。 |

### generateOptions

指定`nest generate`指令的默认生成选项：

- spec：boolean 或 object，
  - 如果值为 boolean，用于指定是否默认生成 spec 测试文件，可以使用`--flag`来覆盖该配置
  - 如果值为 object，每个键代表一个 schematic 名称，而它的值也为 boolean，表示是否为特定的 schematic 生成 spce

*示例*

```json
// 在所有项目中禁用spec文件生成
{
  "generateOptions": {
    "spec": false
  },
  ...
}

// spec文件生成仅在service的schematics被禁用
{
  "generateOptions": {
    "spec": {
      "service": false
    }
  },
  ...
}
```

