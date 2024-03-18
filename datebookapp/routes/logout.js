const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                console.log(error)
                res.status(500).json({message: "Something went wrong"})
            } else {
                res.redirect("/")
            }
        })
    } else {
        res.redirect("/")
    }
});

module.exports = router;