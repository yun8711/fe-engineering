---
outline: deep
---

# Nginx 配置文件



## 配置文件

Nginx 的主配置文件是 `/etc/nginx/nginx.conf`，在主配置文件中，一般会包含以下配置

```
include /etc/nginx/conf.d/*.conf;
```

表示包含其他的配置文件，以便于模块化配置

### 结构

一个配置文件的结构如下

```bash
main        # 全局配置，对全局生效
├── events  # 配置影响 Nginx 服务器或与用户的网络连接
├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
│   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
│   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
│   ├── server
│   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
│   │   ├── location
│   │   └── ...
│   └── ...
└── ...

```

1、全局块：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。

2、events块：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

3、http块：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

4、server块：配置虚拟主机的相关参数，一个http中可以有多个server。

5、location块：配置请求的路由，以及各种页面的处理情况。



### 语法规则

1、配置文件由指令与指令块构成；

2、每条指令以 `;` 分号结尾，指令与参数间以空格符号分隔；

3、指令块以 `{}` 大括号将多条指令组织在一起；

4、部分指令的参数支持正则表达式；

5、使用 `$` 符号表示使用变量；

6、使用 `#` 符号添加注释；

7、`include` 语句允许组合多个配置文件以提升可维护性；



### 计量单位

1、时间单位

s：秒，m：分钟，h：小时，d：天，w：周，M 月，y 年

2、字节单位

k 或 K：千字节，m 或 M：兆字节，g 或 G：吉字节



### 内置变量

nginx 内置了许多变量，可以在配置文件中的许多地方使用，常用的有：

- 客户端信息
  - $remote_addr：客户端的IP地址
  - $binary_remote_addr：二进制格式的客户端地址
  - $remote_port：客户端的端口
  - $remote_user：已经经过Auth Basic Module验证的客户端用户名
  - $http_user_agent：客户端agent信息
  - $http_cookie：客户端cookie信息
  - $http_x_forwarded_for：识别通过 HTTP 代理或负载均衡连接的客户端最初的 IP 地址
- 服务端信息
  - $server_addr：服务器地址，在完成一次系统调用后可以确定这个值
  - $server_name：服务器名称
  - $server_port：请求到达服务器的端口号
- 请求信息
  - $request：请求的url与http协议
  - $uri：当前请求的URI，不包含请求参数
  - $scheme：HTTP方法（如http，https）
  - $server_protocol：请求使用的协议，通常是HTTP/1.0或HTTP/1.1
  - $request_method：客户端请求的方法
  - $host：请求头中的 `Host`，如果没有，则等于设置的服务器名，不包含端口
  - $args：请求中的参数
  - $arg_PARAMETER：`GET` 请求中某个具体参数的值
  - $content_length：请求头中的Content-length字段
  - $content_type：请求头中的Content-Type字段
  - $http_referer：用来记录从那个页面链接访问过来的
  - `$http_<header字段名>`：表示请求头中指定的字段，可以用来表示某些业务中的自定义头字段
- 响应信息
  - $body_bytes_sent：发送给客户端的主体内容字节数，响应头不计算在内
  - $status：请求状态
- 其他信息
  - $document_root：当前请求在root指令中指定的值
  - $limit_rate：这个变量可以限制连接速率
  - $request_filename：当前连接请求的文件路径，由root或alias指令与URI请求生成
  - $time_local：访问时间与时区



### 自定义变量

使用 set 指令来定义自定义变量。set 指令可以在 server，location，if 中使用

```ini
server {
    listen 80;
    server_name localhost;

    set $my_var "Hello, Nginx!";

    location / {
        return 200 $my_var;
    }
}
```

在这个示例中，我们定义了一个名为 `$my_var` 的变量，并将其值设置为 "Hello, Nginx!"。然后在 `location /` 块中，我们使用 return 指令将 `$my_var` 的值返回给客户端。所以，当你访问 `http://localhost/` 时，你将看到 "Hello, Nginx!" 的响应。



## 通用指令

通用指令就是可以在多个配置块中配置的指令，它们的含义都相同，只是优先级有差别，一般按就近原则，也就是说越是具体的配置，优先级越高。

### include

该指令可以将复杂的配置分解成更小、更易于管理的部分。

可以在任何配置块中使用，包括 http 块、server 块、location 块等，放在哪个位置取决于想要包含的配置文件的内容和作用

