---
outline: deep
---



# Module 模块




## 全局模块

模块导出 provider，另一个模块需要 imports 它才能用这些 provider。如果某个模块被其他多个模块依赖时，每次都要 imports 就很麻烦，这时可以把它设置为全局，不用在每次使用时都声明要导入

在被设置为全局模块的类上增加 `@Global() `即可

```typescript
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class PersonModule {}
```

这样，这个模块就是全局模块了，不用再像下面这样每次使用时都需要声明导入

```typescript
@Module({
  imports: [PersonModule],
})
```

> **注意**：全局模块还是尽量少用，不然注入的很多 provider 都不知道来源，会降低代码的可维护性。



## 生命周期

Nest 在启动的时候，会递归解析 Module 依赖，扫描其中的 provider、controller，注入它的依赖。

全部解析完后，会监听网络端口，开始处理请求。

这个过程中，Nest 暴露了一些生命周期方法：下面每个阶段的生命周期函数，都是**先依次调用模块内的 controller、provider 的生命周期方法，然后再执行执行 module 的生命周期方法**

1、onModuleInit：递归初始化模块阶段

```typescript
export interface OnModuleInit {
	onModuleInit(): any;
}
```

2、onApplicationBootstrap：初始化完之后

```typescript
export interface OnApplicationBootstrap {
	onApplicationBootstrap(): any;
}
```

4、然后监听网络端口，应用正常运行

3、onModuleDestroy：模块销毁时

```typescript
export interface OnModuleDestroy {
	onModuleDestroy(): any;
}
```

4、beforeApplicationShutdown：应用销毁前

```typescript
export interface BeforeApplicationShutdown {
	beforeApplicationShutdown(signal?: string): any;
}
```

可以拿到系统信号 signal，比如：SIGTERM，这些终止信号是别的进程传过来的，让它做一些销毁的事情，比如用 k8s 管理容器的时候，可以通过这个信号来通知它

5、停止监听网络端口

6、onApplicationShutdown：应用销毁后

```typescript
export interface OnApplicationBootstrap {
	onApplicationBootstrap(): any;
}
```

7、停止进程

<br/>

在类上使用这些生命周期时，只需要实现这些接口即可，**注意：需要实现所有成员**

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  getHello(): string {
    return 'Hello World!';
  }

  onModuleDestroy(): any {}

  onModuleInit(): any {}
}
```
