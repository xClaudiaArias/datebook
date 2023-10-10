const express = require('express');
const session = require('express-session');

const router = express.Router();


router.get('/', (req, res) => {
    let user = req.session.user

    res.render("dashboard", {username: user.username})
})

module.exports = router