- 在 http 块中使用：通常用于包含全局配置，例如 MIME 类型定义或日志格式
- 在 server 块中使用：通常用于包含特定服务器的配置，如 SSL 证书或特定的位置块
- 在 location 块中使用：通常用于包含特定 location 的配置，如特定的代理设置或缓存设置

默认情况下，主配置文件会有以下内容：

```ini
# 其他配置
http {
    include       /etc/nginx/mime.types;
    
    // 其他配置

    include /etc/nginx/conf.d/*.conf;
}
```

`include /etc/nginx/mime.types;` 表示包含 `/etc/nginx/mime.types`文件，这是一个文件扩展名与文件类型映射表，包含媒体资源类型的文件

`include /etc/nginx/conf.d/*.conf;` 这句配置，意思是 nginx 还会读取 `nginx/conf.d/` 目录下所有以 `.conf` 结尾的配置文件



### root

定义服务器从哪个文件系统路径中获取静态文件，可以在 http、server 或 location 块中定义

```
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
    ...
}
```

在这个例子中，当用户请求 `http://localhost/` 时，Nginx 将从 `/usr/share/nginx/html` 路径中获取 `index.html` 或 `index.htm` 文件。如果用户请求 `http://localhost/images/example.jpg`，Nginx 将从`/usr/share/nginx/html/images` 路径中获取 `example.jpg` 文件。



### error_page

用于定义当服务器返回特定的错误状态码时，应该显示哪个页面，可以在 http、server 或 location 块中定义：

- 如果所有服务器和 location 都使用相同的错误页面，就定义在 http 块中，除非在 server 或 location 块中重新定义
- 如果希望特定服务器使用不同的错误页面，可以在 server 块中定义
- 如果希望特定 location 使用不同的错误页面，你可以在 location 块中定义

这个指令可以接受多个状态码和一个 URI 作为参数

例如：

```
# 当服务器返回 404 错误时，会显示 /404.html 页面
error_page  404  /404.html;

# 当服务器返回 500、502、503 或 504 错误时，会显示 /50x.html 页面
error_page   500 502 503 504  /50x.html;
location = /50x.html {
    root   /usr/share/nginx/html;
}
```



### add_header

用于向 HTTP 响应中添加自定义的头部。它的基本语法如下：

```ini
add_header name value [always];
```

- name：必须，头部的名称
- value：必须，头部的值
- always：可选，如果添加了这个参数，那么无论响应的状态码是什么，Nginx 都会添加这个头部。如果没有添加这个参数，那么当响应的状态码为 204、304 或 206 时，Nginx 不会添加这个头部

注意：

- 在同一个级别中定义了多个 add_header 指令，那么将使用最后一个指令
- add_header 指令只会影响当前级别和更低级别的配置

*示例：向所有的 HTTP 响应中添加 X-Content-Type-Options 头部，值为 nosniff*

```ini
add_header X-Content-Type-Options nosniff;
```





## 全局块

### user

定义Nginx worker进程运行的用户或组，默认为 nobody。

格式

```
user  <username>  <groupname>;
```

这个指令的主要影响 Nginx 进程的权限控制。Nginx 在启动时，master 进程通常以 root 用户运行，以便能够监听 1024 以下的端口（如 HTTP 的默认端口 80）。然后，master 进程会生成 worker 进程，并以 user 指令指定的用户和组的身份来运行这些 worker 进程。

这样做的好处是增加了系统的安全性。即使攻击者能够利用某些漏洞控制了 Nginx 的 worker 进程，他们也只能以该用户和组的权限进行操作，而不能以 root 用户的权限进行操作。这就大大限制了攻击者能够做的事情

### worker_processes

定义Nginx 生成的 worker 进程的数量，默认 1。

取值取决于服务器的 CPU 核心数量和负载情况，一般来说，设置为服务器的 CPU 核心数量是一个好的起点，可以充分利用服务器的多核性能。

> 如果设置的值超过核心数量，也可以正常工作，但是会增加操作系统在进程间进行上下文切换带来的额外开销，达不到预期的性能提升。

如果服务器负载较高，或者需要 Nginx 处理大量的长连接（如 WebSocket 或长轮询），那么可能需要增加 worker_processes 的数量。这是因为每个 worker 进程都有自己的连接池，增加 worker 进程的数量可以增加服务器的并发处理能力。

