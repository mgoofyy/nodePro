var express = require('express');
var router = express.Router();
var User = require('./../db/user');
var ObjectUtil = require('./../utils/objUtil');
var UserMessage = require('./../common/UserMessage');
var ResponseJson = require('./../common/response');
var TokenManger = require('./../common/tokenVerfity');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login',function(req,res,next){
    var userInfo = req.body;
    console.log(userInfo);
   TokenManger.token.encode('zhsnagn',function(token){
       var data = {
           token : token,
           phone : userInfo.phone,
       };
       var responseJson = new ResponseJson(data,'POST','登陆成功','登陆成功');
       res.json(responseJson.setCode(UserMessage.LOGIN.USER_LOGIN_SUCCESS))
   });
    
});


// POST 请求注册
router.post('/signup',function(req,res,next){
  var userInfo = req.body;
  console.log(userInfo);
  var user = new User();
  user.phone = userInfo.phone;
  user.password = userInfo.password;
  user.signupSave(user,function(err,result){
    if(err) {
      if(result.length !== 0) {
            var responseJson = new ResponseJson(null,'POST','账户已经注册','手机号已经注册');
            res.json(responseJson.setCode(UserMessage.SIGNUP.USER_HAVE_SIGNUP))
        }
        else {
            var responseJson = new ResponseJson(null,'POST','注册出错了','未知错误');
            res.json(responseJson.setCode(UserMessage.SIGNUP.USER_SIGN_UNKNOW))
        }
    } else {
           var responseJson = new ResponseJson(null,'POST','账户注册成功','成功');
            res.json(responseJson.setCode(UserMessage.SIGNUP.USER_SIGN_SUCCESS))
        }
    });
});


// POST 获取用户信息
router.post('/info',function(req,res,nex){
  res.send('respond with a resource');
});

module.exports = router;
