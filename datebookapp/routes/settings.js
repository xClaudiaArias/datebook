const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const db = require('../database')

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
    res.render("settings", {todaysDate: todaysDate()})
})

module.exports = router