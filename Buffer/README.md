## 熟悉了一下node的Buffer, 申明一个内存空间用来存储数据
1. 实例化一个Buffer: Buffer.form(string[, encoding]), Buffer.alloc(size[, fill, encoding]), Buffer.allocUnsafe(size);

2. fs.readFile(path[, options], callback(err, data))
	options可以指定编码, 如果不指定, Buffer data默认为utf8编码

3. fs.writeFile(file, data[, options], callback)
	file: 文件名或文件描述符, 会覆盖原有文件否则新建
	date: Buffer或者String
	options: 指定编码, 默认utf8
	callback(err)

4. 表示图片
	data:image/png;base64,String


