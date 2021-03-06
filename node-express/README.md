## 项目概述
	
使用express搭建电影管理网站, 使用jade作为模板引擎, mongodb作为数据存储。

主要功能有用注册登录, 后端保持会话状态。电影的分类浏览, 详情浏览, 以及搜索功能。

后台页面有录入信息, 修改信息, 删除信息等, 支持上传图片功能等。


## bower管理工具包, 会生成一个bower_components的文件夹, 引用时忽略这个文件夹

```sh
$ bower init 生成bower.json文件, 如果创建项目的时候忘记了, 可以用cmd bower init
$ type null >.bowerrc, 生成.bowerrc文件, 其中定义{"directory": "static"}便可以将包安装在指定目录
$ npm install bower -g
$ bower install bootstrap --save, 在bower.json中更改包版本在bower install就可以更换包版本, "bootstrap": "2.3.2"指定版本, ~2.3.2,安装不低于2.3.x; ^2.3.2不低于2.x.x; latest: 最新版本
```

常见的命令

```sh
$ bower list   					查看导入的包
$ bower cache list  			查看缓存的包
$ bower uninstall jquery		删除jquery
$ bower update jquery			更新jquery
$ bower info jquery 			查看jquery信息库
$ bower home jquery 			浏览器打开jquery主页
 ```

## mongoDB命令行

```sh
$ show dbs  				查看所有数据库
$ use xxdb 					切换db
$ db 						查看当前db
$ show collections			查看当前db下的所有collection
```

 ## underscore extend方法

 ```javascript
	extend_.extend(destination, *sources) 
	复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).

	_.extend({name: 'moe'}, {age: 50});
	=> {name: 'moe', age: 50}
 ```

## express app.locals 和 res.locals

	app.locals 存在于整个生命周期
	res.locals 存在于路由当中

## 获取前台传递的参数

```javascript
app.get('/:id', function(req res) {
	let id = req.body.userid; 		// 获取post过来的参数
	let id = req.query.userid; 		// 获取get过来的参数
	let id = req.parmas.id; 		// 获取路由当中的id

	let id = req.parma('userid');	// express封装, 优先级 router > post > get
})

```

## jade
> jade 的 if else 渲染会把if else 下的代码块渲染成和if else 相同的层级, 即缩进和if else 相同


