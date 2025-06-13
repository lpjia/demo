### 统一资源定位符 (URL)

[What_is_a_URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)

[Data_URLs](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)

[FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

[URL.createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)

URL 无非就是一个给定的独特资源在 Web 上的地址。理论上说，每个有效的 URL 都指向一个唯一的资源。这个资源可以是一个 HTML 页面，一个 CSS 文档，一幅图像，等等。

而在实际中，也有一些例外，最常见的情况就是一个 URL 指向了不存在的或是被移动过的资源。

这里是获取图片的资源, 发请求从远程服务器去拿资源数据

如果不想从远程服务器去拿, 那么就用到data URL了(相当于本地, 不经过网络请求)

### 什么是data URL

就是把资源的数据写到url地址, 不用去远程拿了

data URL是标准格式的字符串
data:content/type;base64,

### 运行js代码

data:application/javascript,alert(123);

(写js注意类型后是逗号)

没有经过任何的网络通信, 直接通过data url拿到了相应的资源数据

启发: 通过data url, 可以动态的运行js代码, 把js代码拼接到逗号后面的位置, 生成一个script元素, 引入data url就可以了

### base64

base64是可选的, 是一种编码格式, 可以把任意数据(通常是二进制数据)转换成对应的文本, 这个转换过程叫base64编码

二进制数据没办法在文本编辑器里显示(常见的1010是文本形式的, 非二进制数据)

Base64，就是包括小写字母a-z、大写字母A-Z、数字0-9、符号"+"、"/"一共64个字符的字符集

和上面的alert(123)是同样效果

data:application/javascript;base64,YWxlcnQoMTIzKQ==

btoa('alert(123)')

'YWxlcnQoMTIzKQ=='

把alert(123)字符, 通过btoa(), 编码转换, 转成base64

把文件(通常是小图片)用base64编码, 体积一般会大30%左右, 所以大文件(大图片)不建议

### 图片

图片是二进制数据, 没办法直接书写在src, 一般是src=图片的地址

小图片可以用base64编码
