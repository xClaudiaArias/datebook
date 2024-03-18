const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require('../database')
const jwt = require("jsonwebtoken")

const router = express.Router();


// GET register page. 
router.get('/register', (req, res) => {
    res.render('./auth/register')
});

// POST register. 
router.post('/register', (req, res) => {
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
        
        const token = jwt.sign(data, 'datebook_blog')

        res.redirect("/auth/login")
    })

});



// GET login page. 
router.get('/login', (req, res) => {
    res.render("./auth/login")
});

// POST login 
router.post('/login', (req, res) => {
    const { username, password } = req.body

    let user = [];

    db.serialize(() => {

        if (!(username && password)) {
            res.status(400).json({ message: "Username or password is required"})
        }

        let sql = "SELECT * FROM user WHERE username = ?"
    
        db.all(sql, username, (err, rows) => {
            if (err) {
                res.status(400).json({"error": err.message})
            }
    
            console.log(rows, " ::rows")
            rows.forEach(row => {
                user.push(row)
            });

            if (password !== user[0].password) {
                res.status(401).json({message: "Invalid Credentials."})
            } else {
                req.session.user = {
                    id: user[0].user_id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    username: user[0].username,
                    email: user[0].email
                }
                const token = jwt.sign(req.session.user, 'datebook_blog')
                res.redirect("/")
            }


        })
    })
});


module.exports = router;
