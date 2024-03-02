const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
    res.render('edit');
});


// edit 
router.patch("/update/:post_id", (req, res) => {
    const user = req.session.user
    const { post_id } = req.params
    const { title, post_data } = req.body

    db.run(`UPDATE post SET title = ?, post_data = ? WHERE post_id = ? AND user_id = ?`, [title, post_data, post_id, user.id ], (err) => {
        if (err) {
            res.status(400).json({"err": err.message})
        }

        res.json({
            "message": "Post successfully updated",
            "changes": this.changes
        })
    })
})

module.exports = router;
