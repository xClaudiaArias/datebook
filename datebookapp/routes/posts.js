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

// POST 

router.post('/', (req, res) => {
    let user = req.session.user


    if (!(req.body.post_data && req.body.title)) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
    }

    let data = {
        title: req.body.title,
        post: req.body.post_data,
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
router.patch('/update/:id', (req, res) => {
    const { id } = req.params
    const user = req.session.user
    const { title, post_data } = req.body

    let sql = 'UPDATE post SET title = ?, post_data = ? WHERE post_id = ? AND user_id = ?'
    
    let data = {
        post_id: id,
        title: title,
        post_data: post_data,
        user_id: user.id,
    }

    let params =  [data.post_id, data.title, data.post_data, data.user.id]

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return; 
        }

        res.json({
            "message": "Post successfully updated",
            "data": data
        })
    })
})

// delete 
router.delete('/delete/:id', (req, res) => {
    const id = req.params
    const user = req.session.user

    let sql = `DELETE FROM post WHERE post_id = ? AND user_id = ?`

    let data = {
        post_id: id,
        user_id: user.id
    }

    let params = [data.post_id, data.user_id]

    db.run(sql, params, (err) => {
        if (err) {
            res.status(400).json({"message": err.message});
            return; 
        }

        res.json({
            "message": "Post successfully deleted"
        })
    })

})

module.exports = router;






// let user = req.session.user
// let post_id = req.params.post_id
// let { title, post_data } = req.body 

// if (!(req.body.post_data && req.body.title)) {
//     res.status(400).json({ "error": "Field can't be empty."});
//     return;
// }

// let data = {
//     post_id: parseInt(post_id),
//     title: title,
//     post_data: post_data,
//     user_id: user.id
// }

// let sql = `UPDATE post SET title = ?, post_data = ? WHERE post_id = ? AND user_id = ?`

// let cc = [data.post_id, data.title, data.post_data, data.user_id]

// console.log(req.params, " ::req.params")
// console.log(cc, " cc")

// db.run(sql, cc, (err) => {
//     if (err) {
//         res.status(400).json({"message": err.message});
//         return;                      
//     } 

//     console.log(sql, " sql")
//     res.json({
//         "message": "post successfully updated",
//         "data": data
//     })
// })