# 元素 标签 属性

## pre

预格式化文本元素

空白折叠: 在源代码中的连续空白字符(空格、换行、制表-tab键), 在页面显示时, 会被折叠为一个空格

例外: 在pre元素中的内容不会出现空白折叠

在pre元素内部出现的内容, 会按照源代码格式显示到页面上

该元素通常用于在网页中显示一些代码。

pre元素功能的本质: 它有一个默认的css属性, white-space: pre;

> 显示代码时, 通常外面套code元素, code表示代码区域

## span【无语义】

没有语义, 仅用于设置样式

> 以前: 某些元素在显示时会独占一行(块级元素), 而某些元素不会(行级元素)。
> 到了HTML5, 已经弃用这种说法了(根据W3C官网的描述)

## href属性

hyper reference: 通常表示跳转地址

1. 普通链接
2. 锚链接

id属性: 全局属性, 表示元素在文档中的唯一编号

3. 功能链接

点击后, 触发某个功能

- 执行JS代码, javascript:
- 发送邮件, mailto:
  要求用户计算机上安装有邮件发送软件: exchange
- 拨号, tel:
  要求用户计算机上安装有拨号软件, 或使用的是移动端访问

## target属性

表示跳转窗口位置。

target的取值:

- _self: 在当前页面窗口中打开, 默认值
- _blank: 在新窗口中打开

## 布尔属性

checked
controls
disabled
selected
readonly

只要写了属性名, 就生效


# 路径的书写

## 站内资源和站外资源

站内资源: 当前网站的资源

站外资源: 非当前网站的资源

## 绝对路径和相对路径

站外资源: 绝对路径

站内资源: 相对路径

1. 绝对路径

绝对路径的书写格式

url地址:

```
协议名://主机号:端口号/路径

schema://host:port/path
```

协议名: http、https、file

主机号: 域名、IP地址

端口号: 如果协议是http协议, 默认端口号为80; 如果协议是https协议, 默认端口号为443;

当跳转目标和当前页面的协议相同时, 可以省略协议

2. 相对路径

以./开头, ./表示当前资源所在的目录

可以书写../表示返回上一级目录

# 常见样式声明

1. color

元素内部的文字颜色

**预设值**: 定义好的单词

**三原色, 色值**: 光学三原色(红、绿、蓝), 每个颜色可以使用0-255之间的数字来表达, 色值

16进制也就是两位, 可以表示0-255

```
rgb表示法:
rgb(0, 255, 0)
hex(16进制)表示法:
#红绿蓝
```

2. background-color

元素背景颜色

3. font-size

元素内部文字的尺寸大小

1)px: 像素, 绝对单位, 简单的理解为文字的宽高占多少个像素
2)em: 相对单位, 相对于父元素的字体大小

每个元素必须有字体大小, 如果没有声明, 则直接使用父元素的字体大小, 如果没有父元素(html元素是根元素, body元素的父元素是html元素), 则使用基准字号(浏览器里设置的字号大小)。

> user agent, UA, 用户代理(浏览器)

4. font-weight

文字粗细程度, 可以取值为数字, 可以取值为预设值

5. font-family

必须用户计算机中存在的字体才有效。

使用多个字体, 以匹配不同环境

> font-family: 字体1,字体2,字体3,sans-serif;

匹配规则: 优先匹配前面字体, 没有才匹配后面字体

sans-serif, 非衬线字体, 意思是如果前面的字体都没有, 让计算机环境自行选择一个非衬线字体, 一般都有默认的非衬线字体

6. line-height

每行文本的高度, 值越大, 每行的间距越大

设置行高为容器的高度, 可以让单行文本垂直居中

行高可以设置为纯数字, 表示相对于当前元素的字体大小

# 选择器

选择器: 帮助你精准的选中想要的元素

## 简单选择器

1. ID选择器

#开头, 一般不重复

实测发现有多个相同id时, 样式能应用到多个

但是 getElementById 和 querySelector 只能匹配第一个

2. 元素选择器

span、div等, 表示选中所有该元素

3. 类选择器

.开头, 表示选中所有该class

4. 通配符选择器

*, 表示选中所有元素

5. 属性选择器

[属性名=属性值]
如[name]、[href]、[data-id="zdy"]、[class="myclass"]、[attr^=value]等
带有属性名或属性值为某值的属性

[有很多, 具体规则看MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)

