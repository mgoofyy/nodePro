var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('404', { title: '当前页面已经找不到了哦' });
});

module.exports = router;