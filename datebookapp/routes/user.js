const express = require('express');
const router = express.Router();
const db = require('../database');
const md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
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


router.get('/:id', function(req, res, next) {
  let sql = "SELECT * FROM user WHERE id = ?"
  let params = [req.params.id]

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    } 
    res.json({
      "message": "success",
      "data": row
    })
  })
});

router.post('/', (req, res, next) => {
  // let errors = [];

  // if (!req.body.username) {
  //     errors.push("No username specified.")
  // }

  // if (!req.body.password) {
  //     errors.push("No username specified.")
  // }

  // if (errors.length) {
  //     res.status(400).json({"error": errors.join(",")})
  //     return
  // }

  let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  }

  let sql = 'INSERT INTO user (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)'

  var params = [data.firstName, data.lastName, data.email, data.username, data.password]

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

});


module.exports = router;
