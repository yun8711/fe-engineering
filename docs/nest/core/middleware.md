---
outline: deep
---



# Middleware 中间件




## 介绍

中间件是在路由处理程序 **之前** 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数，该函数通常由名为 `next` 的变量表示

![nest_middleware_01](../../images/nest/middleware_1.png)

Nest 中间件与 [express](http://expressjs.com/en/guide/using-middleware.html) 中间件很像，常见的功能：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求-响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。



### 应用场景

日志系统、cors跨域处理、图片防盗等

### 分类

按照编写形式，可分为：类中间件，函数中间件

按照作用范围，可分为：全局中间件，局部中间件





## 定义中间件

### 类中间件

使用`@Injectable()`装饰器，必须实现`NestMiddleware`接口，即重写 use 方法，该方法有三个参数：

-  req：请求对象
-  res：响应对象
-  next：一个函数，在实现逻辑中，最后必须执行 `next()`，否则会阻塞请求

下面以日志中间件为例

> 使用 `nest g mi logger`方式自动创建的中间件，会默认放在 src 目录下

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    console.log(`Request...${method} ${path}`);
    next();
  }
}
```



### 函数中间件

 `LoggerMiddleware` 类非常简单，没有成员、额外的方法、依赖关系，所以可以转换为函数中间件。

```typescript
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```



## 使用中间件

### 局部使用

中间件创建完成后，需要在模块中进行挂载，但是 `@Module()` 装饰器没有中间件的相关配置，必须让`module`类实现`NestModule`接口，实现 `configure()` 方法来挂载。

*以日志中间件为例，把它应用在 User 模块中时，`user.module.ts`中内容如下：*

```typescript
import { Module, NestModule,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .exclude({path:'hello',method:RequestMethod.GET}) // 排除的路径及方法
      .forRoutes('*'); // 要应用的路由，这里表示所有路径，相当于全局使用
  }
}
```



### MiddlewareConsumer

`MiddlewareConsumer`是一个帮助类，提供了几种内置方法来管理中间件，可以链式调用。

- `apply()` ：表示挂载哪个中间件，可以指定单个中间件或多个中间件
- `exclude()` 方法用来排除某些路由，可以是一或多个字符串（`'cats/(.*)'`）、一个 `RouteInfo` 对象（`{path: 'cats', method: RequestMethod.GET}`）来标识不应用中间件的路由
- `forRoutes()` ：表示作用范围，可接受一或多个字符串、对象、一或多个控制器类

**路由通配符**

路由同样支持模式匹配。

```js
forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
```

以上路由地址将匹配 `abcd` 、 `ab_cd` 、 `abecd` 等。字符 `?` 、 `+` 、 `*` 以及 `()` 是它们的正则表达式对应项的子集。连字符 (`-`) 和点 (`.`) 按字符串路径解析。

**多个中间件**

为了绑定顺序执行的多个中间件，可以在 `apply()` 方法内用逗号分隔它们。

```js
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```



### 全局使用

如果想一次性将中间件绑定到每个路由，可以使用由`INestApplication`实例提供的 `use()`方法：

```typescript
// main.ts

import { LoggerMiddleware } from './common/middleware/logger.middleware';

const app = await NestFactory.create(AppModule);
app.use(LoggerMiddleware);
await app.listen(3000);
```

`app.use()` 方法的参数可以是一个函数，也可以是一个实现了 NestMiddleware 接口的中间件类的实例

> 使用时发现全局使用中间件时，只能使用函数
