# macos更新后, MySQL不能启动问题

## 情况一

### 问题

* macos 升级到 11.3后 mysql不能启动.

### 参考

* ![Mac 因更新系统 导致 mysql 启动失败](https://zhuanlan.zhihu.com/p/105632069)

### 关键

```shell
sudo chown -R mysql /usr/local/mysql/data
```

  解决权限问题即可.

## 情况二

### 问题再现: 升级11.4后 mysql 不能启动

### 忘记上一次更新了.. 这次直接重装了数据库. 太愚蠢了
