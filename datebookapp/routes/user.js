const express = require('express');
const router = express.Router();
const db = require('../database');
const md5 = require('md5');

/* GET users listing. */
router.get('/', (req, res) => {
  let sql = "SELECT * FROM user"
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
  // res.render('user', { title: ' | Profile', user: name });
});


router.get('/:id', (req, res) => {
  let sql = "SELECT * FROM user WHERE user_id = ?"
  let params = [req.params.id]

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




module.exports = router;