但是增加 worker_processes 的数量也**会增加内存使用量**，因为每个 worker 进程都需要一定的内存。因此，需要根据服务器的内存容量和应用的需求来适当调整取值

### worker_rlimit_nofile

定义每个worker进程可以打开的最大文件描述符数量，默认与操作系统的默认文件描述符限制相同。

**文件描述符**是操作系统用于识别和管理打开的文件和网络连接的一种资源。在 Unix 和 Linux 系统中，每个进程都有一个文件描述符的限制，超过这个限制，进程就不能再打开新的文件或网络连接。这个限制可以通过 `ulimit -n` 命令查看和设置

一般来说，该指令的值不能超过操作系统允许的最大文件描述符数量，但是应该 >=  events 块中的 worker_connections 值，因为每个连接都需要一个文件描述符

### pid

定义Nginx master进程的PID文件的路径，默认`/nginx/pid/nginx.pid`。

在实际项目中，pid 文件主要用于管理和控制 Nginx 服务。例如，你可以使用 kill -HUP $(cat /var/run/nginx.pid) 命令来重新加载 Nginx 配置，或者使用 kill -QUIT $(cat /var/run/nginx.pid) 命令来优雅地关闭 Nginx 服务。

### error_log

定义日志文件的路径和日志级别，可选的级别有：debug、info、notice、warn、error、crit、alert、emerg。

可以放入全局块，http块，server块，**一般放在全局块**

例如，`error_log /var/log/nginx/error.log warn;`表示错误日志文件的路径为`/var/log/nginx/error.log`，日志级别为`warn`



## events 块

主要用于配置Nginx服务器如何处理网络事件，特别是与连接有关的事件。

### worker_connections

定义每个worker进程可以打开的最大连接数（最大并发访问量），默认为 512，一般设置为 1024，或与操作系统的默认文件描述符限制相同



### use

定义Nginx使用哪种事件模型，可选：select、poll（默认）、kqueue、epoll、resig、/dev/poll、eventport

这个指令的值取决于你的操作系统支持哪种事件模型。一般使用默认的 epoll 即可，异步IO 处理模型，没有1024 的限制，并发发访问量特别快



### accept_mutex

该指令是为了解决所谓的 "惊群现象" 而设计的，默认为on。

如果 worker_processes 不为 1，且 accept_mutex 为 on，Nginx 会使用一个互斥锁来确保同一时间只有一个 worker 进程在接受新的连接，从而避免惊群现象。但是，这也意味着如果一个 worker 进程在接受新的连接时被阻塞，那么其他的 worker 进程就无法接受新的连接，即使它们是空闲的。

需要根据服务器的性能和应用的需求来适当调整取值。如果有足够的 CPU 资源，可以设置为 off，以提高 Nginx 的并发处理能力。反之，可能需要将 accept_mutex 设置为 on，以避免惊群现象，提高性能。



### multi_accept

控制 worker 进程在被唤醒后应接受多少个新连接，默认为off

当 multi_accept 设置为 on 时，每个 worker 进程在被唤醒后会尽可能多地接受新的连接，直到没有更多的新连接为止。这可以提高 Nginx 的并发处理能力，但可能会导致某些 worker 进程过载。 

当 multi_accept 设置为 off 时，每个 worker 进程在被唤醒后只会接受一个新的连接，然后立即进入睡眠状态，等待下一次被唤醒。这可以保证所有的 worker 进程都有机会处理新的连接，但可能会降低 Nginx 的并发处理能力。



## http 块

http块是全局配置块，它包含了影响整个Nginx服务器的配置项。

### include

见上方通用指令-include



### default_type

定义了当服务器无法确定响应的 MIME 类型时应使用的默认 MIME 类型。

> 所谓无法确定响应的 MIME 类型，比如响应文件没有扩展名，或者扩展名不在 mime.types 文件中
>
> mime.types 文件通常位于 /etc/nginx/ 目录下，可能因系统而异

这个指令可以在 server 或 location 块中设置，但可能会覆盖 mime.types 文件中的定义，所以**通常在 http 块中设置**

一般设置为：`default_type  application/octet-stream;`，

> application/octet-stream 是一种通用的二进制数据类型，通常用于表示 "这是一些字节，但我不知道它们是什么类型的数据"。当浏览器接收到这种类型的响应时，它通常会提示用户下载文件，而不是尝试在浏览器中打开它。



