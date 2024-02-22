---
outline: deep
---



# Pipe 管道



## 概述

### 简介

在 NestJS 中，管道（Pipe）是一种有用的工具，用于处理输入数据。它们可以用于验证、转换或解析来自客户端的数据。管道在控制器处理请求之前执行，因此它们是数据预处理的理想选择。

![nest_pipe_01](../../images/nest/pipe_1.png)

管道有两个典型应用场景：

- **转换**：管道将输入数据转换为所需的数据输出
- **验证**：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

在这两种情况下，Nest 会在调用 controller 方法之前插入一个管道，管道会先拦截方法的调用参数，进行转换或是验证处理，然后用转换好或是验证好的参数调用原方法。

当管道逻辑发生异常时，会被 NestJS 的异常层捕获并处理，controller 不会继续执行。

<br/>

### 示例

下面是一个简单的管道，它将输入数据转换为整数

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

在这个例子中，如果输入值不能转换为整数，管道将抛出一个 BadRequestException。否则，它将返回转换后的整数。

要使用管道，你可以在控制器的路由处理程序中使用 @Pipe() 装饰器：

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `User #${id}`;
  }
}
```

上述代码中，ParseIntPipe 管道将在 findOne 方法处理请求之前执行，确保 id 参数总是一个整数。



## 内置管道

`Nest` 自带九个开箱即用的管道，他们从 `@nestjs/common` 包中导出：

- `ValidationPipe`
- `ParseIntPipe`：解析字符串并转换为整数
- `ParseFloatPipe`：解析字符串并转换为浮点数
- `ParseBoolPipe`：解析字符串并转换为布尔值
- `ParseArrayPipe`：解析字符串并转换为数组
- `ParseUUIDPipe`：解析字符串并验证是否为UUID，将解析版本3、版本4或版本5的UUID，如果你只需要特定版本的UUID，你可以在管道选项中传递版本
- `ParseEnumPipe`：从指定的枚举中取值
- `DefaultValuePipe`：设置参数的默认值
- `ParseFilePipe`



### 基本用法

有如下的接口，参数默认为 string 类型

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(@Query('aa') aa: string): string {
    return aa;
  }
}
```

使用`ParseIntPipe`把它的参数转换为整数：

```typescript
  @Get()
  getHello(@Query('aa', ParseIntPipe) aa: number): number {
    return aa + 1;
  }
```

此时，如果访问 `http://localhost:3000/?aa=11`，返回值为 12

如果访问`http://localhost:3000/?aa=1w`，则会抛出错误：

```js
{
  statusCode: 400,
  message: "Validation failed (numeric string is expected)",
  error: "Bad Request"
}
```

<br/>

### 进阶用法

`ParseIntPipe`管道接受一些参数，用来精细的控制它的异常处理，（其他 Pipe 类似）

```typescript
interface ParseIntPipeOptions {
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (error: string) => any;
}
```

但是这种使用方式需要**使用 new XxxPipe 的方式**。

1、errorHttpStatusCode：用来指定异常时抛出的状态码，例如：

```typescript
  @Get('aa')
  aa(@Query('aa', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) aa: number): number {
    return aa + 1;
  }
```

上述接口中，当参数值无法转换为整数时，会返回 404 状态码

2、exceptionFactory：异常处理工厂函数，可以自己抛出一个异常，然后让exception filter 处理：

```typescript
  @Get('bb')
  bb(@Query('aa', new ParseIntPipe({
    exceptionFactory: (msg) => {
      console.log(msg);
      throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED)
    }
  })) aa: number): number {
    return aa + 1;
  }
```

<br/>

### ValidationPipe

`ValidationPipe`  主要用于验证和转换传入的数据。它结合了 class-validator 和 class-transformer 这两个库的功能，可以方便地对数据进行**复杂的验证和转换**。

使用时，需要先安装 class-validator 和 class-transformer 这两个库：

```
pnpm add class-validator class-transformer
```

