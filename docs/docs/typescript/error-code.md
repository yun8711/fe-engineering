---
outline: deep
prev: false

---

<h1>TypeScript错误码</h1><p>v5.2（2023.08.26）</p>

[官网](https://www.typescriptlang.org/) | [github](https://github.com/microsoft/TypeScript) | [中文网](https://typescript.bootcss.com/) | [《TypeScript 入门与实战》](http://www.patrickzhong.com/TypeScript/)

https://blog.csdn.net/u010785091/article/details/103123696/

#### TS1259

![ts-error-1259](../../images/ts-error-1259.png)



#### TS7053

```js
import chalk from 'chalk';

export const chalkPrint = {
  chalk(msg: string, color = 'greenBright') {
    console.log(chalk[color](msg));
  },
}
```

错误信息

```
TS7053: Element implicitly has an  any  type because expression of type  string  can't be used to index type  ChalkInstance 
No index signature with a parameter of type  string  was found on type  ChalkInstance 
```

 意思是：元素隐式具有 “any” 类型，因为string类型的表达式不能用于索引ChalkInstance类型；在ChalkInstance类型上没有找到string类型参数的索引签名

解决方案：

（1）修改 tsconfig.json 配置

```
"suppressImplicitAnyIndexErrors": true,
```

（2）写一个函数转类型

```typescript
export function isValidKey(key: string | number | symbol , object: object): key is keyof 

typeof object {
  return key in object;
}

for (const key in obejct) {
	if(isValidKey(key,obejct)){
		// 处理...
		obejct[key]
		....
	}
}
```

（3）定义一个 string 作为 key 的类型

```typescript
const modules: Record<string, object> = {}

const files = require.context('./modules', false, /\.ts$/)

files.keys().forEach((key) => {
  modules[key.replace(/(modules|\/|\.|ts)/g, '')] = {
    ...files(key).default,
    namespaced: true
  }
})

const store = createStore({ modules })
```

