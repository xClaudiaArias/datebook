var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', { title: ' | Profile', user: 'Claudia' });
});

module.exports = router;
