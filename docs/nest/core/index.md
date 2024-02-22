---
outline: deep
---

# Nest 核心概念



## Provider

provider 是可以注入的对象，它们都有 token，比如 @Injectable 装饰器声明的 class

token 可以是 class 也可以是 string

provider 可以是 useClass 指定 class，也可以 useValue 指定值，或者 useFactory 动态创建。

provider 之间可以相互注入，还可以注入到 controller 里。

provider、controller 放在一个个 Module 里
