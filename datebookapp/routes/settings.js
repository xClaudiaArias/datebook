const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
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

router.get("/", (req, res) => {
    let user = req.session.user

    if (user !== undefined ) {
        res.render("settings", {user: user, todaysDate: todaysDate()})
    } else {
        res.render("settings")
    }
})

router.post('/update/:user_id', (req, res) => {
    const { user_id } = req.params
    const { firstName, lastName, email, username, password, location } = req.body
    let user = req.session.user

    let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, location = ? WHERE user_id = ?';

    let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        location: location,
        user_id: user.id
    }

    let params = [data.firstName, data.lastName, data.email, data.username, data.password, data.location, data.user_id]

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({"err": err.message})
            return;
        }

        // console.log("Changes: " + this.changes)
        // res.json({
        //     "message": "User successfully updated."
        // })
        res.redirect('/')
    })
})

module.exports = router