### upstream

用于定义后端服务器的组，这些服务器可以处理传入的请求。这个指令通常用于负载均衡和反向代理的配置。

```ini
http {
    upstream backend {
    		# 负载均衡算法（选择其中一种）
    		# least_conn; # 最小连接数算法
    		# ip_hash;  # ip hash算法
    		# hash $request_uri; # Generic Hash，使用 uri 作为 hash 的 key
    		# 定义后端服务器列表
        server backend1.example.com; weight=3; # 加权轮询算法时，增加权重参数
        server backend2.example.com;
        server backend3.example.com;
        
        # 其他可选参数
        # max_fails=3 fail_timeout=30s; # 用于故障处理
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}
```

在上面例子中，backend 是一个 upstream 组，包含了三个后端服务器：backend1.example.com、backend2.example.com 和 backend3.example.com。当一个请求到达 / 位置时，Nginx 会将请求代理到 backend 组中的一个服务器。



### proxy_cache_path

用于定义缓存的存储路径和一些相关的参数。它的基本语法如下：

```ini
proxy_cache_path path [levels=levels] keys_zone=name:size [inactive=time] [max_size=size] [manager_files=number] [manager_sleep=time] [manager_threshold=time] [loader_files=number] [loader_sleep=time] [loader_threshold=time] [use_temp_path=on|off] [purger=on|off] [purger_files=number] [purger_sleep=time] [purger_threshold=time];
```

path：定义缓存的存储路径。这个路径应该指向一个存在的目录，Nginx 会在这个目录中存储缓存的数据

levels：定义缓存目录的层级结构。例如，`levels=1:2` 表示使用两级目录结构，第一级目录的名称由哈希值的最后一个字符决定，第二级目录的名称由哈希值的最后两个字符决定

keys_zone=name:size：定义一个共享内存区域，用于存储缓存的键和元数据。name 是这个内存区域的名称，size 是这个内存区域的大小

inactive=time：定义缓存数据的过期时间。如果在这个时间内，缓存数据没有被访问，那么这个缓存数据就会被删除

max_size=size：定义缓存的最大大小。当缓存的大小超过这个值时，Nginx 会开始删除一些旧的缓存数据

use_temp_path=on|off：定义是否使用临时路径存储正在写入的缓存数据。默认值是 on。



### log_format

定义日志文件中每条日志的格式，通常在 http 块中设置

例如，默认的 nginx 主配置文件中，定义了一个名为main的日志格式：

```
http {
    ...
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    ...
}
```



### access_log

定义访问日志的路径和格式

例如，默认的 nginx 主配置文件中定义如下：

```
http {
    ...
		access_log  /var/log/nginx/access.log  main;
    ...
}
```

表示访问日志的路径是`/var/log/nginx/access.log`，格式是通过`log_format`配置定义的 `main`



### sendfile 相关

**sendfile 是什么？**

在计算机系统中，将一个文件的内容发送到网络时，通常的做法是先将文件的内容从磁盘读取到内存中，然后再将内存中的数据发送到网络。这个过程涉及到两次数据的复制：一次是从磁盘到内存，一次是从内存到网络。这两次数据复制会消耗大量的CPU资源

为了解决这个问题，一些操作系统提供了sendfile这个系统调用。可以直接将数据从磁盘发送到网络，无需先将数据复制到内存中。这样就避免了一次数据复制，从而节省了CPU资源，提高了文件发送的效率。这对于提供**静态文件服务**的服务器来说非常有用，可以显著提高文件发送的速度和效率。

**sendfile 指令**：控制是否开启 sendfile 系统调用

**tcp_nopush**：控制是否使用 TCP_CORK 套接字选项，当它被设置为 on 时，Nginx 会尽可能地将多个小数据包合并为一个大的数据包进行发送，以减少网络上的数据包数量。通常与 sendfile 一起使用，可以提高静态文件的传输效率。

**tcp_nodelay**：控制是否使用 TCP_NODELAY 套接字选项，当它被设置为 on 时，Nginx 会尽快地发送所有的数据包，而不管它们的大小。这个选项通常用于动态内容的传输，可以减少网络延迟。

**sendfile_max_chunk**：每次调用传输数量不能大于设定的值，默认为0，即不设上限



### gzip 相关

开启 gizip，可以减少网络传输的数据量，提高网络传输速度，尤其在网络带宽有限的情况下效果更明显

