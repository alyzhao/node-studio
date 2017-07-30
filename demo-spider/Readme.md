## 项目需求
1. 其中一部分, 能够爬取慕课网的内容, 并将内容内容显示在网页上

2. 另一部分, 将这个课程的章节信息存储在class.txt文件中

## 解决方案
1. 用node的http模块的get方法, 请求慕课网的数据, 返回一个promise对象, 并且在http的createServer方法的参数(callback)中将客户端的请求返回出去

2. 引入cheerio库, 能够像jquery一样操作文档, 便于从抓取的数据中分析出有用的信息, 并通过引入node的fs(FileSystem)模块, 通过fs的writeFile方法将信息保存起来

