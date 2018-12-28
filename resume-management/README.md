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

#### 错误解决方法

about to fork child process, waiting until server is ready for connections.