目前，对静态资源压缩有两种形式：

- 动态压缩：服务器在返回任何的静态文件前，由服务器对每个请求压缩再输出
- 静态压缩：服务器直接使用现成的扩展名为`.gz`的预压缩文件，直接输出

`gzip` 是 `CPU` 密集型的，实时动态压缩比较消耗 CPU 资源，所以前端项目一般都会在构建时提前进行压缩，可以减轻服务器 CPU 压力，提高了性能。

**gzip**

控制是否对发送到客户端的响应进行gzip压缩，对静态文件和动态内容都生效

**gzip_types**

指定哪些 MIME 类型的响应需要进行压缩。默认情况下，只有 text/html 类型的响应会被压缩

*示例：*

```
http {
    ...
    gzip_types text/css application/javascript;
    ...
}
```

**gzip_comp_level**

压缩率，默认为1（最低），可选 1～9，级别越高，压缩率越高，CPU 使用率也会越高，一般设置为 4～6

**gzip_buffers**

压缩的缓冲区大小，例如：`gzip_buffers 4 16k;`

**gzip_disable**

禁止某些特定的用户代理进行压缩，例如：`gzip_disable "msie6";`，"msie6" 是一个正则表达式，匹配所有的 Internet Explorer 6 浏览器，因为 ie6 对 gzip 压缩的支持存在一些问题。

**gzip_min_length**

响应内容小于 xx 字节不压缩，默认 20 字节，因为如果响应数据体积很小，经过压缩后，体积可能反而增加

**gzip_http_version**

对哪些http版本进行压缩，默认 1.1 

**gzip_proxied**

是否对通过代理服务器的响应进行压缩，可以设置多个参数：

- off：禁用对代理响应的压缩
- expired：当响应的 Expires 头字段表示内容已过期时，进行压缩
- no-cache：当响应的 Cache-Control 头字段包含 no-cache 指令时，进行压缩
- no-store：当响应的 Cache-Control 头字段包含 no-store 指令时，进行压缩
- private：当响应的 Cache-Control 头字段包含 private 指令时，进行压缩
- no_last_modified：当响应没有 Last-Modified 头字段时，进行压缩
- no_etag：当响应没有 ETag 头字段时，进行压缩
- auth：当请求包含 Authorization 头字段时，进行压缩
- any：无论响应的情况如何，都进行压缩。

**gzip_vary**

控制是否发送` Vary: Accept-Encoding` 响应头，这个响应头可以告诉代理服务器响应的内容是否取决于 Accept-Encoding 请求头。如果你的网站使用了代理服务器，那么你应该将这个指令设置为 on。



## server 块

每个server块代表一个虚拟主机，可以有自己的监听端口，服务器名称（server_name，通常是域名），以及位置块（location）来处理不同的请求路径。

虚拟主机（Virtual Host）是Nginx和其他Web服务器中的一个概念，它允许一台服务器（一台物理机或一台虚拟机）上运行多个网站，每个网站都有自己的域名和网站文件。虚拟主机可以根据请求的域名来决定将请求路由到哪个网站。

> 虚拟主机与端口没有必然的联系，可以对同一个端口开启多个虚拟主机。server 即虚拟主机可以理解为服务器向外暴露的域名，这个域名在服务器上对应不同的静态资源或服务。

*示例*

```ini
server {
    # Nginx监听的端口号，这里是80端口
    listen 80;  
    # 服务器名称，通常是域名，这里是www.example.com
    server_name www.example.com;  

    # 当请求路径为/时，返回的是/usr/share/nginx/html目录下的index.html或index.htm文件
    location / {
        root /usr/share/nginx/html;  # 请求路径对应的文件系统路径
        index index.html index.htm;  # 默认的索引文件名
    }

    # 当请求路径为/api时，请求会被代理到http://localhost:3000
    location /api {
        proxy_pass http://localhost:3000;  # 代理服务器的地址
    }

    # 当服务器发生500、502、503、504错误时，返回的是/usr/share/nginx/html目录下的50x.html文件
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;  # 错误页面的文件系统路径
    }
}
```



### resolver

用于在 server 块中设置 DNS 解析器，主要用于动态解析域名，例如在反向代理或负载均衡的场景中

注意：可以在 http、server、location 块中使用，且必须在使用动态解析域名的指令（如：proxy_pass）之前定义

