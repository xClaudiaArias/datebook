const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();


/* GET users listing. */
router.get('/', (req, res) => {
    res.render('create', { title: ' | Create' });
});

router.post('/', (req, res) => {
    let user = req.session.user


    if (!(req.body.post_data && req.body.title)) {
        res.status(400).json({ "error": "Field can't be empty."});
        return;
}

    let data = {
        title: req.body.title,
        post_data: req.body.post_data,
        user_id: user.id
    }

    console.log(data.user_id)
    console.log(req.body.title, req.body.post_data)

    let sql = 'INSERT INTO post (title, post_data, user_id) VALUES (?,?,?)'
    let params = [data.title, data.post_data, data.user_id]

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

module.exports = router;
