var express = require('express');
var router = express.Router();
var User = require('./../db/user');
var ObjectUtil = require('./../utils/objUtil');
var UserMessage = require('./../common/userMessage');
var ResponseJson = require('./../common/response');
var TokenManger = require('./../common/tokenVerfity');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// POST 请求登陆
router.post('/login', function (req, res, next) {
    var userInfo = req.body;
    console.log(userInfo);

    var user = new User();
    user.phone = userInfo.phone;
    user.password = userInfo.password;
    user.device = userInfo.device;

    user.verfityPassword(user, function (err, code, result) {
        console.log(err);
        if (err) {
            if (code === UserMessage.LOGIN.USER_LOGIN_FAIL) {
                var responseJson = new ResponseJson(null, 'POST', '登陆失败', '内部错误');
                res.json(responseJson.setCode(UserMessage.LOGIN.USER_LOGIN_FAIL));
            } else if (code === UserMessage.LOGIN.USER_LOGIN_NOT_USER) {
                var responseJson = new ResponseJson(null, 'POST', '登陆失败', '不存在该用户');
                res.json(responseJson.setCode(UserMessage.LOGIN.USER_LOGIN_NOT_USER));
            } else {
                var responseJson = new ResponseJson(null, 'POST', '登陆失败', '未知错误');
                res.json(responseJson.setCode(UserMessage.LOGIN.USER_LOGIN_UNKNOW));
            }
        } else {
            TokenManger.token.encode(result.ow_profile_userid, function (token) {
                result.token = token;
                var responseJson = new ResponseJson(result, 'POST', '登陆成功', '请求成功');
                res.json(responseJson.setCode(UserMessage.LOGIN.USER_LOGIN_SUCCESS));
            });
        }
    });
});


// POST 请求注册
router.post('/signup', function (req, res, next) {
    var userInfo = req.body;
    console.log(userInfo);
    var user = new User();
    user.phone = userInfo.phone;
    user.password = userInfo.password;
    user.device = userInfo.device;
    user.signFrom = userInfo.signFrom;
    user.signupSave(user, function (err, code) {

        if (err) {
            if (code === UserMessage.SIGNUP.USER_HAVE_SIGNUP) {
                var responseJson = new ResponseJson(null, 'POST', '账户已经注册', '手机号已经注册');
                res.json(responseJson.setCode(UserMessage.SIGNUP.USER_HAVE_SIGNUP));
            } else {
                var responseJson = new ResponseJson(null, 'POST', '注册出错了', '未知错误');
                res.json(responseJson.setCode(UserMessage.SIGNUP.USER_SIGN_UNKNOW));
            }
        } else {
            var responseJson = new ResponseJson(null, 'POST', '账户注册成功', '成功');
            res.json(responseJson.setCode(UserMessage.SIGNUP.USER_SIGN_SUCCESS));
        }
    });
});


// POST 获取用户信息
router.post('/info', function (req, res, next) {
    var token = req.headers.token;
    console.log(token);
    var tokenTmp = new TokenManger.token();
    tokenTmp.token = token;
    tokenTmp.verfity(function (err, code, uid) {
        if (code === TokenManger.TOKEN_INFO.TOKEN_IS_NULL) {
            var responseJson = new ResponseJson(null, 'POST', 'token为空', '当前用户尚未登录');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_NULL));
        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_LEGAL) {
            var user = new User();
            user.loadUserinfo(uid, function (err, code, userinfo) {
                if (err) {
                    var responseJson = new ResponseJson(null, 'POST', '数据库出错', '数据库出错，请联系服务器管理员');
                    res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_SQL_ERROR));
                } else {
                    var responseJson = new ResponseJson(userinfo, 'POST', 'token合法', '当前用户在线');
                    res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_LEGAL));
                }

            });

        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_ILLEGAL) {
            var responseJson = new ResponseJson(null, 'POST', 'token不合法', '当前token非法');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_ILLEGAL));
        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_OUT_DATE) {
            var responseJson = new ResponseJson(null, 'POST', 'token过期', '请重新登录');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_OUT_DATE));
        }
    });
    // res.send('respond with a resource');
});

router.post('/info/update',function(req,res,next){
    var token = req.headers.token;
    var userInfo = req.body;
    var tokenTmp = new TokenManger.token();
    tokenTmp.token = token;
    tokenTmp.verfity(function (err, code, uid) {
        console.log(err + code + uid);
        if (code === TokenManger.TOKEN_INFO.TOKEN_IS_NULL) {
            var responseJson = new ResponseJson(null, 'POST', 'token为空', '当前用户尚未登录');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_NULL));
        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_LEGAL) {
            var user = new User();
            userInfo.userid = uid;
            user.updateUserinfo(userInfo,function(error,code){
                if(error) {
                    var responseJson = new ResponseJson(null, 'POST', '数据库出错', '数据库出错，请联系服务器管理员');
                    res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_SQL_ERROR));
                } else {
                    var responseJson = new ResponseJson(userInfo, 'POST', 'token合法', '更新用户信息成功');
                    res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_LEGAL));
                }
            });
        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_ILLEGAL) {
            var responseJson = new ResponseJson(null, 'POST', 'token不合法', '当前token非法');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_0ILLEGAL));
        } else if (code === TokenManger.TOKEN_INFO.TOKEN_IS_OUT_DATE) {
            var responseJson = new ResponseJson(null, 'POST', 'token过期', '请重新登录');
            res.json(responseJson.setCode(TokenManger.TOKEN_INFO.TOKEN_IS_OUT_DATE));
        }
    });

});

module.exports = router;