语法：`resolver address ... [valid=time] [ipv6=off];`

- address：DNS 服务器的 IP 地址，可以指定多个，用空格分隔
- valid=time：可选，表示 DNS 解析结果的有效时间，默认是 5 分钟
- ipv6=off：可选，表示禁用 IPv6 解析



### listen

表示 nginx 监听的 IP 地址和端口号

> 某些情况下，一台服务器可能会有多个 IP 地址。如，服务器可能有一个公网 IP 地址和一个私网 IP 地址，或者服务器可能有多个网卡，每个网卡都有自己的 IP 地址。在这些情况下，你可能需要让 Nginx 服务器只在某个特定的 IP 地址上监听请求
>
> 如果不指定 ip 地址，那以会在所有 ip 地址上监听请求，只要端口号正确

如果要在一个 server 中监听多个端口，可以写多个 listen

listen 接受一些可选的参数：

- default_server：表示当前的 server 块是默认的服务器。如果一个请求的 Host 头字段没有匹配到任何其他的 server 块，那么这个请求会被发送到默认的服务器
- ssl：这个参数表示当前的 server 块使用 SSL/TLS 协议。需要使用 `ssl_certificate` 和 `ssl_certificate_key` 指令来指定证书和私钥的路径
- http2：这个参数表示当前的 server 块使用 HTTP/2 协议

例如：

```
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    listen       443 ssl http2 default_server;
    ...
}
```

在这个例子中，Nginx 在所有的 IP 地址上监听 80 端口，并且这个 server 块是默认的服务器。同时，Nginx 也在所有的 IP 地址上监听 443 端口，使用 SSL/TLS 和 HTTP/2 协议，并且这个 server 块也是默认的服务器



### server_name

用于定义当前server 块的名称，通常用于基于名称的虚拟主机（name-based virtual hosting）。 

它是通过 HTTP 请求的 Host 头字段来匹配

```ini
server {
    listen       80;
    # 可以同时指定多个
    server_name  example.com www.example.com;
    # 可以使用通配符或正则表达式
    server_name  *.example.com;
    ...
}
```



如果一个请求的 Host 头字段没有匹配到任何 server 块，那么这个请求会被发送到默认的 server 块



### charset

定义服务器将发送给客户端的字符集，如`koi8-r`、`utf-8`，nginx 会把字符集添加到 Content-Type 响应头中，如果不设置该指令，则不会添加。

通常情况下，接口中的 charset 设置会覆盖 nginx 中的设置，因为接口通常在 nginx 之后处理请求。

但是，如果你在 Nginx 中使用了 charset_types 指令并且指定了 text/html，那么 Nginx 将会强制覆盖接口中的 charset 设置。这是因为 charset_types 指令告诉 Nginx，对于指定的 MIME 类型，无论后端服务器返回什么字符集，都使用 Nginx 中定义的字符集。



### charset_types

用于定义哪些 MIME 类型的响应应该被 charset 指令影响。通常在 http 或 server 块中定义，但也可以在 location 块中定义。

默认未指定时，只对 text/html 类型的响应应用 charset 指令

示例：

```
http {
    charset utf-8;
    charset_types text/html application/json;
    ...
}
```

在这个例子中，Nginx 将只对 text/html 和 application/json 类型的响应添加 utf-8 字符集



### client_xxx 请求相关

#### client_max_body_size

定义请求体的最大字节数，即请求最大能发送多少内容，如果请求体的大小超过这个值，Nginx 会返回 413（Request Entity Too Large）错误。

例如，`client_max_body_size 400m;` 表示请求体的最大大小为 400MB

#### client_body_buffer_size

定义读取请求体的缓冲区大小。如果请求体的大小超过这个值，Nginx 会将请求体写入到临时文件中。

例如，`client_body_buffer_size 128k;` 表示读取请求体的缓冲区大小为 128KB

#### client_body_timeout

定义读取请求体的超时时间。如果在这个时间内，Nginx 无法读取完整的请求体，Nginx 会返回 408（Request Time-out）错误。

例如，`client_body_timeout 60s; `表示读取请求体的超时时间为 60 秒

#### client_header_buffer_size

定义读取请求头的缓冲区大小。如果请求头的大小超过这个值，Nginx 会返回 494（Request header too large）错误。

例如，`client_header_buffer_size 1k;` 表示读取请求头的缓冲区大小为 1KB

