const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile('login.html', {'root': '././auth'})
});



module.exports = router;
