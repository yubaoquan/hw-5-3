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

building...
