---
outline: deep
outlineTitle: 本页导航

---

<h1>文本格式</h1>



## Glob 语法

### 介绍

Glob 模式是指 shell 所使用的简化了的正则表达式，是一种常用的文件路径匹配模式语言，可以用来匹配符合特定规则的文件名或路径。Glob 语法通常用在命令行中和一些编程语言中，如 Linux shell、Node.js 等。

<br/>

### 不同语言的实现

Glob 只是一种文件路径匹配模式语言，并不是某个特定软件或工具的名称，可能会因为不同的操作系统和环境而存在差异。在各种编程语言中，有很多支持 Glob 语法的库或模块，这些库或模块通常都有自己的官方网站或文档网站。

以下是几种编程语言中常用的支持 Glob 语法的库或模块：

- Node.js：node-glob 模块，官网：https://github.com/isaacs/node-glob
- Python：glob 模块，官方文档：https://docs.python.org/3/library/glob.html
- Java：Ant-Style 路径模式，官方文档：https://ant.apache.org/manual/dirtasks.html#patterns
- Ruby：Dir.glob 方法，官方文档：https://ruby-doc.org/core-2.7.0/Dir.html#method-c-glob

需要注意的是，虽然以上库或模块都支持 Glob 语法，但是在具体使用时可能会因为实现方式等原因存在细微的差异，需要根据具体情况进行调整和修改。

<br/>

### 匹配规则

node-glob 模块使用了minimatch 库来进行匹配。主要的匹配规则如下：

- `*`：匹配任意数量的字符（包括0个字符）
- `**`：跨路径匹配任意字符，也就是匹配任意多级路径
- `?`：匹配单个字符
- `[...]`：匹配方括号内的任意一个字符，可以使用连字符 `-` 表示相邻字符范围，如 `[a-z]`
- `!(pattern | pattern | pattern)`：匹配不符合规则的文件或路径
- `?(pattern | pattern | pattern)`：匹配规则出现0次或1次的文件或路径
- `+(pattern | pattern | pattern)`：匹配规则出现至少1次的文件或路径
- `*(pattern | pattern | pattern)`：匹配规则出现任意次数的文件或路径
- `@(pattern | pat* | pat?erN)`：匹配规则只出现1次的文件或路径
- 包含大括号时内里的内容会被展开，如 `a{/b/c,xy}` 会被展开为 `a/b/c` 和 `a/xy`

| 通配符  | 描述                                                         | 例子   | 匹配                     | 不匹配              |
| ------- | ------------------------------------------------------------ | ------ | ------------------------ | ------------------- |
| `*`     | 匹配任意数量的字符（包括0个字符）                            | Law*   | Law`, `Laws`, `Lawyer    | GrokLaw`, `La`, `aw |
| `**`    | 跨路径匹配任意字符，也就是任意多级路径                       |        |                          |                     |
| `？`    | 匹配单个字符                                                 | ?at    | Cat`, `cat`, `Bat`, `bat | at                  |
| `[...]` | 匹配方括号内的任意一个字符，可以使用连字符 `-` 表示相邻字符范围，如 `[a-z]` | [CB]at | Cat`, `Bat               | cat`, `bat          |
|         |                                                              |        |                          |                     |
|         |                                                              |        |                          |                     |





例如，`*.js` 可以匹配当前目录下所有扩展名为 `.js` 的文件，`src/*.js` 可以匹配 `src` 目录下所有扩展名为 `.js` 的文件，`[ab].txt` 可以匹配当前目录下以 `a.txt` 或者 `b.txt` 命名的文件，`!(test)*` 可以匹配不以 `test` 开头的文件或路径等。

一些其他特性：

- 以 # 开头的行被当作注释
- 路径是相对于 .xxxignore 的位置或当前工作目录
- 以 ! 开头的行是否定模式，它将会重新包含一个之前被忽略的模式
- 忽略模式依照 .gitignore 规范



## JSON

JSON（全称 JavaScript Object Notation，JavaScript 对象表示法）是一种轻量级的数据交换格式，由 Douglas Crockford 在 2001 年首次提出，最初用于解决 JavaScript 语言中对象序列化和反序列化的问题。后来随着 AJAX 技术的流行，JSON 逐渐成为了 Web 应用程序中的常用数据传输格式。

不同于 XML 这样的标记式语言，JSON 中的数据结构类似于 JavaScript 中的对象或数组，具有良好的可读性和易于理解的特点，同时也比 XML 更加简洁和易于处理。

<br/>

### JSON 的格式规范

**数据类型**

JSON 支持以下几种基本数据类型：

- 字符串（String）
- 数字（Number）
- 布尔值（Boolean）
- null
- 对象（Object）
- 数组（Array）

其中，对象和数组可以嵌套使用，构成复杂的数据结构。

<br/>

**语法要素**

JSON 的语法要素包括以下几个部分：

