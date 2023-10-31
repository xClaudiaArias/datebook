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
    password: req.body.password
  }

  let sql = 'INSERT INTO user (firstName, lastName, email, username, password) VALUES (?,?,?,?,?)'
  let params = [data.firstName, data.lastName, data.email, data.username, data.password]

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

// router.patch('/update/:user_id', (req, res) => {
//   const { user_id } = req.params
//   // const newId = parseInt(user_id)
//   const {firstName, lastName, email, username, password, location} = req.body

//     if (!firstName || !lastName ||!email || !username || !password || !location) {
//       res.status(400).json({ "error": "Field can't be empty."});
//       return;
//     }
    
//     let data = {
//       user_id: user_id,
//       firstName: firstName,
//       lastName: lastName,
//       email: email, 
//       username: username,
//       password: password,
//       location:location
//     }

//     let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, location = ? WHERE user_id = ?'
//     let params = [data.user_id, data.firstName, data.lastName, data.email, data.username, data.password, data.location]

//     db.run(sql, params, function(err) {
//       if (err) {
//         return console.error(err.message);
//       }
//       console.log(`Row(s) updated: ${this.changes}`);
//       res.json({
//         "Rows Updated": this.changes
//       })
    
//     });


// })


router.patch('/update/:user_id', (req, res) => {
  const {user_id} = req.params
  const { firstName, lastName, email, username, password, location } = req.body

  let sql = 'UPDATE user SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, location = ? WHERE user_id = ?';

  db.run(sql,  [firstName, lastName, email, username, password, location, user_id], (err) => {
    if (err) {
      res.status(400).json({"err": err.message})
      return;
    }

    console.log("Changes: " + this.changes)
    res.json({
      "changes": this.changes
    })
  })
})

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    const user = req.session.user

    let sql = `DELETE FROM user WHERE user_id = ?`

    console.log(req.params, id, " ::req.params, params,")

    db.run(sql, id, (err, rows) => {
      if (err) {
        res.status(400).json({"message": err.message});
        return; 
    }
    
    console.log(rows, " ::rows")
        res.json({
            "message": "User successfully deleted"
        })
    })
})



module.exports = router;