#### client_header_timeout

定义读取请求头的超时时间。如果在这个时间内，Nginx 无法读取完整的请求头，Nginx 会返回 408（Request Time-out）错误。

例如，`client_header_timeout 60s;` 表示读取请求头的超时时间为 60 秒



### proxy_xxx 代理相关

**proxy_set_header**

定义向后端服务器发送的请求头

#### proxy_connect_timeout

定义代理连接的超时时间，http请求无法立即被容器（tomcat, netty等）处理时，被放在nginx的待处理池中等待被处理。此参数为等待的最长时间，默认为60秒，官方推荐最长不要超过75秒

#### proxy_read_timeout

定义代理读取的超时时间，http请求被容器（tomcat, netty等）处理后，nginx会等待处理结果，也就是等待容器返回response。此参数即为服务器响应时间，默认60秒

#### proxy_send_timeout

定义代理发送的超时时间，http请求被服务器处理完后，把数据传返回给Nginx的用时，默认60秒

#### proxy_buffer_size

定义读取代理响应头的缓冲区大小

#### proxy_buffers

定义读取代理响应体的缓冲区数量和大小

#### proxy_busy_buffers_size

定义可以在内存中使用的最大缓冲区大小



### proxy_cache 缓存相关

**proxy_cache**：

表示启用或关闭缓存，启用时需要指定使用哪个缓存，它的参数值是在 ` proxy_cache_path` 指令中定义的共享内存区域的名称；`off` 表示关闭缓存

**proxy_cache_valid**

设置不同类型的响应应该被缓存多长时间。基本语法：

```ini
proxy_cache_valid [code ...] time;
proxy_cache_valid any time;
proxy_cache_valid http_301 time;
proxy_cache_valid http_302 time;
```

- code：HTTP 响应状态码。你可以指定一个或多个状态码，例如 200 302。如果没有指定状态码，那么这个指令将适用于所有的状态码
- any：这个参数表示这个指令适用于所有的状态码
- http_301：这个参数表示这个指令适用于 301（永久重定向）状态码
- http_302：这个参数表示这个指令适用于 302（临时重定向）状态码
- time：缓存的有效期

*示例*

```
proxy_cache_valid 200 302 10m; # 缓存10分钟
proxy_cache_valid 404 1m;      # 缓存1分钟
```

**proxy_no_cache**

定义哪些响应不应被缓存，语法：

```ini
proxy_no_cache expression;
```

- expression：一个或多个条件表达式。当这些表达式中的任何一个为真时，Nginx 将不会缓存响应。这些表达式可以包含变量，也可以使用逻辑运算符 &（与）、|（或）和 !（非）

*示例*

```ini
proxy_no_cache $http_set_cookie $http_cache_control;
```

当响应的 HTTP 头部中包含 Set-Cookie 头部或 Cache-Control 头部的值为 no-cache 时，不缓存响应

注意？？：proxy_no_cache 指令只是定义了哪些响应不应被缓存，但并不会阻止 Nginx 将响应存储到缓存中。如果想在满足某些条件时绕过缓存并直接向后端服务器请求数据，应该使用 proxy_cache_bypass 指令

**proxy_cache_bypass**

定义在哪些情况下应该绕过缓存直接向后端服务器请求数据，语法：

```ini
proxy_cache_bypass string ...;
```

**proxy_cache_key**

定义用于存储缓存数据的键的格式

**proxy_cache_lock**

在更新缓存数据时，防止多个请求同时向后端服务器请求数据

**proxy_cache_use_stale**

在后端服务器出错或超时时，使用过期的缓存数据。

**expires**

给一个资源设定一个过期时间，通过 expires 参数设置，可以使浏览器缓存过期时间之前的内容，减少与服务器之间的请求和流量。也就是说无需去服务端验证，直接通过浏览器自身确认是否过期即可，所以不会产生额外的流量。此种方法非常适合不经常变动的资源

例如：`expires 3d;`



### keepalive_requests

定义在一个 keep-alive 连接上可以处理的最大请求数量，默认值 100

当一个请求被处理完毕后，如果客户端和服务器都支持 keep-alive，那么 TCP 连接将不会被关闭，而是可以被用来处理后续的请求，这样可以减少 TCP 连接的建立和关闭所需的时间和资源。

