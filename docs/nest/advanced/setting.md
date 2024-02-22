---
outline: deep
---



# 全局配置



## 简介

应用程序通常在不同的**环境**中运行，根据环境的不同，应该使用不同的配置设置。例如，通常本地环境依赖于特定的数据库凭据，仅对本地 DB 实例有效。生产环境将使用一组单独的 DB 凭据。

在 `Node.js` 应用程序中，通常使用 `.env` 文件，代表不同的环境。 

在 `Nest` 中使用这种技术的一个好方法是创建一个 `ConfigModule` ，它暴露一个 `ConfigService` ，根据 `$NODE_ENV` 环境变量加载适当的 `.env` 文件。

可以选择自己编写这样的模块，也可使用开箱即用的 `@nestjs/config` 库

> `@nestjs/config` 内部使用 [dotenv](https://github.com/motdotla/dotenv) 实现



## 用法

### 安装依赖

`@nestjs/config` 库需要单独安装

```
pnpm add @nestjs/config
```



### 导入为全局模块

在 AppModule 中导入 ConfigModule

```typescript
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
    }),
    // other modules...
  ],
  // controllers, providers, etc...
})
export class AppModule {}
```

这里把它设置为全局模块，方便其他模块调用，指定 env 文件的位置



### 创建 env 文件

在 src 目录下创建`.env`文件，并添加相关配置

```ini
# nest 服务配置
NEST_SERVER_PORT=3000

# redis 相关配置
REDIS_SERVER_HOST=localhost
REDIS_SERVER_PORT=6379
REDIS_SERVER_DB=1

# mysql 相关配置
MYSQL_SERVER_HOST=localhost
MYSQL_SERVER_PORT=3306
MYSQL_SERVER_USERNAME=root
MYSQL_SERVER_PASSWORD=guang
MYSQL_SERVER_DATABASE=meeting_room_booking_system
```

**注意**

最好把 env 文件放在 src 目录下，并在 nest-cli.json 中增加如下配置：

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "generateOptions": {
    "spec": false
  },
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    // 文件变化时自动复制
    "watchAssets": true,
    // 指定资源文件
    "assets": ["**/*.env"]
  }
}
```

因为打包过程中，根目录下的文件不会被自动复制到 dist 目录中

另一种方式是在 scripts 脚本中手动复制

```json
{
  "scripts":{
    "build":"nest build && cp .env dist/"
  }
}
```



### 使用环境配置

现在可以在任何地方通过注入  ConfigService 来访问这些环境变量

```typescript
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService) {}

  someMethod() {
    const dbHost = this.configService.get<string>('redis_server_host');
    const dbPort = this.configService.get<number>('redis_server_port');
    // use dbHost and dbPort...
  }
}
```



## 配置项

`ConfigModule.forRoot()`接收以下配置项

```typescript
export interface ConfigModuleOptions {
  cache?: boolean;
  isGlobal?: boolean;
  ignoreEnvFile?: boolean;
  ignoreEnvVars?: boolean;
  envFilePath?: string | string[];
  validate?: (config: Record<string, any>) => Record<string, any>;
  validationSchema?: any;
  validationOptions?: Record<string, any>;
  load?: Array<ConfigFactory>;
  expandVariables?: boolean | DotenvExpandOptions;
}
```

<br/>

**定义 env 文件路径**

默认情况下，程序在根目录中查找`.env`文件，通过 envFilePath 属性可以指定其他路径，或者指定多个路径：

```typescript
ConfigModule.forRoot({
  envFilePath: '.development.env',
});

ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});
```

如果在多个文件中发现同一个变量，则第一个变量优先。

<br/>

**禁止加载环境变量**

如果您不想加载.env 文件，而是想简单地从运行时环境访问环境变量（如 OS shell 导出，例如`export DATABASE_USER = test`），则将`options`对象的`ignoreEnvFile`属性设置为`true`

<br/>

**全局使用**

如果要在其他模块中使用 `ConfigModule`时，需要显示的进行导入，通过 isGlobal 属性将其他设置为全局模块，将`ConfigModule`加载到根模块（例如`AppModule`），就可以无需在其他模块中导入而直接使用
