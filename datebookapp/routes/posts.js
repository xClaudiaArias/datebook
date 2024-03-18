const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const session = require('express-session');

const router = express.Router();

const dateCreated = () => {
    const date = new Date();

    const dd = date.getDate()
    const m = date.getMonth()
    const yyyy = date.getFullYear()

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const mm = months[date.getMonth()]

    const format = `${mm} ${dd}, ${yyyy}`

    return format
}

/* GET posts listing. */
router.get('/', (req, res) => {
    let user = req.session.user

    if (user !== undefined ) {
        let sql = "SELECT * FROM post WHERE user_id = ?"

    

        db.all(sql, user.id, (err, rows) => {
            if (err) {
                res.status(400).json({"error": err.message})
                return;
            } 

            // posts.push(rows)
            let posts = rows;
    
            res.render("posts", {user: user, posts: posts, date: dateCreated()})
        })


    } else {
        res.render("posts")
    }

});

// get posts by id 

router.get('/:id', (req, res) => {
    let sql = "SELECT * FROM post WHERE post_id = ?"
    let params = [req.params.id]

    console.log(params, " ::params")

    db.get(sql, params, (err, rows) => {
        if (err) {
        res.status(400).json({"error": err.message})
        return;
        } 

        let data = {...rows}
        console.log(data, " ---rows")

        res.render('postExpanded', {title: data.title, post_data: data.post_data, dateCreated: data.date_created})
    })
});

//get posts by user id

router.get('/user/:user_id', (req, res) => {
    let sql = "SELECT * FROM post WHERE user_id = ?"
    let params = req.params.user_id
    let posts = []
    let user = req.session.user


    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        } 

        posts.push(rows)

        res.render("posts", {user_id: user.id })
    })
})

// POST 

router.post('/', (req, res) => {
    let user = req.session.user


    if (!(req.body.post_data && req.body.title)) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
    }

    let data = {
        title: req.body.title,
        post_data: req.body.post_data,
        user_id: user.id,
        date_created: dateCreated()
    }

    let sql = 'INSERT INTO post (title, post_data, user_id, date_created) VALUES (?,?,?,?)'
    let params = [data.title, data.post_data, data.user_id, data.date_created]

    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return;                      
        } 
        
        res.json({
            "message" : "Success",
            "data": data,
            "id": this.lastID
        })
    })

})

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

// delete 
router.post('/delete/:id', (req, res) => {
    const { id } = req.params
    const user = req.session.user

    let sql = `DELETE FROM post WHERE post_id = ? AND user_id = ?`

    let data = {
        post_id: id,
        user_id: user.id
    }

    let params = [data.post_id, data.user_id]


    console.log(params, " params")
    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return; 
        }

        // res.json({
        //     "message": "Post successfully deleted"
        // })
        res.redirect("/")
    })

})

module.exports = router;


