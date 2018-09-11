### 项目概述

### 需求概述

### 1.0 版本

1. 增加操作栏 √

2. 使用 mongdb 存储 session √

3. 后台界面是好了, 就差接口了 

4. 用户信息要做个页面, 信息编辑页面就用添加商家的视图. √

5. 商家管理
    + 添加完成  √
    + 编辑还未完成 √
    + 商家查询, 先不分页 √
    + 商家删除
        - 单个删除 √
        - 批量删除 √

6. 商品管理
    + 商品添加 √
    + 商品修改 admin 能删除商品么?
    + 商品查询 √
        + 分商家查询和管理员查询 √
    + 商品删除
        + 单个删除 √
        + 批量删除 √

### 2.0 版本

1. 登录增加 enter

2. 主题更改 [主题](https://blog.csdn.net/qq_34117170/article/details/80540043) √

3. 增加系统名称显示 √

4. 优化添加刷新之后重新加载数据   √

5. 查看商户的首饰.         √

6. 商家信息增加字段
    + 添加, 修改, 商家修改个人信息（暂时不让修改密码和入驻信息） √

7. 商品信息增加字段
    + 添加, 修改 √

8. 商品分页

### 参考

[mongodb 操作](https://blog.csdn.net/wangpeng047/article/details/7705588)

[axios 处理](https://blog.csdn.net/sjn0503/article/details/74729300)

### notes

#### mongodb 添加权限管理

#### mongodb 命令




创建用户管理员账户 [参考](https://www.jianshu.com/p/79caa1cc49a5) [参考](https://blog.csdn.net/fofabu2/article/details/78983741)

```
use admin
db.createUser({ user: "useradmin", pwd: "adminpassword", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })
db.auth("useradmin", "adminpassword")  // 返回1, 表示成功
exit    // 退出
```

```
killall mongod     # mac 结束进程
service mongod stop    # ubuntu 结束进程

source ~/.bash_profile

mongod --fork --logpath=/log/mongodb.log --auth 

mongo -u "Allen" -p "Optimism*03" --authenticationDatabase "jewelry"

```



新建数据库的账号密码

```
use yourdatabase
db.createUser({ user: "youruser", pwd: "yourpassword", roles: [{ role: "dbOwner", db: "yourdatabase" }] })
```

最终可以使用 `mongodb://youruser2:yourpassword2@localhost/yourdatabase` 来连接数据库
