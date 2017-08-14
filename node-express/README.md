## bower管理工具包, 会生成一个bower_components的文件夹, 引用时忽略这个文件夹
	 ```
	 => bower init 生成bower.json文件, 如果创建项目的时候忘记了, 可以用cmd bower init
	 => type null >.bowerrc, 生成.bowerrc文件, 其中定义{"directory": "static"}便可以将包安装在指定目录
	 => npm install bower -g
	 => bower install bootstrap --save, 在bower.json中更改包版本在bower install就可以更换包版本, "bootstrap": "2.3.2"指定版本, ~2.3.2,安装不低于2.3.x; ^2.3.2不低于2.x.x; latest: 最新版本
	 ```

 ## mongoDB命令行
 > show dbs  				查看所有数据库
 > use xxdb 				切换db
 > db 						查看当前db
 > show collections			查看当前db下的所有collection

 ## underscore extend方法
 ```
	extend_.extend(destination, *sources) 
	复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).

	_.extend({name: 'moe'}, {age: 50});
	=> {name: 'moe', age: 50}
 ```



