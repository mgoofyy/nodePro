Node OW Server 
================

The Project is bulid by node.js.And name is oneWord. this is the server

To Install:
-----------
```
npm install
```
To Run:
-----------
```
if u installed the pm2 and u can it like this , when u is in home workspace
	pm2 start bin/www && pm2 logs
```
And U can visit the website http://127.0.0.1:3000

To Use:
-------

Router WIKI:
------
For Account:
```
/user/signup  			POST 	user sign up
/user/login 			POST	user login in 
/user/info				POST	fetch user info
/user/login/verfity  	GET 	verfity code to login
/user/signup/verfity 	GET 	verfity code to signup

```

TEST WIKI:
------
#####Login Scrpit
```
echo '{"phone":"18814182331","password":"sdljkfsadljfkssdf"}' | http post http://127.0.0.1:3000/users/login

Response:
{
    "code": 1,
    "data": {
        "ow_profile_age": 1,
        "ow_profile_lock": 0,
        "ow_profile_nickname": null,
        "ow_profile_password": "hellozhangsan",
        "ow_profile_phone": "18814182331",
        "ow_profile_place": null,
        "ow_profile_sex": 2,
        "ow_profile_signature": null,
        "ow_profile_userType": 0,
        "ow_profile_userid": 10013,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjEwMDEzLCJleHBpcmVzIjoxNDc3MDQwOTQxMTA1fQ.Uw20mqtxANfUoBGB5UYFuVMRd6edN4o3uR9vr3H7EBA"
    },
    "method": "POST",
    "msg": "登陆成功"
}
```
#####Sign Up Scrpit
```
echo '{"phone":"18814182337","password":"sdljkfsadljfksdjfs","device":"iphone6s plus","signFrom":0}' | http post http://127.0.0.1:3000/users/signup

Response:

Success
{
	"code": 1,
	"data": null,
	"method": "POST",
	"msg": "账户注册成功"
}
ERROR - 01
{
    "code": 2,
    "error": "手机号已经注册",
    "method": "POST",
    "msg": "账户已经注册"
}
ERROR - 02
{
    "code": 3,
    "error": "未知错误",
    "method": "POST",
    "msg": "注册出错了"
}
```
#####Fetch User Info
```
http POST http://localhost:3000/users/info token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOjEwMDEzLCJleHBpcmVzIjoxNDc3MDQwOTQxMTA1fQ.Uw20mqtxANfUoBGB5UYFuVMRd6edN4o3uR9vr3H7EBA

Response
 
Success:
{
    "code": 1,
    "data": {
        "ow_profile_age": 1,
        "ow_profile_lock": 0,
        "ow_profile_nickname": null,
        "ow_profile_password": "hellozhangsan",
        "ow_profile_phone": "18814182331",
        "ow_profile_place": null,
        "ow_profile_sex": 2,
        "ow_profile_signature": null,
        "ow_profile_userType": 0,
        "ow_profile_userid": 10013
    },
    "method": "POST",
    "msg": "token合法"
}

Error - 0
{
    "code": 0,
    "error": "当前用户尚未登录",
    "method": "POST",
    "msg": "token为空"
}
ERROR - 1
{
    "code": 2,
    "error": "当前token非法",
    "method": "POST",
    "msg": "token不合法"
}
```

```
sadsadd
```

