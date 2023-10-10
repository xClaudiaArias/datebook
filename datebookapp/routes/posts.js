const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', function(req, res, next) {
    let sql = "SELECT * FROM post"
    let params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return;
        }
        res.json({
            "message": "Success",
            "data": rows
        })
    })
    // res.render('user', { title: ' | Profile', user: name });
});

module.exports = router;