- 名称和值之间使用冒号（:）分隔
- 多个名称和值之间使用逗号（,）分隔
- 所有的名称（键）必须使用双引号（"）包含
- 所有的字符串值必须使用双引号（"）包含
- 数字、布尔值和 null 不需要使用引号包含
- 数组元素之间使用逗号（,）分隔
- 数组元素可以是任意类型的数据

<br/>

**注意事项**

- JSON 数据必须是有效的 UTF-8 编码。
- JSON 数据一般都是通过异步网络请求获取到的，因此需要进行严格的错误处理和安全检查。
- 在使用 JSON 数据时，应该尽可能地避免使用 `eval()` 函数或将未经过验证的数据直接转换为对象，以避免安全风险。

<br/>

### JSONC

JSONC（JSON with Comments）是一种支持注释的 JSON 格式，通过允许开发人员在 JSON 数据中添加注释，提高了代码的可读性和可维护性。JSONC 格式可以在现代浏览器和 Node.js 等环境中直接使用，但它并未被标准化。

在 JSONC 中，注释以 `//` 或 `/* */` 的形式添加，与 JavaScript 中的注释语法类似。例如：

```json
{
  // 这是一个对象
  "name": "John",
  "age": 30,

  /*
  这是一个数组
  */
  "hobbies": [
    "reading",
    "music",
    "cooking" // 最后一个元素不需要逗号
  ]
}
```

<br/>

### JSON5

JSON5 是一种扩展的 JSON 格式，主要通过增加一些特性来提高 JSON 数据的可读性和可维护性。JSON5 支持像 JavaScript 一样的语法，并且允许在数据中添加注释、省略结尾逗号等。以下是一些 JSON5 的特性和示例：

- 键名可以使用单引号或不使用引号。
- 字符串可以使用反斜杠换行。
- 数字可以使用二进制、八进制、十进制或十六进制表示。
- 对象和数组元素末尾可以省略逗号。
- 注释可以使用 `//` 或 `/* */` 形式添加。

```json
{
  name: 'John', // 键名可以不用双引号
  age: 30,
  email: 'john@example.com',
  isActive: true,
  hobbies: [
    'reading',
    'music',
    'cooking', // 数组元素末尾可以省略逗号
  ],
  address: {
    street: '123 Main St',
    city: 'Seattle',
    state: 'WA',
    zipcode: '98101',
  },
  // 注释可以使用 // 或 /* */ 形式添加
}
```

<br/>

### JSON Schema

JSON Schema 是一种用于描述 JSON 数据结构的规范。可以帮助开发人员定义和验证 JSON 数据的格式、类型、范围、约束等元数据，从而提高代码的可读性、可维护性和安全性。

这是 czg 的 json schema 地址：https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@1.7.0/docs/public/schema/cz-git.json

JSON Schema 本质上就是一个 JSON 对象，它的属性对应着需要检查的 JSON 数据对象中的属性。使用 JSON Schema，可以定义以下内容：

- 数据类型
- 属性名称和值
- 最小值和最大值
- 正则表达式
- 枚举值
- 数组元素个数、元素类型、元素约束等

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://example.com/person.schema.json",
  "title": "Person",
  "description": "A person schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    }
  },
  "required": ["firstName", "lastName"]
}
```

上述示例定义了一个名为 `Person` 的 JSON Schema，其中包含三个属性：`firstName`、`lastName` 和 `age`。其中 `firstName` 和 `lastName` 是字符串类型，`age` 是整数类型，且其取值范围在 0 到 150 之间。此外，`firstName` 和 `lastName` 属性是必需的，因为它们被定义在 `required` 属性中。

可以将此 JSON Schema 应用于验证一个符合该模式的 JSON 对象，以确保它满足所定义的数据结构和约束条件。例如，下面是一个符合该 JSON Schema 的 JSON 对象：

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30
}
```



## INI

INI（Initial Configuration）格式是一种配置文件格式，用于存储程序的初始配置信息。INI 格式最初由 Microsoft 开发，并被广泛应用于 Windows 操作系统中的配置文件中。

INI 格式的**优点**在于其简洁性和易读性，易于开发人员编写和维护这样的配置文件，同时也方便程序读取和解析。不过，INI 格式并没有标准化的规范，因此在实际开发中需要注意兼容性问题，以确保程序能够正确地处理各种不同版本的 INI 配置文件。

INI 格式通常采用了“节”和“键值对”的方式来组织数据。其中，“节”指定了一个配置块，包括一组相关的配置项；“键值对”则表示具体的配置项及其取值。以下是一个简单的 INI 文件示例：

```ini
; 注释

[database]
host = localhost
port = 5432
database = mydb
username = user
password = secret

[server]
host = example.com
port = 80
```

在上述示例中，方括号 `[]` 表示了一个节的开始，例如 `[database]` 和 `[server]` 分别代表了两个节，它们各自包含若干个键值对。键值对使用等号 `=` 进行赋值，例如 `host = localhost` 就是一个键值对，其中 `host` 是键名，`localhost` 是键值。分号 `;` 表示注释，任何分号后面的内容都将被视为注释内容，不会被解析为配置项。



