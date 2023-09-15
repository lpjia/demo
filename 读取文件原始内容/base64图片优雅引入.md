### base64图片优雅引入

单独弄一个文件来存放base64字符串, 后缀名是dataurl, 随便写的

如何读取文件中的内容? 不同的构建工具有相应的处理, 看"脚手架处理文件.txt"

配置好webpack或vite(其实不用配置)后, img的:src=导入进来的dataurl即可