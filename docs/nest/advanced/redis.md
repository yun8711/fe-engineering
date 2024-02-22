---
outline: deep
---



# 集成 Redis



## 在 nodejs 中使用

在 nodejs 中最流行和两个库是：

- [redis](https://www.npmjs.com/package/redis)：
- ioredis：



### redis 示例

先启动一个 redis 容器

```shell
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

在项目中安装依赖

```shell
npm install redis
```

用法示例

```js
import { createClient } from 'redis';
// 创建实例
const client = createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

client.on('error', err => console.log('Redis Client Error', err));
// 建立连接
await client.connect();
// 获取所有 key
const value = await client.keys('*');

console.log(value);
// 断开连接
await client.disconnect();
```

因为上面用到了 es module、顶层 await ，所以要在 package.json 中添加 `type:module`

使用：

```js
await client.hSet('guangguang1', '111', 'value111');
await client.hSet('guangguang1', '222', 'value222');
await client.hSet('guangguang1', '333', 'value333');
```



### ioredis 示例

```
npm install ioredis
```

连接 redis server，并执行 keys 命令

```js
import Redis from "ioredis";

const redis = new Redis();

const res = await redis.keys('*');

console.log(res);
```



## 在 Nestjs 中集成

先安装用到的 redis 的包

```
pnpm add redis
```

创建连接可以使用下面两种方式中的一种

<br/>

### 方式一

在 AppModule 中，通过 useFactory 的方式动态创建 provider，token 为 REDIS_CLIENT（或者其他 token 也行，但是注入的时候要注意名字一致）：

```js
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createClient } from 'redis';

@Global()
@Module({
  imports: [ReportModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
```

<br/>

### 方式二

创建一个 redis 模块，并封装 redisService，好处是可以注入其他依赖

```typescript
@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          database: configService.get('REDIS_DB'),
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
```

这里使用了全局配置文件，所以通过 `configService.get('REDIS_HOST'),` 这种形式从 env 文件中读取配置

自定义 redisServer

```typescript
@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
```





## 使用

然后注入到任意 service 里即可使用：

```js
import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async getHello() {
    const value = await this.redisClient.keys('*');
    console.log(value);

    return 'Hello World!';
  }
}
```

因为 service 里加了 async、await，那 controller 里也得加一下 async、await

