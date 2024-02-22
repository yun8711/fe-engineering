---
outline: deep
---



# Provider 提供者



## 概念

Providers 是 `Nest` 的一个基本概念。许多基本的 `Nest` 类可能被视为 provider ，如：`service`,` repository`, `factory`, `helper` 等等，他们都可以通过 `constructor` **注入**依赖关系。

Nest 实现了 IOC 容器，会从入口模块开始扫描，分析 Module 之间的引用关系，对象之间的依赖关系，自动把 provider 注入到目标对象

这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 `Nest`运行时系统。 

<br/>

Provider 就是一个用 `@Injectable()` 装饰器注释的类。

Provider 的使用一般分为三个步骤：

- 声明：声明一个 provider
- 注册：把声明的 provider 注册到容器上
- 注入：在使用的地方注入 provider



## 常见类型

除了服务（service）之外，模块中还可以导出其他类型的提供者，包括以下几种常见的类型：

1. 工厂（Factory）： 工厂是一种提供者，用于动态创建和提供其他对象的实例。它可以是一个类或函数，通过在模块的 `providers` 数组中声明并使用 `useFactory` 属性来指定。
2. 仓库（Repository）： 仓库是一种用于访问和操作持久化数据的提供者。它通常与数据库交互，并提供对数据的增删改查操作。在 NestJS 中，仓库通常与数据库框架（如 TypeORM 或 Mongoose）一起使用。
3. 配置（Configuration）： 配置提供者用于提供应用程序的配置信息，例如数据库连接字符串、API 密钥等。它可以从环境变量、配置文件或其他配置源中获取配置数据，并在模块中进行使用。
4. 日志记录器（Logger）： 日志记录器提供者用于记录应用程序的日志信息。它可以封装日志库，并提供对日志的写入和管理功能。通过将日志记录器作为提供者，在模块中可以轻松地使用和注入日志记录功能。
5. 中间件（Middleware）： 中间件提供者用于处理进入应用程序的请求和响应。它可以执行各种操作，例如身份验证、日志记录、错误处理等。通过将中间件作为提供者，可以将其注入到应用程序的请求处理管道中。

除了上述提到的类型，还可以自定义其他类型的提供者，只要它们符合依赖注入的规则并满足应用程序的需求。

在 NestJS 中，提供者的目的是封装可重用的功能，并通过依赖注入机制在应用程序中进行使用。通过合理使用提供者，可以实现代码的模块化、可测试性和可维护性，并支持应用程序的解耦和扩展。





## 一般用法

使用 @Injectable 修饰 class 来声明 provider

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

在 Module 的 providers 里注册：

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

在使用的地方，注入该 Provider

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    // 使用注入的 provider
    return this.appService.getHello();
  }
}
```



## 注入 Provider

在上面的一般用法中，注入 provider 使用的是构造器注入方式，还可以使用 @inject 进行基于属性的注入

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入
  constructor(private readonly appService: AppService) {}
  
  // 属性注入
  @inject(AppService)
  private readonly appService: AppService;
}
```

两种注入方式的效果是一样的，

不过使用基于属性的注入可以简化代码，并提高可读性。然而，它也有一些限制，例如无法在构造函数中执行进一步的初始化逻辑，因为依赖项在构造函数之前被注入。

>  **注意：**基于属性的注入需要开启 `experimentalDecorators` 和 `emitDecoratorMetadata` 两个ts编译器选项

在某些非常特殊的情况下，基于属性的注入可能会有用。例如，如果顶级类依赖于一个或多个 providers，那么通过从构造函数中调用子类中的 `super()` 来传递它们就会非常烦人了。因此，为了避免出现这种情况，可以在属性上使用 `@Inject()` 装饰器。

### 可选 provider

有时，您可能需要解决一些依赖项。例如，您的类可能依赖于一个**配置对象**，但如果没有传递，则应使用默认值。在这种情况下，注入变为可选的， `provider` 不会因为缺少配置导致错误。

在 `constructor` 的参数中使用 `@Optional()` 装饰器来指示 provider 是可选的

```typescript
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}
}
```

### 手动实例化

可以通过手动实例化来获取依赖项的实例。这在一些特定情况下是很有用的，比如当需要在应用程序的上下文之外使用依赖项时，或者在一些特殊的测试场景下。

```typescript
import { MyService } from './my.service';

const myService = new MyService();

```

**注意**：这种方式是手动创建一个实例，这不会利用 NestJS 的依赖注入系统。这意味着手动实例化的对象不会受到 NestJS 生命周期管理的控制，也无法利用依赖注入机制解决依赖项的层次关系。





## 注入 Provider 的多种写法

### useClass 指定注入的对象

在 @Module 中直接注入 provider 类，是一种简写，完整的写法是：

```typescript
 providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
  ],
```

provide 指定注入的 token，**useClass** 指定注入的对象的类，Nest 会自动对它做实例化再注入。

> 在计算机编程中，“token”通常指代一个单一的、不可再分的元素。它可以是代码中的关键字、标识符、运算符或分隔符等。这些 token 在编程语言中具有特定的意义，它们被编译器或解释器用于识别语法结构并执行相应的操作。例如，以下都是 token 的示例：
>
> - 关键字：在编程语言中具有特殊含义的保留字，如“if”、“else”、“for”等。
> - 标识符：用来标识变量、函数、类等的名称，如变量名、函数名等。
> - 运算符：用于执行特定的数学或逻辑运算，如“+”、“-”、“*”、“/”、“=”等。
> - 分隔符：用于分隔不同的代码元素，如“{}”、“()”、“[]”、“,”等。
>
> 在 nestjs 的 providers 中，token 是用来标识一个特定依赖的唯一标识符

**这个 token 也可以是字符串**：

```
 providers: [
    {
      provide: 'app_service',
      useClass: AppService,
    },
  ],
```

此时在注入时，就要使用 @Inject 手动指定注入对象的 token 了

```
constructor(@Inject('app_service') private readonly appService: AppService) {}
```



**也可以直接指定一个值**来注入

```
  providers: [
    {
      provide: 'persion',
      useValue: {
        name: 'John',
        age: 28,
      },
    }
  ],
```

在注入时：

```typescript
  constructor(
    @Inject('persion') private readonly persion: { name: string; age: number },
  ) {}
```

<br/>

### useFactory 工厂函数

**动态创建对象**

```typescript
  providers: [
    {
      provide: 'persion2',
      useFactory: () => {
        return {
          name: 'John',
          age: 28,
        };
      },
    }
  ],
```

注入时写法与上面相同



**支持参数的注入**

通过 inject 声明了两个 token，一个是字符串 token 的 person，一个是 class token 的 AppService。

```typescript
  providers: [
    {
      provide: 'person3',
      useFactory: (person: { name: string }, appService: AppService) => {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      inject: ['name', AppService],
    },
  ],
```



**支持异步**

```typescript
  providers: [
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return {
          name: 'John',
          age: 28,
        };
      },
    },
  ],
```

<br/>

### useExisting 指定别名

```
{
	provide: 'person4',
	useExisting: 'person3',
}
```

