---
outline: deep
---



# 参数校验



在 Nest 中，一般情况下，都是通过 Pipe 来实现参数校验，其中 ValidationPipe 是最重要的内置管道，用于复杂参数校验。



## 简单参数校验

利用 NestJS 提供的一些内置的解析管道，如 ParseIntPipe、ParseBoolPipe、ParseArrayPipe 等，可以用来验证和转换参数。

```typescript
import { Query, ParseIntPipe } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  find(@Query('aa', ParseIntPipe) aa: number) {
    // your logic here
  }
}
```





## 复杂参数校验

`ValidationPipe` 也是NestJS 提供的内置的解析管道，它结合了 class-validator 和 class-transformer 这两个库的功能，可以方便地对数据进行**复杂的验证和转换**。

<br/>

> [ValidationPipe 配置项](https://docs.nestjs.cn/10/techniques?id=%e4%bd%bf%e7%94%a8%e5%86%85%e7%bd%ae%e7%9a%84validationpipe)
>
> [class-validator 支持的装饰器](https://www.npmjs.com/package/class-validator#validation-decorators)

<br/>

1、安装 class-validator 和 class-transformer 这两个库：

```
pnpm add class-validator class-transformer
```

2、设置为全局管道

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

3、为复杂参数的 dto 对象增加校验的注解

比如有如下 POST 请求，

```typescript
  @Post('ppp')
  ppp(@Body() post: Ppp) {
    console.log(post);
  }
```

前端传递的参数会被转换为 `Ppp` 对象，所以我们在该对象上声明校验规则

```typescript
import { Contains, IsDate, IsEmail, IsFQDN, IsInt, Length, Max, Min } from 'class-validator';

export class Ppp {
    @Length(10, 20, {
        message({targetName, property, value, constraints}) {
            return `${targetName} 类的 ${property} 属性的值 ${value} 不满足约束: ${constraints}`
        }
    })
    title: string;
  
    @Contains('hello')
    text: string;
  
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;
  
    @IsEmail()
    email: string;
  
    @IsFQDN()
    site: string;
}
```



<br/>

对于 路由参数 (`@Param()`)、查询参数 (`@Query()`) 等，也可以使用这种方式来校验，只是写法上需要专门声明ParamDto 或 QueryDto

```typescript
import { Param, ValidationPipe } from '@nestjs/common';
import { ParamDto } from './dto/param.dto';

@Controller('example')
export class ExampleController {
  @Get(':id')
  findOne(@Param(ValidationPipe) params: ParamDto) {
    // your logic here
  }
}
```



## 自定义管道

可以创建自定义的管道来实现自己的验证逻辑。例如，你可以创建一个 IsIntPipe，在这个管道中，你可以检查值是否为整数。

```typescript
import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

然后，可以使用 IsIntPipe 对参数进行验证：

```typescript
import { Query } from '@nestjs/common';
import { IsIntPipe } from './is-int.pipe';

@Controller('example')
export class ExampleController {
  @Get()
  find(@Query('aa', IsIntPipe) aa: number) {
    // your logic here
  }
}
```



