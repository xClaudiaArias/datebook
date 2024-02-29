const express = require('express');
const db = require("../database");
const session = require('express-session');


const router = express.Router();

const todaysDate = () => {
    const date = new Date();

    const dd = date.getDate()
    const m = date.getMonth()
    const yyyy = date.getFullYear()

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const mm = months[date.getMonth()]

    const format = `${mm} ${dd}, ${yyyy}`

    return format
}

/* GET home page. */
router.get('/', (req, res) => {
    let user = req.session.user

    if (user !== undefined ) {
        let sql = "SELECT * FROM post WHERE user_id = ?"

    

        db.all(sql, user.id, (err, rows) => {
            if (err) {
                res.status(400).json({"error": err.message})
                return;
            } 
            
            let posts = rows;
    
            res.render("index", {user: user, firstName: user.firstName, posts: posts, todaysDate: todaysDate()})
        })


    } else {
        res.render("index")
    }


});


module.exports = router
