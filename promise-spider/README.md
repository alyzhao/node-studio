## 项目需求
1. 爬取所有课程, 并获得学习的人数, 还有该课程的详细信息, 并通过本地请求响应到浏览器中

## 解决方案
1. 虽然之前也用了Promise, 这次使用Promise的all方法, 只有所有的promise都fullfill才会fullfill只要有一个rejected, 就会返回第一个被reject的promise

2. 重写了server和route模块, 只要处理requestHandler请求处理函数就行, 路由在调用服务器的时候申明

3. js数组的sort高级函数, 只需要返回true, false就能比较大小