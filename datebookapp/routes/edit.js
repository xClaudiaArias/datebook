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

/* GET users listing. */
// router.get('/', (req, res) => {
//     res.render('edit', {todaysDate: todaysDate()});
// })


router.get('/:post_id', (req, res) => {
    res.render('edit', {todaysDate: todaysDate()});
});


// edit 
router.post("/:post_id", (req, res) => {
    const user = req.session.user
    const { post_id } = req.params
    const { title, post_data } = req.body

    db.run(`UPDATE post SET title = ?, post_data = ? WHERE post_id = ? AND user_id = ?`, [title, post_data, post_id, user.id ], (err) => {
        if (err) {
            res.status(400).json({"err": err.message})
        }

        // res.json({
        //     "message": "Post successfully updated",
        //     "changes": this.changes
        // })
        res.redirect("/")
    })
})

module.exports = router;
