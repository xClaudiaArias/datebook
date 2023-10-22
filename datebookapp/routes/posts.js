const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();


/* GET posts listing. */
router.get('/', (req, res) => {
    let sql = "SELECT * FROM post"
    let params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return;
        }
        res.json({
            "message": "Success",
            "data": rows
        })
    })
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
        res.json({
        "message": "success",
        "data": rows
        })
    })
});

//get posts by user id

router.get('/user/:user_id', (req, res) => {
    let sql = "SELECT * FROM post WHERE user_id = ?"
    let params = req.params.user_id
    let posts = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        } 

        res.json({
            "message": "success",
            "data": rows
        })
    })
})


router.post('/', (req, res) => {
    let user = req.session.user


    if (!(req.body.post && req.body.title)) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
    }

    let data = {
        title: req.body.title,
        post: req.body.post,
        user_id: user.id
    }

    let sql = 'INSERT INTO post (title, post, user_id) VALUES (?,?,?)'
    let params = [data.title, data.post, data.user_id]

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
router.patch("/update/:id", (req, res) => {
    let { id } = req.params.id
    let { title, post } = req.body 

    if (!(req.body.post && req.body.title)) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
    }

    let sql = "UPDATE post SET title = ?, post = ? WHERE post_id = ?";

    let data = {
        post_id: id,
        title: title,
        post: post
    }

    let params = [data.post_id, data.title, data.post]

    console.log(req.params, " ::req.params")

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return;                      
        } 

        res.json({
            "message": "post successfully updated",
            "data": data
        })
    })
})

// delete 
router.delete("/:id", (req, res) => {
    const { id } = req.params

    let sql = `DELETE FROM post WHERE id = ?`

    db.run(sql, params, (err) => {
        if (err) console.log(err)

        req.json({
            "message": "Post succefully deleted"
        })
    })
})

module.exports = router;