keepalive_requests 表示在一个 keep-alive 连接上可以处理的最大请求数量。当达到这个数量后，Nginx 将关闭连接，即使客户端可能还希望继续使用这个连接发送请求。

默认值是 100，这个值通常足够大，可以满足大多数情况的需求。如果你的服务器有足够的资源，你可以考虑增大这个值，以便在一个连接上处理更多的请求。

### keepalive_timeout

用于定义 keep-alive 连接的超时时间，默认 75 秒

表示一个 keep-alive 连接在空闲状态下可以保持打开的最长时间。当超过这个时间后，如果没有新的请求发送到这个连接上，Nginx 将关闭连接。

默认值 75 秒，通常足够满足大多数情况的需求。如果你的服务器有足够的资源，你可以考虑增大这个值，以便保持更多的 keep-alive 连接。





## location 块

用于定义如何处理不同的请求路径。每个location块都对应一个或多个URL路径，并定义了当请求匹配这些路径时，Nginx应该如何处理这些请求。 

配置 location 块时，需要先指定一个 PATTERN，表示要匹配的路由，`[PATTERN]` 的四种语法，按优先级从高到低为：

1. `location = /aaa`：精确匹配 /aaa 的路由，也就是说必须完全相同
2. `location ^~ /ddd`：高优先级前缀匹配
3. `location ~ /ccc.*.html`：正则匹配， `～*` 表示不区分大小写
4. `location /bbb`：前缀匹配，即后面可以是任意路径

注意：如果代码后端服务时，指定了前缀，则项目中也需要增加全局前缀



### alias

用于定义服务器从哪个文件系统路径中获取静态文件，通常在 location 块中定义

与 root 指令不同，alias 指令不会将 location 块中定义的路径添加到指定的文件系统路径中。也就是说，alias 指令会替换掉 location 块中的路径

```ini
location /images/ {
    alias /data/wallpapers/;
}
```

当用户请求 `http://yourserver.com/images/example.jpg` 时，Nginx 将从 `/data/wallpapers/example.jpg` 路径中获取文件，而不是从 `/data/wallpapers/images/example.jpg`



### index

定义当请求一个目录时，应该尝试提供哪个文件作为响应。值是一个或多个文件名，当文件名是多个时将按照从左到右的顺序查找

这个指令可以在 server 或 location 块中定义



### try_files

定义一个文件列表，Nginx会尝试按照列表顺序查找文件，如果找到就停止搜索并处理请求。

该指令是 Nginx 实现静态文件服务的关键，可以灵活地定义文件和目录的查找规则。

例如，`try_files $uri $uri/ =404;` 表示 nginx 首先尝试请求的URI，如果不存在，尝试请求的URI后面加上 `/`，如果还不存在，返回404错误。

最后一个参数可以是一个 URI，如果所有的文件和目录都没有找到，Nginx 将会使用这个 URI 重新发起一个内部重定向。



### proxy_pass

用于定义将请求转发到哪个后端服务器，即定义代理服务器的地址。

值通常是一个 URL，表示后端服务器的地址，可以是 HTTP 或 HTTPS 协议，也可以是一个变量

可以使用正则表达式匹配请求的路径，然后将请求转发到不同的后端服务器。

注意：proxy_pass 指令会替换掉请求的原始 URI。如果希望保留原始 URI，你可以在 proxy_pass 指令的 URL 后面添加一个 /，避免触发 nginx 的重定向。

例如，`proxy_pass http://localhost:3000;` 表示将请求代理到 `http://localhost:3000`



### return

用于在 location 块中返回特定的响应，可以返回：

- 一个固定的 HTTP 状态码
- 返回一个状态码和一些文本信息
- 也可以用于重定向请求到一个新的 URL

```ini
return code [text];
return code URL;
return URL;
```

例如，`return 301 http://localhost:3000;` 表示将请求重定向到 `http://localhost:3000`



### proxy_set_xxx

重定义发往后端服务器的请求头

1、proxy_set_header：定义向后端服务器发送的请求头。例如，`proxy_set_header Host $host;` 会将请求头的 Host 设置为当前请求的 host

```
proxy_set_header   Host              $host;
proxy_set_header   X-Real-IP         $remote_addr;
proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header   X-Forwarded-Proto $scheme;
proxy_set_header   X-Forwarded-Port  $server_port;
```

2、proxy_set_body：定义向后端服务器发送的请求体。这个指令通常用于修改原始请求的请求体。
