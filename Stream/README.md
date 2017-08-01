## 学习了node fs操作Stream的一些知识 createReadStream, createWriteStream
1. fs.createReadStream(path[, options]), 返回一个新的ReadStream对象
	path: String | Buffer | URL
	events: 'close', 'data', 'end', 'error', 'readable'
	readable.isPaused() 返回课都留当前操作状态
	readable.resume() method causes an explicitly paused Readable stream to resume emitting 'data' events
	readable.pause() 会使 flowing 模式的流停止触发 'data' 事件
	readable.pipe() 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable
	readable.read（）方法从内部缓冲区中抽出并返回一些数据

2. fs.createWriteStream(path[, options]), 返回一个新的WriteStream对象
	events: 'drain', 向可写流中写入数据, 在适当时机触发'drain'事件(WTF?)

3. 通过writeale.write(chunk)返回false, 调用readale.pause()暂停readable 
