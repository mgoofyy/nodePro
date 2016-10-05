var express = require('express');
var router = express.Router();
var User = require('./../db/user');
var ObjectUtil = require('./../utils/objUtil');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login',function(req,res,next){
  var userInfo = req.body;
  console.log(userInfo);
  console.log('receive params {' + ObjectUtil.print(userInfo) + '\n}');

  var user = new User();
  user.nickname = userInfo.nickname;
  user.age = userInfo.age;
  user.place = userInfo.place;
  user.sex = userInfo.sex;
  user.signature = userInfo.signature;
  user.phone = userInfo.phone;
  user.userType = userInfo.userType;
  user.save(user,function(err){
    console.log(err);
  });
  res.send('respond with a resource');
});

// POST 请求注册
router.post('/signup',function(req,res,next){
  res.send('respond with a resource');
});

// POST 获取用户信息
router.post('/info',function(req,res,nex){
  res.send('respond with a resource');
});

module.exports = router;
