const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require('../database')

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render("./auth/login")
});

router.post('/', (req, res) => {
    const { username, password } = req.body

    let user = [];

    db.serialize(() => {

        if (!(username && password)) {
            res.status(400).json({ message: "Username or password is required"})
        }

        let sql = "SELECT * FROM user WHERE username = ?"
    
        db.all(sql, username, (err, rows) => {
            if (err) {
                res.status(400).status({"error": err.message})
            }
    
            console.log(rows, " ::rows")
            rows.forEach(row => {
                user.push(row)
            });

            if (password !== user[0].password) {
                res.status(401).json({message: "Invalid Credentials."})
            } else {
                req.session.user = {
                    id: user[0].id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    username: user[0].username
                }
                res.redirect("/dashboard")
            }


        })
    })
});



module.exports = router;
