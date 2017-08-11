## 使用方法
1. npm install jade -g

## 命令行工具
1. jade demo.jade  -- 编译成html文本
2. jade -P demo.jade   -- 便宜成有缩进的文本
3. jade -P -w demo.jade   -- 实时编译

## 语法
1. 父元素与子元素之间缩进表示, 所有标签都不需要写尖括号也不需要写最后的标签
2. class直接在元素后面.class-name, id在元素后面加#id, 但是其他的属性必须写成括号里面用逗号隔开
	```
	input.text-input.input#username(name='username', type='text', placehold='your name')
	```
3. 注释
	(1). 单行注释 //, 会编译成html的注释 
	(2). 无缓存注释 //-, 不会编译成注释
	(3). 在父元素注释, 另起一行//-, 就是块注释
4. style. script. 用来表示样式和脚本
