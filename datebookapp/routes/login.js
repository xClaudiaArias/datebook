var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const db = require('../database')

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.sendFile('login.html', {'root': '././auth'})
});

router.post('/', async (req, res, next) => {
    try {
    const { username, password } = req.body;

    db.serialize(() =>  {
        if (!(username && password )) {
            res.status(400).json({"message": "All fields are required"})
        }
    
        let user = [];
    
        var sql = "SELECT * FROM user WHERE username = ?";
    // query through database to find user 
        db.all(sql, username, (err, rows) => {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            console.log(rows, " :rows")
            rows.forEach((row) => {
                user.push(row);                
            })

            let passVer = password

            if (passVer === user[0].password) {
                console.log("Success")
                // res.redirect('/');
                res.render('index', { user: user[0].firstName});
            } else {
                return res.status(400).send("No Match");          
            }
    
            // return res.status(200).send(user);  
        })

        // use verification later for this:
    })

    } catch (err) {
        console.log(err)
    }
});



module.exports = router;