6. 伪类选择器

选中某些元素的某种状态

1) :link 超链接未访问时的状态
2) :visited 超链接访问过后的状态
3) :hover 鼠标悬停状态
4) :active 激活状态, 鼠标按下状态

巧记: 爱恨原则

7. 伪元素选择器

生成并选中某个元素内部的第一个子元素或最后一个子元素

::before

::after

这两个伪元素默认都是行盒

## 选择器的组合

1. 并且 紧邻着 比如div.cls
2. 后代元素 空格
3. 子元素 >
4. 相邻兄弟元素 +
5. 兄弟元素 ~

## 选择器的并列

多个选择器, 用逗号分隔

语法糖

## CSS代码书写位置

1. 内部样式表

书写在style元素中

2. 内联样式表 元素样式表

直接书写在元素的style属性

3. 外部样式表

将样式书写到独立的css文件

# 继承

子元素会继承父元素的某些CSS属性

通常, 跟文字内容相关的属性都能被继承

所以给body元素设置一个共用的字体, 所有的子元素(子元素的子元素)都会继承

# 层叠

层叠: 解决声明冲突的过程, 浏览器自动处理

## 1. 比较重要性

## 2. 比较权重

## 3. 比较源次序

## 应用

1. 重置样式表

书写一些作者样式, 覆盖浏览器的默认样式

重置样式表 -> 浏览器的默认样式

常见的重置样式表: normalize.css、reset.css、meyer.css

# 盒模型

box: 盒子, 每个元素在页面中都会生成一个矩形区域(盒子)

盒子模型:

1. 行盒, display等于inline的元素
2. 块盒, display等于block的元素

行盒在页面中不换行, 块盒独占一行

display默认值为inline

浏览器默认样式表设置的块盒: 容器元素、h1-6、p

常见的行盒: span、a、img、video、audio

## 盒子的组成部分

无论是行盒还是块盒, 都由下面几个部分组成, 从内到外分别是:

1. 内容 content

width、height, 设置的是盒子内容的宽高

内容部分通常叫做整个盒子的**内容盒 content-box**

2. 填充 padding

盒子边框到盒子内容的距离

padding-left、padding-right、padding-top、padding-bottom

padding: 速写属性

padding: 上 右 下 左

填充区 + 内容区 = **填充盒 padding-box**

3. 边框 border

边框 = 边框样式 + 边框宽度 + 边框颜色

边框样式: border-style
边框宽度: border-width
边框颜色: border-color

> 默认是字体的颜色

border: 速写属性

边框 + 填充区 + 内容区 = **边框盒 border-box**

4. 外边距 margin

边框到其他盒子的距离

margin: 速写属性

# 盒模型应用

## 改变宽高范围

默认情况下, width和height设置的是内容盒宽高

> 页面重构师: 将psd文件(设计稿)制作为静态页面

衡量设计稿尺寸的时候, 往往使用的是边框盒, 但设置width和height, 则设置的是内容盒

1. 精确计算
2. CSS3: box-sizing (content-box 默认; border-box)

## 改变背景覆盖范围

默认情况下, 背景覆盖边框盒

可以通过background-clip进行修改
border-box 默认;
padding-box
content-box

## 溢出处理

overflow, 控制内容溢出边框盒后的处理方式
宽高固定, 才会溢出
visible 可见的 默认;
hidden
scroll
auto

## 断词规则

word-break, 会影响文字在什么位置被截断换行

normal, 普通 默认。CJK(Chinese Japan Korea)字符(文字位置截断), 非CJK字符(单词位置截断)

break-all, 截断所有, 所有字符都在文字处截断

keep-all, 保持所有, 所有文字都在单词之间截断

一般用默认行为, 符合人类现实世界, 不要轻易改动

## 空白处理

white-space, 空白字符怎么处理
normal, 普通 默认
nowrap, 不换行
pre, 不会空白折叠

# 行盒的盒模型

常见的行盒: 包含具体内容的元素

span、strong、em、i、img、video、audio

## 显著特点

1. 盒子沿着内容延伸, 大多是文本内容
2. 行盒不能设置宽高

调整行盒的宽高, 应该使用字体大小、行高、字体类型, 间接调整。

3. 填充区

水平方向有效, 垂直方向仅会影响背景, 不会实际占据空间。

4. 边框

水平方向有效, 垂直方向不会实际占据空间。

5. 外边距

