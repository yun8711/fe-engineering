## commitlint.config.js 中可用的 rules

https://commitlint.js.org/#/reference-rules?id=available-rules

**body-full-stop**

说明：body结束符

默认值：`[0,'never','.']`，不能以`.`结尾

**body-leading-blank**

说明：body 以空行开始

默认值：`[0,'never','.']`，不能以`.`结尾

```js
rules:{
  // 单词格式
	"header-case":[],
  // 结束符
  "header-full-stop":[],
    // header 最大长度
  "header-max-length":[],
    // header 最小长度
  "header-min-length":[],
    // 结束符
  "references-empty":[],
    // scope 可选值, 例如 [ 'components', 'utils', 'cli' ]
  "scope-enum":[],
    // scope 单词格式
  "scope-case":[],
   // 是否为空
  "scope-empty":[],
     // scope最大内容长度
  "scope-max-length":[],
     // scope最小内容长度
  "scope-min-length":[],
     // subject 单词格式
  "subject-case":[],
     // subject 是否为空
  "subject-empty":[],
     // subject 中止符
  "subject-full-stop":[],
     // subject 最大内容长度
  "subject-max-length":[],
     // subject 最小内容长度
  "subject-min-length":[],
     // 分割符
  "subject-exclamation-mark":[],
         // type 可选值 例如: [ 'feat', 'fix' ]
  "type-enum":[],
         // type 单词格式
  "type-case":[],
         // type是否为空
  "type-empty":[],
         // type最大内容长度
  "type-max-length":[],
         // type最小内容长度
  "type-min-length":[],
         // 分割符
  "signed-off-by":[],
            // 分割符
  "trailer-exists":[],

             // body结束符：不以.结尾
  "body-full-stop": [0,'never','.'],
         // body 以空行开始：总是以空行开始
  "body-leading-blank":[0,'always'],
         // body 是否为空
  "body-empty":[],
         // body最大内容长度
  "body-max-length":[],
         // body最大内容行数
  "body-max-line-length":[],
         // body最小内容长度
  "body-min-length":[],
            // 单词格式 ， 例如： upper-case 全大写
  "body-case":[],

                 // footer 开头空行
  "footer-leading-blank":[],
         // footer是否为空
  "footer-empty":[],
         // footer最大内容长度
  "footer-max-length":[],
         // footer最大内容行数
  "footer-max-line-length":[],
         // footer最小内容长度
  "footer-min-length":[],
}
```

格式列表：

```js
[
  "lower-case", // default
  "upper-case", // UPPERCASE
  "camel-case", // camelCase
  "kebab-case", // kebab-case
  "pascal-case", // PascalCase
  "sentence-case", // Sentence case
  "snake-case", // snake_case
  "start-case", // Start Case
];
```
