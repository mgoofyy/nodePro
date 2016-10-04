var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login',function(req,res,next){

});

// POST 请求注册
router.post('/signup',function(req,res,next){

});

// POST 获取用户信息
router.post('/info',function(req,res,nex){

});

module.exports = router;
