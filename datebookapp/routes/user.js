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

router.post('/', (req, res) => {
  const {firstName, lastName, email, username, password, location} = req.body

  if (!firstName || !lastName ||!email || !username || !password ) {
    res.status(400).json({ "error": "Field can't be empty."});
    return;
  }

  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password, 
    user_image: "https://picsum.photos/200/300/?blur=2"
  }

  let sql = 'INSERT INTO user (firstName, lastName, email, username, password, user_image) VALUES (?,?,?,?,?,?)'
  let params = [data.firstName, data.lastName, data.email, data.username, data.password, data.user_image]

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


router.patch('/update/:user_id', (req, res) => {
  const {user_id} = req.params
  const { firstName, lastName, email, username, password, location, user_image } = req.body

  let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, location = ?, user_image = ? WHERE user_id = ?';

  let data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password,
    location: location,
    user_id: user_id,
    user_image: user_image
  }

  let params = [data.firstName, data.lastName, data.email, data.username, data.password, data.location, data.user_id, data.user_image]

  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({"err": err.message})
      return;
    }

    console.log("Changes: " + this.changes)
    res.json({
      "message": "User successfully updated."
    })
  })
})

router.delete('/delete/:user_id', (req, res) => {
    const { user_id } = req.params
    const user = req.session.user

    let sql = `DELETE FROM user WHERE user_id = ?`

    console.log(req.params, user_id, " ::req.params, params,")

    db.run(sql, user_id, (err, rows) => {
      if (err) {
        res.status(400).json({"message": err.message});
        return; 
    }
    
    // console.log(rows, " ::rows")
        res.json({
            "message": "User successfully deleted"
        })
    })
})



module.exports = router;