水平方向有效, 垂直方向不会实际占据空间。

## 行块盒

display: inline-block的盒子

1. 不独占一行
2. 盒模型中所有尺寸都有效

## 空白折叠

空白折叠, 发生在行盒(行块盒)内部或行盒之间

## 可替换元素 和 非可替换元素

大部分元素, 页面上显示的结果, 取决于元素内容, 称为**非可替换元素**

少部分元素, 页面上显示的结果, 取决于元素属性, 称为**可替换元素**

可替换元素: img、video、audio

绝大部分可替换元素均为行盒

可替换元素类似于行块盒, 盒模型中所有尺寸都有效

# 常规流

盒模型: 规定单个盒子的规则

视觉格式化模型(布局规则): 页面中的多个盒子排列规则

视觉格式化模型, 大体上将页面中盒子的排列分为三种方式:

1. 常规流
2. 浮动
3. 定位

## 常规流布局

常规流、文档流、普通文档流、常规文档流

所有元素, 默认情况下, 都属于常规流布局

总体规则: 块盒独占一行, 行盒水平方向依次排列

包含块(containing block): 每个盒子都有它的包含块, 包含块决定了盒子的排列区域

绝大部分情况下, 盒子的包含块, 为其父元素的内容盒 content-box

**块盒**

1. 每个块盒的总宽度(margin + border + padding + content), 必须刚好等于包含块的宽度, 必须占满

width的默认值是auto

margin的取值也可以是auto, 默认值是0

auto: 将剩余空间吸收掉

width吸收能力强于margin

若width、padding、border、margin计算后, 仍然有剩余空间, 该剩余空间被margin-right全部吸收

常规流中, 块盒在其包含块中 居中, 可以定宽, 然后左右margin设置为auto

以上是只看水平方向

2. 每个块盒垂直方向上的auto值

height: auto, 适应内容的高度, 默认值

margin: auto, 表示0

3. 百分比取值

padding、width、margin可以取值为百分比
四个方向上的 padding、margin 都是以**宽**算百分比

以上所有的百分比相对于包含块的宽度(只看width), 不区分box-sizing是内容盒还是边框盒

高度的百分比

> 1. 包含块的高度是否取决于子元素的高度, 设置百分比无效
> 2. 包含块的高度不取决于子元素的高度, 百分比相对于父元素的高度

高度补充: 第1个说的是父元素高度没设置, 也就是height: auto;由子元素的高度来撑开, 这时子元素如果是百分比高度, 则百分比无效
第2个说的是父元素设置了高度, 这时子元素如果是百分比高度, 则相对于父元素高度

百分比宽高是取clientWidth和clientHeight的值*百分比

4. 上下外边距的合并

两个常规流块盒, 上下边距相邻, 会进行合并

两个外边距取最大值

兄弟、父子元素都会出现
如果中间有东西把两个隔开, 就不会合并, 比如给border, 或者转换思路, 用padding(没有合并规则)

BFC也可以阻止合并

# 浮动

视觉格式化模型, 大体上将页面中盒子的排列分为三种方式:

1. 常规流
2. 浮动 float
3. 定位

## 应用场景

1. 文字环绕
2. 横向排列

## 浮动的基本特点

修改float属性值为:

- left: 左浮动, 元素靠上靠左
- right: 右浮动, 元素靠上靠右

默认值为none

1. 当一个元素浮动后, 元素必定为块盒(更改display为block)
2. 浮动元素的包含块, 和常规流一样, 为父元素的内容盒(content-box)

## 盒子尺寸

1. width为auto时, 适应内容宽度
2. height为auto时, 与常规流一致, 适应内容的高度
3. margin为auto, 为0
4. border、padding、百分比 设置与常规流一样

## 盒子排列

1. 左浮动的盒子靠上靠左排列
2. 右浮动的盒子靠上靠右排列
3. 浮动盒子在包含块中排列时, 会避开常规流块盒
4. 常规流块盒在排列时, 无视浮动盒子
5. 行盒在排列时, 会避开浮动盒子

> 如果文字没有在行盒中, 浏览器会自动生成一个行盒包裹文字, 该行盒叫匿名行盒

## 高度坍塌

高度坍塌的根源: 常规流盒子的自动高度, 在计算时, 不会考虑浮动盒子

清除浮动, 涉及css属性: clear

