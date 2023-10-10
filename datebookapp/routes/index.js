const express = require('express');
const session = require('express-session');


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    let user = req.session.user

    res.render("index")
});


module.exports = router
