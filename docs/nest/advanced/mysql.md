---
outline: deep
---



# 集成数据库



Nest 本身与数据库无关，可以与任何 SQL 或 NOSQL 数据库集成。一般来说只需要为数据库加载一个适当的 nodejs 驱动程序。

也可以直接使用任何通用的数据库集成库或 ORM，比如 [Sequelize (recipe)](https://www.npmjs.com/package/sequelize)、[knexjs](http://knexjs.org/) (tutorial)`、 [TypeORM](https://github.com/typeorm/typeorm) ，以在更高的抽象级别上进行操作

`Nest` 提供了与现成的 `TypeORM` 与 `@nestjs/typeorm` 的紧密集成，

## TypeORM 流程

![nest_typeorm_01](../../images/nest/typeorm_1.png)

DataSource 里存放着数据库连接的配置，比如用户名、密码、驱动包、连接池配置等等

而 Entity 里通过 @Entity、@PrimaryGeneratedColumn、@Column 等装饰器来建立数据库表的映射关系。

同时还有 Entity 之间的 @OneToOne、@OneToMany、@ManyToMany 的关系，这些会映射成数据库表通过外键、中间表来建立的关系。

DataSource.initialize 的时候，会和数据库服务建立连接，如果配置了 synchronize，还会生成建表 sql 语句来创建表。

DataSource 初始化之后就可以拿到 EntityManager 了，由它负责对各种 Entity 进行增删改查，比如 find、delete、save 等方法，还可以通过 query builder 来创建复杂的查询。

如果你只是想做对单个 Entity 的 CRUD，那可以拿到这个 Entity 的 Repository 类，它同样有上面的那些方法，只是只能用来操作单个 Entity。



## TypeORM 集成

[TypeORM](https://github.com/typeorm/typeorm) 是 `TypeScript` 中最成熟的对象关系映射器( `ORM` )，可以很好地与 `Nest` 框架集成。

`TypeORM` 支持许多关系数据库，比如 `PostgreSQL` 、`Oracle`、`Microsoft SQL Server`、`SQLite`，以及像 `MongoDB` 这样的 `NoSQL` 数据库



### 集成 Mysql

安装依赖

```shell
pnpm add @nestjs/typeorm typeorm mysql2
```

将 `TypeOrmModule` 导入`AppModule`

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 全局配置
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          // 是否自动创建数据库表结构
          synchronize: true,
          // 打印日志级别
          logging: ['error', 'warn'],
          // 线程池大小
          poolSize: 10,
          // 数据库连接驱动程序
          connectorPackage: 'mysql2',
          // 自动加载实体类
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule {}
```

`forRoot()` 方法支持所有`TypeORM`包中`createConnection()`函数暴露出的配置属性，详见：[附录：typeorm 配置项](./附录：typeorm 配置项.md)

connectorPackage：指定用于连接到MySQL数据库的驱动程序，可以是 mysql 或 mysql2

mysql和mysql2都是Node.js的MySQL客户端，在许多方面都很相似，mysql2完全兼容mysql，并且在大多数情况下可以作为替代品使用，但它们之间存在一些差异：

- mysql2还提供了一些额外的功能，如支持Promise，更好的性能，以及更全面的协议支持
- mysql2在处理大型查询结果集时，性能更优，因为它使用了更快的原生解析器
- mysql2还支持预处理语句和服务器端预处理语句，这可以提供更好的安全性和性能。

entities 用来指定有哪些和数据库对应的 Entity，有两种方式：

- 一是使用 class
- 另一种是`[__dirname + '/**/*.entity{.ts,.js}']`

其他额外的配置参数描述如下：

| 参数             | 说明                                     |
| :--------------- | :--------------------------------------- |
| retryAttempts    | 重试连接数据库的次数（默认：10）         |
| retryDelay       | 两次重试连接的间隔(ms)（默认：3000）     |
| autoLoadEntities | 如果为`true`,将自动加载实体(默认：false) |



创建数据库

```sql
CREATE DATABASE yun_admin DEFAULT CHARACTER SET utf8mb4;
```

