const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require('../database')

const router = express.Router();

router.get("/", (req, res) => {
    res.render("settings")
})

module.exports = router