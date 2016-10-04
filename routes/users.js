var express = require('express');
var router = express.Router();
var User = require('./../db/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login',function(req,res,next){
  // var requestParams = req.body;
  var user = User.createUser();
  console.log(typeof user);
  user.nickname='coffee';
  user.age=13;
  user.place = 'american';
  user.sex='2';
  user.signature='go ur rord, let others to say ';
  user.phone = '1881418410';
  user.userType=1;
  User.save(user,function(err){
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