## YAML

[官网](https://yaml.org/) | [参考一](https://learnxinyminutes.com/docs/yaml/)

Yet Another Markup Language，一种轻量级的、人类可读的数据序列化语言。最早出现在 2001 年，由 Clark Evans 开发。

它是 JSON 的严格超集，添加了语法上重要的换行符和缩进，就像 Python 一样。然而，与 Python 不同的是，YAML 不允许使用文本制表符进行缩进。

`.yaml` 和 `.yam` 文件扩展名通常用于存储采用 YAML格式的数据，但 `.yam` 相对而言比较少见

<br/>

### 特点

- 简洁易读：使用缩进和标点符号来表示层次结构和关联关系，减少了冗余的字符和嵌套的括号。
- 高层次表达能力：支持复杂的数据类型，如列表、字典、时间戳、正则表达式等。
- 可扩展性：允许自定义标签和类型，以便更好地适应不同的场景需求。
- 易于解析：由于语法简单，所以可以快速解析和加载文件，适合作为配置文件格式使用。

<br/>

### 应用场景 

1. 配置文件：YAML 可以作为配置文件格式使用，如 Rails 的 `database.yml` 和 Jekyll 的 `_config.yml` 等。
2. 数据序列化：YAML 可以将数据序列化成文本格式，并存储到文件或数据库中，便于传输和存储。
3. 网络传输：YAML 可以将数据序列化成基于文本的格式，方便在网络上传输和接收数据。
4. 日志文件：YAML 可以作为日志文件格式使用，记录系统事件和错误信息等。
5. 编程语言：许多编程语言都提供了 YAML 解析器和序列化器，例如 Python 的 PyYAML 库和 Ruby 的 Psych 库等。

<br/>

### 基本语法规则

1. 大小写敏感：

   YAML 对大小写是敏感的，例如 `Foo` 和 `foo` 是不同的值。

2. 使用缩进表示层次结构：

   YAML 使用缩进来表示数据之间的层次关系，缩进必须使用空格，不能使用制表符。通常情况下，每级缩进为 2 个空格。

3. 使用键值对表示数据：

   YAML 使用键值对的方式来表示数据，其中键值对之间使用一个空格分隔。键和值之间用冒号 `:` 分隔，例如 `name: John`。

4. 支持数组和列表：

   YAML 支持数组和列表，可以使用 `-` 符号来表示数组元素或者列表项。例如：

   ```
   languages:
     - Java
     - JavaScript
     - Python
   ```

   这里就定义了一个名为 `languages` 的列表，包含三个元素。

5. 多行字符串：

   YAML 支持多行字符串，可以在字符串前后使用 `|` 或 `>` 符号，例如：

   ```
   text: |
     This is a long block of text
     that spans multiple lines.
   ```

6. 注释：

   YAML 支持注释功能，可以使用 `#` 符号表示注释内容。例如：

   ```
   # This is a comment
   name: John # This is another comment
   ```

7. 引用：

   YAML 支持引用其他节点的值，可以使用 `&` 符号来标记一个节点，并使用 `*` 符号来引用它。例如：

   ```
   defaults: &defaults
     host: localhost
     port: 3000
   
   development:
     <<: *defaults
     database: dev_db
   ```

   这里先定义了一个名为 `defaults` 的节点，并将其值设置为 `{host: localhost, port: 3000}`。然后，在 `development` 节点中，使用 `<<: *defaults` 来引用 `defaults` 节点中的值。

<br/>

### 扩展

标准的 YAML 规范本身并不支持 glob 语法，也没有直接支持通配符的语法，但是在很多 `.yaml` 格式的配置文件中，可以看到使用通配符等非标准的情况，比如：pnpm-workspace.yaml 

这是因为一些 YAML 库和工具可以扩展 YAML 的能力，常见的有（抄来的）：

1. JSON Schema：一种用于描述 JSON 数据结构的规范，可以被扩展用于验证和描述 YAML 文件的结构。
2. YAML Anchors & Aliases：该规范提供了一种使用 `$ref` 引用和复用节点的方式，使得 YAML 文件可以更加简洁和可维护
3. Custom Tags：一种自定义 YAML 标签的机制，允许用户将自定义类型映射到 YAML 中的标量值或者序列中
4. PyYAML：是 Python 中的一个 YAML 库，它支持 YAML1.1 和 YAML1.2 规范，并提供了一些额外的功能和扩展。
5. Ruby Psych：是 Ruby 语言中的一个 YAML 库，它支持 YAML1.1 和 YAML1.2 规范，并提供了一些额外的功能和扩展。
6. YAML Loaders/LoadExtensions：一种加载 YAML 文件时进行扩展和定制的机制，包括过滤器、类型转换器、默认值等等。