- 默认值: none
- left: 清除左浮动, 该元素必须出现在前面所有左浮动盒子的下方
- right: 清除右浮动, 该元素必须出现在前面所有右浮动盒子的下方
- both: 清除左右浮动, 该元素必须出现在前面所有浮动盒子的下方

# 定位

视觉格式化模型, 大体上将页面中盒子的排列分为三种方式:

1. 常规流
2. 浮动
3. 定位 position

定位: 手动控制元素在包含块中的精准位置

涉及的css属性: position

## position属性

- 默认值: static, 静态定位(不定位)
- relative: 相对定位
- absolute: 绝对定位
- fixed: 固定定位

一个元素, 只要position的取值不是static(默认值), 认为该元素是一个定位元素

定位元素会脱离文档流(相对定位除外)

一个脱离了文档流的元素:

1. 文档流中的元素摆放时, 会忽略脱离了文档流的元素
2. 文档流中元素计算自动高度时, 会忽略脱离了文档流的元素

## 相对定位

不会导致元素脱离文档流, 只是让元素在原来位置上进行偏移

盒子的偏移不会对其他盒子造成任何影响
只是视觉上给人造成了偏差, 实际上盒子原来在哪, 现在还在哪(可以这样理解)

可以通过四个css属性设置其位置:

- left
- right
- top
- bottom

以上4个合起来有个简写属性 inset

只有定位元素设置这些才有效

## 绝对定位

1. 宽/高为auto, 适应内容
2. 包含块变化: 找祖先中第一个定位元素, 该元素的填充盒为其包含块。
   若找不到, 则它的包含块为整个网页（初始包含块）

## 固定定位四个方向

其他情况和绝对定位完全一样

包含块不同: 固定为视口(浏览器的可视窗口)

## 定位下的居中

1. 定宽（高）
2. 将左右（上下）距离设置为0
3. 将左右（上下）margin设置为auto

绝对定位和固定定位中, margin为auto时, 会自动吸收剩余空间

## 多个定位元素重叠时

堆叠上下文

设置z-index, 通常情况下, 该值越大, 越靠近用户

只有定位元素设置z-index有效

z-index可以是负数, 如果是负数, 则遇到常规流、浮动元素, 则会被其覆盖

## 补充

- 绝对定位、固定定位元素一定是块盒
- 绝对定位、固定定位元素一定不是浮动
- 没有外边距合并

# 更多的选择器

## 更多伪类选择器

1. first-child

选择第一个子元素

first-of-type, 选中子元素中第一个指定类型的元素

2. last-child

last-of-type

3. nth-child

选中指定的第几个子元素

even: 关键字, 等同于2n
odd: 关键字, 等同于2n+1

4. nth-of-type

选中指定的子元素中第几个某类型的元素

## 更多的伪元素选择器

1. first-letter

选中元素中的第一个字母(中文就是第一个汉字)

2. first-line

选中元素中的第一行的文字(始终选择, 不管怎么变)

3. selection

选中被用户框选的文字

# 更多的样式

## 不透明度

1. opacity, 它设置的是整个元素的不透明(包括里面的内容和子元素等所有东西都会变), 它的取值是0~1, 0是没有 1是有
2. 在颜色位置设置alpha通道(rgba() 背景色 边框色 字体颜色等)

## 鼠标

使用cursor设置

自定义图标 cursor: url('xxx.icon'), auto; auto表示当浏览器不支持自定义图标时, 使用默认

## 盒子隐藏

1. display: none; 不生成盒子
2. visibility: hidden; 生成盒子, 只是从视觉上移除盒子, 盒子仍占据空间

## 背景图

img元素是属于HTML的概念

背景图属于css的概念

1. 当图片属于网页内容时, 必须使用img元素
2. 当图片仅用于美化页面时, 必须使用背景图

### 涉及的css属性

1. background-image

background-image: url('')

2. background-repeat

background-repeat: no-repeat、repeat-x、repeat-y、repeat 默认

默认情况下, 背景图会在X Y中进行重复

3. background-size

background-size: auto auto; 默认

预设值: container、cover, 类似于 object-fit

数值 百分比

> 注意: 使用background简写时, positon/size 顺序不能乱

4. background-position

设置背景图的位置

预设值: left、bottom、right、top、center

数值 百分比

雪碧图(精灵图), 一般用px来控制

5. background-attachment

通常用它控制背景图是否固定

6. 背景图和背景颜色混用
