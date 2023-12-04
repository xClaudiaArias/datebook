const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = express.Router();

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                console.log(error)
                res.status(500).json({message: "Something went wrong"})
            } else {
                res.status(200).json({message: "Goodbye"})
            }
        })
    } else {
        res.status(200).json({message: "Not logged In"})
    }
});




module.exports = router;