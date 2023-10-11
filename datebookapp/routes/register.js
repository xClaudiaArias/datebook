var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const db = require('../database')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('./auth/register')
});

router.post('/', (req, res, next) => {
    if (!req.body.firstName || !req.body.lastName ||!req.body.email || !req.body.username || !req.body.password ) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
    }

    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }

    let sql = 'INSERT INTO user (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)'
    let params = [data.firstName, data.lastName, data.email, data.username, data.password]

    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return;                      
        } 
        
        res.json({
            "message" : "Success",
            "data": data,
            "id": this.lastID
        })
    })

});

module.exports = router;
