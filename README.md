# user

express + mongodb + mongoose 小demo

## 接口描述

接口参数与作业文档中描述相同

### 注册

接口地址: http://106.75.153.180:9000/register

method: POST

入参示例:

```json
{
  "username": "1234",
  "email": "bbb@qq.com",
  "password": "abcabc"
}
```

### 登录

接口地址: http://106.75.153.180:9000/login

method: POST

入参示例:

```json
{
  "email": "bbb@qq.com",
  "password": "abcabc"
}
```

### 用户查询(需要登录接口返回的token)

接口地址: http://106.75.153.180:9000/user/:username

method: GET

header:

```text
Authorization: Bearer xxxxxx
```

## 开发过程中的问题

### 安装 mongodb

安装命令执行了三次才成功, 前两次报错都属于网络连接的问题

安装命令

```bash
 sudo yum install -y mongodb-org
```

报错1

```text
mongodb-mongosh-1.0.1.el7.x86_ FAILED
https://repo.mongodb.org/yum/redhat/7/mongodb-org/5.0/x86_64/RPMS/mongodb-mongosh-1.0.1.el7.x86_64.rpm: [Errno 14] curl#35 - "TCP connection reset by peer"
Trying other mirror.

warning: /var/cache/yum/x86_64/7/mongodb-org-5.0/packages/mongodb-org-5.0.0-1.el7.x86_64.rpm: Header V3 RSA/SHA1 Signature, key ID e2c63c11: NOKEY
Public key for mongodb-org-5.0.0-1.el7.x86_64.rpm is not installed
...

Error downloading packages:
  mongodb-mongosh-1.0.1-1.el7.x86_64: [Errno 256] No more mirrors to try.
```

报错2

```text
Retrieving key from https://www.mongodb.org/static/pgp/server-5.0.asc


GPG key retrieval failed: [Errno 14] curl#35 - "TCP connection reset by peer"
```

### 更新 nodejs

因为代码里有一处使用了 optional chaining 语法, 而目前服务器上使用的 node 版本是12, 所以启动时会报错. 需要更新node版本.

根据 [这篇文档](https://linuxize.com/post/how-to-install-node-js-on-centos-7/) 安装, 跑第二个命令时会报一个404的错误, 可能是源里的node资源找不到了

```bash
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
# 第一条命令不报错

sudo yum install nodejs
# 第二条报错
```

可能是 yum 源太旧了?

根据(这篇文章)[https://segmentfault.com/a/1190000022323818]更新 yum 成阿里的源

```bash
cd /etc/yum.repos.d
cp CentOS-Base.repo CentOS-Base.repo.bak
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum makecache
yum -y update
```

根据(这篇文章)[https://www.jianshu.com/p/2cc020b170c0]卸载旧的 node

```bash
yum remove nodejs npm -y
```

更新完 yum 源后, 重新安装 node, 安装到了14版本的 node, 问题解决

```bash
sudo yum install nodejs
```
