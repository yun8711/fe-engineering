---
outline: deep
---



# Nest 装饰器



### `@Module` 声明模块

```typescript
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `@Controller` 声明 controller

```typescript
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
```

### `@Injectable` 声明 provider

这个 provider 可以是任何的 class

```typescript
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### `@Inject` 基于属性注入

```typescript
@Controller()
export class AppController {
  @Inject(AppService) private readonly appService: AppService;
}
```

### `@Optional` 可选注入

用来声明所需要的 provider 是可选的，没有创建对象是不会报错

```typescript
@Controller()
export class AppController {
  constructor(@Optional() private readonly appService: AppService) {}
  
  @Optional()
  @Inject(AppService)
  private readonly appService: AppService;
}
```

### `@Global` 声明全局模块

一般用在 xxx.module.ts 上，声明为全局的模块，它 exports 的 provider，不需要 imports 就可以直接使用

```typescript
@Global()
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `@Global` 声明全局模块

一般用在 xxx.module.ts 上，声明为全局的模块，它 exports 的 provider，不需要 imports 就可以直接使用

```typescript
@Global()
@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `@Catch` 指定处理的异常

作用在过滤器上，参数就是要处理的异常类型
