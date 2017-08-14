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
5. 申明变量, 并传递参数

	(1). 从命令行向jade传递参数, 当前文档申明的变量优先级最高
	```
	jade demo.jade -P -w --obj '{"title": "jade"}'
	```
	(2). 从外部json文档传递参数
	```
	jade demo01.jade -P -w -O test.json	
	```
6. 转义与非转义

	(1). #{variable} 与 = variable 都是转义, 标签会被转义成字符, 如果variable未定义, #{}会输出undefined, = 会输出空

	(2). !{variable} 与 != variable 是非转义, 标签会被输出

	(3). \#{variable} 输出#和{}
	```
	- var htmlDate = '<script>alert(1);</script>'
	p #{htmlDate}		// 转义
	p= htmlDate 		// 转义
	p !{htmlDate}		// 非转义
	p!= htmlDate 		// 非转义
	```
7. 流程代码 for, each, while, if ,else, unless
	(1). 循环遍历
	```
	- var obj = {'name': 'zhao', 'age': 22};
	- for (var k in obj) 
		p= obj[k]
	- each value, key in obj
		p #{key}: #{value}
	- each item in obj
		p= item
	- var lists = [{id: 1,items: ['a', 'b']},{id: 2,items: ['c', 'd']},{id: 3,items: ['e', 'f']}];
	dl
		each list in lists
			dt= list.id
			each item in list.items
				dd=items	
	while n < 3
		p= n++				
	```
	(2). 判断
	```
	unless false
		p unless

	- var name = 'jade';
	case name 
		when 'java'
		when 'node'
			p Hi node!
		when 'jade': p Hi jade
		default 
			p Hi #{name}
	```
8. mixins

	(1). 定义和使用mixin
	```
	mixin hello
		p hello mixin
	+hello

	mixin skill(name, skills)
		p #{name}
		ul.skills
			each skill in skills
				li= skill
	+skill('zhao', ['node', 'express'])

	//- 嵌套
	mixin group(people)
		div.group
			h4 #{people.name}
			+skill(people.name, people.skills)
	+group({name: 'zhao', skills: ['node', 'express']})
	```

	(2). 传递属性
	```
	mixin attr(name)
		p(class!=attributes.class) #{name}
	+attr('attr')(class='magic')
	//- 多个属性时
	mixin attrs(name)
		p&attributes(attributes) #{name}
	+attrs('attrs')(class='magic', id='jade-attr')
	// 多个参数时	
	mixin magic(name, ...items)
		ul(class='#{name}')
			each item in items
				li= item
	+magic('node', 'express', 'jade', 'ejs')
	```
9. 模板的继承
	
	(1). block定义的方式
	```
	block desc 		//- 定义
	p block extends
	block desc		//- 引用
	```

	(2). extends的使用
	```
	//- demo.jade
	extends layout
	block content
	...

	//- layout.jade
	...
	block content
	```
10. 模板的包含
	
	(1). include的使用
11. 