[class-transformer](https://www.npmjs.com/package/class-transformer)：用于将普通对象转换为类的实例，还允许根据标准序列化/反序列化对象

[class-validator](https://www.npmjs.com/package/class-validator)：类验证器，允许使用基于装饰器声明的规则对对象进行校验，内部使用 [validator.js](https://www.npmjs.com/package/validator) 来执行验证

两者结合，可以对比较复杂的对象进行校验，比如在 POST 请求中，对 dto 类进行参数校验，**pipe 里拿到这个类，把参数对象通过 class-transformer 转换为 dto 类的对象，之后再用 class-validator 包来对这个对象做验证**





## 自定义管道

自定义管道类必须实现 `PipeTransform<T, R>` 泛型接口

-  `T` 表示输入的 `value` 的类型
-  `R` 表示 `transfrom()` 方法的返回类型

每个管道必须实现 `transfrom()` 方法。该方法有两个参数：

- value：当前处理的值，即方法参数，在被路由方法接收之前的前端传递的原始参数

- metadata：可选，当前处理的方法参数的元数据对象，具有以下属性：

  ```typescript
  export interface ArgumentMetadata {
    type: 'body' | 'query' | 'param' | 'custom';
    metatype?: Type<unknown>;
    data?: string;
  }
  ```

  - type：表明参数是 body `@Body()`，query `@Query()`，param `@Param()` 还是自定义参数， [在这里阅读更多](https://docs.nestjs.cn/customdecorators)。
  - metatype：参数的元类型，如 `String`。 如果在函数签名中省略类型声明，或使用原生 js，则为 `undefined`。
  - data：传递给装饰器的字符串，如 `@Body('string')`。如果括号留空，则为 `undefined`。

一个简单的 `ValidationPipe` ，它接受一个输入值并立即返回相同的值

```typescript
// validation.pipe.ts

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
```



## 绑定管道

绑定管道，可以绑在全局、controller 类上、方法上、参数上，最常见的是作用于参数上

<br/>

### 绑定在控制器类

需要使用 `@UsePipes()` 装饰器，意味着该管道会应用于控制器类下的所有路由处理函数

*示例*

```typescript
import { Controller, UsePipes, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@UsePipes(new ParseIntPipe())
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: number) {
    return `User #${id}`;
  }

  @Get('double/:id')
  double(@Param('id') id: number) {
    return `Double: ${id * 2}`;
  }
}
```

上述示例中，`ParseIntPipe` 被应用于 `UsersController` 类下的 `findOne` 和 `double` 方法

<br/>

### 绑定在方法上

当管道绑定在方法上时，该管道只会应用于该方法。

```typescript
import { Controller, UsePipes, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('users')
export class UsersController {
  @UsePipes(new ParseIntPipe())
  @Get(':id')
  findOne(@Param('id') id: number) {
    return `User #${id}`;
  }

  @Get('double/:id')
  double(@Param('id') id: string) {
    return `Double: ${id}`;
  }
}
```

在这个例子中，ParseIntPipe 管道被绑定在 findOne 方法上，所以它只会应用于 findOne 方法

<br/>

### 绑定在参数上

当管道绑定在参数上时，该管道只会应用于该参数

```typescript
import { Controller, Get, Param } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe';

@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return `User #${id}`;
  }

  @Get('double/:id')
  double(@Param('id') id: string) {
    return `Double: ${id}`;
  }
}
```

在这个例子中，ParseIntPipe 管道被绑定在 findOne 方法的 id 参数上，所以它只会应用于 id 参数



## 全局管道

方式一：

```typescript
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
```

方式二：

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

这两种书写方式没有明显的差异，作用基本相同，差异在于：

- 在 monorepo 项目中，方式二的写法需要在每个子项目的 main.ts 中都写一次，而方式一只需要在主模块中写一次即可
- 方式一的写法支持在 ValidationPipe 中注入其他 provider
