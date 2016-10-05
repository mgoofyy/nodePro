var express = require('express');
var router = express.Router();
var User = require('./../db/user');
var ObjectUtil = require('./../utils/objUtil');
var SIGNUP_ERROR = require('./../common/userError')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login',function(req,res,next){
  
});

// POST 请求注册
router.post('/signup',function(req,res,next){
  var userInfo = req.body;
  console.log(userInfo);
  // console.log('receive params {' + ObjectUtil.print(userInfo) + '\n}');
  var user = new User();
  user.phone = userInfo.phone;
  user.password = userInfo.password;
  user.signupSave(user,function(err,result){
    // console.log('=============' + result.length);
    if(err) {
      if(result.length !== 0) {
         res.json({
              "method" : "POST",
              "code"   : SIGNUP_ERROR.USER_HAVE_SIGNUP,
              "msg"    : "账户已经注册",
          });
        }
        else {
            res.json({
                "method" : "POST",
                "code"   : SIGNUP_ERROR.USER_SIGN_UNKNOW,
                "msg"    : "注册出错",
            });
        }
    } else {
           res.json({
              "method" : "POST",
              "code"   : SIGNUP_ERROR.USER_SIGN_SUCCESS,
              "msg"    : "账户注册成功",
            });
        }
    });
});

// POST 获取用户信息
router.post('/info',function(req,res,nex){
  res.send('respond with a resource');
});

module.exports = router;
