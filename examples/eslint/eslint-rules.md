[TOC]

✅：在 eslint:recommended 推荐配置中开启的规则

🛠：可以自动修复的

💡：需要手动修复

## 可能引起错误的规则

### arrow-body-style

数组的方法除了 forEach 之外，回调函数必须有返回值

### constructor-super ✅

constructor 中必须有 super

### for-direction ✅

禁止方向错误的 for 循环

```js
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i--) {
}

for (var i = 10; i >= 0; i++) {
}

for (var i = 0; i > 10; i++) {
}
```

### getter-return ✅

getter 必须有返回值，并且禁止返回空

### no-async-promise-executor ✅

禁止将 async 函数做为 new Promise 的回调函数，出现这种情况时，一般不需要使用 new Promise 实现异步了

### no-await-in-loop

禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了，

off，要求太严格了，有时需要在循环中写 await

### no-class-assign ✅

禁止对已定义的 class 重新赋值

### no-compare-neg-zero ✅

禁止与负零（-0）进行比较

```js
/* eslint no-compare-neg-zero: "error" */

if (x === -0) {
    // doSomething()...
}

/* eslint no-compare-neg-zero: "error" */

if (Object.is(x, -0)) {
    // doSomething()...
}
```

### no-cond-assign ✅

禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了