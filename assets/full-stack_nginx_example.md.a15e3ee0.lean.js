import{_ as s,v as n,b as a,R as l}from"./chunks/framework.8277b2e6.js";const p="/fe-engineering/assets/nginx02.adcbf479.png",e="/fe-engineering/assets/nginx03.53cdbacf.png",o="/fe-engineering/assets/nginx04.470b1c0b.png",g=JSON.parse('{"title":"Nginx 配置示例","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"full-stack/nginx/example.md","filePath":"full-stack/nginx/example.md","lastUpdated":1710299060000}'),t={name:"full-stack/nginx/example.md"},c=l('<h1 id="nginx-配置示例" tabindex="-1">Nginx 配置示例 <a class="header-anchor" href="#nginx-配置示例" aria-label="Permalink to &quot;Nginx 配置示例&quot;">​</a></h1><h2 id="正向代理" tabindex="-1">正向代理 <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理&quot;">​</a></h2><p>一般的访问流程是客户端直接向目标服务器发送请求并获取内容，使用正向代理后，客户端改为向代理服务器发送请求，并指定目标服务器（原始服务器），然后由代理服务器和原始服务器通信，转交请求并获得内容，再返回给客户端。</p><p>正向代理的<strong>代理对象是客户端</strong>，即替客户端去访问目标服务器，使真实客户端对服务器不可见；</p><p>比如 VPN，你的浏览器无法直接访问谷歌，这时候可以通过一个代理服务器来帮助你访问谷哥，那么这个服务器就叫正向代理。</p><p><img src="'+p+`" alt="正向代理原理图"></p><p><em>示例</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">server {</span></span>
<span class="line"><span style="color:#89DDFF;">	  </span><span style="color:#676E95;font-style:italic;"># 指定DNS服务器IP地址 </span></span>
<span class="line"><span style="color:#BABED8;">    resolver 8.8.8.8</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 监听浏览器请求的端口号</span></span>
<span class="line"><span style="color:#BABED8;">    listen 80</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#89DDFF;">		</span><span style="color:#676E95;font-style:italic;"># 接收到被代理浏览器发来的请求之后，需要执行的请求是什么</span></span>
<span class="line"><span style="color:#BABED8;">    location / {</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># 指明目的主机和uri，一般不需要修改</span></span>
<span class="line"><span style="color:#BABED8;">        proxy_pass http://$http_host$request_uri</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><p>在需要访问外网的客户端上执行以下一种操作即可：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">1.</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">方法1（推荐）</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#BABED8;"> http_proxy</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://你的正向代理服务器地址：代理端口</span><span style="color:#BABED8;">   </span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">2.</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">方法2</span></span>
<span class="line"><span style="color:#FFCB6B;">vim</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">~/.bashrc</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#BABED8;"> http_proxy</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://你的正向代理服务器地址：代理端口</span></span></code></pre></div><p>然后在客户端（浏览器）中访问 <code>https://www.google.com</code>时，不再是直接去访问该地址，它会被代理服务器“劫持”，代理服务器按照 server 中的配置重新请求，并返回请求到的内容</p><h2 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h2><p>与一般访问流程相比，使用反向代理后，直接收到请求的服务器是代理服务器，然后将请求转发给内部网络上真正进行处理的服务器，得到结果再返回给客户端。反向代理<strong>隐藏了真实的服务器</strong>，为服务器收发请求，使真实服务器对客户端不可见。一般在处理跨域请求的时候比较常用。现在基本上所有的大型网站都设置了反向代理。</p><p>反向代理指代理后端服务器响应客户端请求的一个中介服务器，代理的对象是服务端。</p><p><img src="`+e+`" alt="反向代理原理图"></p><p>简单的说，一般<strong>给客户端做代理的都是正向代理，给服务器做代理的就是反向代理</strong>。</p><p><em>示例 1：浏览器访问时，从 nginx 服务器跳转到 linux 系统 tomcat 主页面</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">server {</span></span>
<span class="line"><span style="color:#BABED8;">        listen       80</span><span style="color:#676E95;font-style:italic;">; </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">#监听地址</span></span>
<span class="line"><span style="color:#BABED8;">        server_name  192.168.4.32</span><span style="color:#676E95;font-style:italic;">;   </span></span>
<span class="line"><span style="color:#BABED8;">   </span></span>
<span class="line"><span style="color:#BABED8;">        location  / { </span></span>
<span class="line"><span style="color:#89DDFF;">        	 </span><span style="color:#676E95;font-style:italic;"># 请求资源的根目录</span></span>
<span class="line"><span style="color:#BABED8;">           root html</span><span style="color:#676E95;font-style:italic;">;  </span></span>
<span class="line"><span style="color:#89DDFF;">           </span><span style="color:#676E95;font-style:italic;"># 请求转向</span></span>
<span class="line"><span style="color:#BABED8;">           proxy_pass http://127.0.0.1:8080</span><span style="color:#676E95;font-style:italic;">; </span></span>
<span class="line"><span style="color:#89DDFF;">           </span><span style="color:#676E95;font-style:italic;"># 设置默认页</span></span>
<span class="line"><span style="color:#BABED8;">           index  index.html index.htm</span><span style="color:#676E95;font-style:italic;">;             </span></span>
<span class="line"><span style="color:#BABED8;">        } </span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span></code></pre></div><p><em>示例 2：根据输入的路径不同，跳转到不同端口的服务中</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">server {</span></span>
<span class="line"><span style="color:#BABED8;">        listen       9000</span><span style="color:#676E95;font-style:italic;">;   </span></span>
<span class="line"><span style="color:#BABED8;">        server_name  192.168.4.32</span><span style="color:#676E95;font-style:italic;">;   #监听地址       </span></span>
<span class="line"><span style="color:#BABED8;">        </span></span>
<span class="line"><span style="color:#BABED8;">        location  ~ /example1/ {  </span></span>
<span class="line"><span style="color:#BABED8;">           proxy_pass http://127.0.0.1:5000</span><span style="color:#676E95;font-style:italic;">;         </span></span>
<span class="line"><span style="color:#BABED8;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">        location  ~ /example2/ {  </span></span>
<span class="line"><span style="color:#BABED8;">           proxy_pass http://127.0.0.1:8080</span><span style="color:#676E95;font-style:italic;">;         </span></span>
<span class="line"><span style="color:#BABED8;">        } </span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span></code></pre></div><p>注意：<code>location ~ /example2/</code>表示访问 <code>192.168.4.32/example2</code> 时会被转发到 <code>http://127.0.0.1:8080;</code>对应的服务上，在项目中，必须有全局前缀 <code>/example2/</code>，否则访问不到项目中，这个配置有点像前端构建时的 publicPath 选项。</p><h2 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h2><p>负载均衡是一种技术，可以在多个服务器之间分配网络流量，以提高网站、应用、数据库或其他服务的性能、可靠性和可扩展性。负载均衡的主要目标是<strong>优化资源使用，最大化吞吐量，最小化响应时间，同时避免任何单一资源的过载</strong>。</p><p>实现负载均衡的方式：</p><ul><li>硬件负载均衡：一种专用的硬件，如负载均衡器，用于分发网络流量到多个服务器。硬件负载均衡器通常具有<strong>高性能和高可用性，但成本较高</strong></li><li>软件负载均衡：一种在服务器上运行的软件，可以将网络流量分发到多个服务器。软件负载均衡器的优点是<strong>成本较低，灵活性高</strong>，可以根据需要轻松扩展</li></ul><p>负载均衡的主要算法包括：</p><ul><li>轮询（Round Robin）：每个请求按顺序轮流分配到服务器上，如果服务器列表到达末尾，则重新开始。它均衡的对待后端的每一台服务器，而不关心服务器实际的连接数和当前的系统负载</li><li>加权轮询（Weighted Round Robin）：不同的后端服务器可能机器的配置和当前系统的负载并不相同，因此它们的抗压能力也不相同。可以给每一台后端预设一个权重，轮询的时候，高权重的服务器处理更多的请求，低权重的服务器处理少的请求</li><li>最少连接（Least Connections）：动态地根据后端服务器的当前连接情况，将新的请求分配到当前连接数最少的服务器上</li><li>fire：基于队列的负载均衡算法，主要用于处理那些处理时间不确定的请求。在这种算法中，每个后端服务器都有一个队列，新的请求会被放到队列最短的服务器上。这样可以保证每个服务器的负载都比较均衡，而不会出现某个服务器的队列特别长，而其他服务器的队列却很短的情况。这种算法比较适合处理那些处理时间不确定，且请求之间没有依赖关系的场景。</li><li>IP哈希（IP Hash）：将获取客户端IP地址的 hash 分配，每一次请求都会定向到一台固定的服务器上，这样来自同一IP地址的请求总是会发送到同一台服务器，可以解决session的问题</li></ul><p><strong>fire 算法和 最少连接算法</strong>比较相似，都是尝试将新的请求分配给当前负载较轻的服务器，但是它们的实现方式和适用场景有所不同：</p><ul><li>最少连接算法是将新的请求分配给当前<strong>连接数最少</strong>的服务器，适用于处理请求处理时间相对固定，且请求之间没有强依赖关系的场景。</li><li>&quot;fair&quot;算法则是将新的请求分配给<strong>队列最短</strong>的服务器，适用于处理请求处理时间不确定，且请求之间没有依赖关系的场景。</li></ul><p>在Nginx中，负载均衡通常是通过将请求转发给服务器集群来实现的。这样，当请求量爆发式增长时，单个服务器的性能无法满足需求，可以使用多个服务器，然后将请求分发到各个服务器上，将负载分发到不同的服务器，这就是负载均衡的核心思想，即<strong>分摊压力</strong>。</p><p><em>示例</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">http {</span></span>
<span class="line"><span style="color:#BABED8;">    upstream backend {</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># 负载均衡算法（选择其中一种）</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># least_conn; # 最小连接数算法</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># ip_hash;  # ip hash算法</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># hash $request_uri; # Generic Hash，使用 uri 作为 hash 的 key</span></span>
<span class="line"><span style="color:#89DDFF;">    		</span><span style="color:#676E95;font-style:italic;"># 定义后端服务器列表</span></span>
<span class="line"><span style="color:#BABED8;">        server 192.167.4.32:5000</span><span style="color:#676E95;font-style:italic;">; weight=3; # 加权轮询算法时，增加权重参数</span></span>
<span class="line"><span style="color:#BABED8;">        server 192.168.4.32:8080</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        server 192.168.4.32:8081</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;"># 其他可选参数</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;"># max_fails=3 fail_timeout=30s; # 用于故障处理</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    server {</span></span>
<span class="line"><span style="color:#BABED8;">        location / {</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_pass http://backend</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        }</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><h2 id="动静分离" tabindex="-1">动静分离 <a class="header-anchor" href="#动静分离" aria-label="Permalink to &quot;动静分离&quot;">​</a></h2><p>为了加快网站的解析速度，可以把静态页面和动态页面由不同的服务器来解析，加快解析速度，降低原来单个服务器的压力。</p><p><img src="`+o+`" alt="动静分离原理图"></p><p><em>示例</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">upstream static {   </span></span>
<span class="line"><span style="color:#BABED8;">    server 192.167.4.31:80</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">upstream dynamic {   </span></span>
<span class="line"><span style="color:#BABED8;">    server 192.167.4.32:8080</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">server {</span></span>
<span class="line"><span style="color:#BABED8;">    listen       80</span><span style="color:#676E95;font-style:italic;">;   #监听端口</span></span>
<span class="line"><span style="color:#BABED8;">    server_name  www.abc.com</span><span style="color:#676E95;font-style:italic;">; 监听地址</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 拦截动态资源</span></span>
<span class="line"><span style="color:#BABED8;">    location ~ .*\\.(php|jsp)$ {</span></span>
<span class="line"><span style="color:#BABED8;">       proxy_pass http://dynamic</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">   </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 拦截静态资源</span></span>
<span class="line"><span style="color:#BABED8;">    location ~ .*\\.(jpg|png|htm|html|css|js)$ {       </span></span>
<span class="line"><span style="color:#BABED8;">       root /data/</span><span style="color:#676E95;font-style:italic;">;  #html目录</span></span>
<span class="line"><span style="color:#BABED8;">       proxy_pass http://static</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">       autoindex on</span><span style="color:#676E95;font-style:italic;">;;  #自动打开文件列表</span></span>
<span class="line"><span style="color:#BABED8;">    }  </span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><h2 id="缓存服务" tabindex="-1">缓存服务 <a class="header-anchor" href="#缓存服务" aria-label="Permalink to &quot;缓存服务&quot;">​</a></h2><p>Nginx 的缓存服务主要用于提高网站的性能和可用性。它的主要作用如下：</p><ul><li>提高响应速度：通过将请求的结果存储在缓存中，当相同的请求再次到来时，可以直接从缓存中获取结果，而不需要再次向后端服务器请求。这样可以大大提高响应速度，提升用户体验</li><li>减轻后端服务器的压力：由于许多请求可以直接从缓存中获取结果，因此可以减少对后端服务器的请求，从而减轻后端服务器的压力</li><li>提高网站的可用性：当后端服务器出现故障时，如果请求的结果在缓存中存在，Nginx 仍然可以从缓存中获取结果并返回给用户，从而提高网站的可用性</li><li>节省网络带宽：通过缓存静态资源，如图片、CSS、JavaScript 文件等，可以减少这些资源的重复传输，从而节省网络带宽</li></ul><p><em>示例：静态资源缓存，接口的动态内容不缓存</em></p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">http {</span></span>
<span class="line"><span style="color:#BABED8;">    proxy_cache_path /path/to/cache </span><span style="color:#F07178;">levels</span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;">1:2 </span><span style="color:#F07178;">keys_zone</span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;">my_cache:10m </span><span style="color:#F07178;">max_size</span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;">10g </span><span style="color:#F07178;">inactive</span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;">60m </span><span style="color:#F07178;">use_temp_path</span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;">off</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    server {</span></span>
<span class="line"><span style="color:#BABED8;">        listen 80</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        server_name mywebsite.com</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;"># 静态资源的 location</span></span>
<span class="line"><span style="color:#BABED8;">        location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_cache my_cache</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_pass http://backend</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;"># 对 200、302状态码缓存60分钟</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_cache_valid 200 302 60m</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;"># 缓存1分钟</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_cache_valid 404 1m</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">            </span></span>
<span class="line"><span style="color:#BABED8;">            proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;"># 动态接口的 location</span></span>
<span class="line"><span style="color:#BABED8;">        location /api/ {</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_pass http://backend</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_no_cache 1</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">            proxy_cache_bypass 1</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">        }</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><p><code>proxy_cache_path</code>指令用于定义缓存路径及其相关参数。在这个例子中：</p><ul><li><code>/path/to/cache</code>是缓存存储的实际文件系统路径。</li><li><code>levels=1:2</code>定义了目录结构的层次</li><li><code>keys_zone=my_cache:10m</code>为缓存设置一个共享内存区域，其中<code>my_cache</code>是缓存的名字，<code>10m</code>是共享内存区域的大小</li><li><code>max_size=10g</code>设置了缓存的最大大小为10GB</li><li><code>inactive=60m</code>表示缓存中的数据在60分钟内没有被访问时被认为是不活跃的</li><li><code>use_temp_path=off</code>禁用在临时路径上创建临时文件</li></ul><p>在<code>location /</code>块中，使用<code>proxy_cache</code>指令启用缓存，并使用<code>proxy_cache_valid</code>指令定义了不同HTTP响应码的缓存有效时间。<code>proxy_cache_use_stale</code>指令用于在更新缓存时允许使用旧的缓存数据，即使后端服务器暂时不可用。</p><p><strong>强制缓存</strong></p><p>使用 expires 指令来设置强制缓存的有效期。</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">location ~* \\.(jpg|jpeg|png|gif|ico)$ {</span></span>
<span class="line"><span style="color:#BABED8;">    expires 30d</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><p><strong>协商缓存</strong></p><p>可以使用 add_header 指令来添加 ETag 或 Last-Modified 头部，这两个头部是协商缓存的关键。</p><div class="language-ini"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">location ~* \\.(css|js)$ {</span></span>
<span class="line"><span style="color:#BABED8;">    add_header ETag </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#676E95;font-style:italic;">;</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><h2 id="高可用" tabindex="-1">高可用 <a class="header-anchor" href="#高可用" aria-label="Permalink to &quot;高可用&quot;">​</a></h2><p>一般情况下，通过 nginx 主服务器访问后台目标服务集群，当主服务器挂掉后，自动切换至备份服务器，此时由备份服务器充当主服务器的角色，访问后端目标服务器。</p><p>1、在两台主备 nginx 服务器上安装 keepalived</p><p>keepalived 相当于一个路由，它通过一个脚本来检测当前服务器是否还活着，如果还活着则继续访问，否则就切换到另一台备份服务器。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 安装 keepalived</span></span>
<span class="line"><span style="color:#FFCB6B;">yum</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">install</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">keepalived</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 检查版本</span></span>
<span class="line"><span style="color:#FFCB6B;">rpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-q</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">keepalived</span></span>
<span class="line"><span style="color:#FFCB6B;">keepalived-1.3.5-16.el7.x86_64</span></span></code></pre></div><p>2、修改主备服务器 /etc/keepalived/keepalivec.conf 配置文件（可直接替换），完成高可用主从配置。 keepalived 将 nginx 服务器绑定到一个虚拟 ip ， nginx 高可用集群对外统一暴露这个虚拟 ip，客户端都是通过访问这个虚拟 ip 来访问 nginx 服务器</p><div class="language-perl"><button title="Copy Code" class="copy"></button><span class="lang">perl</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">global_defs {</span></span>
<span class="line"><span style="color:#BABED8;">    notification_email {</span></span>
<span class="line"><span style="color:#BABED8;">        acassen</span><span style="color:#89DDFF;">@</span><span style="color:#BABED8;">firewall.loc</span></span>
<span class="line"><span style="color:#BABED8;">        failover</span><span style="color:#89DDFF;">@</span><span style="color:#BABED8;">firewall.loc</span></span>
<span class="line"><span style="color:#BABED8;">        sysadmin</span><span style="color:#89DDFF;">@</span><span style="color:#BABED8;">firewall.loc</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">    notification_email_from_Alexandre.Cassen</span><span style="color:#89DDFF;">@</span><span style="color:#BABED8;">firewall.loc</span></span>
<span class="line"><span style="color:#BABED8;">    smtp_server 192.168.4.32</span></span>
<span class="line"><span style="color:#BABED8;">    smtp_connect_timeout 30</span></span>
<span class="line"><span style="color:#BABED8;">    router_id LVS_DEVEL  </span><span style="color:#676E95;font-style:italic;"># 在 /etc/hosts 文件中配置，通过它能访问到我们的主机</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">vrrp_script_chk_http_port {   </span></span>
<span class="line"><span style="color:#BABED8;">    script </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/usr/local/src/nginx_check.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    interval 2      </span><span style="color:#676E95;font-style:italic;"># 检测脚本执行的时间间隔</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">    weight 2        </span><span style="color:#676E95;font-style:italic;"># 权重每次加2</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#BABED8;">    interface ens7f0 </span><span style="color:#676E95;font-style:italic;"># 网卡，需根据情况修改</span></span>
<span class="line"><span style="color:#BABED8;">    state MASTER    </span><span style="color:#676E95;font-style:italic;"># 备份服务器上将 MASTER 改为 BACKUP</span></span>
<span class="line"><span style="color:#BABED8;">    virtual_router_id 51 </span><span style="color:#676E95;font-style:italic;"># 主备机的 virtual_router_id 必须相同</span></span>
<span class="line"><span style="color:#BABED8;">    priority 100   </span><span style="color:#676E95;font-style:italic;"># 主备机取不同的优先级，主机值较大，备份机值较小</span></span>
<span class="line"><span style="color:#BABED8;">    advert_int 1  </span><span style="color:#676E95;font-style:italic;"># 每隔多长时间（默认1s）发送一次心跳，检测服务器是否还活着</span></span>
<span class="line"><span style="color:#BABED8;">    authentication {</span></span>
<span class="line"><span style="color:#BABED8;">      auth_type PASS</span></span>
<span class="line"><span style="color:#BABED8;">      auth_pass 1111</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#BABED8;">        192.168.1.100 </span><span style="color:#676E95;font-style:italic;"># VRRP H 虚拟地址，可以绑定多个</span></span>
<span class="line"><span style="color:#BABED8;">    }</span></span>
<span class="line"><span style="color:#BABED8;">}</span></span></code></pre></div><p>字段说明：</p><ul><li>router_id：在 /etc/hosts 文件中配置，通过它能访问到我们的主机</li><li>interval：设置脚本执行的间隔时间</li><li>weight：当脚本执行失败即 keepalived 或 nginx 挂掉时，权重增加的值（可为负数）</li><li>interface：输入 <code>ifconfig</code> 命令查看当前的网卡名是什么</li></ul><p>3、在 <code>/usr/local/src</code> 目录下添加检测脚本 <code>nginx_check.sh</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#!/bin/bash</span></span>
<span class="line"><span style="color:#BABED8;">A</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">\`</span><span style="color:#FFCB6B;">ps</span><span style="color:#C3E88D;"> -C nginx -no-header </span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">wc</span><span style="color:#C3E88D;"> -l</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span><span style="color:#BABED8;"> $A </span><span style="color:#89DDFF;">-eq</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">];</span><span style="color:#89DDFF;font-style:italic;">then</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">/usr/local/nginx/sbin/nginx</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#FFCB6B;">sleep</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">[</span><span style="color:#BABED8;"> ps -C nginx -no-header </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;">wc -l</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">-eq</span><span style="color:#C3E88D;"> </span><span style="color:#F78C6C;">0</span><span style="color:#C3E88D;"> ]</span><span style="color:#89DDFF;">;</span><span style="color:#89DDFF;font-style:italic;">then</span></span>
<span class="line"><span style="color:#C3E88D;">        </span><span style="color:#FFCB6B;">killall</span><span style="color:#C3E88D;"> keepalived</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;font-style:italic;">fi</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">fi</span></span></code></pre></div><p>4、启动两台服务器的 nginx 和 keepalived</p><h2 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-label="Permalink to &quot;HTTPS&quot;">​</a></h2>`,64),i=[c];function r(y,B,D,E,d,h){return n(),a("div",null,i)}const F=s(t,[["render",r]]);export{g as __pageData,F as default};
